using Decypher.Web.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/jobs")]
[Authorize]
public class JobsController(ApplicationDbContext db, IHttpContextAccessor http) : ControllerBase
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);

    /// <summary>Returns open requisitions mapped as public job listings for the careers builder page.</summary>
    [HttpGet]
    public async Task<IActionResult> GetOpenJobs(
        [FromQuery] string? department,
        [FromQuery] string? location)
    {
        var q = db.Requisitions.AsNoTracking()
            .Where(r => r.TenantId == TenantId && (r.Status == "Open" || r.Status == "Approved"));

        if (!string.IsNullOrEmpty(department))
            q = q.Where(r => r.Department == department);

        var jobs = await q.OrderByDescending(r => r.CreatedAt).ToListAsync();

        var result = jobs.Select(r => new
        {
            r.Id,
            Title = r.Title,
            Department = r.Department,
            Location = location ?? "India",
            EmploymentType = "Full-Time",
            PostedDate = r.CreatedAt.ToString("yyyy-MM-dd"),
            Description = r.Justification,
            Headcount = r.Headcount
        });

        return Ok(result);
    }
}
