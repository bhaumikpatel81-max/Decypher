using Decypher.Web.Data;
using Decypher.Web.Models;

namespace Decypher.Web.Services
{
    public interface ISourceTrackingService
    {
        Task<List<SourceSummaryItem>> GetSummaryAsync(Guid tenantId);
        Task<List<CandidateSource>> GetCandidatesGroupedAsync(Guid tenantId);
        Task<CandidateSource> UpdateSourceAsync(Guid candidateId, string source, string campaignCode, Guid tenantId);
    }

    public class SourceTrackingService : ISourceTrackingService
    {
        private readonly ApplicationDbContext _db;

        public SourceTrackingService(ApplicationDbContext db) => _db = db;

        public async Task<List<SourceSummaryItem>> GetSummaryAsync(Guid tenantId)
        {
            var sources = _db.CandidateSources.Where(s => s.TenantId == tenantId).ToList();
            var groups = sources.GroupBy(s => s.Source)
                .Select(g => new SourceSummaryItem
                {
                    Source = g.Key,
                    Applicants = g.Count(),
                    Interviews = 0,
                    Offers = 0,
                    Hires = 0,
                    ConversionPct = 0
                }).ToList();
            return await Task.FromResult(groups);
        }

        public async Task<List<CandidateSource>> GetCandidatesGroupedAsync(Guid tenantId)
        {
            return await Task.FromResult(_db.CandidateSources.Where(s => s.TenantId == tenantId).ToList());
        }

        public async Task<CandidateSource> UpdateSourceAsync(Guid candidateId, string source, string campaignCode, Guid tenantId)
        {
            var existing = _db.CandidateSources.FirstOrDefault(s => s.CandidateId == candidateId && s.TenantId == tenantId);
            if (existing != null)
            {
                existing.Source = source;
                existing.CampaignCode = campaignCode;
            }
            else
            {
                existing = new CandidateSource
                {
                    CandidateId = candidateId,
                    Source = source,
                    CampaignCode = campaignCode,
                    TenantId = tenantId
                };
                _db.CandidateSources.Add(existing);
            }
            await _db.SaveChangesAsync();
            return existing;
        }
    }
}
