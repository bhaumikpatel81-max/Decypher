using System;
using System.ComponentModel.DataAnnotations;

namespace Decypher.Web.Models
{
    // Base entity with multi-tenancy support
    public abstract class BaseEntity
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        public Guid TenantId { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsDeleted { get; set; } = false;
    }

    // Tenant (Company)
    public class Tenant
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        [MaxLength(200)]
        public string CompanyName { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? CompanyAddress { get; set; }
        
        [MaxLength(100)]
        public string? Industry { get; set; }
        
        [MaxLength(20)]
        public string? Phone { get; set; }
        
        public int EmployeeCount { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
        
        // Subscription info
        [MaxLength(50)]
        public string SubscriptionPlan { get; set; } = "Free"; // Free, Growth, Enterprise
        
        public DateTime? SubscriptionStartDate { get; set; }
        public DateTime? SubscriptionEndDate { get; set; }
        
        // Navigation properties
        public virtual ICollection<ApplicationUser> Users { get; set; } = new List<ApplicationUser>();
        public virtual ICollection<Vendor> Vendors { get; set; } = new List<Vendor>();
        public virtual ICollection<Requirement> Requirements { get; set; } = new List<Requirement>();
        public virtual ICollection<Candidate> Candidates { get; set; } = new List<Candidate>();
    }

    // User roles enum
    public enum UserRole
    {
        SuperAdmin = 0,      // Platform admin (Bhaumik)
        TenantAdmin = 1,     // Client company admin
        TeamLead = 2,        // Team leader
        Recruiter = 3,       // Recruiter
        Viewer = 4           // Read-only access
    }

    // Vendor
    public class Vendor : BaseEntity
    {
        [Required]
        [MaxLength(200)]
        public string VendorName { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? ContactPerson { get; set; }
        
        [MaxLength(100)]
        public string? Email { get; set; }
        
        [MaxLength(20)]
        public string? Phone { get; set; }
        
        [MaxLength(500)]
        public string? Address { get; set; }
        
        [MaxLength(50)]
        public string? City { get; set; }
        
        [MaxLength(50)]
        public string? State { get; set; }
        
        // Performance metrics
        public decimal QualityScore { get; set; } = 0;
        public decimal SlaComplianceScore { get; set; } = 0;
        public decimal JoiningRatePercent { get; set; } = 0;
        public int TotalSubmissions { get; set; } = 0;
        public int TotalJoinings { get; set; } = 0;
        public int TotalRejections { get; set; } = 0;
        public decimal AvgTimeToSubmit { get; set; } = 0; // in days
        
        [MaxLength(50)]
        public string Status { get; set; } = "Active"; // Active, Inactive, Blacklisted
        
        // Navigation properties
        public virtual Tenant Tenant { get; set; } = null!;
        public virtual ICollection<Candidate> Candidates { get; set; } = new List<Candidate>();
    }

    // Requirement (Job Requisition)
    public class Requirement : BaseEntity
    {
        [Required]
        [MaxLength(200)]
        public string JobTitle { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string RequirementCode { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? Department { get; set; }
        
        [MaxLength(100)]
        public string? HiringManager { get; set; }
        
        public int Positions { get; set; } = 1;
        
        [MaxLength(50)]
        public string? Location { get; set; }
        
        [MaxLength(50)]
        public string? ExperienceRange { get; set; } // e.g., "3-5 years"
        
        [MaxLength(50)]
        public string? SalaryRange { get; set; }
        
        public string? JobDescription { get; set; }
        
        public string? RequiredSkills { get; set; } // JSON array of skills
        
        public DateTime? TargetDate { get; set; }
        
        [MaxLength(50)]
        public string Status { get; set; } = "Open"; // Open, InProgress, OnHold, Closed, Cancelled
        
        [MaxLength(50)]
        public string Priority { get; set; } = "Medium"; // Low, Medium, High, Critical
        
        // Hold/Cancel fields
        public string? HoldReason { get; set; }
        public DateTime? HoldStartDate { get; set; }
        public string? CancelReason { get; set; }
        public DateTime? RevisedClosureDate { get; set; }

        // Navigation properties
        public virtual Tenant Tenant { get; set; } = null!;
        public virtual ICollection<Candidate> Candidates { get; set; } = new List<Candidate>();
        public virtual ICollection<RequisitionStatusHistory> StatusHistory { get; set; } = new List<RequisitionStatusHistory>();
    }

    public class RequisitionStatusHistory : BaseEntity
    {
        [Required]
        public Guid RequirementId { get; set; }

        [Required, MaxLength(50)]
        public string FromStatus { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string ToStatus { get; set; } = string.Empty;

        public string? Reason { get; set; }
        public string? ChangedById { get; set; }
        public DateTime ChangedAt { get; set; } = DateTime.UtcNow;

        public virtual Requirement Requirement { get; set; } = null!;
    }

    public class InternalJobPosting : BaseEntity
    {
        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Department { get; set; }

        [MaxLength(100)]
        public string? Location { get; set; }

        [MaxLength(50)]
        public string EmploymentType { get; set; } = "FullTime"; // FullTime, PartTime, Contract, Intern

        [MaxLength(50)]
        public string PostingType { get; set; } = "Internal"; // Internal, Referral, Both

        public string? Description { get; set; }
        public string? Requirements { get; set; }

        public decimal? SalaryBandMin { get; set; }
        public decimal? SalaryBandMax { get; set; }

        [MaxLength(10)]
        public string Currency { get; set; } = "INR";

        public bool ShowSalary { get; set; } = false;

        public DateTime? PostedDate { get; set; }
        public DateTime? ClosingDate { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Draft"; // Draft, Active, Paused

        public Guid? LinkedRequisitionId { get; set; }
        public string? Notes { get; set; }
    }

    // Candidate
    public class Candidate : BaseEntity
    {
        [Required]
        [MaxLength(200)]
        public string CandidateName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;
        
        [MaxLength(20)]
        public string? Phone { get; set; }
        
        [MaxLength(100)]
        public string? CurrentCompany { get; set; }
        
        [MaxLength(100)]
        public string? CurrentDesignation { get; set; }
        
        public decimal TotalExperience { get; set; } = 0; // in years
        
        public decimal ExpectedCTC { get; set; } = 0;
        public decimal CurrentCTC { get; set; } = 0;
        
        [MaxLength(100)]
        public string? NoticePeriod { get; set; }
        
        [MaxLength(50)]
        public string? Location { get; set; }
        
        public string? Skills { get; set; } // JSON array
        
        public string? ResumeUrl { get; set; }
        public string? ResumeText { get; set; }
        
        // Sourcing details
        [Required]
        public Guid VendorId { get; set; }
        
        [Required]
        public Guid RequirementId { get; set; }
        
        public DateTime SubmittedDate { get; set; } = DateTime.UtcNow;
        
        // Interview & Selection
        [MaxLength(50)]
        public string Stage { get; set; } = "Submitted"; // Submitted, Screening, L1, L2, L3, HR, Selected, Rejected, Joined, Dropped
        
        public DateTime? ScreeningDate { get; set; }
        public DateTime? L1Date { get; set; }
        public DateTime? L2Date { get; set; }
        public DateTime? L3Date { get; set; }
        public DateTime? HrRoundDate { get; set; }
        public DateTime? OfferDate { get; set; }
        public DateTime? JoiningDate { get; set; }
        
        [MaxLength(50)]
        public string? ScreeningResult { get; set; }
        [MaxLength(50)]
        public string? L1Result { get; set; }
        [MaxLength(50)]
        public string? L2Result { get; set; }
        [MaxLength(50)]
        public string? L3Result { get; set; }
        [MaxLength(50)]
        public string? HrResult { get; set; }
        
        public decimal OfferedCTC { get; set; } = 0;
        
        public string? RejectionReason { get; set; }
        public string? DropoutReason { get; set; }
        
        // AI Scores
        public decimal CvJdMatchScore { get; set; } = 0; // 0-100
        public decimal DropoutRiskScore { get; set; } = 0; // 0-100
        public decimal CompetencyScore { get; set; } = 0; // 0-100
        
        public string? InterviewFeedback { get; set; }
        
        // Navigation properties
        public virtual Tenant Tenant { get; set; } = null!;
        public virtual Vendor Vendor { get; set; } = null!;
        public virtual Requirement Requirement { get; set; } = null!;
    }

    // Recruiter Performance Tracking
    public class RecruiterPerformance : BaseEntity
    {
        [Required]
        public string UserId { get; set; } = string.Empty; // ApplicationUser.Id
        
        [Required]
        [MaxLength(200)]
        public string RecruiterName { get; set; } = string.Empty;
        
        public int Month { get; set; }
        public int Year { get; set; }
        
        // Metrics
        public int TotalSubmissions { get; set; } = 0;
        public int TotalSelections { get; set; } = 0;
        public int TotalJoinings { get; set; } = 0;
        public int TotalRejections { get; set; } = 0;
        public int TotalDropouts { get; set; } = 0;
        
        public decimal SelectionRatio { get; set; } = 0; // selections/submissions
        public decimal JoiningRatio { get; set; } = 0; // joinings/selections
        public decimal AvgTimeToJoin { get; set; } = 0; // in days
        
        public int OpenRequirements { get; set; } = 0;
        public int ClosedRequirements { get; set; } = 0;
        
        // Navigation properties
        public virtual Tenant Tenant { get; set; } = null!;
        public virtual ApplicationUser User { get; set; } = null!;
    }

    // Activity Log
    public class ActivityLog
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        public Guid TenantId { get; set; }
        
        [Required]
        public string UserId { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string UserName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string Action { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? EntityType { get; set; }
        
        public Guid? EntityId { get; set; }
        
        [MaxLength(200)]
        public string? Description { get; set; }
        
        public string? Metadata { get; set; } // JSON
        
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        
        [MaxLength(50)]
        public string? IpAddress { get; set; }
        
        // Navigation properties
        public virtual Tenant Tenant { get; set; } = null!;
    }

    public class RefreshToken
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string UserId { get; set; } = string.Empty;

        [Required, MaxLength(512)]
        public string Token { get; set; } = string.Empty;

        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [MaxLength(45)]
        public string? CreatedByIp { get; set; }

        public bool IsRevoked { get; set; } = false;
        public DateTime? RevokedAt { get; set; }

        [MaxLength(512)]
        public string? ReplacedByToken { get; set; }

        public bool IsActive => !IsRevoked && DateTime.UtcNow < ExpiresAt;

        public virtual ApplicationUser User { get; set; } = null!;
    }
}
