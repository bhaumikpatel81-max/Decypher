using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/reports")]
    [AllowAnonymous]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public ReportsController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        private Guid GetTenantId()
        {
            var claim = User.FindFirst("TenantId")?.Value;
            return Guid.TryParse(claim, out var g) ? g : Guid.Empty;
        }

        [HttpGet("requisition-aging")]
        public async Task<IActionResult> RequisitionAging([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-3);
            var toD   = to ?? DateTime.UtcNow;

            var reqs = await _db.Requirements
                .Where(r => r.TenantId == tenantId && !r.IsDeleted &&
                            r.CreatedAt >= fromD && r.CreatedAt <= toD)
                .Select(r => new {
                    Requisition = r.RequirementCode + " " + r.JobTitle,
                    Department  = r.Department ?? "—",
                    DaysOpen    = (int)(DateTime.UtcNow - r.CreatedAt).TotalDays,
                    r.Status
                }).ToListAsync();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Total Open",    value = reqs.Count(r => r.Status == "Open" || r.Status == "InProgress") },
                    new { label = "On Hold",       value = reqs.Count(r => r.Status == "OnHold") },
                    new { label = "Overdue >45d",  value = reqs.Count(r => r.DaysOpen > 45) },
                    new { label = "Avg Days Open", value = reqs.Any() ? (int)reqs.Average(r => r.DaysOpen) : 0 }
                },
                columns = new[] { "Requisition", "Department", "Days Open", "Status" },
                rows = reqs
            });
        }

        [HttpGet("vendor-performance")]
        public async Task<IActionResult> VendorPerformance([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-3);
            var toD   = to ?? DateTime.UtcNow;

            var vendors = await _db.Vendors.Where(v => v.TenantId == tenantId && !v.IsDeleted).ToListAsync();
            var candidates = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted && c.SubmittedDate >= fromD && c.SubmittedDate <= toD)
                .ToListAsync();

            var rows = vendors.Select(v => {
                var vc = candidates.Where(c => c.VendorId == v.Id).ToList();
                return new {
                    Vendor       = v.VendorName,
                    Submissions  = vc.Count,
                    Selections   = vc.Count(c => c.Stage == "Selected" || c.Stage == "Joined"),
                    Joinings     = vc.Count(c => c.Stage == "Joined"),
                    JoiningRate  = vc.Any() ? $"{(double)vc.Count(c => c.Stage == "Joined") / vc.Count * 100:F1}%" : "—",
                    SLAScore     = v.SlaComplianceScore
                };
            }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Total Vendors",      value = vendors.Count },
                    new { label = "Active Vendors",     value = vendors.Count(v => v.Status == "Active") },
                    new { label = "Avg Quality Score",  value = vendors.Any() ? $"{vendors.Average(v => (double)v.QualityScore):F0}%" : "—" },
                    new { label = "Avg Joining Rate",   value = vendors.Any() ? $"{vendors.Average(v => (double)v.JoiningRatePercent):F1}%" : "—" }
                },
                columns = new[] { "Vendor", "Submissions", "Selections", "Joinings", "Joining Rate", "SLA Score" },
                rows
            });
        }

        [HttpGet("candidate-funnel")]
        public async Task<IActionResult> CandidateFunnel([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-3);
            var toD   = to ?? DateTime.UtcNow;

            var candidates = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted && c.SubmittedDate >= fromD && c.SubmittedDate <= toD)
                .ToListAsync();

            var stages = new[] { "Submitted", "Screening", "L1", "L2", "L3", "HR", "Selected", "Joined", "Rejected", "Dropped" };
            var total  = candidates.Count;
            var rows   = stages.Select(s => new {
                Stage       = s,
                Count       = candidates.Count(c => c.Stage == s),
                Conversion  = total > 0 ? $"{(double)candidates.Count(c => c.Stage == s) / total * 100:F1}%" : "—"
            }).Where(r => r.Count > 0).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Total Candidates", value = total },
                    new { label = "Joined",           value = candidates.Count(c => c.Stage == "Joined") },
                    new { label = "Rejected",         value = candidates.Count(c => c.Stage == "Rejected") },
                    new { label = "Dropped",          value = candidates.Count(c => c.Stage == "Dropped") }
                },
                columns = new[] { "Stage", "Count", "Conversion %" },
                rows
            });
        }

        [HttpGet("time-to-hire")]
        public async Task<IActionResult> TimeToHire([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-3);
            var toD   = to ?? DateTime.UtcNow;

            var joined = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted && c.Stage == "Joined"
                         && c.JoiningDate >= fromD && c.JoiningDate <= toD)
                .Join(_db.Requirements, c => c.RequirementId, r => r.Id, (c, r) => new {
                    Requisition  = r.RequirementCode + " " + r.JobTitle,
                    Department   = r.Department ?? "—",
                    OpenDate     = r.CreatedAt,
                    CloseDate    = c.JoiningDate,
                    TATDays      = c.JoiningDate.HasValue ? (int)(c.JoiningDate.Value - r.CreatedAt).TotalDays : 0
                }).ToListAsync();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Hires in Period", value = joined.Count },
                    new { label = "Avg TAT (days)",  value = joined.Any() ? (int)joined.Average(j => j.TATDays) : 0 },
                    new { label = "Fastest (days)",  value = joined.Any() ? joined.Min(j => j.TATDays) : 0 },
                    new { label = "Slowest (days)",  value = joined.Any() ? joined.Max(j => j.TATDays) : 0 }
                },
                columns = new[] { "Requisition", "Department", "Open Date", "Close Date", "TAT Days" },
                rows = joined
            });
        }

        [HttpGet("recruiter-productivity")]
        public async Task<IActionResult> RecruiterProductivity([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-3);
            var toD   = to ?? DateTime.UtcNow;

            var perf = await _db.RecruiterPerformances
                .Where(p => p.TenantId == tenantId && !p.IsDeleted)
                .ToListAsync();

            var rows = perf
                .GroupBy(p => p.UserId)
                .Select(g => new {
                    Recruiter    = g.Key,
                    Submissions  = g.Sum(p => p.TotalSubmissions),
                    Selections   = g.Sum(p => p.TotalSelections),
                    Joinings     = g.Sum(p => p.TotalJoinings),
                    AvgTAJ       = g.Any() ? $"{g.Average(p => (double)p.AvgTimeToJoin):F1}d" : "—"
                }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Recruiters",       value = rows.Count },
                    new { label = "Total Submissions", value = rows.Sum(r => r.Submissions) },
                    new { label = "Total Joinings",    value = rows.Sum(r => r.Joinings) }
                },
                columns = new[] { "Recruiter", "Submissions", "Selections", "Joinings", "Avg TAJ" },
                rows
            });
        }

        [HttpGet("budget-utilisation")]
        public async Task<IActionResult> BudgetUtilisation([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);

            var allocs = await _db.BudgetAllocations
                .Where(a => a.TenantId == tenantId && !a.IsDeleted)
                .Join(_db.BudgetFiscalYears, a => a.FiscalYearId, f => f.Id,
                      (a, f) => new { a, FY = f.FiscalYearLabel })
                .ToListAsync();

            var actuals = await _db.BudgetActuals
                .Where(x => x.TenantId == tenantId && !x.IsDeleted && x.IsApproved)
                .ToListAsync();

            var rows = allocs.Select(x => {
                var spent = actuals.Where(a => a.FiscalYearId == x.a.FiscalYearId).Sum(a => a.Amount);
                return new {
                    FiscalYear    = x.FY,
                    Department    = x.a.DepartmentName,
                    Quarter       = x.a.Quarter.ToString(),
                    Allocated     = x.a.AllottedAmount,
                    Spent         = spent,
                    Remaining     = x.a.AllottedAmount - spent,
                    Utilisation   = x.a.AllottedAmount > 0 ? $"{spent / x.a.AllottedAmount * 100:F1}%" : "—"
                };
            }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Total Allocated",   value = rows.Sum(r => r.Allocated).ToString("N0") },
                    new { label = "Total Spent",       value = rows.Sum(r => r.Spent).ToString("N0") },
                    new { label = "Remaining",         value = rows.Sum(r => r.Remaining).ToString("N0") }
                },
                columns = new[] { "Fiscal Year", "Department", "Quarter", "Allocated", "Spent", "Remaining", "Utilisation %" },
                rows
            });
        }

        [HttpGet("sla-compliance")]
        public async Task<IActionResult> SlaCompliance([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-3);
            var toD   = to ?? DateTime.UtcNow;

            var sla = await _db.SLATrackings
                .Where(s => s.TenantId.ToString() == tenantId.ToString() && s.StageStartDate >= fromD && s.StageStartDate <= toD)
                .Join(_db.Requirements, s => s.RequirementId, r => r.Id,
                      (s, r) => new {
                          Requisition  = r.RequirementCode,
                          s.Stage,
                          DaysInStage  = s.DaysInStage - s.HoldDays,
                          TargetDays   = s.TargetDays,
                          s.Status
                      }).ToListAsync();

            return Ok(new {
                kpis = new object[] {
                    new { label = "On Track",  value = sla.Count(s => s.Status == "OnTrack") },
                    new { label = "Warning",   value = sla.Count(s => s.Status == "Warning") },
                    new { label = "Overdue",   value = sla.Count(s => s.Status == "Overdue") }
                },
                columns = new[] { "Requisition", "Stage", "Days in Stage", "Target Days", "Status" },
                rows = sla
            });
        }

        [HttpGet("source-effectiveness")]
        public async Task<IActionResult> SourceEffectiveness([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-3);
            var toD   = to ?? DateTime.UtcNow;

            var sources = await _db.CandidateSources
                .Where(s => s.TenantId == tenantId && s.RecordedAt >= fromD && s.RecordedAt <= toD)
                .ToListAsync();

            var candidates = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted)
                .Select(c => new { c.Id, c.Stage })
                .ToListAsync();

            var rows = sources
                .GroupBy(s => s.Source)
                .Select(g => {
                    var ids      = g.Select(x => x.CandidateId).Distinct().ToList();
                    var matched  = candidates.Where(c => ids.Contains(c.Id)).ToList();
                    var joinings = matched.Count(c => c.Stage == "Joined");
                    return new {
                        Source      = g.Key,
                        Submissions = matched.Count,
                        Joinings    = joinings,
                        JoiningRate = matched.Any() ? $"{(double)joinings / matched.Count * 100:F1}%" : "—"
                    };
                }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Sources Used",  value = rows.Count },
                    new { label = "Total Records", value = sources.Count }
                },
                columns = new[] { "Source", "Submissions", "Joinings", "Joining Rate" },
                rows
            });
        }

        [HttpGet("talent-pool-health")]
        public async Task<IActionResult> TalentPoolHealth([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);

            var pool = await _db.TalentPoolEntries
                .Where(t => t.TenantId == tenantId)
                .Join(_db.Candidates, t => t.CandidateId, c => c.Id,
                      (t, c) => new {
                          Candidate     = c.CandidateName,
                          Tags          = string.Join(", ", t.Tags),
                          t.NurtureStatus,
                          LastContacted = t.LastContactedAt
                      }).ToListAsync();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Pool Size",      value = pool.Count },
                    new { label = "Active",         value = pool.Count(p => p.NurtureStatus == "Active") },
                    new { label = "Passive",        value = pool.Count(p => p.NurtureStatus == "Passive") },
                    new { label = "DoNotContact",   value = pool.Count(p => p.NurtureStatus == "Do Not Contact") }
                },
                columns = new[] { "Candidate", "Tags", "Status", "Last Contacted" },
                rows = pool
            });
        }

        [HttpGet("internal-mobility")]
        public async Task<IActionResult> InternalMobility([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-3);
            var toD   = to ?? DateTime.UtcNow;

            var postings = await _db.InternalJobPostings
                .Where(p => p.TenantId == tenantId && !p.IsDeleted &&
                            p.PostedDate >= fromD && p.PostedDate <= toD)
                .Select(p => new {
                    Posting    = p.Title,
                    p.Department,
                    PostedDate = p.PostedDate,
                    p.Status
                }).ToListAsync();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Total Postings", value = postings.Count },
                    new { label = "Active",         value = postings.Count(p => p.Status == "Active") },
                    new { label = "Paused/Draft",   value = postings.Count(p => p.Status != "Active") }
                },
                columns = new[] { "Posting", "Department", "Posted Date", "Status" },
                rows = postings
            });
        }

        // ─── Talent Acquisition P3 Reports (#27–34) ──────────────────────────────

        // #27 – TA Volume by BU + Project
        [HttpGet("ta-volume-by-bu")]
        public async Task<IActionResult> TaVolumeByBu(
            [FromQuery] DateTime? from, [FromQuery] DateTime? to,
            [FromQuery] string groupBy = "Department")
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-1);
            var toD   = to   ?? DateTime.UtcNow;

            var reqs = await _db.Requirements
                .Where(r => r.TenantId == tenantId && !r.IsDeleted &&
                            r.CreatedAt >= fromD && r.CreatedAt <= toD)
                .Select(r => new {
                    Group   = r.Department ?? "—",
                    Project = r.RequirementCode,
                    r.JobTitle,
                    r.Positions,
                    r.Status
                }).ToListAsync();

            var rows = reqs
                .GroupBy(r => new { r.Group, r.Project })
                .Select(g => new Dictionary<string, object> {
                    [groupBy]         = g.Key.Group,
                    ["Project"]       = g.Key.Project,
                    ["Total Positions"] = g.Sum(r => r.Positions),
                    ["Open"]          = g.Count(r => r.Status == "Open" || r.Status == "InProgress"),
                    ["Closed"]        = g.Count(r => r.Status == "Closed")
                }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = $"Total {groupBy}s", value = rows.Select(r => r[groupBy]).Distinct().Count() },
                    new { label = "Total Positions",   value = reqs.Sum(r => r.Positions) },
                    new { label = "Open Reqs",         value = reqs.Count(r => r.Status == "Open" || r.Status == "InProgress") },
                    new { label = "Closed Reqs",       value = reqs.Count(r => r.Status == "Closed") }
                },
                chartType = "bar",
                chartMeta = new { xAxis = groupBy, series = new[] { "Open", "Closed" } },
                columns = new[] { groupBy, "Project", "Total Positions", "Open", "Closed" },
                rows
            });
        }

        // #28 – Full Year Demand + Phasing (Dual Line Chart)
        [HttpGet("full-year-demand")]
        public async Task<IActionResult> FullYearDemand(
            [FromQuery] int? year,
            [FromQuery] string groupBy = "Department")
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fy = year ?? DateTime.UtcNow.Year;
            var start = new DateTime(fy, 1, 1);
            var end   = new DateTime(fy, 12, 31);

            var reqs = await _db.Requirements
                .Where(r => r.TenantId == tenantId && !r.IsDeleted &&
                            r.CreatedAt >= start && r.CreatedAt <= end)
                .Select(r => new { r.Department, r.Positions, Month = r.CreatedAt.Month })
                .ToListAsync();

            var joined = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted && c.Stage == "Joined" &&
                            c.JoiningDate >= start && c.JoiningDate <= end)
                .Select(c => new { Month = c.JoiningDate!.Value.Month })
                .ToListAsync();

            var rows = Enumerable.Range(1, 12).Select(m => new Dictionary<string, object> {
                ["Month"]    = new DateTime(fy, m, 1).ToString("MMM"),
                ["Demand"]   = reqs.Where(r => r.Month == m).Sum(r => r.Positions),
                ["Fulfilled"] = joined.Count(j => j.Month == m)
            }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "FY Demand",    value = reqs.Sum(r => r.Positions) },
                    new { label = "FY Fulfilled", value = joined.Count },
                    new { label = "Fulfillment %", value = reqs.Sum(r => r.Positions) > 0
                        ? $"{(double)joined.Count / reqs.Sum(r => r.Positions) * 100:F1}%" : "—" }
                },
                chartType = "dualLine",
                chartMeta = new { xAxis = "Month", series = new[] { "Demand", "Fulfilled" } },
                columns   = new[] { "Month", "Demand", "Fulfilled" },
                rows,
                year = fy
            });
        }

        // #29 – Open Positions with aging + criticality
        [HttpGet("open-positions-aging")]
        public async Task<IActionResult> OpenPositionsAging([FromQuery] string groupBy = "Department")
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);

            var reqs = await _db.Requirements
                .Where(r => r.TenantId == tenantId && !r.IsDeleted &&
                            (r.Status == "Open" || r.Status == "InProgress"))
                .Select(r => new {
                    Group    = r.Department ?? "—",
                    Role     = r.JobTitle,
                    Grade    = r.ExperienceRange ?? "—",
                    Priority = r.Priority,
                    DaysOpen = (int)(DateTime.UtcNow - r.CreatedAt).TotalDays,
                    r.Positions
                }).ToListAsync();

            // Map priority to P1/P2/P3 labels
            string PriorityLabel(string p) => p switch {
                "Critical" => "P1", "High" => "P2", "Medium" => "P3", _ => "P4"
            };

            var rows = reqs.Select(r => new Dictionary<string, object> {
                [groupBy]      = r.Group,
                ["Role"]       = r.Role,
                ["Grade"]      = r.Grade,
                ["Criticality"] = PriorityLabel(r.Priority),
                ["Positions"]  = r.Positions,
                ["Days Open"]  = r.DaysOpen,
                ["Aging Band"] = r.DaysOpen switch {
                    < 15  => "0-14d",
                    < 30  => "15-29d",
                    < 45  => "30-44d",
                    < 60  => "45-59d",
                    _     => "60d+"
                }
            }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Total Open",      value = reqs.Count },
                    new { label = "P1 (Critical)",   value = reqs.Count(r => r.Priority == "Critical") },
                    new { label = "P2 (High)",        value = reqs.Count(r => r.Priority == "High") },
                    new { label = "Aged >45d",        value = reqs.Count(r => r.DaysOpen > 45) },
                    new { label = "Avg Days Open",    value = reqs.Any() ? (int)reqs.Average(r => r.DaysOpen) : 0 }
                },
                chartType = "kpiTable",
                columns   = new[] { groupBy, "Role", "Grade", "Criticality", "Positions", "Days Open", "Aging Band" },
                rows
            });
        }

        // #30 – Positions Closed MTD
        [HttpGet("positions-closed-mtd")]
        public async Task<IActionResult> PositionsClosedMtd([FromQuery] string groupBy = "Department")
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var startOfMonth = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);

            var closed = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted && c.Stage == "Joined" &&
                            c.JoiningDate >= startOfMonth)
                .Join(_db.Requirements, c => c.RequirementId, r => r.Id,
                      (c, r) => new { Group = r.Department ?? "—", r.JobTitle })
                .ToListAsync();

            var rows = closed
                .GroupBy(x => x.Group)
                .Select(g => new Dictionary<string, object> {
                    [groupBy]          = g.Key,
                    ["Positions Closed"] = g.Count()
                }).OrderByDescending(r => (int)r["Positions Closed"]).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Positions Closed MTD", value = closed.Count },
                    new { label = $"{groupBy}s Active",   value = rows.Count }
                },
                chartType = "bar",
                chartMeta = new { xAxis = groupBy, series = new[] { "Positions Closed" } },
                columns   = new[] { groupBy, "Positions Closed" },
                rows
            });
        }

        // #31 – Cost per Hire by BU
        [HttpGet("cost-per-hire")]
        public async Task<IActionResult> CostPerHire(
            [FromQuery] DateTime? from, [FromQuery] DateTime? to,
            [FromQuery] string groupBy = "Department")
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-1);
            var toD   = to   ?? DateTime.UtcNow;

            var hires = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted && c.Stage == "Joined" &&
                            c.JoiningDate >= fromD && c.JoiningDate <= toD)
                .Join(_db.Requirements, c => c.RequirementId, r => r.Id,
                      (c, r) => new {
                          Group = r.Department ?? "—",
                          c.OfferedCTC
                      }).ToListAsync();

            var orgAvg = hires.Any() ? hires.Average(h => (double)h.OfferedCTC) : 0;

            var rows = hires
                .GroupBy(h => h.Group)
                .Select(g => new Dictionary<string, object> {
                    [groupBy]         = g.Key,
                    ["Hires"]         = g.Count(),
                    ["Avg Cost"]      = g.Any() ? (long)g.Average(h => (double)h.OfferedCTC) : 0,
                    ["vs Org Avg"]    = g.Any()
                        ? $"{(g.Average(h => (double)h.OfferedCTC) - orgAvg) / (orgAvg > 0 ? orgAvg : 1) * 100:+0.#;-0.#;0}%"
                        : "—"
                }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Total Hires",    value = hires.Count },
                    new { label = "Org Avg Cost",   value = (long)orgAvg },
                    new { label = $"{groupBy}s",    value = rows.Count }
                },
                chartType = "bar",
                chartMeta = new { xAxis = groupBy, series = new[] { "Avg Cost" }, benchmarkLine = (long)orgAvg },
                columns   = new[] { groupBy, "Hires", "Avg Cost", "vs Org Avg" },
                rows
            });
        }

        // #32 – Hiring Pipeline by Stage (Funnel)
        [HttpGet("hiring-pipeline-stage")]
        public async Task<IActionResult> HiringPipelineStage(
            [FromQuery] DateTime? from, [FromQuery] DateTime? to,
            [FromQuery] string groupBy = "Department")
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddDays(-7); // weekly default
            var toD   = to   ?? DateTime.UtcNow;

            var candidates = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted &&
                            c.SubmittedDate >= fromD && c.SubmittedDate <= toD)
                .Join(_db.Requirements, c => c.RequirementId, r => r.Id,
                      (c, r) => new { Group = r.Department ?? "—", c.Stage })
                .ToListAsync();

            // Funnel stages matching the spec: Screen → Phone → Tech → Final → Offer
            var stageMap = new Dictionary<string, string> {
                ["Submitted"]  = "Screen",
                ["Screening"]  = "Screen",
                ["L1"]         = "Phone",
                ["L2"]         = "Tech",
                ["L3"]         = "Final",
                ["HR"]         = "Final",
                ["Selected"]   = "Offer",
                ["Joined"]     = "Offer"
            };
            var funnelStages = new[] { "Screen", "Phone", "Tech", "Final", "Offer" };

            var total = candidates.Count;
            var rows = funnelStages.Select(stage => {
                var count = candidates.Count(c => stageMap.TryGetValue(c.Stage, out var s) && s == stage);
                return new Dictionary<string, object> {
                    ["Stage"]        = stage,
                    ["Count"]        = count,
                    ["Conversion %"] = total > 0 ? $"{(double)count / total * 100:F1}%" : "—"
                };
            }).ToList();

            // Per-BU breakdown
            var buBreakdown = candidates
                .GroupBy(c => c.Group)
                .Select(g => {
                    var row = new Dictionary<string, object> { [groupBy] = g.Key };
                    foreach (var stage in funnelStages)
                        row[stage] = g.Count(c => stageMap.TryGetValue(c.Stage, out var s) && s == stage);
                    return row;
                }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Total in Pipeline", value = total },
                    new { label = "At Offer Stage",    value = candidates.Count(c => c.Stage == "Selected" || c.Stage == "Joined") },
                    new { label = "Offer Conversion",  value = total > 0
                        ? $"{(double)candidates.Count(c => c.Stage == "Selected" || c.Stage == "Joined") / total * 100:F1}%" : "—" }
                },
                chartType = "funnel",
                chartMeta = new { stages = funnelStages },
                columns   = new[] { "Stage", "Count", "Conversion %" },
                rows,
                buBreakdownColumns = new[] { groupBy }.Concat(funnelStages).ToArray(),
                buBreakdown
            });
        }

        // #33 – Avg Time to Hire by BU
        [HttpGet("avg-time-to-hire")]
        public async Task<IActionResult> AvgTimeToHireByBu(
            [FromQuery] DateTime? from, [FromQuery] DateTime? to,
            [FromQuery] int targetDays = 30,
            [FromQuery] string groupBy = "Department")
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-1);
            var toD   = to   ?? DateTime.UtcNow;

            var hires = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted && c.Stage == "Joined" &&
                            c.JoiningDate >= fromD && c.JoiningDate <= toD)
                .Join(_db.Requirements, c => c.RequirementId, r => r.Id,
                      (c, r) => new {
                          Group   = r.Department ?? "—",
                          TATDays = c.JoiningDate.HasValue
                              ? (int)(c.JoiningDate.Value - r.CreatedAt).TotalDays : 0
                      }).ToListAsync();

            var rows = hires
                .GroupBy(h => h.Group)
                .Select(g => new Dictionary<string, object> {
                    [groupBy]          = g.Key,
                    ["Hires"]          = g.Count(),
                    ["Avg Days"]       = g.Any() ? (int)g.Average(h => h.TATDays) : 0,
                    ["Target Days"]    = targetDays,
                    ["vs Target"]      = g.Any()
                        ? $"{(int)g.Average(h => h.TATDays) - targetDays:+0;-0;0}d"
                        : "—",
                    ["Status"]         = g.Any() && (int)g.Average(h => h.TATDays) <= targetDays
                        ? "On Target" : "Over Target"
                }).OrderBy(r => (int)r["Avg Days"]).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Hires in Period", value = hires.Count },
                    new { label = "Org Avg (days)",  value = hires.Any() ? (int)hires.Average(h => h.TATDays) : 0 },
                    new { label = "Target (days)",   value = targetDays },
                    new { label = "On Target BUs",   value = rows.Count(r => r["Status"].ToString() == "On Target") }
                },
                chartType = "bar",
                chartMeta = new { xAxis = groupBy, series = new[] { "Avg Days" }, targetLine = targetDays },
                columns   = new[] { groupBy, "Hires", "Avg Days", "Target Days", "vs Target", "Status" },
                rows
            });
        }

        // #34 – Gender Ratio in Hiring by BU
        [HttpGet("gender-ratio-hiring")]
        public async Task<IActionResult> GenderRatioHiring(
            [FromQuery] DateTime? from, [FromQuery] DateTime? to,
            [FromQuery] string groupBy = "Department")
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var fromD = from ?? DateTime.UtcNow.AddMonths(-1);
            var toD   = to   ?? DateTime.UtcNow;

            // Gender is derived from Candidate.Gender if present (add to model to enable live data)
            var hires = await _db.Candidates
                .Where(c => c.TenantId == tenantId && !c.IsDeleted && c.Stage == "Joined" &&
                            c.JoiningDate >= fromD && c.JoiningDate <= toD)
                .Join(_db.Requirements, c => c.RequirementId, r => r.Id,
                      (c, r) => new {
                          Group  = r.Department ?? "—",
                          Gender = EF.Property<string?>(c, "Gender") ?? "Not Specified"
                      }).ToListAsync();

            var rows = hires
                .GroupBy(h => h.Group)
                .Select(g => {
                    var male   = g.Count(h => h.Gender == "Male");
                    var female = g.Count(h => h.Gender == "Female");
                    var other  = g.Count(h => h.Gender != "Male" && h.Gender != "Female");
                    var total  = g.Count();
                    return new Dictionary<string, object> {
                        [groupBy]  = g.Key,
                        ["Total"]  = total,
                        ["Male"]   = male,
                        ["Female"] = female,
                        ["Other"]  = other,
                        ["M:F Ratio"] = female > 0 ? $"{(double)male / female:F1}:1" : "—",
                        ["Female %"]  = total > 0 ? $"{(double)female / total * 100:F1}%" : "—"
                    };
                }).ToList();

            return Ok(new {
                kpis = new object[] {
                    new { label = "Total New Joins", value = hires.Count },
                    new { label = "Male",            value = hires.Count(h => h.Gender == "Male") },
                    new { label = "Female",          value = hires.Count(h => h.Gender == "Female") },
                    new { label = "Female %",        value = hires.Any()
                        ? $"{(double)hires.Count(h => h.Gender == "Female") / hires.Count * 100:F1}%" : "—" }
                },
                chartType  = "donut",
                chartMeta  = new { segments = new[] { "Male", "Female", "Other" }, groupBy },
                columns    = new[] { groupBy, "Total", "Male", "Female", "Other", "M:F Ratio", "Female %" },
                rows,
                note = "Add a 'Gender' string field to the Candidate model to enable live gender tracking."
            });
        }

        // Generic stub for remaining report types (offer-dropout, diversity-hiring)
        [HttpGet("{reportType}")]
        public IActionResult Generic(string reportType)
        {
            return Ok(new {
                kpis    = new object[] { new { label = "No Data", value = 0 } },
                columns = new string[] { },
                rows    = new object[] { }
            });
        }
    }
}
