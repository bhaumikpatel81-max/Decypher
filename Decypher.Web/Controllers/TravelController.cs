using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/travel")]
[Authorize]
public class TravelController(ApplicationDbContext db, IHttpContextAccessor http) : ControllerBase
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private string UserName => http.HttpContext!.User.FindFirst("name")?.Value ?? http.HttpContext.User.Identity?.Name ?? "Unknown";
    private string UserId => http.HttpContext!.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

    // ── Dashboard Stats ───────────────────────────────────────────────────────
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var requests = await db.TravelRequests.AsNoTracking().Where(t => t.TenantId == TenantId && !t.IsDeleted).ToListAsync();
        var claims = await db.TravelExpenseClaims.AsNoTracking().Where(c => c.TenantId == TenantId && !c.IsDeleted).ToListAsync();
        var advances = await db.AdvanceRequests.AsNoTracking().Where(a => a.TenantId == TenantId && !a.IsDeleted).ToListAsync();

        return Ok(new
        {
            PendingRequests = requests.Count(r => r.Status == "Pending"),
            ApprovedRequests = requests.Count(r => r.Status == "Approved"),
            TotalBudgetUsed = claims.Where(c => c.Status == "Paid").Sum(c => c.TotalAmount),
            PendingClaims = claims.Count(c => c.Status == "Submitted"),
            PendingAdvances = advances.Count(a => a.Status == "Pending"),
            AvgTripCost = requests.Where(r => r.ActualCost.HasValue).Select(r => r.ActualCost!.Value).DefaultIfEmpty(0).Average()
        });
    }

    // ── Travel Requests ───────────────────────────────────────────────────────
    [HttpGet("requests")]
    public async Task<IActionResult> GetRequests(
        [FromQuery] string? status,
        [FromQuery] Guid? employeeId,
        [FromQuery] DateTime? from,
        [FromQuery] DateTime? to)
    {
        var q = db.TravelRequests.AsNoTracking().Where(r => r.TenantId == TenantId && !r.IsDeleted);
        if (!string.IsNullOrEmpty(status)) q = q.Where(r => r.Status == status);
        if (employeeId.HasValue) q = q.Where(r => r.EmployeeId == employeeId.Value);
        if (from.HasValue) q = q.Where(r => r.TravelFromDate >= from.Value);
        if (to.HasValue) q = q.Where(r => r.TravelToDate <= to.Value);
        return Ok(await q.OrderByDescending(r => r.CreatedAt).ToListAsync());
    }

    [HttpGet("requests/{id:guid}")]
    public async Task<IActionResult> GetRequest(Guid id)
    {
        var req = await db.TravelRequests.AsNoTracking()
            .Include(r => r.ExpenseClaims)
            .FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId && !r.IsDeleted);
        if (req == null) return NotFound(new { message = "Travel request not found" });
        return Ok(req);
    }

    [HttpPost("requests")]
    public async Task<IActionResult> CreateRequest([FromBody] TravelRequest request)
    {
        request.TenantId = TenantId;
        request.RequestNumber = $"TRV-{DateTime.UtcNow:yyyyMMdd}-{new Random().Next(100, 999)}";
        request.Status = "Pending";
        request.CreatedAt = DateTime.UtcNow;
        db.TravelRequests.Add(request);
        await db.SaveChangesAsync();
        return Created(string.Empty, request);
    }

    [HttpPatch("requests/{id:guid}/status")]
    public async Task<IActionResult> UpdateRequestStatus(Guid id, [FromBody] TravelApprovalRequest req)
    {
        var request = await db.TravelRequests.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId && !r.IsDeleted);
        if (request == null) return NotFound(new { message = "Travel request not found" });
        request.Status = req.Status;
        request.ApproverId = UserId;
        request.ApproverName = UserName;
        request.ApprovedAt = DateTime.UtcNow;
        if (!string.IsNullOrEmpty(req.RejectionReason)) request.RejectionReason = req.RejectionReason;
        await db.SaveChangesAsync();
        return Ok(request);
    }

    // ── Advance Requests ──────────────────────────────────────────────────────
    [HttpGet("advances")]
    public async Task<IActionResult> GetAdvances([FromQuery] string? status, [FromQuery] Guid? employeeId)
    {
        var q = db.AdvanceRequests.AsNoTracking().Where(a => a.TenantId == TenantId && !a.IsDeleted);
        if (!string.IsNullOrEmpty(status)) q = q.Where(a => a.Status == status);
        if (employeeId.HasValue) q = q.Where(a => a.EmployeeId == employeeId.Value);
        return Ok(await q.OrderByDescending(a => a.CreatedAt).ToListAsync());
    }

    [HttpPost("advances")]
    public async Task<IActionResult> CreateAdvance([FromBody] AdvanceRequest advance)
    {
        advance.TenantId = TenantId;
        advance.RequestNumber = $"ADV-{DateTime.UtcNow:yyyyMMdd}-{new Random().Next(100, 999)}";
        advance.Status = "Pending";
        advance.CreatedAt = DateTime.UtcNow;
        db.AdvanceRequests.Add(advance);
        await db.SaveChangesAsync();
        return Created(string.Empty, advance);
    }

    [HttpPatch("advances/{id:guid}/status")]
    public async Task<IActionResult> UpdateAdvanceStatus(Guid id, [FromBody] TravelApprovalRequest req)
    {
        var advance = await db.AdvanceRequests.FirstOrDefaultAsync(a => a.Id == id && a.TenantId == TenantId);
        if (advance == null) return NotFound(new { message = "Advance request not found" });
        advance.Status = req.Status;
        advance.ApproverId = UserId;
        if (req.Status == "Approved") advance.ApprovedAt = DateTime.UtcNow;
        if (req.Status == "Disbursed") advance.DisbursedAt = DateTime.UtcNow;
        if (req.Status == "Settled") advance.SettledAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(advance);
    }

    // ── Expense Claims ────────────────────────────────────────────────────────
    [HttpGet("claims")]
    public async Task<IActionResult> GetClaims([FromQuery] string? status, [FromQuery] Guid? employeeId)
    {
        var q = db.TravelExpenseClaims.AsNoTracking()
            .Include(c => c.LineItems)
            .Where(c => c.TenantId == TenantId && !c.IsDeleted);
        if (!string.IsNullOrEmpty(status)) q = q.Where(c => c.Status == status);
        if (employeeId.HasValue) q = q.Where(c => c.EmployeeId == employeeId.Value);
        return Ok(await q.OrderByDescending(c => c.CreatedAt).ToListAsync());
    }

    [HttpGet("claims/{id:guid}")]
    public async Task<IActionResult> GetClaim(Guid id)
    {
        var claim = await db.TravelExpenseClaims.AsNoTracking()
            .Include(c => c.LineItems)
            .FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId && !c.IsDeleted);
        if (claim == null) return NotFound(new { message = "Expense claim not found" });
        return Ok(claim);
    }

    [HttpPost("claims")]
    public async Task<IActionResult> CreateClaim([FromBody] TravelExpenseClaim claim)
    {
        claim.TenantId = TenantId;
        claim.ClaimNumber = $"EXP-{DateTime.UtcNow:yyyyMMdd}-{new Random().Next(100, 999)}";
        claim.Status = "Draft";
        claim.TotalAmount = claim.LineItems?.Sum(l => l.Amount) ?? 0;
        claim.ReimbursableAmount = claim.TotalAmount - (claim.AdvanceAmount ?? 0);
        claim.CreatedAt = DateTime.UtcNow;
        db.TravelExpenseClaims.Add(claim);
        await db.SaveChangesAsync();
        return Created(string.Empty, claim);
    }

    [HttpPatch("claims/{id:guid}/status")]
    public async Task<IActionResult> UpdateClaimStatus(Guid id, [FromBody] TravelApprovalRequest req)
    {
        var claim = await db.TravelExpenseClaims.FirstOrDefaultAsync(c => c.Id == id && c.TenantId == TenantId);
        if (claim == null) return NotFound(new { message = "Expense claim not found" });
        claim.Status = req.Status;
        claim.ApproverId = UserId;
        if (req.Status == "Approved") claim.ApprovedAt = DateTime.UtcNow;
        if (req.Status == "Paid") claim.PaidAt = DateTime.UtcNow;
        claim.Remarks = req.RejectionReason;
        await db.SaveChangesAsync();
        return Ok(claim);
    }
}

// ── Request DTOs ──────────────────────────────────────────────────────────────
public record TravelApprovalRequest(string Status, string? RejectionReason);
