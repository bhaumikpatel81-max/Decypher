using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Decypher.Web.Services
{
    public class TenantService : ITenantService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TenantService(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<Tenant?> GetTenantByIdAsync(Guid tenantId)
        {
            return await _context.Tenants.FindAsync(tenantId);
        }

        public async Task<Tenant?> GetTenantByUserIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return null;
            
            return await _context.Tenants.FindAsync(user.TenantId);
        }

        public async Task<bool> UpdateTenantAsync(Tenant tenant)
        {
            try
            {
                _context.Tenants.Update(tenant);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }

    public class VendorService : IVendorService
    {
        private readonly ApplicationDbContext _context;

        public VendorService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Vendor>> GetAllVendorsAsync(Guid tenantId)
        {
            _context.SetCurrentTenant(tenantId);
            return await _context.Vendors
                .OrderByDescending(v => v.QualityScore)
                .ToListAsync();
        }

        public async Task<Vendor?> GetVendorByIdAsync(Guid id)
        {
            return await _context.Vendors
                .Include(v => v.Candidates)
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<bool> CreateVendorAsync(Vendor vendor)
        {
            try
            {
                _context.Vendors.Add(vendor);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateVendorAsync(Vendor vendor)
        {
            try
            {
                _context.Vendors.Update(vendor);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteVendorAsync(Guid id)
        {
            try
            {
                var vendor = await _context.Vendors.FindAsync(id);
                if (vendor == null) return false;
                
                vendor.IsDeleted = true;
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<Dictionary<string, object>> GetVendorPerformanceMetricsAsync(Guid tenantId)
        {
            _context.SetCurrentTenant(tenantId);
            
            var vendors = await _context.Vendors.ToListAsync();
            var metrics = new Dictionary<string, object>
            {
                ["TotalVendors"] = vendors.Count,
                ["ActiveVendors"] = vendors.Count(v => v.Status == "Active"),
                ["AverageQualityScore"] = vendors.Any() ? vendors.Average(v => v.QualityScore) : 0,
                ["AverageSlaCompliance"] = vendors.Any() ? vendors.Average(v => v.SlaComplianceScore) : 0,
                ["AverageJoiningRate"] = vendors.Any() ? vendors.Average(v => v.JoiningRatePercent) : 0,
                ["TopVendors"] = vendors.OrderByDescending(v => v.QualityScore).Take(5).ToList()
            };
            
            return metrics;
        }
    }

    public class RequirementService : IRequirementService
    {
        private readonly ApplicationDbContext _context;

        public RequirementService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Requirement>> GetAllRequirementsAsync(Guid tenantId)
        {
            _context.SetCurrentTenant(tenantId);
            return await _context.Requirements
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<Requirement?> GetRequirementByIdAsync(Guid id)
        {
            return await _context.Requirements
                .Include(r => r.Candidates)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<bool> CreateRequirementAsync(Requirement requirement)
        {
            try
            {
                _context.Requirements.Add(requirement);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateRequirementAsync(Requirement requirement)
        {
            try
            {
                _context.Requirements.Update(requirement);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteRequirementAsync(Guid id)
        {
            try
            {
                var requirement = await _context.Requirements.FindAsync(id);
                if (requirement == null) return false;
                
                requirement.IsDeleted = true;
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<Dictionary<string, int>> GetRequirementStatusCountsAsync(Guid tenantId)
        {
            _context.SetCurrentTenant(tenantId);
            
            var requirements = await _context.Requirements.ToListAsync();
            return new Dictionary<string, int>
            {
                ["Open"] = requirements.Count(r => r.Status == "Open"),
                ["InProgress"] = requirements.Count(r => r.Status == "InProgress"),
                ["OnHold"] = requirements.Count(r => r.Status == "OnHold"),
                ["Closed"] = requirements.Count(r => r.Status == "Closed"),
                ["Cancelled"] = requirements.Count(r => r.Status == "Cancelled")
            };
        }
    }

    public class CandidateService : ICandidateService
    {
        private readonly ApplicationDbContext _context;

        public CandidateService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Candidate>> GetAllCandidatesAsync(Guid tenantId)
        {
            _context.SetCurrentTenant(tenantId);
            return await _context.Candidates
                .Include(c => c.Vendor)
                .Include(c => c.Requirement)
                .OrderByDescending(c => c.SubmittedDate)
                .ToListAsync();
        }

        public async Task<Candidate?> GetCandidateByIdAsync(Guid id)
        {
            return await _context.Candidates
                .Include(c => c.Vendor)
                .Include(c => c.Requirement)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<bool> CreateCandidateAsync(Candidate candidate)
        {
            try
            {
                _context.Candidates.Add(candidate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateCandidateAsync(Candidate candidate)
        {
            try
            {
                _context.Candidates.Update(candidate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteCandidateAsync(Guid id)
        {
            try
            {
                var candidate = await _context.Candidates.FindAsync(id);
                if (candidate == null) return false;
                
                candidate.IsDeleted = true;
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<Candidate>> GetCandidatesByRequirementAsync(Guid requirementId)
        {
            return await _context.Candidates
                .Include(c => c.Vendor)
                .Where(c => c.RequirementId == requirementId)
                .OrderByDescending(c => c.CvJdMatchScore)
                .ToListAsync();
        }

        public async Task<List<Candidate>> GetCandidatesByVendorAsync(Guid vendorId)
        {
            return await _context.Candidates
                .Include(c => c.Requirement)
                .Where(c => c.VendorId == vendorId)
                .OrderByDescending(c => c.SubmittedDate)
                .ToListAsync();
        }

        public async Task<Dictionary<string, int>> GetCandidateStageCountsAsync(Guid tenantId)
        {
            _context.SetCurrentTenant(tenantId);
            
            var candidates = await _context.Candidates.ToListAsync();
            return new Dictionary<string, int>
            {
                ["Submitted"] = candidates.Count(c => c.Stage == "Submitted"),
                ["Screening"] = candidates.Count(c => c.Stage == "Screening"),
                ["L1"] = candidates.Count(c => c.Stage == "L1"),
                ["L2"] = candidates.Count(c => c.Stage == "L2"),
                ["L3"] = candidates.Count(c => c.Stage == "L3"),
                ["HR"] = candidates.Count(c => c.Stage == "HR"),
                ["Selected"] = candidates.Count(c => c.Stage == "Selected"),
                ["Rejected"] = candidates.Count(c => c.Stage == "Rejected"),
                ["Joined"] = candidates.Count(c => c.Stage == "Joined"),
                ["Dropped"] = candidates.Count(c => c.Stage == "Dropped")
            };
        }

        public async Task<List<Candidate>> GetHighRiskCandidatesAsync(Guid tenantId, decimal riskThreshold = 70)
        {
            _context.SetCurrentTenant(tenantId);
            
            return await _context.Candidates
                .Include(c => c.Vendor)
                .Include(c => c.Requirement)
                .Where(c => c.DropoutRiskScore >= riskThreshold && c.Stage == "Selected")
                .OrderByDescending(c => c.DropoutRiskScore)
                .ToListAsync();
        }
    }

    public class ReportService : IReportService
    {
        private readonly ApplicationDbContext _context;

        public ReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Dictionary<string, object>> GetDashboardMetricsAsync(Guid tenantId)
        {
            _context.SetCurrentTenant(tenantId);
            
            var candidates = await _context.Candidates.ToListAsync();
            var requirements = await _context.Requirements.ToListAsync();
            var vendors = await _context.Vendors.ToListAsync();
            
            var currentMonth = DateTime.UtcNow.Month;
            var currentYear = DateTime.UtcNow.Year;
            var lastMonth = DateTime.UtcNow.AddMonths(-1);
            
            var currentMonthCandidates = candidates.Where(c => c.SubmittedDate.Month == currentMonth && c.SubmittedDate.Year == currentYear).ToList();
            var lastMonthCandidates = candidates.Where(c => c.SubmittedDate.Month == lastMonth.Month && c.SubmittedDate.Year == lastMonth.Year).ToList();
            
            return new Dictionary<string, object>
            {
                ["TotalCandidates"] = candidates.Count,
                ["TotalRequirements"] = requirements.Count,
                ["TotalVendors"] = vendors.Count,
                ["OpenRequirements"] = requirements.Count(r => r.Status == "Open"),
                ["ActiveCandidates"] = candidates.Count(c => c.Stage != "Rejected" && c.Stage != "Dropped"),
                ["CandidatesThisMonth"] = currentMonthCandidates.Count,
                ["CandidatesLastMonth"] = lastMonthCandidates.Count,
                ["SelectionRatio"] = candidates.Any() ? (decimal)candidates.Count(c => c.Stage == "Selected") / candidates.Count * 100 : 0,
                ["AverageTimeToJoin"] = candidates.Where(c => c.JoiningDate.HasValue).Any() 
                    ? candidates.Where(c => c.JoiningDate.HasValue).Average(c => (c.JoiningDate!.Value - c.SubmittedDate).Days) 
                    : 0
            };
        }

        public async Task<List<RecruiterPerformance>> GetRecruiterPerformanceAsync(Guid tenantId, int? month = null, int? year = null)
        {
            _context.SetCurrentTenant(tenantId);
            
            var query = _context.RecruiterPerformances.AsQueryable();
            
            if (month.HasValue)
                query = query.Where(rp => rp.Month == month.Value);
                
            if (year.HasValue)
                query = query.Where(rp => rp.Year == year.Value);
            
            return await query
                .OrderByDescending(rp => rp.TotalJoinings)
                .ToListAsync();
        }

        public async Task<Dictionary<string, object>> GetPipelineVelocityAsync(Guid tenantId)
        {
            _context.SetCurrentTenant(tenantId);
            
            var candidates = await _context.Candidates.ToListAsync();
            
            var avgScreeningToL1 = candidates.Where(c => c.ScreeningDate.HasValue && c.L1Date.HasValue)
                .Average(c => (c.L1Date!.Value - c.ScreeningDate!.Value).Days);
                
            var avgL1ToL2 = candidates.Where(c => c.L1Date.HasValue && c.L2Date.HasValue)
                .Average(c => (c.L2Date!.Value - c.L1Date!.Value).Days);
                
            var avgL2ToOffer = candidates.Where(c => c.L2Date.HasValue && c.OfferDate.HasValue)
                .Average(c => (c.OfferDate!.Value - c.L2Date!.Value).Days);
                
            var avgOfferToJoining = candidates.Where(c => c.OfferDate.HasValue && c.JoiningDate.HasValue)
                .Average(c => (c.JoiningDate!.Value - c.OfferDate!.Value).Days);
            
            return new Dictionary<string, object>
            {
                ["AverageScreeningToL1Days"] = avgScreeningToL1,
                ["AverageL1ToL2Days"] = avgL1ToL2,
                ["AverageL2ToOfferDays"] = avgL2ToOffer,
                ["AverageOfferToJoiningDays"] = avgOfferToJoining,
                ["TotalAverageDays"] = avgScreeningToL1 + avgL1ToL2 + avgL2ToOffer + avgOfferToJoining
            };
        }
    }

    public class AIService : IAIService
    {
        public async Task<decimal> CalculateCvJdMatchScoreAsync(string cvText, string jdText)
        {
            // Simplified matching algorithm
            // In production, use actual NLP/ML model
            await Task.CompletedTask;
            
            var cvWords = cvText.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            var jdWords = jdText.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            
            var matchCount = cvWords.Intersect(jdWords).Count();
            var score = (decimal)matchCount / jdWords.Length * 100;
            
            return Math.Min(score, 100);
        }

        public async Task<decimal> PredictDropoutRiskAsync(Candidate candidate)
        {
            // Simplified risk prediction
            // In production, use trained ML model
            await Task.CompletedTask;
            
            decimal risk = 0;
            
            // Higher notice period = higher risk
            if (candidate.NoticePeriod?.Contains("90") == true)
                risk += 20;
            else if (candidate.NoticePeriod?.Contains("60") == true)
                risk += 10;
            
            // Higher CTC gap = higher risk
            var ctcGap = candidate.ExpectedCTC - candidate.OfferedCTC;
            if (ctcGap > 2)
                risk += 15;
            
            // Longer time since offer = higher risk
            if (candidate.OfferDate.HasValue)
            {
                var daysSinceOffer = (DateTime.UtcNow - candidate.OfferDate.Value).Days;
                if (daysSinceOffer > 30)
                    risk += 25;
                else if (daysSinceOffer > 15)
                    risk += 15;
            }
            
            return Math.Min(risk, 100);
        }

        public async Task<decimal> CalculateCompetencyScoreAsync(Candidate candidate, Dictionary<string, decimal> weights)
        {
            // Weighted competency scoring
            await Task.CompletedTask;
            
            decimal totalScore = 0;
            decimal totalWeight = weights.Values.Sum();
            
            foreach (var (competency, weight) in weights)
            {
                // Simplified competency matching
                var candidateSkills = candidate.Skills?.ToLower() ?? "";
                var score = candidateSkills.Contains(competency.ToLower()) ? 100m : 50m;
                
                totalScore += (score * weight);
            }
            
            return totalWeight > 0 ? totalScore / totalWeight : 0;
        }

        public async Task<Dictionary<string, object>> AnalyzeJobDescriptionAsync(string jdText)
        {
            // Simplified JD analysis
            // In production, use NLP for bias detection
            await Task.CompletedTask;
            
            var biasWords = new[] { "young", "energetic", "ninja", "rockstar", "guru" };
            var biasCount = biasWords.Count(word => jdText.ToLower().Contains(word));
            
            var readabilityScore = 100 - (jdText.Length / 100); // Simplified
            var inclusivityScore = 100 - (biasCount * 10);
            
            return new Dictionary<string, object>
            {
                ["BiasScore"] = biasCount * 10,
                ["ReadabilityScore"] = Math.Max(readabilityScore, 0),
                ["InclusivityScore"] = Math.Max(inclusivityScore, 0),
                ["BiasWordsFound"] = biasWords.Where(word => jdText.ToLower().Contains(word)).ToList(),
                ["SuggestedImprovements"] = new List<string>
                {
                    "Consider using gender-neutral language",
                    "Add salary range for transparency",
                    "Include remote work options if applicable"
                }
            };
        }
    }
}
