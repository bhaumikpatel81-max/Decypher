using Decypher.Web.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly ApplicationDbContext _context;

        public DashboardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<dynamic> GetDashboardMetricsAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);

            var totalCandidates = await _context.Candidates.CountAsync();
            var totalVendors = await _context.Vendors.CountAsync();
            var totalJobs = await _context.Requirements.CountAsync();

            var hired = await _context.Candidates.CountAsync(c => c.Stage == "Joined");
            var submitted = await _context.Candidates.CountAsync(c => c.Stage == "Submitted");
            var selectionRate = submitted > 0 ? (hired * 100m) / submitted : 0;

            var highRiskCount = await _context.Candidates
                .Where(c => c.DropoutRiskScore >= 70 && c.Stage != "Joined")
                .CountAsync();

            return new
            {
                totalCandidates,
                totalVendors,
                totalJobs,
                hiredCandidates = hired,
                selectionRate = Math.Round(selectionRate, 2),
                highRiskCandidates = highRiskCount,
                activeVendors = await _context.Vendors.CountAsync(v => v.Status == "Active")
            };
        }

        public async Task<dynamic> GetHiringFunnelAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);

            var stages = new[] { "Submitted", "Shortlisted", "Interview", "Offer", "Hired", "Rejected" };
            var funnel = new Dictionary<string, int>();

            foreach (var stage in stages)
            {
                funnel[stage] = await _context.Candidates.CountAsync(c => c.Stage == stage);
            }

            return funnel;
        }

        public async Task<dynamic> GetVendorPerformanceAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);

            var vendors = await _context.Vendors
                .AsNoTracking()
                .OrderByDescending(v => v.QualityScore)
                .Take(10)
                .Select(v => new
                {
                    v.Id,
                    Name = v.VendorName,
                    v.TotalSubmissions,
                    SuccessfulPlacements = v.TotalJoinings,
                    v.QualityScore,
                    SLAScore = v.SlaComplianceScore
                })
                .ToListAsync();

            return vendors;
        }

        public async Task<dynamic> GetCandidatePipelineAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);

            var pipeline = await _context.Candidates
                .AsNoTracking()
                .GroupBy(c => c.Stage)
                .Select(g => new
                {
                    stage = g.Key,
                    count = g.Count(),
                    avgDaysInPipeline = g.Average(c => (DateTime.UtcNow - c.SubmittedDate).Days),
                    avgDropoutRisk = g.Average(c => c.DropoutRiskScore)
                })
                .ToListAsync();

            return pipeline;
        }

        public async Task<dynamic> GetTimeToHireMetricsAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);

            var hiredCandidates = await _context.Candidates
                .AsNoTracking()
                .Where(c => c.Stage == "Joined")
                .ToListAsync();

            var avgTimeToHire = hiredCandidates.Count > 0
                ? hiredCandidates.Average(c => (DateTime.UtcNow - c.SubmittedDate).Days)
                : 0;

            var minTimeToHire = hiredCandidates.Count > 0
                ? hiredCandidates.Min(c => (DateTime.UtcNow - c.SubmittedDate).Days)
                : 0;

            var maxTimeToHire = hiredCandidates.Count > 0
                ? hiredCandidates.Max(c => (DateTime.UtcNow - c.SubmittedDate).Days)
                : 0;

            return new
            {
                avgTimeToHire = Math.Round(avgTimeToHire, 2),
                minTimeToHire,
                maxTimeToHire,
                totalHired = hiredCandidates.Count
            };
        }

        public async Task<dynamic> GetMonthlyTrendAsync(string tenantId, int months = 6)
        {
            _context.SetTenantId(tenantId);
            var since = DateTime.UtcNow.AddMonths(-months);

            var candidates = await _context.Candidates
                .AsNoTracking()
                .Where(c => c.SubmittedDate >= since)
                .Select(c => new { c.SubmittedDate, c.Stage })
                .ToListAsync();

            var trend = Enumerable.Range(0, months)
                .Select(i => DateTime.UtcNow.AddMonths(-months + 1 + i))
                .Select(d => new
                {
                    month = d.ToString("MMM"),
                    year = d.Year,
                    submitted = candidates.Count(c => c.SubmittedDate.Month == d.Month && c.SubmittedDate.Year == d.Year),
                    joined = candidates.Count(c => c.Stage == "Joined" && c.SubmittedDate.Month == d.Month && c.SubmittedDate.Year == d.Year)
                })
                .ToList();

            return trend;
        }

        public async Task<dynamic> GetTopSkillsAsync(string tenantId, int topN = 6)
        {
            _context.SetTenantId(tenantId);

            var allSkills = await _context.Candidates
                .AsNoTracking()
                .Where(c => !string.IsNullOrEmpty(c.Skills))
                .Select(c => c.Skills)
                .ToListAsync();

            var skillCounts = allSkills
                .SelectMany(s => s!.Split(',', StringSplitOptions.RemoveEmptyEntries))
                .Select(s => s.Trim())
                .Where(s => s.Length > 0)
                .GroupBy(s => s, StringComparer.OrdinalIgnoreCase)
                .Select(g => new { skill = g.Key, count = g.Count() })
                .OrderByDescending(x => x.count)
                .Take(topN)
                .ToList();

            var maxCount = skillCounts.Any() ? skillCounts.Max(x => x.count) : 1;
            return skillCounts.Select(x => new
            {
                x.skill,
                x.count,
                pct = maxCount > 0 ? (int)Math.Round((double)x.count / maxCount * 100) : 0
            }).ToList();
        }

        public async Task<dynamic> GetTimeToFillByRoleAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);

            var hired = await _context.Candidates
                .AsNoTracking()
                .Where(c => c.Stage == "Joined" && !string.IsNullOrEmpty(c.JobTitle))
                .Select(c => new { c.JobTitle, Days = (int)(DateTime.UtcNow - c.SubmittedDate).TotalDays })
                .ToListAsync();

            const int target = 30;
            return hired
                .GroupBy(c => c.JobTitle)
                .Select(g => new
                {
                    role = g.Key,
                    days = (int)Math.Round(g.Average(x => x.Days)),
                    target
                })
                .OrderBy(x => x.role)
                .Take(8)
                .ToList();
        }
    }
}
