using System;
using System.Collections.Generic;

namespace Decypher.Web.Models
{
    public class Candidate
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string TenantId { get; set; } = string.Empty;
        public Guid VendorId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        
        // Career info
        public string CurrentRole { get; set; } = string.Empty;
        public string CurrentCompany { get; set; } = string.Empty;
        public int YearsOfExperience { get; set; }
        public string[] Skills { get; set; } = Array.Empty<string>();
        public decimal CurrentSalary { get; set; }
        
        // Pipeline tracking
        public string Stage { get; set; } = "Submitted"; // Submitted, Shortlisted, Interview, Offer, Hired, Rejected, Dropout
        public int DaysInPipeline { get; set; }
        public decimal DropoutRisk { get; set; } = 0; // 0-100 score
        public string? DropoutReason { get; set; }
        
        // Assessment
        public decimal ResumeScore { get; set; } = 0; // 0-100
        public string? ResumeUrl { get; set; }
        public string? InterviewNotes { get; set; }
        
        // Dates
        public DateTime SubmissionDate { get; set; } = DateTime.UtcNow;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation
        public Vendor? Vendor { get; set; }
        public ICollection<CandidateAssessment>? Assessments { get; set; }
    }
}
