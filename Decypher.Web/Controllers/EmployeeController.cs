using Decypher.Web.Data;
using Decypher.Web.Models.HRModels;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/employees")]
[Authorize]
public class EmployeeController(
    IEmployeeService employeeService,
    IDocumentService documentService,
    ILetterService letterService,
    IExitService exitService,
    ApplicationDbContext db) : ControllerBase
{
    // ── Employees ────────────────────────────────────────────────────────────
    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value
                 ?? User.FindFirst("email")?.Value
                 ?? User.Identity?.Name;
        if (string.IsNullOrEmpty(email)) return Unauthorized();
        var emp = await db.Employees.FirstOrDefaultAsync(e => e.Email == email && !e.IsDeleted);
        if (emp == null) return NotFound(new { message = "Employee profile not found." });
        return Ok(emp);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? department, [FromQuery] string? status, [FromQuery] string? search)
        => Ok(await employeeService.GetAllAsync(department, status, search));

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        try { return Ok(await employeeService.GetByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary() => Ok(await employeeService.GetSummaryAsync());

    [HttpGet("org-chart")]
    public async Task<IActionResult> GetOrgChart() => Ok(await employeeService.GetOrgChartAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Employee employee)
    {
        try
        {
            var created = await employeeService.CreateAsync(employee);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Employee employee)
    {
        try { return Ok(await employeeService.UpdateAsync(id, employee)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try { await employeeService.DeleteAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // ── Documents ────────────────────────────────────────────────────────────
    [HttpGet("{entityId:guid}/documents")]
    public async Task<IActionResult> GetDocuments(Guid entityId, [FromQuery] string entityType = "Employee")
        => Ok(await documentService.GetForEntityAsync(entityId, entityType));

    [HttpPost("{entityId:guid}/documents")]
    public async Task<IActionResult> AddDocument(Guid entityId, [FromBody] Document doc)
    {
        doc.EntityId = entityId;
        var created = await documentService.CreateAsync(doc);
        return Created(string.Empty, created);
    }

    [HttpDelete("documents/{id:guid}")]
    public async Task<IActionResult> DeleteDocument(Guid id)
    {
        try { await documentService.DeleteAsync(id); return NoContent(); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // ── Letter Templates ──────────────────────────────────────────────────────
    [HttpGet("letter-templates")]
    public async Task<IActionResult> GetTemplates() => Ok(await letterService.GetTemplatesAsync());

    [HttpPost("letter-templates")]
    public async Task<IActionResult> CreateTemplate([FromBody] LetterTemplate template)
        => Created(string.Empty, await letterService.CreateTemplateAsync(template));

    [HttpGet("{employeeId:guid}/letters")]
    public async Task<IActionResult> GetIssuedLetters(Guid employeeId)
        => Ok(await letterService.GetIssuedLettersAsync(employeeId));

    [HttpPost("{employeeId:guid}/letters")]
    public async Task<IActionResult> IssueLetterToEmployee(Guid employeeId, [FromBody] IssueLetter request)
    {
        try
        {
            var letter = await letterService.IssueLetterAsync(request.TemplateId, employeeId, request.IssuedBy);
            return Created(string.Empty, letter);
        }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpGet("letters/{id:guid}/download")]
    public async Task<IActionResult> DownloadLetter(Guid id)
    {
        var letter = await db.IssuedLetters
            .Include(l => l.Template)
            .FirstOrDefaultAsync(l => l.Id == id && !l.IsDeleted);
        if (letter == null) return NotFound();
        var content = $"OFFICIAL LETTER\n\nType: {letter.Template?.Name ?? "Letter"}\nEmployee ID: {letter.EmployeeId}\nIssued By: {letter.IssuedById ?? "HR"}\nDate: {letter.IssuedAt:dd MMMM yyyy}\n\n{letter.CustomContent ?? letter.Template?.Content ?? "(No content)"}";
        var bytes = System.Text.Encoding.UTF8.GetBytes(content);
        return File(bytes, "application/octet-stream", $"letter_{id}.txt");
    }

    // ── Exit Management ───────────────────────────────────────────────────────
    [HttpGet("exits")]
    public async Task<IActionResult> GetExits([FromQuery] string? status)
        => Ok(await exitService.GetAllAsync(status));

    [HttpGet("exits/{id:guid}")]
    public async Task<IActionResult> GetExit(Guid id)
    {
        try { return Ok(await exitService.GetByIdAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("exits")]
    public async Task<IActionResult> CreateExit([FromBody] ExitRequest exit)
        => Created(string.Empty, await exitService.CreateAsync(exit));

    [HttpPatch("exits/{id:guid}/status")]
    public async Task<IActionResult> UpdateExitStatus(Guid id, [FromBody] UpdateStatusRequest req)
    {
        try { return Ok(await exitService.UpdateStatusAsync(id, req.Status)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPatch("exits/checklist/{itemId:guid}")]
    public async Task<IActionResult> UpdateChecklist(Guid itemId, [FromBody] UpdateChecklistRequest req)
    {
        try { return Ok(await exitService.UpdateChecklistItemAsync(itemId, req.IsCompleted, req.Notes)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }
}

// ── Request DTOs ──────────────────────────────────────────────────────────────
public record IssueLetter(Guid TemplateId, string IssuedBy);
public record UpdateStatusRequest(string Status);
public record UpdateChecklistRequest(bool IsCompleted, string? Notes);
