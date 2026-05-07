using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/platform")]
[Authorize]
public class PlatformController(ApplicationDbContext db, UserManager<ApplicationUser> userManager) : ControllerBase
{
    private bool IsSuperAdmin => User.FindFirst("role")?.Value == "SuperAdmin";

    // GET /api/platform/stats
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        if (!IsSuperAdmin) return Forbid();
        var tenantCount  = await db.Tenants.CountAsync();
        var activeCount  = await db.Tenants.CountAsync(t => t.IsActive);
        var userCount    = await userManager.Users.CountAsync();
        var trialCount   = await db.Tenants.CountAsync(t => t.SubscriptionPlan == "Free");
        var paidCount    = await db.Tenants.CountAsync(t => t.SubscriptionPlan != "Free");
        var newThisMonth = await db.Tenants.CountAsync(t => t.CreatedAt >= DateTime.UtcNow.AddDays(-30));

        return Ok(new
        {
            totalTenants    = tenantCount,
            activeTenants   = activeCount,
            suspendedTenants = tenantCount - activeCount,
            totalUsers      = userCount,
            trialTenants    = trialCount,
            paidTenants     = paidCount,
            newThisMonth
        });
    }

    // GET /api/platform/tenants
    [HttpGet("tenants")]
    public async Task<IActionResult> GetTenants([FromQuery] string? status, [FromQuery] string? plan, [FromQuery] string? search)
    {
        if (!IsSuperAdmin) return Forbid();
        var q = db.Tenants.AsQueryable();
        if (!string.IsNullOrEmpty(status))
            q = status == "active" ? q.Where(t => t.IsActive) : q.Where(t => !t.IsActive);
        if (!string.IsNullOrEmpty(plan))
            q = q.Where(t => t.SubscriptionPlan == plan);
        if (!string.IsNullOrEmpty(search))
            q = q.Where(t => t.CompanyName.ToLower().Contains(search.ToLower()));

        var tenants = await q
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new
            {
                t.Id,
                t.CompanyName,
                t.Industry,
                t.EmployeeCount,
                t.SubscriptionPlan,
                t.SubscriptionStartDate,
                t.SubscriptionEndDate,
                t.IsActive,
                t.CreatedAt,
                userCount = db.Users.Count(u => u.TenantId == t.Id)
            })
            .ToListAsync();

        return Ok(tenants);
    }

    // GET /api/platform/tenants/{id}
    [HttpGet("tenants/{id:guid}")]
    public async Task<IActionResult> GetTenant(Guid id)
    {
        if (!IsSuperAdmin) return Forbid();
        var tenant = await db.Tenants.FindAsync(id);
        if (tenant == null) return NotFound();
        var users = await userManager.Users.Where(u => u.TenantId == id).Select(u => new
        {
            u.Id, u.FullName, u.Email, role = u.Role.ToString(), u.IsActive, u.LastLoginAt
        }).ToListAsync();
        return Ok(new { tenant, users });
    }

    // POST /api/platform/tenants — create tenant + initial TenantAdmin user
    [HttpPost("tenants")]
    public async Task<IActionResult> CreateTenant([FromBody] CreateTenantRequest req)
    {
        if (!IsSuperAdmin) return Forbid();
        if (await db.Tenants.AnyAsync(t => t.CompanyName == req.CompanyName))
            return BadRequest(new { error = "A tenant with that company name already exists." });

        var tenant = new Tenant
        {
            CompanyName       = req.CompanyName,
            CompanyAddress    = req.CompanyAddress,
            Industry          = req.Industry,
            EmployeeCount     = req.EmployeeCount,
            SubscriptionPlan  = req.SubscriptionPlan ?? "Free",
            SubscriptionStartDate = DateTime.UtcNow,
            IsActive          = true
        };
        db.Tenants.Add(tenant);
        await db.SaveChangesAsync();

        // Create the initial TenantAdmin user
        var adminUser = new ApplicationUser
        {
            UserName  = req.AdminEmail,
            Email     = req.AdminEmail,
            FirstName = req.AdminFirstName,
            LastName  = req.AdminLastName,
            TenantId  = tenant.Id,
            Role      = UserRole.TenantAdmin,
            IsActive  = true
        };
        var createResult = await userManager.CreateAsync(adminUser, req.AdminPassword);
        if (!createResult.Succeeded)
        {
            db.Tenants.Remove(tenant);
            await db.SaveChangesAsync();
            return BadRequest(new { errors = createResult.Errors.Select(e => e.Description) });
        }

        return Created(string.Empty, new { tenant, adminUserId = adminUser.Id });
    }

    // PATCH /api/platform/tenants/{id}/status
    [HttpPatch("tenants/{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] TenantStatusRequest req)
    {
        if (!IsSuperAdmin) return Forbid();
        var tenant = await db.Tenants.FindAsync(id);
        if (tenant == null) return NotFound();
        tenant.IsActive = req.IsActive;
        if (!string.IsNullOrEmpty(req.SubscriptionPlan)) tenant.SubscriptionPlan = req.SubscriptionPlan;
        if (req.SubscriptionEndDate.HasValue) tenant.SubscriptionEndDate = req.SubscriptionEndDate;
        await db.SaveChangesAsync();
        return Ok(tenant);
    }

    // DELETE /api/platform/tenants/{id}
    [HttpDelete("tenants/{id:guid}")]
    public async Task<IActionResult> DeleteTenant(Guid id)
    {
        if (!IsSuperAdmin) return Forbid();
        var tenant = await db.Tenants.FindAsync(id);
        if (tenant == null) return NotFound();
        tenant.IsActive = false; // soft-delete: just suspend, never hard-delete
        await db.SaveChangesAsync();
        return NoContent();
    }

    // GET /api/platform/users — list all users across tenants
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers([FromQuery] Guid? tenantId, [FromQuery] string? search)
    {
        if (!IsSuperAdmin) return Forbid();
        var q = userManager.Users.AsQueryable();
        if (tenantId.HasValue) q = q.Where(u => u.TenantId == tenantId);
        if (!string.IsNullOrEmpty(search))
            q = q.Where(u => u.Email!.Contains(search) || u.FirstName.Contains(search) || u.LastName.Contains(search));

        var users = await q.Select(u => new
        {
            u.Id, u.FullName, u.Email, role = u.Role.ToString(),
            u.TenantId, u.IsActive, u.LastLoginAt, u.CreatedAt
        }).ToListAsync();

        return Ok(users);
    }

    // PATCH /api/platform/users/{id}/status
    [HttpPatch("users/{id}/status")]
    public async Task<IActionResult> UpdateUserStatus(string id, [FromBody] UserStatusRequest req)
    {
        if (!IsSuperAdmin) return Forbid();
        var user = await userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        user.IsActive = req.IsActive;
        await userManager.UpdateAsync(user);
        return Ok(new { user.Id, user.IsActive });
    }
}

public record CreateTenantRequest(
    string CompanyName,
    string? CompanyAddress,
    string? Industry,
    int EmployeeCount,
    string? SubscriptionPlan,
    string AdminEmail,
    string AdminFirstName,
    string AdminLastName,
    string AdminPassword);

public record TenantStatusRequest(bool IsActive, string? SubscriptionPlan, DateTime? SubscriptionEndDate);
public record UserStatusRequest(bool IsActive);
