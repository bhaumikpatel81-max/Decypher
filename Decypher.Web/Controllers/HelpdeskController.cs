using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/helpdesk")]
[Authorize]
public class HelpdeskController(ApplicationDbContext db, IHttpContextAccessor http) : ControllerBase
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private string UserName => http.HttpContext!.User.FindFirst("name")?.Value ?? http.HttpContext.User.Identity?.Name ?? "Unknown";
    private string UserId => http.HttpContext!.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

    // ── Stats ─────────────────────────────────────────────────────────────────
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var tickets = await db.HelpdeskTickets.AsNoTracking()
            .Where(t => t.TenantId == TenantId && !t.IsDeleted)
            .ToListAsync();

        return Ok(new
        {
            Total = tickets.Count,
            Open = tickets.Count(t => t.Status == "Open"),
            InProgress = tickets.Count(t => t.Status == "InProgress"),
            Resolved = tickets.Count(t => t.Status == "Resolved" || t.Status == "Closed"),
            Critical = tickets.Count(t => t.Priority == "Critical"),
            AvgResolutionHours = tickets
                .Where(t => t.ResolvedAt.HasValue)
                .Select(t => (t.ResolvedAt!.Value - t.CreatedAt).TotalHours)
                .DefaultIfEmpty(0)
                .Average()
        });
    }

    // ── Tickets List ──────────────────────────────────────────────────────────
    [HttpGet("tickets")]
    public async Task<IActionResult> GetTickets(
        [FromQuery] string? status,
        [FromQuery] string? category,
        [FromQuery] string? priority,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50)
    {
        var q = db.HelpdeskTickets.AsNoTracking()
            .Where(t => t.TenantId == TenantId && !t.IsDeleted);

        if (!string.IsNullOrEmpty(status)) q = q.Where(t => t.Status == status);
        if (!string.IsNullOrEmpty(category)) q = q.Where(t => t.Category == category);
        if (!string.IsNullOrEmpty(priority)) q = q.Where(t => t.Priority == priority);
        if (!string.IsNullOrEmpty(search))
            q = q.Where(t => t.Title.Contains(search) || t.TicketNumber.Contains(search) || t.RequesterName.Contains(search));

        var total = await q.CountAsync();
        var tickets = await q.OrderByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize).Take(pageSize)
            .ToListAsync();

        return Ok(new { total, tickets });
    }

    // ── Ticket Detail ─────────────────────────────────────────────────────────
    [HttpGet("tickets/{id:guid}")]
    public async Task<IActionResult> GetTicket(Guid id)
    {
        var ticket = await db.HelpdeskTickets.AsNoTracking()
            .Include(t => t.Comments.Where(c => !c.IsDeleted))
            .Include(t => t.WorkflowSteps.Where(w => !w.IsDeleted))
            .FirstOrDefaultAsync(t => t.Id == id && t.TenantId == TenantId && !t.IsDeleted);

        if (ticket == null) return NotFound(new { message = "Ticket not found" });
        return Ok(ticket);
    }

    // ── Create Ticket ─────────────────────────────────────────────────────────
    [HttpPost("tickets")]
    public async Task<IActionResult> CreateTicket([FromBody] HelpdeskTicket ticket)
    {
        ticket.TenantId = TenantId;
        ticket.TicketNumber = $"TKT-{DateTime.UtcNow:yyyyMMdd}-{new Random().Next(1000, 9999)}";
        ticket.Status = "Open";
        ticket.CreatedAt = DateTime.UtcNow;

        db.HelpdeskTickets.Add(ticket);

        var step = new HelpdeskWorkflowStep
        {
            TenantId = TenantId,
            TicketId = ticket.Id,
            Action = "Created",
            ActorName = ticket.RequesterName,
            Notes = $"Ticket created: {ticket.Title}",
            Timestamp = DateTime.UtcNow
        };
        db.HelpdeskWorkflowSteps.Add(step);

        await db.SaveChangesAsync();
        return Created(string.Empty, ticket);
    }

    // ── Update Ticket ─────────────────────────────────────────────────────────
    [HttpPut("tickets/{id:guid}")]
    public async Task<IActionResult> UpdateTicket(Guid id, [FromBody] HelpdeskTicket update)
    {
        var ticket = await db.HelpdeskTickets.FirstOrDefaultAsync(t => t.Id == id && t.TenantId == TenantId && !t.IsDeleted);
        if (ticket == null) return NotFound(new { message = "Ticket not found" });

        ticket.Title = update.Title;
        ticket.Description = update.Description;
        ticket.Priority = update.Priority;
        ticket.Category = update.Category;
        ticket.SubCategory = update.SubCategory;

        await db.SaveChangesAsync();
        return Ok(ticket);
    }

    // ── Update Status / Assign ────────────────────────────────────────────────
    [HttpPatch("tickets/{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] HelpdeskStatusRequest req)
    {
        var ticket = await db.HelpdeskTickets.FirstOrDefaultAsync(t => t.Id == id && t.TenantId == TenantId && !t.IsDeleted);
        if (ticket == null) return NotFound(new { message = "Ticket not found" });

        var prevStatus = ticket.Status;
        ticket.Status = req.Status;
        if (!string.IsNullOrEmpty(req.AssigneeName)) { ticket.AssigneeName = req.AssigneeName; ticket.AssignedTeam = req.AssignedTeam; }
        if (req.Status == "Resolved" || req.Status == "Closed") { ticket.ResolvedAt = DateTime.UtcNow; ticket.Resolution = req.Resolution; }

        var step = new HelpdeskWorkflowStep
        {
            TenantId = TenantId,
            TicketId = id,
            Action = !string.IsNullOrEmpty(req.AssigneeName) && prevStatus == ticket.Status ? "Assigned" : "StatusChanged",
            ActorName = UserName,
            Notes = req.Notes ?? $"Status changed from {prevStatus} to {req.Status}",
            Timestamp = DateTime.UtcNow
        };
        db.HelpdeskWorkflowSteps.Add(step);

        await db.SaveChangesAsync();
        return Ok(ticket);
    }

    // ── Add Comment ───────────────────────────────────────────────────────────
    [HttpPost("tickets/{id:guid}/comments")]
    public async Task<IActionResult> AddComment(Guid id, [FromBody] HelpdeskTicketComment comment)
    {
        var ticket = await db.HelpdeskTickets.FirstOrDefaultAsync(t => t.Id == id && t.TenantId == TenantId && !t.IsDeleted);
        if (ticket == null) return NotFound(new { message = "Ticket not found" });

        comment.TenantId = TenantId;
        comment.TicketId = id;
        comment.AuthorId = UserId;
        if (string.IsNullOrEmpty(comment.AuthorName)) comment.AuthorName = UserName;
        comment.CreatedAt = DateTime.UtcNow;

        db.HelpdeskTicketComments.Add(comment);

        if (ticket.Status == "Open") { ticket.Status = "InProgress"; }

        await db.SaveChangesAsync();
        return Created(string.Empty, comment);
    }

    // ── Get Comments ──────────────────────────────────────────────────────────
    [HttpGet("tickets/{id:guid}/comments")]
    public async Task<IActionResult> GetComments(Guid id)
    {
        var comments = await db.HelpdeskTicketComments.AsNoTracking()
            .Where(c => c.TicketId == id && c.TenantId == TenantId && !c.IsDeleted)
            .OrderBy(c => c.CreatedAt)
            .ToListAsync();
        return Ok(comments);
    }

    // ── Rate Ticket ───────────────────────────────────────────────────────────
    [HttpPatch("tickets/{id:guid}/rate")]
    public async Task<IActionResult> RateTicket(Guid id, [FromBody] HelpdeskRateRequest req)
    {
        var ticket = await db.HelpdeskTickets.FirstOrDefaultAsync(t => t.Id == id && t.TenantId == TenantId);
        if (ticket == null) return NotFound(new { message = "Ticket not found" });
        ticket.SatisfactionRating = req.Rating;
        await db.SaveChangesAsync();
        return Ok(ticket);
    }
}

// ── Request DTOs ──────────────────────────────────────────────────────────────
public record HelpdeskStatusRequest(string Status, string? AssigneeName, string? AssignedTeam, string? Notes, string? Resolution);
public record HelpdeskRateRequest(int Rating);
