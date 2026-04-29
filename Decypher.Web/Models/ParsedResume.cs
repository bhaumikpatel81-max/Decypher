using System.Text.Json.Serialization;

namespace Decypher.Web.Models
{
    public class WorkExperience
    {
        public string Company { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class Education
    {
        public string Institution { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public string Field { get; set; } = string.Empty;
        public string GraduationYear { get; set; } = string.Empty;
    }

    public class ParsedResume
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public List<string> Skills { get; set; } = new();
        public List<WorkExperience> Experience { get; set; } = new();
        public List<Education> EducationHistory { get; set; } = new();
        public List<string> Certifications { get; set; } = new();
        public string RawText { get; set; } = string.Empty;
        public DateTime ParsedAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }
    }

    public class ResumeParserRequest
    {
        public string? CvText { get; set; }
    }

    public class ResumeParserResponse
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public List<string> Skills { get; set; } = new();
        public List<WorkExperience> Experience { get; set; } = new();
        public List<Education> EducationHistory { get; set; } = new();
        public List<string> Certifications { get; set; } = new();
        public DateTime ParsedAt { get; set; }
    }
}
