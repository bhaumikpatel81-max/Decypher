using Decypher.Web.Models.HRModels;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/hr-compliance")]
[Authorize]
public class HRComplianceController(
    IPolicyService policyService,
    IStatutoryService statutoryService,
    IIntegrationService integrationService) : ControllerBase
{
    // ── Policies ──────────────────────────────────────────────────────────────
    [HttpGet("policies")]
    public async Task<IActionResult> GetPolicies(
        [FromQuery] string? category, [FromQuery] string? status, [FromQuery] string? search)
        => Ok(await policyService.GetPoliciesAsync(category, status, search));

    [HttpGet("policies/{id:guid}")]
    public async Task<IActionResult> GetPolicy(Guid id)
    {
        try { return Ok(await policyService.GetPolicyByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("policies")]
    public async Task<IActionResult> CreatePolicy([FromBody] Policy policy)
        => Created(string.Empty, await policyService.CreatePolicyAsync(policy));

    [HttpPut("policies/{id:guid}")]
    public async Task<IActionResult> UpdatePolicy(Guid id, [FromBody] Policy policy)
    {
        try { return Ok(await policyService.UpdatePolicyAsync(id, policy)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("policies/{id:guid}")]
    public async Task<IActionResult> DeletePolicy(Guid id)
    {
        try { await policyService.DeletePolicyAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("policies/{id:guid}/publish")]
    public async Task<IActionResult> PublishPolicy(Guid id)
    {
        try { return Ok(await policyService.PublishPolicyAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("policies/{policyId:guid}/acknowledge")]
    public async Task<IActionResult> AcknowledgePolicy(Guid policyId, [FromBody] AcknowledgePolicyRequest req)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        try { return Ok(await policyService.AcknowledgePolicyAsync(policyId, req.EmployeeId, ipAddress)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("policies/{policyId:guid}/acknowledgments")]
    public async Task<IActionResult> GetAcknowledgments(Guid policyId)
        => Ok(await policyService.GetAcknowledgmentsAsync(policyId));

    [HttpGet("policies/{policyId:guid}/compliance")]
    public async Task<IActionResult> GetPolicyCompliance(Guid policyId)
    {
        try { return Ok(await policyService.GetComplianceStatusAsync(policyId)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // ── Statutory Filings ─────────────────────────────────────────────────────
    [HttpGet("statutory")]
    public async Task<IActionResult> GetFilings(
        [FromQuery] string? filingType, [FromQuery] string? status, [FromQuery] int? year)
        => Ok(await statutoryService.GetFilingsAsync(filingType, status, year));

    [HttpGet("statutory/{id:guid}")]
    public async Task<IActionResult> GetFiling(Guid id)
    {
        try { return Ok(await statutoryService.GetFilingByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("statutory/calendar/{year:int}")]
    public async Task<IActionResult> GetComplianceCalendar(int year)
        => Ok(await statutoryService.GetComplianceCalendarAsync(year));

    [HttpPost("statutory")]
    public async Task<IActionResult> CreateFiling([FromBody] StatutoryFiling filing)
        => Created(string.Empty, await statutoryService.CreateFilingAsync(filing));

    [HttpPatch("statutory/{id:guid}/status")]
    public async Task<IActionResult> UpdateFilingStatus(Guid id, [FromBody] FilingUpdateRequest req)
    {
        try { return Ok(await statutoryService.UpdateFilingStatusAsync(id, req.Status, req.FiledOn, req.AcknowledgmentNumber)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("statutory/{id:guid}")]
    public async Task<IActionResult> DeleteFiling(Guid id)
    {
        try { await statutoryService.DeleteFilingAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // ── Integrations ──────────────────────────────────────────────────────────
    [HttpGet("integrations")]
    public async Task<IActionResult> GetIntegrations([FromQuery] string? category, [FromQuery] string? status)
        => Ok(await integrationService.GetIntegrationsAsync(category, status));

    [HttpGet("integrations/{id:guid}")]
    public async Task<IActionResult> GetIntegration(Guid id)
    {
        try { return Ok(await integrationService.GetIntegrationByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("integrations")]
    public async Task<IActionResult> CreateIntegration([FromBody] Integration integration)
        => Created(string.Empty, await integrationService.CreateIntegrationAsync(integration));

    [HttpPut("integrations/{id:guid}")]
    public async Task<IActionResult> UpdateIntegration(Guid id, [FromBody] Integration integration)
    {
        try { return Ok(await integrationService.UpdateIntegrationAsync(id, integration)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("integrations/{id:guid}")]
    public async Task<IActionResult> DeleteIntegration(Guid id)
    {
        try { await integrationService.DeleteIntegrationAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPatch("integrations/{id:guid}/toggle")]
    public async Task<IActionResult> ToggleIntegration(Guid id, [FromBody] ToggleRequest req)
    {
        try { return Ok(await integrationService.ToggleIntegrationAsync(id, req.Enabled)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("integrations/{id:guid}/sync")]
    public async Task<IActionResult> SyncIntegration(Guid id)
    {
        try { return Ok(await integrationService.SyncIntegrationAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }
}

// ── Request DTOs ──────────────────────────────────────────────────────────────
public record AcknowledgePolicyRequest(Guid EmployeeId);
public record FilingUpdateRequest(string Status, DateTime? FiledOn, string? AcknowledgmentNumber);
public record ToggleRequest(bool Enabled);
