using System;

namespace Decypher.Web.DTOs
{
    public class CandidateDTO
    {
        public Guid Id { get; set; }
        public Guid VendorId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string CurrentRole { get; set; } = string.Empty;
        public string CurrentCompany { get; set; } = string.Empty;
        public int YearsOfExperience { get; set; }
        public string[] Skills { get; set; } = Array.Empty<string>();
        public decimal CurrentSalary { get; set; }
        public string Stage { get; set; } = string.Empty;
        public int DaysInPipeline { get; set; }
        public decimal DropoutRisk { get; set; }
        public string? DropoutReason { get; set; }
        public decimal ResumeScore { get; set; }
        public DateTime SubmissionDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateCandidateDTO
    {
        public Guid VendorId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string CurrentRole { get; set; } = string.Empty;
        public string CurrentCompany { get; set; } = string.Empty;
        public int YearsOfExperience { get; set; }
        public string[] Skills { get; set; } = Array.Empty<string>();
        public decimal CurrentSalary { get; set; }
    }

    public class UpdateCandidateDTO
    {
        public string? Stage { get; set; }
        public decimal? DropoutRisk { get; set; }
        public string? DropoutReason { get; set; }
        public decimal? ResumeScore { get; set; }
    }
}
