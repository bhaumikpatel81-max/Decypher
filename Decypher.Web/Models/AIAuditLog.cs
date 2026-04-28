using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Decypher.Web.Models
{
    /// <summary>
    /// Append-only. Never update or delete rows. Tamper-evident via SHA-256 checksum.
    /// </summary>
    [Table("AIAuditLogs")]
    public class AIAuditLog
    {
        [Key]
        public long Id { get; set; }

        [Required, MaxLength(100)]
        public string EventType { get; set; }           // "resume_screening", "jd_generation", etc.

        [MaxLength(100)]
        public string AgentName { get; set; }

        [MaxLength(50)]
        public string EntityId { get; set; }            // ApplicationId, RequirementId, etc.

        [Required]
        public string InputHash { get; set; }           // SHA-256 of PII-redacted input

        [Required]
        public string OutputHash { get; set; }          // SHA-256 of output JSON

        [Required, MaxLength(100)]
        public string ModelVersion { get; set; }        // e.g. "gpt-4o-2024-05-13"

        [Required, MaxLength(50)]
        public string PromptVersion { get; set; }       // e.g. "v3.2.1"

        public double Confidence { get; set; }

        public bool RequiredHumanReview { get; set; }   // true when confidence < threshold

        [MaxLength(100)]
        public string ActorId { get; set; }             // UserId who triggered action

        [Required]
        public string Checksum { get; set; }            // SHA-256 of entire row for tamper evidence

        [Required]
        public string TenantId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
