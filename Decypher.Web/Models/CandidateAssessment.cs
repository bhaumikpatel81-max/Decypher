using System;

namespace Decypher.Web.Models
{
    public class CandidateAssessment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public string AssessmentType { get; set; } = string.Empty; // Technical, Cultural, Fit, etc.
        public decimal Score { get; set; } // 0-100
        public string Feedback { get; set; } = string.Empty;
        public DateTime AssessedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation
        public Candidate? Candidate { get; set; }
    }
}
