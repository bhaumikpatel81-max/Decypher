using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Services;

// â”€â”€â”€ Goals & OKRs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        if (employeeId.HasValue) q = q.Where(g => g.EmployeeId == employeeId);
        if (!string.IsNullOrEmpty(status)) q = q.Where(g => g.Status == status);
        if (year.HasValue) q = q.Where(g => g.StartDate.Year == year);
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
        goal.CreatedBy = UserId.ToString();
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
        goal.Category = updated.Category;
        goal.Status = updated.Status;
        goal.EndDate = updated.EndDate;
        goal.Priority = updated.Priority;
        goal.UpdatedAt = DateTime.UtcNow;
        goal.UpdatedBy = UserId.ToString();

        // Recalculate progress from key results
        if (goal.KeyResults.Any())
            goal.Progress = (int)Math.Round(goal.KeyResults.Average(kr => (double)kr.Progress));

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
        kr.CreatedBy = UserId.ToString();
        kr.CreatedAt = DateTime.UtcNow;
        kr.CurrentValue = 0;
        db.KeyResults.Add(kr);
        await db.SaveChangesAsync();
        return kr;
    }

    public async Task<KeyResult> UpdateKeyResultAsync(Guid krId, decimal progress, string? notes)
    {
        var kr = await db.KeyResults.Include(k => k.Goal)
            .FirstOrDefaultAsync(k => k.Id == krId && k.TenantId == TenantId && !k.IsDeleted)
            ?? throw new KeyNotFoundException("Key result not found");

        kr.CurrentValue = kr.TargetValue * (Math.Clamp(progress, 0, 100) / 100m);
        kr.UpdatedAt = DateTime.UtcNow;
        kr.UpdatedBy = UserId.ToString();

        // Update parent goal progress
        var siblings = await db.KeyResults.Where(k => k.GoalId == kr.GoalId && !k.IsDeleted).ToListAsync();
        kr.Goal.Progress = siblings.Any()
            ? (int)Math.Round(siblings.Average(k => k.TargetValue > 0 ? (double)(k.CurrentValue / k.TargetValue) * 100 : 0))
            : 0;
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
        if (employeeId.HasValue) q = q.Where(g => g.EmployeeId == employeeId);
        if (year.HasValue) q = q.Where(g => g.StartDate.Year == year);

        var goals = await q.ToListAsync();
        return new
        {
            TotalGoals = goals.Count,
            Completed = goals.Count(g => g.Status == "Completed"),
            OnTrack = goals.Count(g => g.Progress >= 70 && g.Status == "Active"),
            AtRisk = goals.Count(g => g.Progress < 70 && g.Status == "Active"),
            AverageProgress = goals.Any() ? Math.Round(goals.Average(g => (double)g.Progress), 1) : 0
        };
    }
}

// â”€â”€â”€ Review Cycles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        cycle.CreatedBy = UserId.ToString();
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
        cycle.SelfReviewDeadline = updated.SelfReviewDeadline;
        cycle.ManagerReviewDeadline = updated.ManagerReviewDeadline;
        cycle.UpdatedAt = DateTime.UtcNow;
        cycle.UpdatedBy = UserId.ToString();
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

// â”€â”€â”€ Performance Reviews â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        var q = db.PerformanceReviews.Include(r => r.ReviewCycle).AsNoTracking()
            .Where(r => r.TenantId == TenantId && !r.IsDeleted);
        if (cycleId.HasValue) q = q.Where(r => r.ReviewCycleId == cycleId);
        if (revieweeId.HasValue) q = q.Where(r => r.EmployeeId == revieweeId);
        if (reviewerId.HasValue) q = q.Where(r => r.ReviewerId == reviewerId.ToString());
        if (!string.IsNullOrEmpty(status)) q = q.Where(r => r.Status == status);
        return await q.OrderByDescending(r => r.CreatedAt).ToListAsync();
    }

    public async Task<PerformanceReview> GetReviewByIdAsync(Guid id)
    {
        return await db.PerformanceReviews.Include(r => r.ReviewCycle).AsNoTracking()
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
            if (await db.PerformanceReviews.AnyAsync(r => r.ReviewCycleId == cycleId && r.EmployeeId == empId && !r.IsDeleted))
                continue;

            var emp = await db.Employees.FirstOrDefaultAsync(e => e.Id == empId && e.TenantId == TenantId);
            var review = new PerformanceReview
            {
                Id = Guid.NewGuid(),
                TenantId = TenantId,
                ReviewCycleId = cycleId,
                EmployeeId = empId,
                ReviewerId = emp?.ManagerId?.ToString(),
                Status = "Pending",
                CreatedBy = UserId.ToString(),
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

        review.FinalRating = form.FinalRating;
        review.ManagerRating = form.ManagerRating;
        review.SelfRating = form.SelfRating;
        review.ManagerComments = form.ManagerComments;
        review.DevelopmentPlan = form.DevelopmentPlan;
        review.Status = "Submitted";
        review.SubmittedAt = DateTime.UtcNow;
        review.UpdatedAt = DateTime.UtcNow;
        review.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return review;
    }

    public async Task<PerformanceReview> AcknowledgeReviewAsync(Guid id, string? comments)
    {
        var review = await db.PerformanceReviews.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId && !r.IsDeleted)
            ?? throw new KeyNotFoundException("Review not found");

        review.SelfComments = comments;
        review.CompletedAt = DateTime.UtcNow;
        review.Status = "Acknowledged";
        review.UpdatedAt = DateTime.UtcNow;
        review.UpdatedBy = UserId.ToString();
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
            AverageRating = submitted.Any() ? Math.Round(submitted.Average(r => (double)(r.FinalRating ?? r.ManagerRating ?? 0)), 2) : 0,
            RatingDistribution = submitted.GroupBy(r => (int)Math.Floor((double)(r.FinalRating ?? r.ManagerRating ?? 0)))
                .Select(g => new { Rating = g.Key, Count = g.Count() })
                .OrderBy(x => x.Rating)
        };
    }
}

// â”€â”€â”€ 360Â° Feedback â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public interface IFeedbackService
{
    Task<List<FeedbackRequest>> GetFeedbackRequestsAsync(Guid? requesteeId, Guid? reviewerId, string? status);
    Task<FeedbackRequest> CreateFeedbackRequestAsync(FeedbackRequest request);
    Task<FeedbackResponse> SubmitFeedbackResponseAsync(Guid requestId, FeedbackResponse response);
    Task<object> GetFeedbackSummaryAsync(Guid employeeId);
    Task<List<ContinuousFeedback>> GetContinuousFeedbackAsync(Guid employeeId);
    Task<ContinuousFeedback> SendContinuousFeedbackAsync(ContinuousFeedback feedback);
    Task<List<OneOnOneMeeting>> GetMeetingsAsync(Guid employeeId);
    Task<OneOnOneMeeting> CreateMeetingAsync(Guid employeeId, OneOnOneMeeting meeting);
    Task<List<MoodCheckin>> GetMoodCheckinsAsync(Guid employeeId, DateTime? date);
    Task<MoodCheckin> CreateMoodCheckinAsync(Guid employeeId, MoodCheckin checkin);
}

public class FeedbackService(ApplicationDbContext db, IHttpContextAccessor http) : IFeedbackService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<FeedbackRequest>> GetFeedbackRequestsAsync(Guid? requesteeId, Guid? reviewerId, string? status)
    {
        var q = db.FeedbackRequests.Include(r => r.Response).AsNoTracking()
            .Where(r => r.TenantId == TenantId && !r.IsDeleted);
        if (requesteeId.HasValue) q = q.Where(r => r.ToEmployeeId == requesteeId);
        if (reviewerId.HasValue) q = q.Where(r => r.FromEmployeeId == reviewerId);
        if (!string.IsNullOrEmpty(status)) q = q.Where(r => r.Status == status);
        return await q.OrderByDescending(r => r.CreatedAt).ToListAsync();
    }

    public async Task<FeedbackRequest> CreateFeedbackRequestAsync(FeedbackRequest request)
    {
        request.Id = Guid.NewGuid();
        request.TenantId = TenantId;
        request.CreatedBy = UserId.ToString();
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
        if (await db.FeedbackResponses.AnyAsync(r => r.FeedbackRequestId == requestId && !r.IsDeleted))
            throw new InvalidOperationException("Feedback already submitted");

        response.Id = Guid.NewGuid();
        response.TenantId = TenantId;
        response.FeedbackRequestId = requestId;
        response.CreatedBy = UserId.ToString();
        response.CreatedAt = DateTime.UtcNow;
        db.FeedbackResponses.Add(response);

        // Check if all responses collected
        var totalReviewers = await db.FeedbackRequests
            .CountAsync(r => r.ToEmployeeId == req.ToEmployeeId && r.ReviewCycleId == req.ReviewCycleId && !r.IsDeleted);
        var responsesCount = await db.FeedbackResponses
            .CountAsync(r => r.FeedbackRequestId == requestId && !r.IsDeleted);

        if (responsesCount + 1 >= totalReviewers)
            req.Status = "Completed";

        req.CompletedAt = DateTime.UtcNow;
        req.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return response;
    }

    public async Task<object> GetFeedbackSummaryAsync(Guid employeeId)
    {
        var responses = await db.FeedbackResponses.AsNoTracking()
            .Where(r => r.TenantId == TenantId && !r.IsDeleted &&
                        db.FeedbackRequests.Any(req => req.Id == r.FeedbackRequestId && req.ToEmployeeId == employeeId))
            .ToListAsync();

        return new
        {
            TotalResponses = responses.Count,
            AverageRating = responses.Any() ? Math.Round(responses.Average(r => (double)(r.OverallRating ?? 0)), 2) : 0,
            RecentStrengths = responses.Where(r => r.Strengths != null)
                .OrderByDescending(r => r.CreatedAt).Take(5).Select(r => r.Strengths)
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
        feedback.CreatedBy = UserId.ToString();
        feedback.CreatedAt = DateTime.UtcNow;
        feedback.SubmittedAt = DateTime.UtcNow;
        db.ContinuousFeedbacks.Add(feedback);
        await db.SaveChangesAsync();
        return feedback;
    }

    public async Task<List<OneOnOneMeeting>> GetMeetingsAsync(Guid employeeId)
    {
        return await db.OneOnOneMeetings.AsNoTracking()
            .Where(m => m.TenantId == TenantId && !m.IsDeleted && m.InitiatorEmployeeId == employeeId)
            .OrderByDescending(m => m.MeetingDate)
            .ToListAsync();
    }

    public async Task<OneOnOneMeeting> CreateMeetingAsync(Guid employeeId, OneOnOneMeeting meeting)
    {
        meeting.Id = Guid.NewGuid();
        meeting.TenantId = TenantId;
        meeting.InitiatorEmployeeId = employeeId;
        meeting.CreatedBy = UserId.ToString();
        meeting.CreatedAt = DateTime.UtcNow;
        db.OneOnOneMeetings.Add(meeting);
        await db.SaveChangesAsync();
        return meeting;
    }

    public async Task<List<MoodCheckin>> GetMoodCheckinsAsync(Guid employeeId, DateTime? date)
    {
        var q = db.MoodCheckins.AsNoTracking()
            .Where(c => c.TenantId == TenantId && !c.IsDeleted);
        if (date.HasValue)
            q = q.Where(c => c.CheckinDate.Date == date.Value.Date);
        return await q.OrderByDescending(c => c.CreatedAt).ToListAsync();
    }

    public async Task<MoodCheckin> CreateMoodCheckinAsync(Guid employeeId, MoodCheckin checkin)
    {
        var emp = await db.Employees.AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == employeeId && e.TenantId == TenantId);
        checkin.Id = Guid.NewGuid();
        checkin.TenantId = TenantId;
        checkin.EmployeeId = employeeId;
        checkin.EmployeeName = emp != null ? $"{emp.FirstName} {emp.LastName}" : "Employee";
        checkin.CheckinDate = DateTime.UtcNow;
        checkin.CreatedBy = UserId.ToString();
        checkin.CreatedAt = DateTime.UtcNow;
        db.MoodCheckins.Add(checkin);
        await db.SaveChangesAsync();
        return checkin;
    }
}

