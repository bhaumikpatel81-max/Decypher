namespace Decypher.Web.Models
{
    public class Offer
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public Guid JobId { get; set; }
        public decimal Salary { get; set; }
        public string Currency { get; set; } = "GBP";
        public DateTime StartDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Status { get; set; } = "Draft"; // Draft | Sent | Accepted | Declined | Withdrawn
        public string OfferLetterUrl { get; set; } = string.Empty;
        public List<string> Benefits { get; set; } = new();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }
    }

    public class CreateOfferRequest
    {
        public Guid CandidateId { get; set; }
        public Guid JobId { get; set; }
        public decimal Salary { get; set; }
        public string Currency { get; set; } = "GBP";
        public DateTime StartDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public List<string> Benefits { get; set; } = new();
    }

    public class UpdateOfferStatusRequest
    {
        public string Status { get; set; } = string.Empty;
    }
}
