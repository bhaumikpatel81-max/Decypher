using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/learning")]
[Authorize]
public class LearningController(
    ILearningService learningService,
    ITrainingService trainingService,
    ISkillService skillService) : ControllerBase
{
    // â”€â”€ Courses / LMS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("courses")]
    public async Task<IActionResult> GetCourses(
        [FromQuery] string? category, [FromQuery] string? status, [FromQuery] string? search)
        => Ok(await learningService.GetCoursesAsync(category, status, search));

    [HttpGet("courses/{id:guid}")]
    public async Task<IActionResult> GetCourse(Guid id)
    {
        try { return Ok(await learningService.GetCourseByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("courses/stats")]
    public async Task<IActionResult> GetLmsStats() => Ok(await learningService.GetLmsStatsAsync());

    [HttpPost("courses")]
    public async Task<IActionResult> CreateCourse([FromBody] Course course)
        => Created(string.Empty, await learningService.CreateCourseAsync(course));

    [HttpPut("courses/{id:guid}")]
    public async Task<IActionResult> UpdateCourse(Guid id, [FromBody] Course course)
    {
        try { return Ok(await learningService.UpdateCourseAsync(id, course)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("courses/{id:guid}")]
    public async Task<IActionResult> DeleteCourse(Guid id)
    {
        try { await learningService.DeleteCourseAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // â”€â”€ Enrollments â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("enrollments")]
    public async Task<IActionResult> GetEnrollments(
        [FromQuery] Guid? employeeId, [FromQuery] Guid? courseId, [FromQuery] string? status)
        => Ok(await learningService.GetEnrollmentsAsync(employeeId, courseId, status));

    [HttpPost("courses/{courseId:guid}/enroll")]
    public async Task<IActionResult> Enroll(Guid courseId, [FromBody] EnrollRequest req)
    {
        try { return Created(string.Empty, await learningService.EnrollAsync(courseId, req.EmployeeId)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPatch("enrollments/{id:guid}/progress")]
    public async Task<IActionResult> UpdateProgress(Guid id, [FromBody] ProgressRequest req)
    {
        try { return Ok(await learningService.UpdateProgressAsync(id, req.ProgressPercent, req.LastModule)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("enrollments/{id:guid}/complete")]
    public async Task<IActionResult> Complete(Guid id, [FromBody] CompleteRequest req)
    {
        try { return Ok(await learningService.CompleteAsync(id, req.Score)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // â”€â”€ Training Events â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("training")]
    public async Task<IActionResult> GetTrainingEvents(
        [FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] string? mode)
        => Ok(await trainingService.GetEventsAsync(from, to, mode));

    [HttpGet("training/{id:guid}")]
    public async Task<IActionResult> GetTrainingEvent(Guid id)
    {
        try { return Ok(await trainingService.GetEventByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("training")]
    public async Task<IActionResult> CreateTrainingEvent([FromBody] TrainingEvent ev)
        => Created(string.Empty, await trainingService.CreateEventAsync(ev));

    [HttpPut("training/{id:guid}")]
    public async Task<IActionResult> UpdateTrainingEvent(Guid id, [FromBody] TrainingEvent ev)
    {
        try { return Ok(await trainingService.UpdateEventAsync(id, ev)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("training/{id:guid}")]
    public async Task<IActionResult> DeleteTrainingEvent(Guid id)
    {
        try { await trainingService.DeleteEventAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("training/registrations")]
    public async Task<IActionResult> GetRegistrations([FromQuery] Guid? eventId, [FromQuery] Guid? employeeId)
        => Ok(await trainingService.GetRegistrationsAsync(eventId, employeeId));

    [HttpPost("training/{eventId:guid}/register")]
    public async Task<IActionResult> Register(Guid eventId, [FromBody] EnrollRequest req)
    {
        try { return Created(string.Empty, await trainingService.RegisterAsync(eventId, req.EmployeeId)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPatch("training/registrations/{id:guid}/attendance")]
    public async Task<IActionResult> UpdateAttendance(Guid id, [FromBody] AttendanceRequest req)
    {
        try { return Ok(await trainingService.UpdateAttendanceAsync(id, req.Attended, req.Score)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // â”€â”€ Skills â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("skills")]
    public async Task<IActionResult> GetSkillAssessments(
        [FromQuery] Guid? employeeId, [FromQuery] string? skill, [FromQuery] string? department)
        => Ok(await skillService.GetAssessmentsAsync(employeeId, skill, department));

    [HttpPost("skills")]
    public async Task<IActionResult> SaveSkillAssessment([FromBody] SkillAssessment assessment)
        => Ok(await skillService.SaveAssessmentAsync(assessment));

    [HttpGet("skills/gap-analysis")]
    public async Task<IActionResult> GetSkillGapAnalysis([FromQuery] string? department, [FromQuery] string? role)
        => Ok(await skillService.GetSkillGapAnalysisAsync(department, role));

    // â”€â”€ Certifications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    [HttpGet("certifications")]
    public async Task<IActionResult> GetCertifications([FromQuery] Guid? employeeId, [FromQuery] bool? expiringSoon)
        => Ok(await skillService.GetCertificationsAsync(employeeId, expiringSoon));

    [HttpPost("certifications")]
    public async Task<IActionResult> AddCertification([FromBody] CertificationRecord cert)
        => Created(string.Empty, await skillService.AddCertificationAsync(cert));

    [HttpPut("certifications/{id:guid}")]
    public async Task<IActionResult> UpdateCertification(Guid id, [FromBody] CertificationRecord cert)
    {
        try { return Ok(await skillService.UpdateCertificationAsync(id, cert)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("certifications/{id:guid}")]
    public async Task<IActionResult> DeleteCertification(Guid id)
    {
        try { await skillService.DeleteCertificationAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }
}

// â”€â”€ Request DTOs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public record EnrollRequest(Guid EmployeeId);
public record ProgressRequest(int ProgressPercent, string? LastModule);
public record CompleteRequest(decimal? Score);
public record AttendanceRequest(bool Attended, decimal? Score);

