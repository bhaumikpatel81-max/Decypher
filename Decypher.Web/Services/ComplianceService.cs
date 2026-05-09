using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Services;

// â”€â”€â”€ Policy Management â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public interface IPolicyService
{
    Task<List<Policy>> GetPoliciesAsync(string? category, string? status, string? search);
    Task<Policy> GetPolicyByIdAsync(Guid id);
    Task<Policy> CreatePolicyAsync(Policy policy);
    Task<Policy> UpdatePolicyAsync(Guid id, Policy updated);
    Task DeletePolicyAsync(Guid id);
    Task<Policy> PublishPolicyAsync(Guid id);
    Task<PolicyAcknowledgment> AcknowledgePolicyAsync(Guid policyId, Guid employeeId, string? ipAddress);
    Task<List<PolicyAcknowledgment>> GetAcknowledgmentsAsync(Guid policyId);
    Task<object> GetComplianceStatusAsync(Guid policyId);
}

public class PolicyService(ApplicationDbContext db, IHttpContextAccessor http) : IPolicyService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<Policy>> GetPoliciesAsync(string? category, string? status, string? search)
    {
        var q = db.Policies.AsNoTracking().Where(p => p.TenantId == TenantId && !p.IsDeleted);
        if (!string.IsNullOrEmpty(category)) q = q.Where(p => p.Category == category);
        if (!string.IsNullOrEmpty(status)) q = q.Where(p => status == "Published" ? p.IsActive : !p.IsActive);
        if (!string.IsNullOrEmpty(search)) q = q.Where(p => p.Title.Contains(search) || p.Content.Contains(search));
        return await q.OrderByDescending(p => p.EffectiveDate ?? p.CreatedAt).ToListAsync();
    }

    public async Task<Policy> GetPolicyByIdAsync(Guid id)
    {
        return await db.Policies.AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id && p.TenantId == TenantId && !p.IsDeleted)
            ?? throw new KeyNotFoundException("Policy not found");
    }

    public async Task<Policy> CreatePolicyAsync(Policy policy)
    {
        policy.Id = Guid.NewGuid();
        policy.TenantId = TenantId;
        policy.CreatedBy = UserId.ToString();
        policy.CreatedAt = DateTime.UtcNow;
        policy.IsActive = false;
        policy.Version = 1;
        db.Policies.Add(policy);
        await db.SaveChangesAsync();
        return policy;
    }

    public async Task<Policy> UpdatePolicyAsync(Guid id, Policy updated)
    {
        var policy = await db.Policies.FirstOrDefaultAsync(p => p.Id == id && p.TenantId == TenantId && !p.IsDeleted)
            ?? throw new KeyNotFoundException("Policy not found");

        if (policy.IsActive)
        {
            policy.Version++;
            policy.IsActive = false;
        }

        policy.Title = updated.Title;
        policy.Category = updated.Category;
        policy.Content = updated.Content;
        policy.RequiresAcknowledgment = updated.RequiresAcknowledgment;
        policy.UpdatedAt = DateTime.UtcNow;
        policy.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return policy;
    }

    public async Task DeletePolicyAsync(Guid id)
    {
        var policy = await db.Policies.FirstOrDefaultAsync(p => p.Id == id && p.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Policy not found");
        policy.IsDeleted = true;
        policy.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<Policy> PublishPolicyAsync(Guid id)
    {
        var policy = await db.Policies.FirstOrDefaultAsync(p => p.Id == id && p.TenantId == TenantId && !p.IsDeleted)
            ?? throw new KeyNotFoundException("Policy not found");

        policy.IsActive = true;
        policy.EffectiveDate = DateTime.UtcNow;
        policy.UpdatedAt = DateTime.UtcNow;
        policy.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return policy;
    }

    public async Task<PolicyAcknowledgment> AcknowledgePolicyAsync(Guid policyId, Guid employeeId, string? ipAddress)
    {
        var policy = await db.Policies.FirstOrDefaultAsync(p => p.Id == policyId && p.TenantId == TenantId && !p.IsDeleted)
            ?? throw new KeyNotFoundException("Policy not found");

        var existing = await db.PolicyAcknowledgments.FirstOrDefaultAsync(a =>
            a.PolicyId == policyId && a.EmployeeId == employeeId && !a.IsDeleted);

        if (existing != null) return existing;

        var ack = new PolicyAcknowledgment
        {
            Id = Guid.NewGuid(),
            TenantId = TenantId,
            PolicyId = policyId,
            EmployeeId = employeeId,
            AcknowledgedAt = DateTime.UtcNow,
            IpAddress = ipAddress,
            CreatedBy = UserId.ToString(),
            CreatedAt = DateTime.UtcNow
        };
        db.PolicyAcknowledgments.Add(ack);
        await db.SaveChangesAsync();
        return ack;
    }

    public async Task<List<PolicyAcknowledgment>> GetAcknowledgmentsAsync(Guid policyId)
    {
        return await db.PolicyAcknowledgments.AsNoTracking()
            .Where(a => a.PolicyId == policyId && a.TenantId == TenantId && !a.IsDeleted)
            .OrderByDescending(a => a.AcknowledgedAt).ToListAsync();
    }

    public async Task<object> GetComplianceStatusAsync(Guid policyId)
    {
        var policy = await db.Policies.AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == policyId && p.TenantId == TenantId && !p.IsDeleted)
            ?? throw new KeyNotFoundException("Policy not found");

        var totalEmployees = await db.Employees.AsNoTracking()
            .CountAsync(e => e.TenantId == TenantId && e.Status == "Active" && !e.IsDeleted);

        var acknowledged = await db.PolicyAcknowledgments.AsNoTracking()
            .CountAsync(a => a.PolicyId == policyId && a.TenantId == TenantId && !a.IsDeleted);

        return new
        {
            PolicyTitle = policy.Title,
            Version = policy.Version,
            TotalEmployees = totalEmployees,
            Acknowledged = acknowledged,
            Pending = totalEmployees - acknowledged,
            ComplianceRate = totalEmployees > 0 ? Math.Round((double)acknowledged / totalEmployees * 100, 1) : 0
        };
    }
}

// â”€â”€â”€ Statutory Compliance â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public interface IStatutoryService
{
    Task<List<StatutoryFiling>> GetFilingsAsync(string? filingType, string? status, int? year);
    Task<StatutoryFiling> GetFilingByIdAsync(Guid id);
    Task<StatutoryFiling> CreateFilingAsync(StatutoryFiling filing);
    Task<StatutoryFiling> UpdateFilingStatusAsync(Guid id, string status, DateTime? filedOn, string? acknowledgmentNumber);
    Task DeleteFilingAsync(Guid id);
    Task<object> GetComplianceCalendarAsync(int year);
}

public class StatutoryService(ApplicationDbContext db, IHttpContextAccessor http) : IStatutoryService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<StatutoryFiling>> GetFilingsAsync(string? filingType, string? status, int? year)
    {
        var q = db.StatutoryFilings.AsNoTracking().Where(f => f.TenantId == TenantId && !f.IsDeleted);
        if (!string.IsNullOrEmpty(filingType)) q = q.Where(f => f.FilingType == filingType);
        if (!string.IsNullOrEmpty(status)) q = q.Where(f => f.Status == status);
        if (year.HasValue) q = q.Where(f => f.DueDate.Year == year.Value);
        return await q.OrderBy(f => f.DueDate).ToListAsync();
    }

    public async Task<StatutoryFiling> GetFilingByIdAsync(Guid id)
    {
        return await db.StatutoryFilings.AsNoTracking()
            .FirstOrDefaultAsync(f => f.Id == id && f.TenantId == TenantId && !f.IsDeleted)
            ?? throw new KeyNotFoundException("Filing not found");
    }

    public async Task<StatutoryFiling> CreateFilingAsync(StatutoryFiling filing)
    {
        filing.Id = Guid.NewGuid();
        filing.TenantId = TenantId;
        filing.CreatedBy = UserId.ToString();
        filing.CreatedAt = DateTime.UtcNow;
        filing.Status = "Pending";
        db.StatutoryFilings.Add(filing);
        await db.SaveChangesAsync();
        return filing;
    }

    public async Task<StatutoryFiling> UpdateFilingStatusAsync(Guid id, string status, DateTime? filedOn, string? acknowledgmentNumber)
    {
        var filing = await db.StatutoryFilings.FirstOrDefaultAsync(f => f.Id == id && f.TenantId == TenantId && !f.IsDeleted)
            ?? throw new KeyNotFoundException("Filing not found");

        filing.Status = status;
        if (filedOn.HasValue) filing.FiledDate = filedOn;
        if (!string.IsNullOrEmpty(acknowledgmentNumber)) filing.AcknowledgementNo = acknowledgmentNumber;
        filing.UpdatedAt = DateTime.UtcNow;
        filing.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return filing;
    }

    public async Task DeleteFilingAsync(Guid id)
    {
        var filing = await db.StatutoryFilings.FirstOrDefaultAsync(f => f.Id == id && f.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Filing not found");
        filing.IsDeleted = true;
        filing.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<object> GetComplianceCalendarAsync(int year)
    {
        var filings = await db.StatutoryFilings.AsNoTracking()
            .Where(f => f.TenantId == TenantId && !f.IsDeleted && f.DueDate.Year == year)
            .OrderBy(f => f.DueDate).ToListAsync();

        return new
        {
            Year = year,
            Total = filings.Count,
            Filed = filings.Count(f => f.Status == "Filed"),
            Overdue = filings.Count(f => f.Status == "Pending" && f.DueDate < DateTime.UtcNow),
            Upcoming = filings.Count(f => f.Status == "Pending" && f.DueDate >= DateTime.UtcNow && f.DueDate <= DateTime.UtcNow.AddDays(30)),
            ByMonth = Enumerable.Range(1, 12).Select(month => new
            {
                Month = month,
                Filings = filings.Where(f => f.DueDate.Month == month)
                    .Select(f => new { f.Id, f.FilingType, f.DueDate, f.Status, f.Amount })
            })
        };
    }
}

// â”€â”€â”€ Integrations Hub â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
public interface IIntegrationService
{
    Task<List<Integration>> GetIntegrationsAsync(string? category, string? status);
    Task<Integration> GetIntegrationByIdAsync(Guid id);
    Task<Integration> CreateIntegrationAsync(Integration integration);
    Task<Integration> UpdateIntegrationAsync(Guid id, Integration updated);
    Task DeleteIntegrationAsync(Guid id);
    Task<Integration> ToggleIntegrationAsync(Guid id, bool enabled);
    Task<Integration> SyncIntegrationAsync(Guid id);
}

public class IntegrationService(ApplicationDbContext db, IHttpContextAccessor http) : IIntegrationService
{
    private Guid TenantId => Guid.Parse(http.HttpContext!.User.FindFirst("tenantId")!.Value);
    private Guid UserId => Guid.Parse(http.HttpContext!.User.FindFirst("userId")!.Value);

    public async Task<List<Integration>> GetIntegrationsAsync(string? category, string? status)
    {
        var q = db.Integrations.AsNoTracking().Where(i => i.TenantId == TenantId && !i.IsDeleted);
        if (!string.IsNullOrEmpty(category)) q = q.Where(i => i.Category == category);
        if (!string.IsNullOrEmpty(status)) q = q.Where(i => i.Status == status);
        return await q.OrderBy(i => i.Name).ToListAsync();
    }

    public async Task<Integration> GetIntegrationByIdAsync(Guid id)
    {
        return await db.Integrations.AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == id && i.TenantId == TenantId && !i.IsDeleted)
            ?? throw new KeyNotFoundException("Integration not found");
    }

    public async Task<Integration> CreateIntegrationAsync(Integration integration)
    {
        integration.Id = Guid.NewGuid();
        integration.TenantId = TenantId;
        integration.CreatedBy = UserId.ToString();
        integration.CreatedAt = DateTime.UtcNow;
        integration.Status = "Inactive";
        db.Integrations.Add(integration);
        await db.SaveChangesAsync();
        return integration;
    }

    public async Task<Integration> UpdateIntegrationAsync(Guid id, Integration updated)
    {
        var integration = await db.Integrations.FirstOrDefaultAsync(i => i.Id == id && i.TenantId == TenantId && !i.IsDeleted)
            ?? throw new KeyNotFoundException("Integration not found");

        integration.Name = updated.Name;
        integration.Category = updated.Category;
        integration.Description = updated.Description;
        integration.Status = updated.Status;
        if (!string.IsNullOrWhiteSpace(updated.ConfigJson)) integration.ConfigJson = updated.ConfigJson;
        integration.LogoUrl = updated.LogoUrl;
        integration.UpdatedAt = DateTime.UtcNow;
        integration.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return integration;
    }

    public async Task DeleteIntegrationAsync(Guid id)
    {
        var integration = await db.Integrations.FirstOrDefaultAsync(i => i.Id == id && i.TenantId == TenantId)
            ?? throw new KeyNotFoundException("Integration not found");
        integration.IsDeleted = true;
        integration.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
    }

    public async Task<Integration> ToggleIntegrationAsync(Guid id, bool enabled)
    {
        var integration = await db.Integrations.FirstOrDefaultAsync(i => i.Id == id && i.TenantId == TenantId && !i.IsDeleted)
            ?? throw new KeyNotFoundException("Integration not found");

        integration.Status = enabled ? "Active" : "Inactive";
        integration.UpdatedAt = DateTime.UtcNow;
        integration.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return integration;
    }

    public async Task<Integration> SyncIntegrationAsync(Guid id)
    {
        var integration = await db.Integrations.FirstOrDefaultAsync(i => i.Id == id && i.TenantId == TenantId && !i.IsDeleted)
            ?? throw new KeyNotFoundException("Integration not found");

        integration.LastSyncAt = DateTime.UtcNow;
        integration.UpdatedAt = DateTime.UtcNow;
        integration.UpdatedBy = UserId.ToString();
        await db.SaveChangesAsync();
        return integration;
    }
}

