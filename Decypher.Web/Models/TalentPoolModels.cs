namespace Decypher.Web.Models
{
    public class TalentPoolEntry
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public List<string> Tags { get; set; } = new();
        public string Notes { get; set; } = string.Empty;
        public string NurtureStatus { get; set; } = "Passive"; // Active | Passive | Do Not Contact
        public DateTime? LastContactedAt { get; set; }
        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }
    }

    public class TalentPoolCampaign
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public List<string> TargetTags { get; set; } = new();
        public string Subject { get; set; } = string.Empty;
        public string MessageTemplate { get; set; } = string.Empty;
        public DateTime? SentAt { get; set; }
        public Guid TenantId { get; set; }
    }

    public class CreateCampaignRequest
    {
        public string Name { get; set; } = string.Empty;
        public List<string> TargetTags { get; set; } = new();
        public string Subject { get; set; } = string.Empty;
        public string MessageTemplate { get; set; } = string.Empty;
    }

    public class UpdateTagsRequest
    {
        public List<string> Tags { get; set; } = new();
    }
}
