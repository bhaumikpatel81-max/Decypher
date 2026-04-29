using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Decypher.Web.Models
{
    [Table("SLATrackings")]
    public class SLATracking
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid RequirementId { get; set; }

        [ForeignKey("RequirementId")]
        public virtual Requirement Requirement { get; set; }

        [Required, MaxLength(50)]
        public string Stage { get; set; }               // "Applied","Screened","Interview","Offer","Hired"

        public DateTime StageStartDate { get; set; }
        public DateTime? StageEndDate { get; set; }

        public int DaysInStage { get; set; }
        public int HoldDays { get; set; } = 0;          // Total days requirement was OnHold (excluded from TAT)
        public int TargetDays { get; set; } = 20;       // Configurable; default 20 days

        [MaxLength(20)]
        public string Status { get; set; }              // "OnTrack", "Warning", "Overdue"

        public DateTime? PredictedCompletionDate { get; set; }  // AI SLA prediction
        public double PredictionConfidence { get; set; }

        [Required]
        public string TenantId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
