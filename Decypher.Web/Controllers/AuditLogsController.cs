using Decypher.Web.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/audit-logs")]
[Authorize]
public class AuditLogsController(ApplicationDbContext db, IHttpContextAccessor http) : ControllerBase
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);

    [HttpGet]
    public async Task<IActionResult> GetAuditLogs(
        [FromQuery] string? userId,
        [FromQuery] string? action,
        [FromQuery] DateTime? from,
        [FromQuery] DateTime? to,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 100)
    {
        var q = db.ActivityLogs.AsNoTracking()
            .Where(l => l.TenantId == TenantId);

        if (!string.IsNullOrEmpty(userId)) q = q.Where(l => l.UserId == userId);
        if (!string.IsNullOrEmpty(action)) q = q.Where(l => l.Action.Contains(action));
        if (from.HasValue) q = q.Where(l => l.Timestamp >= from.Value);
        if (to.HasValue) q = q.Where(l => l.Timestamp <= to.Value);

        var logs = await q.OrderByDescending(l => l.Timestamp)
            .Skip((page - 1) * pageSize).Take(pageSize)
            .ToListAsync();

        var result = logs.Select(l => new
        {
            l.Id,
            Timestamp = l.Timestamp.ToString("yyyy-MM-ddTHH:mm:ss"),
            UserName = l.UserName,
            UserRole = "—",
            Module = l.EntityType ?? "",
            Action = l.Action,
            Details = l.Description ?? "",
            IpAddress = "—",
            Severity = l.Action.ToLower().Contains("delete") || l.Action.ToLower().Contains("failed")
                ? "Critical"
                : l.Action.ToLower().Contains("update") ? "Warning" : "Info"
        });

        return Ok(result);
    }
}
