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
        public string EventType { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? AgentName { get; set; }

        [MaxLength(50)]
        public string? EntityId { get; set; }

        [Required]
        public string InputHash { get; set; } = string.Empty;

        [Required]
        public string OutputHash { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string ModelVersion { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string PromptVersion { get; set; } = string.Empty;

        public double Confidence { get; set; }

        public bool RequiredHumanReview { get; set; }

        [MaxLength(100)]
        public string? ActorId { get; set; }

        [Required]
        public string Checksum { get; set; } = string.Empty;

        [Required]
        public string TenantId { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
