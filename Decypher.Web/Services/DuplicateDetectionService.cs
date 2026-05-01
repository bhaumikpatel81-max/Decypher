using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    public interface IDuplicateDetectionService
    {
        Task<IEnumerable<DuplicateGroup>> GetDuplicatesAsync(string tenantId);
        Task<bool> MergeCandidatesAsync(Guid primaryId, List<Guid> duplicateIds, string tenantId);
        Task DismissDuplicatesAsync(List<Guid> candidateIds, string tenantId);
    }

    public class DuplicateGroup
    {
        public string MatchReason { get; set; } = string.Empty;
        public List<CandidateSummary> Candidates { get; set; } = new();
    }

    public class CandidateSummary
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string Stage { get; set; } = string.Empty;
        public DateTime SubmissionDate { get; set; }
    }

    public class DuplicateDetectionService : IDuplicateDetectionService
    {
        private readonly ApplicationDbContext _db;

        public DuplicateDetectionService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<DuplicateGroup>> GetDuplicatesAsync(string tenantId)
        {
            _db.SetTenantId(tenantId);
            var candidates = await _db.Candidates
                .AsNoTracking()
                .Select(c => new CandidateSummary
                {
                    Id = c.Id,
                    Name = c.CandidateName,
                    Email = c.Email,
                    Phone = c.Phone,
                    Stage = c.Stage,
                    SubmissionDate = c.SubmittedDate
                })
                .ToListAsync();

            var groups = new List<DuplicateGroup>();
            var grouped = new HashSet<Guid>();

            // Group by normalized email
            var byEmail = candidates
                .Where(c => !string.IsNullOrWhiteSpace(c.Email))
                .GroupBy(c => NormalizeEmail(c.Email))
                .Where(g => g.Count() > 1);

            foreach (var g in byEmail)
            {
                var members = g.OrderBy(c => c.SubmissionDate).ToList();
                if (members.Any(m => grouped.Contains(m.Id))) continue;
                members.ForEach(m => grouped.Add(m.Id));
                groups.Add(new DuplicateGroup { MatchReason = "Same email", Candidates = members });
            }

            // Group by normalized name (first + last, case-insensitive)
            var byName = candidates
                .Where(c => !grouped.Contains(c.Id) && !string.IsNullOrWhiteSpace(c.Name))
                .GroupBy(c => NormalizeName(c.Name))
                .Where(g => g.Count() > 1 && g.Key.Length > 3);

            foreach (var g in byName)
            {
                var members = g.OrderBy(c => c.SubmissionDate).ToList();
                if (members.Any(m => grouped.Contains(m.Id))) continue;
                members.ForEach(m => grouped.Add(m.Id));
                groups.Add(new DuplicateGroup { MatchReason = "Same name", Candidates = members });
            }

            return groups;
        }

        public async Task<bool> MergeCandidatesAsync(Guid primaryId, List<Guid> duplicateIds, string tenantId)
        {
            _db.SetTenantId(tenantId);
            var primary = await _db.Candidates.FirstOrDefaultAsync(c => c.Id == primaryId);
            if (primary == null) return false;

            var duplicates = await _db.Candidates
                .Where(c => duplicateIds.Contains(c.Id))
                .ToListAsync();

            // Fill in missing fields on primary from duplicates
            foreach (var dup in duplicates)
            {
                if (string.IsNullOrWhiteSpace(primary.Phone) && !string.IsNullOrWhiteSpace(dup.Phone))
                    primary.Phone = dup.Phone;
                if (string.IsNullOrWhiteSpace(primary.CurrentDesignation) && !string.IsNullOrWhiteSpace(dup.CurrentDesignation))
                    primary.CurrentDesignation = dup.CurrentDesignation;
                if (primary.TotalExperience == 0 && dup.TotalExperience > 0)
                    primary.TotalExperience = dup.TotalExperience;
                if (primary.DropoutRiskScore < dup.DropoutRiskScore)
                    primary.DropoutRiskScore = dup.DropoutRiskScore;
            }

            _db.Candidates.RemoveRange(duplicates);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task DismissDuplicatesAsync(List<Guid> candidateIds, string tenantId)
        {
            // In production, store dismissed pairs in a DismissedDuplicates table.
            // For now, this is a no-op that signals "not a duplicate".
            await Task.CompletedTask;
        }

        private static string NormalizeEmail(string email) =>
            email.Trim().ToLowerInvariant();

        private static string NormalizeName(string name) =>
            Regex.Replace(name.Trim().ToLowerInvariant(), @"\s+", " ");
    }
}
