using Decypher.Web.Data;
using Decypher.Web.DTOs;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly ApplicationDbContext _context;

        public CandidateService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CandidateDTO>> GetAllCandidatesAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);
            return await _context.Candidates
                .AsNoTracking()
                .Select(c => MapToDTO(c))
                .ToListAsync();
        }

        public async Task<CandidateDTO?> GetCandidateByIdAsync(Guid id, string tenantId)
        {
            _context.SetTenantId(tenantId);
            var candidate = await _context.Candidates
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            return candidate != null ? MapToDTO(candidate) : null;
        }

        public async Task<CandidateDTO> CreateCandidateAsync(CreateCandidateDTO dto, string tenantId)
        {
            var candidate = new Candidate
            {
                TenantId = Guid.TryParse(tenantId, out var parsedTenantId) ? parsedTenantId : Guid.Empty,
                VendorId = dto.VendorId,
                RequirementId = await GetDefaultRequirementIdAsync(tenantId),
                CandidateName = $"{dto.FirstName} {dto.LastName}".Trim(),
                Email = dto.Email,
                Phone = dto.Phone,
                CurrentDesignation = dto.CurrentRole,
                CurrentCompany = dto.CurrentCompany,
                TotalExperience = dto.YearsOfExperience,
                Skills = JsonSerializer.Serialize(dto.Skills),
                CurrentCTC = dto.CurrentSalary,
                Stage = "Submitted",
                DropoutRiskScore = 0,
                CvJdMatchScore = 0
            };

            _context.Candidates.Add(candidate);
            await _context.SaveChangesAsync();

            return MapToDTO(candidate);
        }

        public async Task<CandidateDTO?> UpdateCandidateAsync(Guid id, UpdateCandidateDTO dto, string tenantId)
        {
            _context.SetTenantId(tenantId);
            var candidate = await _context.Candidates.FirstOrDefaultAsync(c => c.Id == id);

            if (candidate == null) return null;

            if (!string.IsNullOrEmpty(dto.Stage)) candidate.Stage = dto.Stage;
            if (dto.DropoutRisk.HasValue) candidate.DropoutRiskScore = dto.DropoutRisk.Value;
            if (!string.IsNullOrEmpty(dto.DropoutReason)) candidate.DropoutReason = dto.DropoutReason;
            if (dto.ResumeScore.HasValue) candidate.CvJdMatchScore = dto.ResumeScore.Value;

            await _context.SaveChangesAsync();
            return MapToDTO(candidate);
        }

        public async Task<bool> DeleteCandidateAsync(Guid id, string tenantId)
        {
            _context.SetTenantId(tenantId);
            var candidate = await _context.Candidates.FirstOrDefaultAsync(c => c.Id == id);
            if (candidate == null) return false;

            _context.Candidates.Remove(candidate);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CandidateDTO>> GetHighRiskCandidatesAsync(string tenantId, decimal threshold = 70)
        {
            _context.SetTenantId(tenantId);
            return await _context.Candidates
                .AsNoTracking()
                .Where(c => c.DropoutRiskScore >= threshold && c.Stage != "Joined")
                .Select(c => MapToDTO(c))
                .ToListAsync();
        }

        public async Task<IEnumerable<CandidateDTO>> GetCandidatesByStageAsync(string tenantId, string stage)
        {
            _context.SetTenantId(tenantId);
            return await _context.Candidates
                .AsNoTracking()
                .Where(c => c.Stage == stage)
                .Select(c => MapToDTO(c))
                .ToListAsync();
        }

        public async Task<Dictionary<string, int>> GetCandidateCountByStageAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);
            return await _context.Candidates
                .AsNoTracking()
                .GroupBy(c => c.Stage)
                .Select(g => new { Stage = g.Key, Count = g.Count() })
                .ToDictionaryAsync(x => x.Stage, x => x.Count);
        }

        public async Task<decimal> CalculateDropoutRiskAsync(Guid candidateId, string tenantId)
        {
            _context.SetTenantId(tenantId);
            var candidate = await _context.Candidates.FirstOrDefaultAsync(c => c.Id == candidateId);
            if (candidate == null) return 0;

            var riskScore = (DateTime.UtcNow - candidate.SubmittedDate).Days * 2; // 2% per day
            return Math.Min(riskScore, 100);
        }

        private CandidateDTO MapToDTO(Candidate candidate)
        {
            var nameParts = candidate.CandidateName.Split(' ', 2, StringSplitOptions.RemoveEmptyEntries);
            return new CandidateDTO
            {
                Id = candidate.Id,
                VendorId = candidate.VendorId,
                FirstName = nameParts.Length > 0 ? nameParts[0] : string.Empty,
                LastName = nameParts.Length > 1 ? nameParts[1] : string.Empty,
                Email = candidate.Email,
                Phone = candidate.Phone ?? string.Empty,
                CurrentRole = candidate.CurrentDesignation ?? string.Empty,
                CurrentCompany = candidate.CurrentCompany ?? string.Empty,
                YearsOfExperience = (int)candidate.TotalExperience,
                Skills = ParseSkills(candidate.Skills),
                CurrentSalary = candidate.CurrentCTC,
                Stage = candidate.Stage,
                DaysInPipeline = (DateTime.UtcNow - candidate.SubmittedDate).Days,
                DropoutRisk = candidate.DropoutRiskScore,
                DropoutReason = candidate.DropoutReason,
                ResumeScore = candidate.CvJdMatchScore,
                SubmissionDate = candidate.SubmittedDate,
                CreatedAt = candidate.CreatedAt
            };
        }

        private async Task<Guid> GetDefaultRequirementIdAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);
            var requirement = await _context.Requirements.AsNoTracking().FirstOrDefaultAsync();
            return requirement?.Id ?? Guid.Empty;
        }

        private static string[] ParseSkills(string? skills)
        {
            if (string.IsNullOrWhiteSpace(skills))
            {
                return Array.Empty<string>();
            }

            try
            {
                return JsonSerializer.Deserialize<string[]>(skills) ?? Array.Empty<string>();
            }
            catch
            {
                return skills.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            }
        }
    }
}
