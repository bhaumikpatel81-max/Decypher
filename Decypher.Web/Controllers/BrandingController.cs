using Decypher.Web.Models.HRModels;
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
    // ── Employer Reviews ──────────────────────────────────────────────────────
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

    // ── Talent Community ──────────────────────────────────────────────────────
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

    // ── Career Page ───────────────────────────────────────────────────────────
    [HttpGet("career-page")]
    public async Task<IActionResult> GetCareerPage()
        => Ok(await careerPageService.GetCareerPageAsync());

    [HttpPost("career-page")]
    public async Task<IActionResult> SaveCareerPage([FromBody] CareerPage page)
        => Ok(await careerPageService.SaveCareerPageAsync(page));

    // ── Campus Events ─────────────────────────────────────────────────────────
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
}

// ── Request DTOs ──────────────────────────────────────────────────────────────
public record RespondRequest(string Response);
public record StatusRequest(string Status);
public record CampusStatusRequest(string Status, int? HiresCount);
