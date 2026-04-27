using System;
using System.Collections.Generic;

namespace Decypher.Web.Models
{
    public class JobDescription
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string TenantId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string[] RequiredSkills { get; set; } = Array.Empty<string>();
        public string[] PreferredSkills { get; set; } = Array.Empty<string>();
        public decimal MinSalary { get; set; }
        public decimal MaxSalary { get; set; }
        public string Level { get; set; } = "Mid"; // Junior, Mid, Senior, Lead
        public int OpenPositions { get; set; } = 1
        public string Status { get; set; } = "Open"; // Open, Closed, Filled, OnHold
        
        // Analysis results
        public int[] KeywordAnalysis { get; set; } = Array.Empty<int>();
        public string? AnalysisScore { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedById { get; set; }
    }
}
