using Decypher.Web.Data;
using Decypher.Web.Models;
using Decypher.Web.Models.HRModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/portal")]
[Authorize]
public class PortalController(ApplicationDbContext db) : ControllerBase
{
    private Guid TenantId => Guid.TryParse(
        User.FindFirst("TenantId")?.Value ?? User.FindFirst("tenantId")?.Value, out var tid) ? tid : Guid.Empty;

    // GET /api/portal/announcements
    [HttpGet("announcements")]
    public async Task<IActionResult> GetAnnouncements()
    {
        var now = DateTime.UtcNow;
        var items = await db.HRAnnouncements
            .Where(a => a.TenantId == TenantId && !a.IsDeleted && (a.ExpiresAt == null || a.ExpiresAt > now))
            .OrderByDescending(a => a.IsPinned)
            .ThenByDescending(a => a.PublishedAt)
            .Select(a => new
            {
                a.Id,
                a.Title,
                a.Body,
                a.Category,
                a.IsPinned,
                a.PublishedAt,
                a.ExpiresAt,
                a.AuthorName
            })
            .Take(50)
            .ToListAsync();
        return Ok(items);
    }

    // POST /api/portal/announcements
    [HttpPost("announcements")]
    public async Task<IActionResult> CreateAnnouncement([FromBody] HRAnnouncement ann)
    {
        ann.TenantId = TenantId;
        ann.AuthorId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        ann.AuthorName ??= User.FindFirst(ClaimTypes.Name)?.Value ?? "HR Admin";
        db.HRAnnouncements.Add(ann);
        await db.SaveChangesAsync();
        return Created(string.Empty, ann);
    }

    // PATCH /api/portal/announcements/{id}
    [HttpPatch("announcements/{id:guid}")]
    public async Task<IActionResult> UpdateAnnouncement(Guid id, [FromBody] AnnouncementPatch patch)
    {
        var ann = await db.HRAnnouncements.FirstOrDefaultAsync(a => a.Id == id && a.TenantId == TenantId && !a.IsDeleted);
        if (ann == null) return NotFound();
        if (patch.Title != null) ann.Title = patch.Title;
        if (patch.Body != null) ann.Body = patch.Body;
        if (patch.IsPinned.HasValue) ann.IsPinned = patch.IsPinned.Value;
        if (patch.ExpiresAt.HasValue) ann.ExpiresAt = patch.ExpiresAt.Value;
        await db.SaveChangesAsync();
        return Ok(ann);
    }

    // DELETE /api/portal/announcements/{id}
    [HttpDelete("announcements/{id:guid}")]
    public async Task<IActionResult> DeleteAnnouncement(Guid id)
    {
        var ann = await db.HRAnnouncements.FirstOrDefaultAsync(a => a.Id == id && a.TenantId == TenantId && !a.IsDeleted);
        if (ann == null) return NotFound();
        ann.IsDeleted = true;
        await db.SaveChangesAsync();
        return NoContent();
    }

    // POST /api/policies/{id}/acknowledge  (mounted here for portal use)
    [HttpPost("/api/policies/{id:guid}/acknowledge")]
    public async Task<IActionResult> AcknowledgePolicy(Guid id)
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value ?? User.FindFirst("email")?.Value;
        var emp = string.IsNullOrEmpty(email) ? null
            : await db.Employees.FirstOrDefaultAsync(e => e.Email == email && !e.IsDeleted);
        if (emp == null) return NotFound(new { message = "Employee profile not found." });

        var policy = await db.Policies.FirstOrDefaultAsync(p => p.Id == id && p.TenantId == TenantId && !p.IsDeleted);
        if (policy == null) return NotFound();

        var already = await db.PolicyAcknowledgments.AnyAsync(a => a.PolicyId == id && a.EmployeeId == emp.Id);
        if (already) return Ok(new { acknowledged = true });

        db.PolicyAcknowledgments.Add(new PolicyAcknowledgment
        {
            PolicyId = id,
            EmployeeId = emp.Id,
            AcknowledgedAt = DateTime.UtcNow,
            TenantId = TenantId
        });
        await db.SaveChangesAsync();
        return Ok(new { acknowledged = true });
    }
}

public record AnnouncementPatch(string? Title, string? Body, bool? IsPinned, DateTime? ExpiresAt);
