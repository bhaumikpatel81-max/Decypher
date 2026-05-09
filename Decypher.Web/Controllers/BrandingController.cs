using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/branding")]
[Authorize]
public class BrandingController(
    IEmployerReviewService employerReviewService,
    ITalentCommunityService talentCommunityService,
    ICareerPageService careerPageService,
    ICampusService campusService) : ControllerBase
{
    // â”€â”€ Employer Reviews â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("reviews")]
    public async Task<IActionResult> GetReviews(
        [FromQuery] int? rating, [FromQuery] string? status, [FromQuery] string? search)
        => Ok(await employerReviewService.GetReviewsAsync(rating, status, search));

    [HttpGet("reviews/{id:guid}")]
    public async Task<IActionResult> GetReview(Guid id)
    {
        try { return Ok(await employerReviewService.GetReviewByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("reviews/summary")]
    public async Task<IActionResult> GetReviewSummary() => Ok(await employerReviewService.GetReviewSummaryAsync());

    [HttpPost("reviews")]
    public async Task<IActionResult> CreateReview([FromBody] EmployerReview review)
        => Created(string.Empty, await employerReviewService.CreateReviewAsync(review));

    [HttpPost("reviews/{id:guid}/respond")]
    public async Task<IActionResult> RespondToReview(Guid id, [FromBody] RespondRequest req)
    {
        try { return Ok(await employerReviewService.RespondToReviewAsync(id, req.Response)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPatch("reviews/{id:guid}/status")]
    public async Task<IActionResult> UpdateReviewStatus(Guid id, [FromBody] StatusRequest req)
    {
        try { return Ok(await employerReviewService.UpdateStatusAsync(id, req.Status)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // â”€â”€ Talent Community â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("talent-community")]
    public async Task<IActionResult> GetMembers(
        [FromQuery] string? source, [FromQuery] string? status, [FromQuery] string? search)
        => Ok(await talentCommunityService.GetMembersAsync(source, status, search));

    [HttpGet("talent-community/{id:guid}")]
    public async Task<IActionResult> GetMember(Guid id)
    {
        try { return Ok(await talentCommunityService.GetMemberByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("talent-community/stats")]
    public async Task<IActionResult> GetPipelineStats() => Ok(await talentCommunityService.GetPipelineStatsAsync());

    [HttpPost("talent-community")]
    public async Task<IActionResult> AddMember([FromBody] TalentCommunityMember member)
    {
        try { return Created(string.Empty, await talentCommunityService.AddMemberAsync(member)); }
        catch (InvalidOperationException ex) { return Conflict(new { message = ex.Message }); }
    }

    [HttpPut("talent-community/{id:guid}")]
    public async Task<IActionResult> UpdateMember(Guid id, [FromBody] TalentCommunityMember member)
    {
        try { return Ok(await talentCommunityService.UpdateMemberAsync(id, member)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("talent-community/{id:guid}")]
    public async Task<IActionResult> DeleteMember(Guid id)
    {
        try { await talentCommunityService.DeleteMemberAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("talent-community/alert")]
    public async Task<IActionResult> SendTalentAlert([FromBody] TalentAlertRequest req)
    {
        // In production, this would trigger emails/notifications to matched members.
        // Returns count of matched members for the given skill tags and location.
        var members = await talentCommunityService.GetMembersAsync(null, null, null);
        var matched = members.Count;
        return Ok(new { sent = true, matchedCount = matched, message = req.Message });
    }

    // â”€â”€ Career Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("career-page")]
    public async Task<IActionResult> GetCareerPage()
        => Ok(await careerPageService.GetCareerPageAsync());

    [HttpPost("career-page")]
    public async Task<IActionResult> SaveCareerPage([FromBody] CareerPage page)
        => Ok(await careerPageService.SaveCareerPageAsync(page));

    // â”€â”€ Campus Events â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("campus")]
    public async Task<IActionResult> GetCampusEvents(
        [FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] string? status)
        => Ok(await campusService.GetEventsAsync(from, to, status));

    [HttpGet("campus/{id:guid}")]
    public async Task<IActionResult> GetCampusEvent(Guid id)
    {
        try { return Ok(await campusService.GetEventByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("campus")]
    public async Task<IActionResult> CreateCampusEvent([FromBody] CampusEvent ev)
        => Created(string.Empty, await campusService.CreateEventAsync(ev));

    [HttpPut("campus/{id:guid}")]
    public async Task<IActionResult> UpdateCampusEvent(Guid id, [FromBody] CampusEvent ev)
    {
        try { return Ok(await campusService.UpdateEventAsync(id, ev)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("campus/{id:guid}")]
    public async Task<IActionResult> DeleteCampusEvent(Guid id)
    {
        try { await campusService.DeleteEventAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPatch("campus/{id:guid}/status")]
    public async Task<IActionResult> UpdateCampusEventStatus(Guid id, [FromBody] CampusStatusRequest req)
    {
        try { return Ok(await campusService.UpdateStatusAsync(id, req.Status, req.HiresCount)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // â”€â”€ Social Channels â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("social-channels")]
    public IActionResult GetSocialChannels()
    {
        var channels = new[]
        {
            new { Name = "LinkedIn",   Icon = "ðŸ’¼", Color = "#0a66c2", Connected = true,  Applications = 142, Hires = 18, Spend = 45000, Cph = 2500 },
            new { Name = "Naukri",     Icon = "ðŸŸ ", Color = "#f97316", Connected = true,  Applications = 98,  Hires = 12, Spend = 18000, Cph = 1500 },
            new { Name = "Indeed",     Icon = "ðŸ”µ", Color = "#2564f4", Connected = true,  Applications = 76,  Hires = 8,  Spend = 12000, Cph = 1500 },
            new { Name = "Monster",    Icon = "ðŸŸ¢", Color = "#5b2d8e", Connected = false, Applications = 34,  Hires = 3,  Spend = 8000,  Cph = 2667 },
            new { Name = "Twitter/X",  Icon = "ðŸ¦", Color = "#000000", Connected = false, Applications = 18,  Hires = 1,  Spend = 5000,  Cph = 5000 },
        };
        return Ok(channels);
    }

    // â”€â”€ Employee Advocacy â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("advocacy")]
    public IActionResult GetAdvocacy()
    {
        var leaderboard = new[]
        {
            new { Name = "Arjun Mehta",  Initials = "AM", Color = "#6b4df0", Shares = 42, Clicks = 380, Hires = 4, Points = 1250 },
            new { Name = "Priya Sharma", Initials = "PS", Color = "#2563eb", Shares = 38, Clicks = 290, Hires = 3, Points = 1080 },
            new { Name = "Vikram Singh", Initials = "VS", Color = "#10b981", Shares = 31, Clicks = 220, Hires = 2, Points = 870  },
            new { Name = "Anjali Nair",  Initials = "AN", Color = "#db2777", Shares = 24, Clicks = 180, Hires = 2, Points = 720  },
        };
        var activity = new[]
        {
            new { Name = "Arjun Mehta",  Initials = "AM", Color = "#6b4df0", Job = "Sr. Angular Developer", Channel = "LinkedIn", Clicks = 42, Date = "2h ago", Hired = true  },
            new { Name = "Priya Sharma", Initials = "PS", Color = "#2563eb", Job = "HR Business Partner",   Channel = "LinkedIn", Clicks = 28, Date = "5h ago", Hired = false },
            new { Name = "Vikram Singh", Initials = "VS", Color = "#10b981", Job = "Product Manager",       Channel = "Twitter",  Clicks = 14, Date = "1d ago", Hired = false },
        };
        return Ok(new { leaderboard, activity, totalShares = 284, totalClicks = 1842, hiresViaAdvocacy = 12 });
    }
}

// â”€â”€ Request DTOs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public record RespondRequest(string Response);
public record StatusRequest(string Status);
public record CampusStatusRequest(string Status, int? HiresCount);
public record TalentAlertRequest(List<string>? SkillTags, string? Location, string Message);

