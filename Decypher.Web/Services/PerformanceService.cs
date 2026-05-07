using Decypher.Web.Data;
using Decypher.Web.Models.HRModels;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Services;

// ─── Goals & OKRs ────────────────────────────────────────────────────────────
public interface IGoalService
{
    Task<List<Goal>> GetGoalsAsync(Guid? employeeId, string? status, int? year, int? quarter);
    Task<Goal> GetGoalByIdAsync(Guid id);
    Task<Goal> CreateGoalAsync(Goal goal);
    Task<Goal> UpdateGoalAsync(Guid id, Goal updated);
    Task DeleteGoalAsync(Guid id);
    Task<KeyResult> AddKeyResultAsync(Guid goalId, KeyResult kr);
    Task<KeyResult> UpdateKeyResultAsync(Guid krId, decimal progress, string? notes);
    Task DeleteKeyResultAsync(Guid krId);
    Task<object> GetOkrSummaryAsync(Guid? employeeId, int? year);
}

public class GoalService(ApplicationDbContext db, IHttpContextAccessor http) : IGoalService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<Goal>> GetGoalsAsync(Guid? employeeId, string? status, int? year, int? quarter)
    {
        var q = db.Goals.Include(g => g.KeyResults).AsNoTracking().Where(g => g.TenantId == TenantId && !g.IsDeleted);
        if (employeeId.HasValue) q = q.Where(g => g.OwnerEmployeeId == employeeId);
        if (!string.IsNullOrEmpty(status)) q = q.Where(g => g.Status == status);
        if (year.HasValue) q = q.Where(g => g.Year == year);
        if (quarter.HasValue) q = q.Where(g => g.Quarter == quarter);
        return await q.OrderByDescending(g => g.CreatedAt).ToListAsync();
    }

    public async Task<Goal> GetGoalByIdAsync(Guid id)
    {
        return await db.Goals.Include(g => g.KeyResults).AsNoTracking()
            .FirstOrDefaultAsync(g => g.Id == id && g.TenantId == TenantId && !g.IsDeleted)
            ?? throw new KeyNotFoundException("Goal not found");
    }

    public async Task<Goal> CreateGoalAsync(Goal goal)
    {
        goal.Id = Guid.NewGuid();
        goal.TenantId = TenantId;
        goal.CreatedBy = UserId;
        goal.CreatedAt = DateTime.UtcNow;
        goal.Progress = 0;
        goal.Status = "Active";
        db.Goals.Add(goal);
        await db.SaveChangesAsync();
        return goal;
    }

    public async Task<Goal> UpdateGoalAsync(Guid id, Goal updated)
    {
        var goal = await db.Goals.Include(g => g.KeyResults)
            .FirstOrDefaultAsync(g => g.Id == id && g.TenantId == TenantId && !g.IsDeleted)
            ?? throw new KeyNotFoundException("Goal not found");

        goal.Title = updated.Title;
        goal.Description = updated.Description;
        goal.Type = updated.Type;
        goal.Status = updated.Status;
        goal.DueDate = updated.DueDate;
        goal.UpdatedAt = DateTime.UtcNow;
        goal.UpdatedBy = UserId;

        // Recalculate progress from key results
        if (goal.KeyResults.Any())
            goal.Progress = goal.KeyResults.Average(kr => kr.Progress);

        await db.SaveChangesAsync();
        return goal;
    }

    public async Task DeleteGoalAsync(Guid id)
    {
        var goal = await db.Goals.FirstOrDefaultAsync(g => g.Id == id && g.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Goal not found");
        goal.IsDeleted = true;
        goal.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<KeyResult> AddKeyResultAsync(Guid goalId, KeyResult kr)
    {
        var goal = await db.Goals.FirstOrDefaultAsync(g => g.Id == goalId && g.TenantId == TenantId && !g.IsDeleted)
            ?? throw new KeyNotFoundException("Goal not found");

        kr.Id = Guid.NewGuid();
        kr.GoalId = goalId;
        kr.TenantId = TenantId;
        kr.CreatedBy = UserId;
        kr.CreatedAt = DateTime.UtcNow;
        kr.Progress = 0;
        db.KeyResults.Add(kr);
        await db.SaveChangesAsync();
        return kr;
    }

    public async Task<KeyResult> UpdateKeyResultAsync(Guid krId, decimal progress, string? notes)
    {
        var kr = await db.KeyResults.Include(k => k.Goal)
            .FirstOrDefaultAsync(k => k.Id == krId && k.TenantId == TenantId && !k.IsDeleted)
            ?? throw new KeyNotFoundException("Key result not found");

        kr.Progress = Math.Clamp(progress, 0, 100);
        kr.CurrentValue = kr.TargetValue * (progress / 100m);
        kr.Notes = notes ?? kr.Notes;
        kr.UpdatedAt = DateTime.UtcNow;
        kr.UpdatedBy = UserId;

        // Update parent goal progress
        var siblings = await db.KeyResults.Where(k => k.GoalId == kr.GoalId && !k.IsDeleted).ToListAsync();
        kr.Goal.Progress = siblings.Average(k => k.Progress);
        kr.Goal.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();
        return kr;
    }

    public async Task DeleteKeyResultAsync(Guid krId)
    {
        var kr = await db.KeyResults.FirstOrDefaultAsync(k => k.Id == krId && k.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Key result not found");
        kr.IsDeleted = true;
        kr.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<object> GetOkrSummaryAsync(Guid? employeeId, int? year)
    {
        var q = db.Goals.Include(g => g.KeyResults).AsNoTracking()
            .Where(g => g.TenantId == TenantId && !g.IsDeleted);
        if (employeeId.HasValue) q = q.Where(g => g.OwnerEmployeeId == employeeId);
        if (year.HasValue) q = q.Where(g => g.Year == year);

        var goals = await q.ToListAsync();
        return new
        {
            TotalGoals = goals.Count,
            Completed = goals.Count(g => g.Status == "Completed"),
            OnTrack = goals.Count(g => g.Progress >= 70 && g.Status == "Active"),
            AtRisk = goals.Count(g => g.Progress < 70 && g.Status == "Active"),
            AverageProgress = goals.Any() ? Math.Round(goals.Average(g => g.Progress), 1) : 0,
            ByQuarter = goals.GroupBy(g => g.Quarter).Select(grp => new
            {
                Quarter = grp.Key,
                Count = grp.Count(),
                AvgProgress = Math.Round(grp.Average(g => g.Progress), 1)
            })
        };
    }
}

// ─── Review Cycles ────────────────────────────────────────────────────────────
public interface IReviewCycleService
{
    Task<List<ReviewCycle>> GetCyclesAsync(bool activeOnly);
    Task<ReviewCycle> GetCycleByIdAsync(Guid id);
    Task<ReviewCycle> CreateCycleAsync(ReviewCycle cycle);
    Task<ReviewCycle> UpdateCycleAsync(Guid id, ReviewCycle updated);
    Task DeleteCycleAsync(Guid id);
    Task<ReviewCycle> ActivateCycleAsync(Guid id);
    Task<ReviewCycle> CloseCycleAsync(Guid id);
}

public class ReviewCycleService(ApplicationDbContext db, IHttpContextAccessor http) : IReviewCycleService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<ReviewCycle>> GetCyclesAsync(bool activeOnly)
    {
        var q = db.ReviewCycles.AsNoTracking().Where(c => c.TenantId == TenantId && !c.IsDeleted);
        if (activeOnly) q = q.Where(c => c.Status == "Active");
        return await q.OrderByDescending(c => c.StartDate).ToListAsync();
    }

    public async Task<ReviewCycle> GetCycleByIdAsync(Guid id)
    {
        return await db.ReviewCycles.AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId && !c.IsDeleted)
            ?? throw new KeyNotFoundException("Review cycle not found");
    }

    public async Task<ReviewCycle> CreateCycleAsync(ReviewCycle cycle)
    {
        cycle.Id = Guid.NewGuid();
        cycle.TenantId = TenantId;
        cycle.CreatedBy = UserId;
        cycle.CreatedAt = DateTime.UtcNow;
        cycle.Status = "Draft";
        db.ReviewCycles.Add(cycle);
        await db.SaveChangesAsync();
        return cycle;
    }

    public async Task<ReviewCycle> UpdateCycleAsync(Guid id, ReviewCycle updated)
    {
        var cycle = await db.ReviewCycles.FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId && !c.IsDeleted)
            ?? throw new KeyNotFoundException("Review cycle not found");

        if (cycle.Status == "Closed") throw new InvalidOperationException("Cannot edit a closed cycle");

        cycle.Name = updated.Name;
        cycle.Type = updated.Type;
        cycle.StartDate = updated.StartDate;
        cycle.EndDate = updated.EndDate;
        cycle.ReviewFormTemplate = updated.ReviewFormTemplate;
        cycle.UpdatedAt = DateTime.UtcNow;
        cycle.UpdatedBy = UserId;
        await db.SaveChangesAsync();
        return cycle;
    }

    public async Task DeleteCycleAsync(Guid id)
    {
        var cycle = await db.ReviewCycles.FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Review cycle not found");
        cycle.IsDeleted = true;
        cycle.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<ReviewCycle> ActivateCycleAsync(Guid id)
    {
        var cycle = await db.ReviewCycles.FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId && !c.IsDeleted)
            ?? throw new KeyNotFoundException("Review cycle not found");
        cycle.Status = "Active";
        cycle.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return cycle;
    }

    public async Task<ReviewCycle> CloseCycleAsync(Guid id)
    {
        var cycle = await db.ReviewCycles.FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId && !c.IsDeleted)
            ?? throw new KeyNotFoundException("Review cycle not found");
        cycle.Status = "Closed";
        cycle.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return cycle;
    }
}

// ─── Performance Reviews ──────────────────────────────────────────────────────
public interface IPerformanceReviewService
{
    Task<List<PerformanceReview>> GetReviewsAsync(Guid? cycleId, Guid? revieweeId, Guid? reviewerId, string? status);
    Task<PerformanceReview> GetReviewByIdAsync(Guid id);
    Task<List<PerformanceReview>> InitiateCycleReviewsAsync(Guid cycleId, List<Guid> employeeIds);
    Task<PerformanceReview> SubmitReviewAsync(Guid id, PerformanceReview form);
    Task<PerformanceReview> AcknowledgeReviewAsync(Guid id, string? comments);
    Task<object> GetReviewSummaryAsync(Guid cycleId);
}

public class PerformanceReviewService(ApplicationDbContext db, IHttpContextAccessor http) : IPerformanceReviewService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<PerformanceReview>> GetReviewsAsync(Guid? cycleId, Guid? revieweeId, Guid? reviewerId, string? status)
    {
        var q = db.PerformanceReviews.Include(r => r.Cycle).AsNoTracking()
            .Where(r => r.TenantId == TenantId && !r.IsDeleted);
        if (cycleId.HasValue) q = q.Where(r => r.ReviewCycleId == cycleId);
        if (revieweeId.HasValue) q = q.Where(r => r.RevieweeEmployeeId == revieweeId);
        if (reviewerId.HasValue) q = q.Where(r => r.ReviewerEmployeeId == reviewerId);
        if (!string.IsNullOrEmpty(status)) q = q.Where(r => r.Status == status);
        return await q.OrderByDescending(r => r.CreatedAt).ToListAsync();
    }

    public async Task<PerformanceReview> GetReviewByIdAsync(Guid id)
    {
        return await db.PerformanceReviews.Include(r => r.Cycle).AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId && !r.IsDeleted)
            ?? throw new KeyNotFoundException("Review not found");
    }

    public async Task<List<PerformanceReview>> InitiateCycleReviewsAsync(Guid cycleId, List<Guid> employeeIds)
    {
        var cycle = await db.ReviewCycles.FirstOrDefaultAsync(c => c.Id == cycleId && c.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Review cycle not found");

        var reviews = new List<PerformanceReview>();
        foreach (var empId in employeeIds)
        {
            // Skip if already exists
            if (await db.PerformanceReviews.AnyAsync(r => r.ReviewCycleId == cycleId && r.RevieweeEmployeeId == empId && !r.IsDeleted))
                continue;

            var emp = await db.Employees.FirstOrDefaultAsync(e => e.Id == empId && e.TenantId == TenantId);
            var review = new PerformanceReview
            {
                Id = Guid.NewGuid(),
                TenantId = TenantId,
                ReviewCycleId = cycleId,
                RevieweeEmployeeId = empId,
                ReviewerEmployeeId = emp?.ManagerId,
                Status = "Pending",
                CreatedBy = UserId,
                CreatedAt = DateTime.UtcNow
            };
            db.PerformanceReviews.Add(review);
            reviews.Add(review);
        }

        await db.SaveChangesAsync();
        return reviews;
    }

    public async Task<PerformanceReview> SubmitReviewAsync(Guid id, PerformanceReview form)
    {
        var review = await db.PerformanceReviews.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId && !r.IsDeleted)
            ?? throw new KeyNotFoundException("Review not found");

        review.OverallRating = form.OverallRating;
        review.SelfRating = form.SelfRating;
        review.Strengths = form.Strengths;
        review.AreasForImprovement = form.AreasForImprovement;
        review.GoalsForNextPeriod = form.GoalsForNextPeriod;
        review.ReviewerComments = form.ReviewerComments;
        review.Status = "Submitted";
        review.SubmittedAt = DateTime.UtcNow;
        review.UpdatedAt = DateTime.UtcNow;
        review.UpdatedBy = UserId;
        await db.SaveChangesAsync();
        return review;
    }

    public async Task<PerformanceReview> AcknowledgeReviewAsync(Guid id, string? comments)
    {
        var review = await db.PerformanceReviews.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId && !r.IsDeleted)
            ?? throw new KeyNotFoundException("Review not found");

        review.RevieweeComments = comments;
        review.AcknowledgedAt = DateTime.UtcNow;
        review.Status = "Acknowledged";
        review.UpdatedAt = DateTime.UtcNow;
        review.UpdatedBy = UserId;
        await db.SaveChangesAsync();
        return review;
    }

    public async Task<object> GetReviewSummaryAsync(Guid cycleId)
    {
        var reviews = await db.PerformanceReviews.AsNoTracking()
            .Where(r => r.ReviewCycleId == cycleId && r.TenantId == TenantId && !r.IsDeleted)
            .ToListAsync();

        var submitted = reviews.Where(r => r.Status == "Submitted" || r.Status == "Acknowledged").ToList();
        return new
        {
            Total = reviews.Count,
            Pending = reviews.Count(r => r.Status == "Pending"),
            Submitted = submitted.Count,
            Acknowledged = reviews.Count(r => r.Status == "Acknowledged"),
            AverageRating = submitted.Any() ? Math.Round(submitted.Average(r => r.OverallRating ?? 0), 2) : 0,
            RatingDistribution = submitted.GroupBy(r => (int)Math.Floor(r.OverallRating ?? 0))
                .Select(g => new { Rating = g.Key, Count = g.Count() })
                .OrderBy(x => x.Rating)
        };
    }
}

// ─── 360° Feedback ────────────────────────────────────────────────────────────
public interface IFeedbackService
{
    Task<List<FeedbackRequest>> GetFeedbackRequestsAsync(Guid? requesteeId, Guid? reviewerId, string? status);
    Task<FeedbackRequest> CreateFeedbackRequestAsync(FeedbackRequest request);
    Task<FeedbackResponse> SubmitFeedbackResponseAsync(Guid requestId, FeedbackResponse response);
    Task<object> GetFeedbackSummaryAsync(Guid employeeId);
    Task<List<ContinuousFeedback>> GetContinuousFeedbackAsync(Guid employeeId);
    Task<ContinuousFeedback> SendContinuousFeedbackAsync(ContinuousFeedback feedback);
}

public class FeedbackService(ApplicationDbContext db, IHttpContextAccessor http) : IFeedbackService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<FeedbackRequest>> GetFeedbackRequestsAsync(Guid? requesteeId, Guid? reviewerId, string? status)
    {
        var q = db.FeedbackRequests.Include(r => r.Responses).AsNoTracking()
            .Where(r => r.TenantId == TenantId && !r.IsDeleted);
        if (requesteeId.HasValue) q = q.Where(r => r.RequesteeEmployeeId == requesteeId);
        if (reviewerId.HasValue) q = q.Where(r => r.ReviewerEmployeeId == reviewerId);
        if (!string.IsNullOrEmpty(status)) q = q.Where(r => r.Status == status);
        return await q.OrderByDescending(r => r.CreatedAt).ToListAsync();
    }

    public async Task<FeedbackRequest> CreateFeedbackRequestAsync(FeedbackRequest request)
    {
        request.Id = Guid.NewGuid();
        request.TenantId = TenantId;
        request.CreatedBy = UserId;
        request.CreatedAt = DateTime.UtcNow;
        request.Status = "Pending";
        db.FeedbackRequests.Add(request);
        await db.SaveChangesAsync();
        return request;
    }

    public async Task<FeedbackResponse> SubmitFeedbackResponseAsync(Guid requestId, FeedbackResponse response)
    {
        var req = await db.FeedbackRequests.FirstOrDefaultAsync(r => r.Id == requestId && r.TenantId == TenantId && !r.IsDeleted)
            ?? throw new KeyNotFoundException("Feedback request not found");

        // Check not already responded
        if (await db.FeedbackResponses.AnyAsync(r => r.FeedbackRequestId == requestId && r.RespondentEmployeeId == response.RespondentEmployeeId && !r.IsDeleted))
            throw new InvalidOperationException("Feedback already submitted");

        response.Id = Guid.NewGuid();
        response.TenantId = TenantId;
        response.FeedbackRequestId = requestId;
        response.CreatedBy = UserId;
        response.CreatedAt = DateTime.UtcNow;
        response.SubmittedAt = DateTime.UtcNow;
        db.FeedbackResponses.Add(response);

        // Check if all responses collected
        var totalReviewers = await db.FeedbackRequests
            .CountAsync(r => r.RequesteeEmployeeId == req.RequesteeEmployeeId && r.ReviewCycleId == req.ReviewCycleId && !r.IsDeleted);
        var responsesCount = await db.FeedbackResponses
            .CountAsync(r => r.FeedbackRequestId == requestId && !r.IsDeleted);

        if (responsesCount + 1 >= totalReviewers)
            req.Status = "Completed";

        req.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return response;
    }

    public async Task<object> GetFeedbackSummaryAsync(Guid employeeId)
    {
        var responses = await db.FeedbackResponses.AsNoTracking()
            .Where(r => r.TenantId == TenantId && !r.IsDeleted &&
                        db.FeedbackRequests.Any(req => req.Id == r.FeedbackRequestId && req.RequesteeEmployeeId == employeeId))
            .ToListAsync();

        return new
        {
            TotalResponses = responses.Count,
            AverageRating = responses.Any() ? Math.Round(responses.Average(r => r.OverallRating ?? 0), 2) : 0,
            ByRelationship = responses.GroupBy(r => r.Relationship)
                .Select(g => new
                {
                    Relationship = g.Key,
                    Count = g.Count(),
                    AverageRating = Math.Round(g.Average(r => r.OverallRating ?? 0), 2)
                }),
            RecentStrengths = responses.Where(r => r.Strengths != null)
                .OrderByDescending(r => r.SubmittedAt).Take(5).Select(r => r.Strengths)
        };
    }

    public async Task<List<ContinuousFeedback>> GetContinuousFeedbackAsync(Guid employeeId)
    {
        return await db.ContinuousFeedbacks.AsNoTracking()
            .Where(f => f.TenantId == TenantId && !f.IsDeleted &&
                        (f.RecipientEmployeeId == employeeId || f.GiverEmployeeId == employeeId))
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync();
    }

    public async Task<ContinuousFeedback> SendContinuousFeedbackAsync(ContinuousFeedback feedback)
    {
        feedback.Id = Guid.NewGuid();
        feedback.TenantId = TenantId;
        feedback.GiverEmployeeId = UserId;
        feedback.CreatedBy = UserId;
        feedback.CreatedAt = DateTime.UtcNow;
        db.ContinuousFeedbacks.Add(feedback);
        await db.SaveChangesAsync();
        return feedback;
    }
}
