namespace Decypher.Web.Models
{
    public class CandidateApplication
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public Guid JobId { get; set; }
        public string Status { get; set; } = "Applied"; // Applied | UnderReview | Interview | Decision
        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
        public string CoverLetter { get; set; } = string.Empty;
        public string ResumeFileName { get; set; } = string.Empty;
        public string ApplicantEmail { get; set; } = string.Empty;
        public string ApplicantName { get; set; } = string.Empty;
        public Guid TenantId { get; set; }
    }

    public class PortalApplicationRequest
    {
        public Guid JobId { get; set; }
        public string ApplicantName { get; set; } = string.Empty;
        public string ApplicantEmail { get; set; } = string.Empty;
        public string CoverLetter { get; set; } = string.Empty;
    }
}
