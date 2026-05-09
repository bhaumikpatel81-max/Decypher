using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/performance")]
[Authorize]
public class PerformanceController(
    IGoalService goalService,
    IReviewCycleService reviewCycleService,
    IPerformanceReviewService performanceReviewService,
    IFeedbackService feedbackService) : ControllerBase
{
    // â”€â”€ Goals & OKRs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("goals")]
    public async Task<IActionResult> GetGoals(
        [FromQuery] Guid? employeeId, [FromQuery] string? status, [FromQuery] int? year, [FromQuery] int? quarter)
        => Ok(await goalService.GetGoalsAsync(employeeId, status, year, quarter));

    [HttpGet("goals/{id:guid}")]
    public async Task<IActionResult> GetGoal(Guid id)
    {
        try { return Ok(await goalService.GetGoalByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("goals/summary")]
    public async Task<IActionResult> GetOkrSummary([FromQuery] Guid? employeeId, [FromQuery] int? year)
        => Ok(await goalService.GetOkrSummaryAsync(employeeId, year));

    [HttpPost("goals")]
    public async Task<IActionResult> CreateGoal([FromBody] Goal goal)
        => Created(string.Empty, await goalService.CreateGoalAsync(goal));

    [HttpPut("goals/{id:guid}")]
    public async Task<IActionResult> UpdateGoal(Guid id, [FromBody] Goal goal)
    {
        try { return Ok(await goalService.UpdateGoalAsync(id, goal)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("goals/{id:guid}")]
    public async Task<IActionResult> DeleteGoal(Guid id)
    {
        try { await goalService.DeleteGoalAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("goals/{goalId:guid}/key-results")]
    public async Task<IActionResult> AddKeyResult(Guid goalId, [FromBody] KeyResult kr)
    {
        try { return Created(string.Empty, await goalService.AddKeyResultAsync(goalId, kr)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPatch("goals/key-results/{krId:guid}/progress")]
    public async Task<IActionResult> UpdateKeyResultProgress(Guid krId, [FromBody] KeyResultProgressRequest req)
    {
        try { return Ok(await goalService.UpdateKeyResultAsync(krId, req.Progress, req.Notes)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("goals/key-results/{krId:guid}")]
    public async Task<IActionResult> DeleteKeyResult(Guid krId)
    {
        try { await goalService.DeleteKeyResultAsync(krId); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // â”€â”€ Review Cycles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("cycles")]
    public async Task<IActionResult> GetCycles([FromQuery] bool activeOnly = false)
        => Ok(await reviewCycleService.GetCyclesAsync(activeOnly));

    [HttpGet("cycles/{id:guid}")]
    public async Task<IActionResult> GetCycle(Guid id)
    {
        try { return Ok(await reviewCycleService.GetCycleByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("cycles")]
    public async Task<IActionResult> CreateCycle([FromBody] ReviewCycle cycle)
        => Created(string.Empty, await reviewCycleService.CreateCycleAsync(cycle));

    [HttpPut("cycles/{id:guid}")]
    public async Task<IActionResult> UpdateCycle(Guid id, [FromBody] ReviewCycle cycle)
    {
        try { return Ok(await reviewCycleService.UpdateCycleAsync(id, cycle)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpDelete("cycles/{id:guid}")]
    public async Task<IActionResult> DeleteCycle(Guid id)
    {
        try { await reviewCycleService.DeleteCycleAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("cycles/{id:guid}/activate")]
    public async Task<IActionResult> ActivateCycle(Guid id)
    {
        try { return Ok(await reviewCycleService.ActivateCycleAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("cycles/{id:guid}/close")]
    public async Task<IActionResult> CloseCycle(Guid id)
    {
        try { return Ok(await reviewCycleService.CloseCycleAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // â”€â”€ Performance Reviews â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("reviews")]
    public async Task<IActionResult> GetReviews(
        [FromQuery] Guid? cycleId, [FromQuery] Guid? revieweeId, [FromQuery] Guid? reviewerId, [FromQuery] string? status)
        => Ok(await performanceReviewService.GetReviewsAsync(cycleId, revieweeId, reviewerId, status));

    [HttpGet("reviews/{id:guid}")]
    public async Task<IActionResult> GetReview(Guid id)
    {
        try { return Ok(await performanceReviewService.GetReviewByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("reviews/summary/{cycleId:guid}")]
    public async Task<IActionResult> GetReviewSummary(Guid cycleId)
        => Ok(await performanceReviewService.GetReviewSummaryAsync(cycleId));

    [HttpPost("cycles/{cycleId:guid}/initiate")]
    public async Task<IActionResult> InitiateReviews(Guid cycleId, [FromBody] List<Guid> employeeIds)
        => Ok(await performanceReviewService.InitiateCycleReviewsAsync(cycleId, employeeIds));

    [HttpPost("reviews/{id:guid}/submit")]
    public async Task<IActionResult> SubmitReview(Guid id, [FromBody] PerformanceReview form)
    {
        try { return Ok(await performanceReviewService.SubmitReviewAsync(id, form)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("reviews/{id:guid}/acknowledge")]
    public async Task<IActionResult> AcknowledgeReview(Guid id, [FromBody] AcknowledgeRequest req)
    {
        try { return Ok(await performanceReviewService.AcknowledgeReviewAsync(id, req.Comments)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // â”€â”€ 360Â° Feedback â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("feedback/requests")]
    public async Task<IActionResult> GetFeedbackRequests(
        [FromQuery] Guid? requesteeId, [FromQuery] Guid? reviewerId, [FromQuery] string? status)
        => Ok(await feedbackService.GetFeedbackRequestsAsync(requesteeId, reviewerId, status));

    [HttpPost("feedback/requests")]
    public async Task<IActionResult> CreateFeedbackRequest([FromBody] FeedbackRequest request)
        => Created(string.Empty, await feedbackService.CreateFeedbackRequestAsync(request));

    [HttpPost("feedback/requests/{requestId:guid}/respond")]
    public async Task<IActionResult> SubmitFeedbackResponse(Guid requestId, [FromBody] FeedbackResponse response)
    {
        try { return Ok(await feedbackService.SubmitFeedbackResponseAsync(requestId, response)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpGet("feedback/summary/{employeeId:guid}")]
    public async Task<IActionResult> GetFeedbackSummary(Guid employeeId)
        => Ok(await feedbackService.GetFeedbackSummaryAsync(employeeId));

    // â”€â”€ Continuous Feedback â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("continuous-feedback/{employeeId:guid}")]
    public async Task<IActionResult> GetContinuousFeedback(Guid employeeId)
        => Ok(await feedbackService.GetContinuousFeedbackAsync(employeeId));

    [HttpPost("continuous-feedback")]
    public async Task<IActionResult> SendContinuousFeedback([FromBody] ContinuousFeedback feedback)
        => Created(string.Empty, await feedbackService.SendContinuousFeedbackAsync(feedback));

    // â”€â”€ 1:1 Meetings â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("continuous-feedback/{employeeId:guid}/meetings")]
    public async Task<IActionResult> GetMeetings(Guid employeeId)
        => Ok(await feedbackService.GetMeetingsAsync(employeeId));

    [HttpPost("continuous-feedback/{employeeId:guid}/meetings")]
    public async Task<IActionResult> CreateMeeting(Guid employeeId, [FromBody] OneOnOneMeeting meeting)
        => Created(string.Empty, await feedbackService.CreateMeetingAsync(employeeId, meeting));

    // â”€â”€ Mood Check-ins â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("continuous-feedback/{employeeId:guid}/moods")]
    public async Task<IActionResult> GetMoodCheckins(Guid employeeId, [FromQuery] DateTime? date)
        => Ok(await feedbackService.GetMoodCheckinsAsync(employeeId, date));

    [HttpPost("continuous-feedback/{employeeId:guid}/moods")]
    public async Task<IActionResult> CreateMoodCheckin(Guid employeeId, [FromBody] MoodCheckin checkin)
        => Created(string.Empty, await feedbackService.CreateMoodCheckinAsync(employeeId, checkin));
}

// â”€â”€ Request DTOs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public record KeyResultProgressRequest(decimal Progress, string? Notes);
public record AcknowledgeRequest(string? Comments);

