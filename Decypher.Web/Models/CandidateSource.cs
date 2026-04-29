namespace Decypher.Web.Models
{
    public class CandidateSource
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public string Source { get; set; } = "Portal"; // LinkedIn | Indeed | Referral | Portal | Agency | Other
        public string CampaignCode { get; set; } = string.Empty;
        public DateTime RecordedAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }
    }

    public class UpdateSourceRequest
    {
        public string Source { get; set; } = string.Empty;
        public string CampaignCode { get; set; } = string.Empty;
    }

    public class SourceSummaryItem
    {
        public string Source { get; set; } = string.Empty;
        public int Applicants { get; set; }
        public int Interviews { get; set; }
        public int Offers { get; set; }
        public int Hires { get; set; }
        public double ConversionPct { get; set; }
    }
}
