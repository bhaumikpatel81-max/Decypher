using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/permissions")]
[Authorize]
public class PermissionsController(ApplicationDbContext db) : ControllerBase
{
    private string TenantId => User.FindFirst("tenantId")?.Value ?? string.Empty;
    private string UserRole => User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;

    // GET /api/permissions/matrix  — SuperAdmin only
    [HttpGet("matrix")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> GetMatrix()
    {
        if (!Guid.TryParse(TenantId, out var tenantGuid))
            return Unauthorized();

        var rows = await db.ModulePermissions
            .Where(p => p.TenantId == tenantGuid)
            .OrderBy(p => p.RoleName).ThenBy(p => p.ModuleKey)
            .ToListAsync();

        if (!rows.Any())
        {
            rows = await SeedDefaultsAsync(tenantGuid);
        }

        // Group by role → module
        var matrix = rows
            .GroupBy(p => p.RoleName)
            .ToDictionary(
                g => g.Key,
                g => g.ToDictionary(
                    p => p.ModuleKey,
                    p => new { p.CanRead, p.CanWrite, p.CanDelete }
                )
            );

        return Ok(matrix);
    }

    // GET /api/permissions/my-permissions
    [HttpGet("my-permissions")]
    public async Task<IActionResult> GetMyPermissions()
    {
        if (!Guid.TryParse(TenantId, out var tenantGuid))
            return Unauthorized();

        var role = UserRole;
        if (string.IsNullOrEmpty(role))
            return Ok(new object[] { });

        // SuperAdmin has unrestricted access — return a sentinel
        if (role == "SuperAdmin")
            return Ok(new { role = "SuperAdmin", isUnrestricted = true, permissions = new object[] { } });

        var perms = await db.ModulePermissions
            .Where(p => p.TenantId == tenantGuid && p.RoleName == role)
            .Select(p => new { p.ModuleKey, p.CanRead, p.CanWrite, p.CanDelete })
            .ToListAsync();

        return Ok(new { role, isUnrestricted = false, permissions = perms });
    }

    // PUT /api/permissions/matrix/{roleName}/{moduleKey}  — SuperAdmin only
    [HttpPut("matrix/{roleName}/{moduleKey}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> UpdatePermission(
        string roleName, string moduleKey,
        [FromBody] PermissionUpdateDto dto)
    {
        if (!Guid.TryParse(TenantId, out var tenantGuid))
            return Unauthorized();

        var perm = await db.ModulePermissions
            .FirstOrDefaultAsync(p =>
                p.TenantId == tenantGuid &&
                p.RoleName == roleName &&
                p.ModuleKey == moduleKey);

        if (perm is null)
        {
            perm = new ModulePermission
            {
                TenantId = tenantGuid,
                RoleName = roleName,
                ModuleKey = moduleKey
            };
            db.ModulePermissions.Add(perm);
        }

        perm.CanRead = dto.CanRead;
        perm.CanWrite = dto.CanWrite && dto.CanRead;   // write requires read
        perm.CanDelete = dto.CanDelete && dto.CanWrite; // delete requires write
        perm.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();
        return Ok(new { perm.CanRead, perm.CanWrite, perm.CanDelete });
    }

    private async Task<List<ModulePermission>> SeedDefaultsAsync(Guid tenantGuid)
    {
        var allModules = new[]
        {
            "dashboard", "employee-directory", "org-chart", "document-management",
            "letters-certificates", "exit-management",
            "attendance", "leave-management", "shift-management", "timesheet", "overtime",
            "payroll", "salary-structure", "tax-statutory", "expense-management", "payslip-portal",
            "compensation-planning", "benefits-admin", "salary-benchmarking", "bonus-incentives",
            "goals-okr", "performance-reviews", "feedback-360", "continuous-feedback",
            "learning-management", "training-calendar", "skill-gap", "certification-tracker",
            "candidates", "requirements", "pipeline-board", "interview-scheduler",
            "offer-management", "source-tracking", "resume-parser",
            "policy-management", "statutory-compliance", "compliance", "audit-trail", "reports", "budget",
            "helpdesk", "admin-travel", "portal", "import-center", "integrations", "settings"
        };

        var operationsWrite = new HashSet<string>
        {
            "dashboard", "employee-directory", "org-chart", "document-management",
            "letters-certificates", "exit-management",
            "attendance", "leave-management", "shift-management", "timesheet", "overtime",
            "payroll", "salary-structure", "tax-statutory", "expense-management", "payslip-portal",
            "compensation-planning", "benefits-admin", "bonus-incentives",
            "goals-okr", "performance-reviews", "continuous-feedback",
            "policy-management", "compliance", "reports", "budget",
            "helpdesk", "admin-travel", "portal"
        };

        var lndWrite = new HashSet<string>
        {
            "learning-management", "training-calendar", "skill-gap", "certification-tracker",
            "goals-okr", "performance-reviews", "feedback-360", "continuous-feedback"
        };

        var talentAcqWrite = new HashSet<string>
        {
            "candidates", "requirements", "pipeline-board", "interview-scheduler",
            "offer-management", "source-tracking", "resume-parser",
            "helpdesk", "portal"
        };

        var roles = new[]
        {
            ("Operations", operationsWrite),
            ("LnD", lndWrite),
            ("TalentAcq", talentAcqWrite),
        };

        var permissions = new List<ModulePermission>();
        var now = DateTime.UtcNow;

        foreach (var (roleName, writeSet) in roles)
        {
            foreach (var module in allModules)
            {
                permissions.Add(new ModulePermission
                {
                    TenantId = tenantGuid,
                    RoleName = roleName,
                    ModuleKey = module,
                    CanRead = true,
                    CanWrite = writeSet.Contains(module),
                    CanDelete = false,
                    CreatedAt = now,
                    UpdatedAt = now
                });
            }
        }

        db.ModulePermissions.AddRange(permissions);
        await db.SaveChangesAsync();
        return permissions;
    }
}

public record PermissionUpdateDto(bool CanRead, bool CanWrite, bool CanDelete);
