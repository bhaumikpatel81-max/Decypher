using Decypher.Web.Data;
using Decypher.Web.Models;

namespace Decypher.Web.Services
{
    public interface ITalentPoolService
    {
        Task<List<TalentPoolEntry>> ListAsync(string? tag, string? search, Guid tenantId);
        Task<TalentPoolEntry> AddAsync(Guid candidateId, Guid tenantId);
        Task<TalentPoolEntry> UpdateTagsAsync(Guid id, List<string> tags, Guid tenantId);
        Task<TalentPoolCampaign> CreateCampaignAsync(CreateCampaignRequest req, Guid tenantId);
        Task SendCampaignAsync(Guid campaignId, Guid tenantId);
    }

    public class TalentPoolService : ITalentPoolService
    {
        private readonly ApplicationDbContext _db;
        private readonly INotificationService _notifications;

        public TalentPoolService(ApplicationDbContext db, INotificationService notifications)
        {
            _db = db;
            _notifications = notifications;
        }

        public async Task<List<TalentPoolEntry>> ListAsync(string? tag, string? search, Guid tenantId)
        {
            var query = _db.TalentPoolEntries.Where(e => e.TenantId == tenantId);
            if (!string.IsNullOrEmpty(tag))
                query = query.Where(e => e.Tags.Contains(tag));
            return await Task.FromResult(query.ToList());
        }

        public async Task<TalentPoolEntry> AddAsync(Guid candidateId, Guid tenantId)
        {
            var entry = new TalentPoolEntry { CandidateId = candidateId, TenantId = tenantId };
            _db.TalentPoolEntries.Add(entry);
            await _db.SaveChangesAsync();
            return entry;
        }

        public async Task<TalentPoolEntry> UpdateTagsAsync(Guid id, List<string> tags, Guid tenantId)
        {
            var entry = _db.TalentPoolEntries.First(e => e.Id == id && e.TenantId == tenantId);
            entry.Tags = tags;
            await _db.SaveChangesAsync();
            return entry;
        }

        public async Task<TalentPoolCampaign> CreateCampaignAsync(CreateCampaignRequest req, Guid tenantId)
        {
            var campaign = new TalentPoolCampaign
            {
                Name = req.Name,
                TargetTags = req.TargetTags,
                Subject = req.Subject,
                MessageTemplate = req.MessageTemplate,
                TenantId = tenantId
            };
            _db.TalentPoolCampaigns.Add(campaign);
            await _db.SaveChangesAsync();
            return campaign;
        }

        public async Task SendCampaignAsync(Guid campaignId, Guid tenantId)
        {
            var campaign = _db.TalentPoolCampaigns.First(c => c.Id == campaignId && c.TenantId == tenantId);
            var entries = _db.TalentPoolEntries
                             .Where(e => e.TenantId == tenantId && e.Tags.Any(t => campaign.TargetTags.Contains(t)))
                             .ToList();

            foreach (var entry in entries)
            {
                var candidate = _db.Candidates.FirstOrDefault(c => c.Id == entry.CandidateId);
                if (candidate == null) continue;
                var body = campaign.MessageTemplate.Replace("{{candidateName}}", candidate.CandidateName?.Split(' ').FirstOrDefault() ?? "there");
                await _notifications.SendEmailAsync(candidate.Email, campaign.Subject, $"<p>{body}</p>");
                entry.LastContactedAt = DateTime.UtcNow;
            }

            campaign.SentAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }
    }
}
