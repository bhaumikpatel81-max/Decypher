namespace Decypher.Web.Models
{
    public class OnboardingRecord
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string CandidateId { get; set; } = string.Empty;
        public string CandidateName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string OfferId { get; set; } = string.Empty;
        public string OverallStatus { get; set; } = "Pending"; // Pending | InProgress | Complete
        public DateTime? ExpectedStartDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }
        public ICollection<OnboardingChecklistItem> Items { get; set; } = new List<OnboardingChecklistItem>();
    }

    public class OnboardingChecklistItem
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid OnboardingRecordId { get; set; }
        public string Category { get; set; } = string.Empty; // ITSetup | Documents | Orientation | BackgroundCheck | ESignature
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending"; // Pending | InProgress | Complete
        public string? Notes { get; set; }
        public bool RequiresSignature { get; set; } = false;
        public string? DocumentUrl { get; set; }
        public bool Signed { get; set; } = false;
        public DateTime? CompletedAt { get; set; }
        public Guid TenantId { get; set; }
        public OnboardingRecord? OnboardingRecord { get; set; }
    }

    public class InitiateOnboardingRequest
    {
        public string CandidateId { get; set; } = string.Empty;
        public string CandidateName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string OfferId { get; set; } = string.Empty;
        public DateTime? ExpectedStartDate { get; set; }
    }

    public class UpdateChecklistItemRequest
    {
        public string Status { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public bool? Signed { get; set; }
    }
}
