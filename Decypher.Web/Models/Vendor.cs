using System;
using System.Collections.Generic;

namespace Decypher.Web.Models
{
    public class Vendor
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string TenantId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Category { get; set; } = "General"; // Recruiter, Staffing, etc.
        
        // Performance metrics
        public int TotalSubmissions { get; set; }
        public int SuccessfulPlacements { get; set; }
        public decimal QualityScore { get; set; } // 0-100
        public decimal SLAScore { get; set; } // 0-100
        public string Status { get; set; } = "Active"; // Active, Inactive, Suspended
        
        // Dates
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedById { get; set; }

        // Navigation
        public ICollection<Candidate>? Candidates { get; set; }
    }
}
