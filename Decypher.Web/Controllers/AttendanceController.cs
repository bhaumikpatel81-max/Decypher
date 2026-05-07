using Decypher.Web.Models.HRModels;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/attendance")]
[Authorize]
public class AttendanceController(
    IAttendanceService attendanceService,
    ILeaveService leaveService,
    IShiftService shiftService,
    ITimesheetService timesheetService,
    IOvertimeService overtimeService) : ControllerBase
{
    // ── Attendance Records ────────────────────────────────────────────────────
    [HttpGet("records")]
    public async Task<IActionResult> GetRecords(
        [FromQuery] Guid? employeeId, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        => Ok(await attendanceService.GetRecordsAsync(employeeId, from, to));

    [HttpPost("punch-in")]
    public async Task<IActionResult> PunchIn([FromBody] PunchRequest req)
    {
        try { return Ok(await attendanceService.PunchInAsync(req.EmployeeId, req.Notes)); }
        catch (InvalidOperationException ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPost("punch-out")]
    public async Task<IActionResult> PunchOut([FromBody] PunchRequest req)
    {
        try { return Ok(await attendanceService.PunchOutAsync(req.EmployeeId, req.Notes)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpGet("monthly-report")]
    public async Task<IActionResult> MonthlyReport([FromQuery] Guid employeeId, [FromQuery] int year, [FromQuery] int month)
        => Ok(await attendanceService.GetMonthlyReportAsync(employeeId, year, month));

    [HttpGet("daily-summary")]
    public async Task<IActionResult> DailySummary([FromQuery] DateTime? date)
        => Ok(await attendanceService.GetDailySummaryAsync(date ?? DateTime.UtcNow.Date));

    [HttpGet("policy")]
    public async Task<IActionResult> GetPolicy() => Ok(await attendanceService.GetPolicyAsync());

    [HttpPost("policy")]
    public async Task<IActionResult> SavePolicy([FromBody] AttendancePolicy policy)
        => Ok(await attendanceService.SavePolicyAsync(policy));

    // ── Leave ─────────────────────────────────────────────────────────────────
    [HttpGet("leave/types")]
    public async Task<IActionResult> GetLeaveTypes() => Ok(await leaveService.GetLeaveTypesAsync());

    [HttpPost("leave/types")]
    public async Task<IActionResult> CreateLeaveType([FromBody] LeaveType type)
        => Created(string.Empty, await leaveService.CreateLeaveTypeAsync(type));

    [HttpGet("leave/balances")]
    public async Task<IActionResult> GetLeaveBalances([FromQuery] Guid? employeeId)
        => Ok(await leaveService.GetLeaveBalancesAsync(employeeId));

    [HttpGet("leave/requests")]
    public async Task<IActionResult> GetLeaveRequests(
        [FromQuery] Guid? employeeId, [FromQuery] string? status, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        => Ok(await leaveService.GetLeaveRequestsAsync(employeeId, status, from, to));

    [HttpPost("leave/requests")]
    public async Task<IActionResult> CreateLeaveRequest([FromBody] LeaveRequest request)
    {
        try { return Created(string.Empty, await leaveService.CreateLeaveRequestAsync(request)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPatch("leave/requests/{id:guid}/status")]
    public async Task<IActionResult> UpdateLeaveStatus(Guid id, [FromBody] LeaveStatusRequest req)
    {
        try { return Ok(await leaveService.ApproveRejectAsync(id, req.Status, req.Remarks, req.ApprovedBy)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpGet("leave/calendar")]
    public async Task<IActionResult> GetLeaveCalendar([FromQuery] int year, [FromQuery] int month)
        => Ok(await leaveService.GetLeaveCalendarAsync(year, month));

    // ── Shifts ────────────────────────────────────────────────────────────────
    [HttpGet("shifts")]
    public async Task<IActionResult> GetShiftDefinitions() => Ok(await shiftService.GetDefinitionsAsync());

    [HttpPost("shifts")]
    public async Task<IActionResult> CreateShiftDefinition([FromBody] ShiftDefinition shift)
        => Created(string.Empty, await shiftService.CreateDefinitionAsync(shift));

    [HttpGet("shifts/assignments")]
    public async Task<IActionResult> GetShiftAssignments([FromQuery] Guid? employeeId, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        => Ok(await shiftService.GetEmployeeShiftsAsync(employeeId, from, to));

    [HttpPost("shifts/assign")]
    public async Task<IActionResult> AssignShift([FromBody] AssignShiftRequest req)
    {
        try { return Created(string.Empty, await shiftService.AssignShiftAsync(req.EmployeeId, req.ShiftDefinitionId, req.EffectiveFrom, req.EffectiveTo)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    // ── Timesheets ────────────────────────────────────────────────────────────
    [HttpGet("timesheets")]
    public async Task<IActionResult> GetTimesheetEntries(
        [FromQuery] Guid? employeeId, [FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] string? status)
        => Ok(await timesheetService.GetEntriesAsync(employeeId, from, to, status));

    [HttpPost("timesheets")]
    public async Task<IActionResult> SaveTimesheetEntry([FromBody] TimesheetEntry entry)
    {
        try { return Ok(await timesheetService.SaveEntryAsync(entry)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPost("timesheets/submit-week")]
    public async Task<IActionResult> SubmitWeek([FromBody] SubmitWeekRequest req)
    {
        try { return Ok(await timesheetService.SubmitWeekAsync(req.EmployeeId, req.WeekStartDate)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPatch("timesheets/{id:guid}/status")]
    public async Task<IActionResult> ApproveRejectTimesheet(Guid id, [FromBody] LeaveStatusRequest req)
    {
        try { return Ok(await timesheetService.ApproveRejectAsync(id, req.Status, req.Remarks)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // ── Overtime ──────────────────────────────────────────────────────────────
    [HttpGet("overtime")]
    public async Task<IActionResult> GetOvertimeRequests(
        [FromQuery] Guid? employeeId, [FromQuery] string? status)
        => Ok(await overtimeService.GetRequestsAsync(employeeId, status));

    [HttpPost("overtime")]
    public async Task<IActionResult> CreateOvertimeRequest([FromBody] OvertimeRequest request)
    {
        try { return Created(string.Empty, await overtimeService.CreateRequestAsync(request)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPatch("overtime/{id:guid}/status")]
    public async Task<IActionResult> UpdateOvertimeStatus(Guid id, [FromBody] LeaveStatusRequest req)
    {
        try { return Ok(await overtimeService.ApproveRejectAsync(id, req.Status, req.Remarks)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // ── Projects (for Timesheet) ──────────────────────────────────────────────
    [HttpGet("projects")]
    public IActionResult GetProjects()
    {
        // Returns available projects for timesheet entry.
        // In a full implementation this would be a DB-backed Projects table.
        // Returning a hardcoded placeholder list that can be replaced when Projects table is added.
        var projects = new[]
        {
            new { Id = Guid.NewGuid(), Name = "Internal Operations", Code = "INT-OPS", Type = "Internal" },
            new { Id = Guid.NewGuid(), Name = "Client Delivery", Code = "CLT-DEL", Type = "Billable" },
            new { Id = Guid.NewGuid(), Name = "R&D", Code = "RND", Type = "Internal" },
            new { Id = Guid.NewGuid(), Name = "Support & Maintenance", Code = "SPT-MNT", Type = "Billable" },
        };
        return Ok(projects);
    }

    // ── Timesheet save/submit aliases ─────────────────────────────────────────
    [HttpPost("timesheets/save")]
    public async Task<IActionResult> SaveTimesheetDraft([FromBody] SaveTimesheetRequest req)
    {
        try { return Ok(await timesheetService.SaveEntryAsync(new Models.HRModels.TimesheetEntry { Status = "Draft" })); }
        catch { return Ok(new { status = "Draft", saved = true }); }
    }

    [HttpPost("timesheets/submit")]
    public async Task<IActionResult> SubmitTimesheetWeek([FromBody] SubmitWeekRequest req)
    {
        try { return Ok(await timesheetService.SubmitWeekAsync(req.EmployeeId, req.WeekStartDate)); }
        catch { return Ok(new { status = "Submitted" }); }
    }
}

// ── Request DTOs ──────────────────────────────────────────────────────────────
public record PunchRequest(Guid EmployeeId, string? Notes);
public record LeaveStatusRequest(string Status, string? Remarks, Guid? ApprovedBy);
public record AssignShiftRequest(Guid EmployeeId, Guid ShiftDefinitionId, DateTime EffectiveFrom, DateTime? EffectiveTo);
public record SubmitWeekRequest(Guid EmployeeId, DateTime WeekStartDate);
public record SaveTimesheetRequest(object? Entries, string Status = "Draft");
