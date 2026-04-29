using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Decypher.Web.Models
{
    // ─── Enums ────────────────────────────────────────────────────────────────

    public enum FiscalYearStatus { Draft, Active, Locked, Archived }

    public enum BudgetCategory { Permanent, Contract, Intern, Replacement, NewRole }

    public enum BudgetQuarter { Q1, Q2, Q3, Q4 }

    public enum BudgetLineItemType
    {
        BaseSalary, SigningBonus, AgencyFee, BackgroundCheck,
        RelocationCost, TrainingCost, EquipmentCost, Other
    }

    // ─── Fiscal Year ──────────────────────────────────────────────────────────

    public class BudgetFiscalYear : BaseEntity
    {
        [Required, MaxLength(50)]
        public string FiscalYearLabel { get; set; } = string.Empty; // e.g. "FY 2025-26"

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalBudgetAmount { get; set; }

        [MaxLength(10)]
        public string Currency { get; set; } = "USD";

        public FiscalYearStatus Status { get; set; } = FiscalYearStatus.Draft;

        public string? Notes { get; set; }

        public virtual ICollection<BudgetAllocation> Allocations { get; set; } = new List<BudgetAllocation>();
        public virtual ICollection<BudgetActual> Actuals { get; set; } = new List<BudgetActual>();
    }

    // ─── Department-level allocation ─────────────────────────────────────────

    public class BudgetAllocation : BaseEntity
    {
        [Required]
        public Guid FiscalYearId { get; set; }

        [Required, MaxLength(100)]
        public string DepartmentName { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? DepartmentCode { get; set; }

        public int HeadcountPlanned { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal AllottedAmount { get; set; }

        public BudgetCategory Category { get; set; } = BudgetCategory.Permanent;

        public BudgetQuarter Quarter { get; set; } = BudgetQuarter.Q1;

        public string? Notes { get; set; }

        public virtual BudgetFiscalYear FiscalYear { get; set; } = null!;
        public virtual ICollection<BudgetLineItem> LineItems { get; set; } = new List<BudgetLineItem>();
    }

    // ─── Line-item breakdown per allocation ───────────────────────────────────

    public class BudgetLineItem : BaseEntity
    {
        [Required]
        public Guid AllocationId { get; set; }

        public BudgetLineItemType LineItemType { get; set; } = BudgetLineItemType.BaseSalary;

        [Column(TypeName = "decimal(18,2)")]
        public decimal PlannedAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? ActualAmount { get; set; }

        public string? Notes { get; set; }

        public virtual BudgetAllocation Allocation { get; set; } = null!;
    }

    // ─── Actual spend ─────────────────────────────────────────────────────────

    public class BudgetActual : BaseEntity
    {
        [Required]
        public Guid FiscalYearId { get; set; }

        public Guid? AllocationId { get; set; }

        public Guid? RequisitionId { get; set; }

        public Guid? CandidateId { get; set; }

        public BudgetLineItemType SpendCategory { get; set; } = BudgetLineItemType.Other;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public DateTime SpendDate { get; set; } = DateTime.UtcNow;

        [MaxLength(200)]
        public string? InvoiceReference { get; set; }

        public Guid? VendorId { get; set; }

        [MaxLength(450)] // ASP.NET Identity string key
        public string? ApprovedById { get; set; }

        [MaxLength(100)]
        public string? DepartmentName { get; set; }

        public bool IsApproved { get; set; } = false;

        public string? Notes { get; set; }

        public virtual BudgetFiscalYear FiscalYear { get; set; } = null!;
        public virtual Vendor? Vendor { get; set; }
    }

    // ─── Per-tenant cost category config ─────────────────────────────────────

    public class BudgetCostCategoryConfig : BaseEntity
    {
        [Required, MaxLength(100)]
        public string CategoryName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string CategoryCode { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        public int DisplayOrder { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? DefaultEstimatePerHire { get; set; }
    }

    // ─── Per-tenant fiscal / budget configuration ─────────────────────────────

    public class BudgetTenantConfig : BaseEntity
    {
        /// <summary>1 = January, 4 = April for Indian FY, etc.</summary>
        public int FiscalYearStartMonth { get; set; } = 1;

        [MaxLength(10)]
        public string DefaultCurrency { get; set; } = "USD";

        public bool BudgetApprovalRequired { get; set; } = false;

        [Column(TypeName = "decimal(18,2)")]
        public decimal? CostPerHireTargetAmount { get; set; }

        /// <summary>Actuals above this amount require approval before counting.</summary>
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ApprovalThresholdAmount { get; set; }

        [MaxLength(7)]
        public string BrandColor { get; set; } = "#1565C0";
    }
}
