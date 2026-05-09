using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Services;

// â”€â”€â”€ Employer Reviews â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public interface IEmployerReviewService
{
    Task<List<EmployerReview>> GetReviewsAsync(int? rating, string? status, string? search);
    Task<EmployerReview> GetReviewByIdAsync(Guid id);
    Task<EmployerReview> CreateReviewAsync(EmployerReview review);
    Task<EmployerReview> RespondToReviewAsync(Guid id, string response);
    Task<EmployerReview> UpdateStatusAsync(Guid id, string status);
    Task<object> GetReviewSummaryAsync();
}

public class EmployerReviewService(ApplicationDbContext db, IHttpContextAccessor http) : IEmployerReviewService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<EmployerReview>> GetReviewsAsync(int? rating, string? status, string? search)
    {
        var q = db.EmployerReviews.AsNoTracking().Where(r => r.TenantId == TenantId && !r.IsDeleted);
        if (rating.HasValue) q = q.Where(r => (int)r.Rating == rating);
        if (!string.IsNullOrEmpty(status)) q = q.Where(r => r.Status == status);
        if (!string.IsNullOrEmpty(search)) q = q.Where(r => (r.Pros != null && r.Pros.Contains(search)) || (r.Cons != null && r.Cons.Contains(search)) || (r.Advice != null && r.Advice.Contains(search)));
        return await q.OrderByDescending(r => r.ReviewDate).ToListAsync();
    }

    public async Task<EmployerReview> GetReviewByIdAsync(Guid id)
    {
        return await db.EmployerReviews.AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId && !r.IsDeleted)
            ?? throw new KeyNotFoundException("Review not found");
    }

    public async Task<EmployerReview> CreateReviewAsync(EmployerReview review)
    {
        review.Id = Guid.NewGuid();
        review.TenantId = TenantId;
        review.CreatedBy = UserId.ToString();
        review.CreatedAt = DateTime.UtcNow;
        review.ReviewDate = DateTime.UtcNow;
        review.Status = "Published";
        db.EmployerReviews.Add(review);
        await db.SaveChangesAsync();
        return review;
    }

    public async Task<EmployerReview> RespondToReviewAsync(Guid id, string response)
    {
        var review = await db.EmployerReviews.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId && !r.IsDeleted)
            ?? throw new KeyNotFoundException("Review not found");

        // EmployerResponse and ResponseDate don't exist on model; store response in Advice field
        review.Advice = response;
        review.UpdatedAt = DateTime.UtcNow;
        review.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return review;
    }

    public async Task<EmployerReview> UpdateStatusAsync(Guid id, string status)
    {
        var review = await db.EmployerReviews.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId && !r.IsDeleted)
            ?? throw new KeyNotFoundException("Review not found");

        review.Status = status;
        review.UpdatedAt = DateTime.UtcNow;
        review.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return review;
    }

    public async Task<object> GetReviewSummaryAsync()
    {
        var reviews = await db.EmployerReviews.AsNoTracking()
            .Where(r => r.TenantId == TenantId && !r.IsDeleted && r.Status == "Published")
            .ToListAsync();

        return new
        {
            TotalReviews = reviews.Count,
            AverageRating = reviews.Any() ? Math.Round(reviews.Average(r => (double)r.Rating), 2) : 0,
            RecommendPercent = reviews.Any()
                ? Math.Round((double)reviews.Count(r => r.RecommendToFriend) / reviews.Count * 100, 1) : 0,
            RatingDistribution = Enumerable.Range(1, 5).Select(star => new
            {
                Rating = star,
                Count = reviews.Count(r => (int)Math.Round((double)r.Rating) == star)
            }),
            RecentReviews = reviews.OrderByDescending(r => r.ReviewDate).Take(5)
                .Select(r => new { r.Id, r.Cons, r.Rating, r.ReviewDate, r.ReviewerRole })
        };
    }
}

// â”€â”€â”€ Talent Community â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public interface ITalentCommunityService
{
    Task<List<TalentCommunityMember>> GetMembersAsync(string? source, string? status, string? search);
    Task<TalentCommunityMember> GetMemberByIdAsync(Guid id);
    Task<TalentCommunityMember> AddMemberAsync(TalentCommunityMember member);
    Task<TalentCommunityMember> UpdateMemberAsync(Guid id, TalentCommunityMember updated);
    Task DeleteMemberAsync(Guid id);
    Task<object> GetPipelineStatsAsync();
}

public class TalentCommunityService(ApplicationDbContext db, IHttpContextAccessor http) : ITalentCommunityService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<TalentCommunityMember>> GetMembersAsync(string? source, string? status, string? search)
    {
        var q = db.TalentCommunityMembers.AsNoTracking().Where(m => m.TenantId == TenantId && !m.IsDeleted);
        if (!string.IsNullOrEmpty(source)) q = q.Where(m => m.Source == source);
        if (!string.IsNullOrEmpty(status)) q = q.Where(m => m.Status == status);
        if (!string.IsNullOrEmpty(search))
            q = q.Where(m => (m.FullName != null && m.FullName.Contains(search)) || m.Email.Contains(search) || (m.SkillsJson != null && m.SkillsJson.Contains(search)));
        return await q.OrderByDescending(m => m.JoinedAt).ToListAsync();
    }

    public async Task<TalentCommunityMember> GetMemberByIdAsync(Guid id)
    {
        return await db.TalentCommunityMembers.AsNoTracking()
            .FirstOrDefaultAsync(m => m.Id == id && m.TenantId == TenantId && !m.IsDeleted)
            ?? throw new KeyNotFoundException("Member not found");
    }

    public async Task<TalentCommunityMember> AddMemberAsync(TalentCommunityMember member)
    {
        if (await db.TalentCommunityMembers.AnyAsync(m => m.Email == member.Email && m.TenantId == TenantId && !m.IsDeleted))
            throw new InvalidOperationException("A member with this email already exists");

        member.Id = Guid.NewGuid();
        member.TenantId = TenantId;
        member.JoinedAt = DateTime.UtcNow;
        member.Status = "Active";
        member.CreatedBy = UserId.ToString();
        member.CreatedAt = DateTime.UtcNow;
        db.TalentCommunityMembers.Add(member);
        await db.SaveChangesAsync();
        return member;
    }

    public async Task<TalentCommunityMember> UpdateMemberAsync(Guid id, TalentCommunityMember updated)
    {
        var member = await db.TalentCommunityMembers.FirstOrDefaultAsync(m => m.Id == id && m.TenantId == TenantId && !m.IsDeleted)
            ?? throw new KeyNotFoundException("Member not found");

        member.FullName = updated.FullName;
        member.Phone = updated.Phone;
        member.CurrentRole = updated.CurrentRole;
        member.SkillsJson = updated.SkillsJson;
        member.Source = updated.Source;
        member.Status = updated.Status;
        member.UpdatedAt = DateTime.UtcNow;
        member.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return member;
    }

    public async Task DeleteMemberAsync(Guid id)
    {
        var member = await db.TalentCommunityMembers.FirstOrDefaultAsync(m => m.Id == id && m.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Member not found");
        member.IsDeleted = true;
        member.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<object> GetPipelineStatsAsync()
    {
        var members = await db.TalentCommunityMembers.AsNoTracking()
            .Where(m => m.TenantId == TenantId && !m.IsDeleted).ToListAsync();

        return new
        {
            Total = members.Count,
            Active = members.Count(m => m.Status == "Active"),
            BySource = members.GroupBy(m => m.Source)
                .Select(g => new { Source = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count),
            RecentJoins = members.Count(m => m.JoinedAt >= DateTime.UtcNow.AddDays(-30))
        };
    }
}

// â”€â”€â”€ Career Pages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public interface ICareerPageService
{
    Task<CareerPage?> GetCareerPageAsync();
    Task<CareerPage> SaveCareerPageAsync(CareerPage page);
}

public class CareerPageService(ApplicationDbContext db, IHttpContextAccessor http) : ICareerPageService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<CareerPage?> GetCareerPageAsync()
    {
        return await db.CareerPages.AsNoTracking()
            .FirstOrDefaultAsync(p => p.TenantId == TenantId && !p.IsDeleted);
    }

    public async Task<CareerPage> SaveCareerPageAsync(CareerPage page)
    {
        var existing = await db.CareerPages.FirstOrDefaultAsync(p => p.TenantId == TenantId && !p.IsDeleted);
        if (existing == null)
        {
            page.Id = Guid.NewGuid();
            page.TenantId = TenantId;
            page.CreatedBy = UserId.ToString();
            page.CreatedAt = DateTime.UtcNow;
            db.CareerPages.Add(page);
        }
        else
        {
            existing.Headline = page.Headline;
            existing.Description = page.Description;
            existing.LogoUrl = page.LogoUrl;
            existing.BannerUrl = page.BannerUrl;
            existing.ValuesJson = page.ValuesJson;
            existing.BenefitsJson = page.BenefitsJson;
            existing.ThemeColor = page.ThemeColor;
            existing.IsPublished = page.IsPublished;
            existing.PublishedSlug = page.PublishedSlug;
            existing.UpdatedAt = DateTime.UtcNow;
            existing.UpdatedBy = UserId.ToString();
        }
        await db.SaveChangesAsync();
        return existing ?? page;
    }
}

// â”€â”€â”€ Campus Events â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public interface ICampusService
{
    Task<List<CampusEvent>> GetEventsAsync(DateTime? from, DateTime? to, string? status);
    Task<CampusEvent> GetEventByIdAsync(Guid id);
    Task<CampusEvent> CreateEventAsync(CampusEvent campusEvent);
    Task<CampusEvent> UpdateEventAsync(Guid id, CampusEvent updated);
    Task DeleteEventAsync(Guid id);
    Task<CampusEvent> UpdateStatusAsync(Guid id, string status, int? hiresCount);
}

public class CampusService(ApplicationDbContext db, IHttpContextAccessor http) : ICampusService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<CampusEvent>> GetEventsAsync(DateTime? from, DateTime? to, string? status)
    {
        var q = db.CampusEvents.AsNoTracking().Where(e => e.TenantId == TenantId && !e.IsDeleted);
        if (from.HasValue) q = q.Where(e => e.EventDate >= from.Value);
        if (to.HasValue) q = q.Where(e => e.EventDate <= to.Value);
        if (!string.IsNullOrEmpty(status)) q = q.Where(e => e.Status == status);
        return await q.OrderByDescending(e => e.EventDate).ToListAsync();
    }

    public async Task<CampusEvent> GetEventByIdAsync(Guid id)
    {
        return await db.CampusEvents.AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id && e.TenantId == TenantId && !e.IsDeleted)
            ?? throw new KeyNotFoundException("Campus event not found");
    }

    public async Task<CampusEvent> CreateEventAsync(CampusEvent campusEvent)
    {
        campusEvent.Id = Guid.NewGuid();
        campusEvent.TenantId = TenantId;
        campusEvent.CreatedBy = UserId.ToString();
        campusEvent.CreatedAt = DateTime.UtcNow;
        campusEvent.Status = "Planned";
        db.CampusEvents.Add(campusEvent);
        await db.SaveChangesAsync();
        return campusEvent;
    }

    public async Task<CampusEvent> UpdateEventAsync(Guid id, CampusEvent updated)
    {
        var ev = await db.CampusEvents.FirstOrDefaultAsync(e => e.Id == id && e.TenantId == TenantId && !e.IsDeleted)
            ?? throw new KeyNotFoundException("Campus event not found");

        ev.Title = updated.Title;
        ev.Institution = updated.Institution;
        ev.Location = updated.Location;
        ev.EventDate = updated.EventDate;
        ev.EventType = updated.EventType;
        ev.ExpectedParticipants = updated.ExpectedParticipants;
        ev.Notes = updated.Notes;
        ev.Status = updated.Status;
        ev.UpdatedAt = DateTime.UtcNow;
        ev.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return ev;
    }

    public async Task DeleteEventAsync(Guid id)
    {
        var ev = await db.CampusEvents.FirstOrDefaultAsync(e => e.Id == id && e.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Campus event not found");
        ev.IsDeleted = true;
        ev.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<CampusEvent> UpdateStatusAsync(Guid id, string status, int? hiresCount)
    {
        var ev = await db.CampusEvents.FirstOrDefaultAsync(e => e.Id == id && e.TenantId == TenantId && !e.IsDeleted)
            ?? throw new KeyNotFoundException("Campus event not found");

        ev.Status = status;
        ev.UpdatedAt = DateTime.UtcNow;
        ev.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return ev;
    }
}

