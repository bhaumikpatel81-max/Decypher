using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Decypher.Web.Models
{
    // ═══════════════════════════════════════════════════════════════
    // EMPLOYEE DIRECTORY
    // ═══════════════════════════════════════════════════════════════

    public class Employee : BaseEntity
    {
        [Required, MaxLength(20)]
        public string EmployeeCode { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required, MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(100)]
        public string? Department { get; set; }

        [MaxLength(100)]
        public string? Designation { get; set; }

        [MaxLength(100)]
        public string? Location { get; set; }

        [MaxLength(20)]
        public string Gender { get; set; } = "Other"; // Male, Female, Other

        public DateTime? DateOfBirth { get; set; }
        public DateTime DateOfJoining { get; set; } = DateTime.UtcNow;
        public DateTime? DateOfLeaving { get; set; }

        [MaxLength(50)]
        public string EmploymentType { get; set; } = "FullTime"; // FullTime, PartTime, Contract, Intern

        [MaxLength(50)]
        public string Status { get; set; } = "Active"; // Active, OnLeave, Inactive, Terminated

        public Guid? ManagerId { get; set; }

        [MaxLength(500)]
        public string? Address { get; set; }

        [MaxLength(500)]
        public string? ProfilePictureUrl { get; set; }

        [MaxLength(50)]
        public string? PAN { get; set; }

        [MaxLength(50)]
        public string? UAN { get; set; } // Universal Account Number (PF)

        [MaxLength(50)]
        public string? ESIC { get; set; }

        [MaxLength(100)]
        public string? BankName { get; set; }

        [MaxLength(50)]
        public string? BankAccountNumber { get; set; }

        [MaxLength(20)]
        public string? IFSC { get; set; }

        // Self-referencing FK for org chart
        [ForeignKey(nameof(ManagerId))]
        public virtual Employee? Manager { get; set; }

        public virtual ICollection<Employee> DirectReports { get; set; } = new List<Employee>();
        public virtual ICollection<LeaveRequest> LeaveRequests { get; set; } = new List<LeaveRequest>();
        public virtual ICollection<AttendanceRecord> AttendanceRecords { get; set; } = new List<AttendanceRecord>();
    }

    // ═══════════════════════════════════════════════════════════════
    // LEAVE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    public class LeaveType : BaseEntity
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty; // Casual, Sick, Earned, Maternity, Paternity, CompOff

        [MaxLength(500)]
        public string? Description { get; set; }

        public int MaxDaysPerYear { get; set; } = 12;
        public bool CarryForwardAllowed { get; set; } = false;
        public int MaxCarryForwardDays { get; set; } = 0;
        public bool IsHalfDayAllowed { get; set; } = true;
        public bool RequiresDocuments { get; set; } = false;
        public bool IsActive { get; set; } = true;

        [MaxLength(20)]
        public string Color { get; set; } = "#6b4df0";

        public virtual ICollection<LeaveBalance> Balances { get; set; } = new List<LeaveBalance>();
        public virtual ICollection<LeaveRequest> Requests { get; set; } = new List<LeaveRequest>();
    }

    public class LeaveBalance : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required]
        public Guid LeaveTypeId { get; set; }

        public int Year { get; set; } = DateTime.UtcNow.Year;
        public decimal Allocated { get; set; } = 0;
        public decimal Used { get; set; } = 0;
        public decimal Pending { get; set; } = 0;
        public decimal CarriedForward { get; set; } = 0;

        [NotMapped]
        public decimal Remaining => Allocated + CarriedForward - Used - Pending;

        public virtual Employee Employee { get; set; } = null!;
        public virtual LeaveType LeaveType { get; set; } = null!;
    }

    public class LeaveRequest : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required]
        public Guid LeaveTypeId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Days { get; set; }
        public bool IsHalfDay { get; set; } = false;

        [MaxLength(50)]
        public string HalfDayPeriod { get; set; } = ""; // First, Second

        [MaxLength(1000)]
        public string? Reason { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected, Cancelled

        public string? ApprovedById { get; set; }
        public DateTime? ApprovedAt { get; set; }

        [MaxLength(500)]
        public string? ApproverComments { get; set; }

        [MaxLength(500)]
        public string? DocumentUrl { get; set; }

        public virtual Employee Employee { get; set; } = null!;
        public virtual LeaveType LeaveType { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // ATTENDANCE
    // ═══════════════════════════════════════════════════════════════

    public class AttendanceRecord : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        public DateTime Date { get; set; }
        public DateTime? PunchIn { get; set; }
        public DateTime? PunchOut { get; set; }

        [NotMapped]
        public double WorkingHours => (PunchIn.HasValue && PunchOut.HasValue)
            ? (PunchOut.Value - PunchIn.Value).TotalHours : 0;

        [MaxLength(50)]
        public string Status { get; set; } = "Absent"; // Present, Absent, HalfDay, Late, WeekOff, Holiday, OnLeave

        [MaxLength(50)]
        public string PunchInMethod { get; set; } = "Manual"; // Manual, Biometric, Mobile, WebApp

        public double? InLatitude { get; set; }
        public double? InLongitude { get; set; }
        public double? OutLatitude { get; set; }
        public double? OutLongitude { get; set; }
        public bool WithinGeoFence { get; set; } = true;

        [MaxLength(500)]
        public string? InAddress { get; set; }

        [MaxLength(500)]
        public string? OutAddress { get; set; }

        public bool DoorAccessGranted { get; set; } = false;

        [MaxLength(500)]
        public string? Notes { get; set; }

        public virtual Employee Employee { get; set; } = null!;
    }

    public class AttendancePolicy : BaseEntity
    {
        [MaxLength(100)]
        public string Name { get; set; } = "Default Policy";

        public TimeSpan ShiftStartTime { get; set; } = new TimeSpan(9, 0, 0);
        public TimeSpan ShiftEndTime { get; set; } = new TimeSpan(18, 0, 0);
        public int GraceMinutes { get; set; } = 15;
        public double RequiredHoursPerDay { get; set; } = 8;
        public double GeoFenceRadiusMeters { get; set; } = 200;
        public bool GeoFenceEnabled { get; set; } = false;
        public bool BiometricEnabled { get; set; } = false;
        public bool IsDefault { get; set; } = true;
    }

    // ═══════════════════════════════════════════════════════════════
    // SHIFT MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    public class ShiftDefinition : BaseEntity
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty; // Morning, Evening, Night, General

        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public double WorkingHours { get; set; } = 8;
        public bool IsNightShift { get; set; } = false;

        [MaxLength(20)]
        public string Color { get; set; } = "#6b4df0";

        public bool IsActive { get; set; } = true;

        public virtual ICollection<EmployeeShift> EmployeeShifts { get; set; } = new List<EmployeeShift>();
    }

    public class EmployeeShift : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required]
        public Guid ShiftDefinitionId { get; set; }

        public DateTime EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }

        public virtual Employee Employee { get; set; } = null!;
        public virtual ShiftDefinition ShiftDefinition { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // TIMESHEET
    // ═══════════════════════════════════════════════════════════════

    public class TimesheetEntry : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        public DateTime Date { get; set; }

        [MaxLength(100)]
        public string? ProjectCode { get; set; }

        [MaxLength(200)]
        public string? TaskDescription { get; set; }

        public double HoursWorked { get; set; } = 0;
        public bool IsBillable { get; set; } = true;

        [MaxLength(50)]
        public string Status { get; set; } = "Draft"; // Draft, Submitted, Approved, Rejected

        public string? SubmittedById { get; set; }
        public DateTime? SubmittedAt { get; set; }
        public string? ApprovedById { get; set; }
        public DateTime? ApprovedAt { get; set; }

        public virtual Employee Employee { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // OVERTIME
    // ═══════════════════════════════════════════════════════════════

    public class OvertimeRequest : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public double Hours { get; set; }

        [MaxLength(500)]
        public string? Reason { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected

        public string? ApprovedById { get; set; }
        public DateTime? ApprovedAt { get; set; }

        [MaxLength(50)]
        public string CompensationType { get; set; } = "Pay"; // Pay, CompOff

        public virtual Employee Employee { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // SALARY STRUCTURE
    // ═══════════════════════════════════════════════════════════════

    public class SalaryComponent : BaseEntity
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty; // Basic, HRA, SpecialAllowance, PF, TDS

        [MaxLength(50)]
        public string ComponentCode { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Type { get; set; } = "Earning"; // Earning, Deduction, Statutory

        public bool IsFixed { get; set; } = true;
        public decimal? FixedAmount { get; set; }
        public decimal? PercentageOfBasic { get; set; }
        public bool IsTaxable { get; set; } = true;
        public bool IsActive { get; set; } = true;
        public int DisplayOrder { get; set; } = 0;
    }

    public class EmployeeSalary : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        public decimal BasicSalary { get; set; }
        public decimal HRA { get; set; }
        public decimal SpecialAllowance { get; set; }
        public decimal ConveyanceAllowance { get; set; }
        public decimal MedicalAllowance { get; set; }
        public decimal OtherAllowances { get; set; }

        [NotMapped]
        public decimal GrossSalary => BasicSalary + HRA + SpecialAllowance + ConveyanceAllowance + MedicalAllowance + OtherAllowances;

        public decimal EmployeePF { get; set; }
        public decimal EmployerPF { get; set; }
        public decimal EmployeeESIC { get; set; }
        public decimal EmployerESIC { get; set; }
        public decimal ProfessionalTax { get; set; }
        public decimal IncomeTax { get; set; }

        [NotMapped]
        public decimal TotalDeductions => EmployeePF + EmployeeESIC + ProfessionalTax + IncomeTax;

        [NotMapped]
        public decimal NetSalary => GrossSalary - TotalDeductions;

        public decimal TotalCTC { get; set; }
        public DateTime EffectiveFrom { get; set; }
        public DateTime? EffectiveTo { get; set; }
        public bool IsActive { get; set; } = true;

        public virtual Employee Employee { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // PAYROLL
    // ═══════════════════════════════════════════════════════════════

    public class PayrollRun : BaseEntity
    {
        public int Month { get; set; }
        public int Year { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Draft"; // Draft, Processing, Processed, Approved, Disbursed

        public DateTime? RunDate { get; set; }
        public DateTime? DisbursementDate { get; set; }

        public decimal TotalGross { get; set; }
        public decimal TotalDeductions { get; set; }
        public decimal TotalNet { get; set; }
        public int EmployeeCount { get; set; }

        public string? RunById { get; set; }
        public string? ApprovedById { get; set; }
        public DateTime? ApprovedAt { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }

        public virtual ICollection<Payslip> Payslips { get; set; } = new List<Payslip>();
    }

    public class Payslip : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required]
        public Guid PayrollRunId { get; set; }

        public int Month { get; set; }
        public int Year { get; set; }

        // Earnings
        public decimal BasicSalary { get; set; }
        public decimal HRA { get; set; }
        public decimal SpecialAllowance { get; set; }
        public decimal ConveyanceAllowance { get; set; }
        public decimal MedicalAllowance { get; set; }
        public decimal OtherAllowances { get; set; }
        public decimal OvertimePay { get; set; }
        public decimal Bonus { get; set; }
        public decimal GrossPay { get; set; }

        // Deductions
        public decimal EmployeePF { get; set; }
        public decimal EmployeeESIC { get; set; }
        public decimal ProfessionalTax { get; set; }
        public decimal IncomeTaxTDS { get; set; }
        public decimal LoanDeduction { get; set; }
        public decimal OtherDeductions { get; set; }
        public decimal TotalDeductions { get; set; }

        public decimal NetPay { get; set; }

        // Working days
        public int WorkingDays { get; set; }
        public int PresentDays { get; set; }
        public int LeaveDays { get; set; }
        public int AbsentDays { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Generated"; // Generated, Sent, Downloaded

        [MaxLength(500)]
        public string? PayslipUrl { get; set; }

        public virtual Employee Employee { get; set; } = null!;
        public virtual PayrollRun PayrollRun { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // TAX & STATUTORY
    // ═══════════════════════════════════════════════════════════════

    public class TaxDeclaration : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [MaxLength(20)]
        public string FinancialYear { get; set; } = string.Empty; // e.g. 2024-25

        [MaxLength(20)]
        public string TaxRegime { get; set; } = "New"; // Old, New

        // 80C Investments
        public decimal EPF { get; set; }
        public decimal PPF { get; set; }
        public decimal LIC { get; set; }
        public decimal ELSS { get; set; }
        public decimal HomeLoanPrincipal { get; set; }
        public decimal OtherSection80C { get; set; }

        // Other deductions
        public decimal HRAExemption { get; set; }
        public decimal LTAExemption { get; set; }
        public decimal MedicalInsurance80D { get; set; }
        public decimal HomeLoanInterest { get; set; }
        public decimal NPS80CCD { get; set; }

        public decimal TotalDeductions { get; set; }
        public decimal TaxableIncome { get; set; }
        public decimal EstimatedTax { get; set; }
        public decimal TDSDeducted { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Draft"; // Draft, Submitted, Verified

        public virtual Employee Employee { get; set; } = null!;
    }

    public class StatutoryFiling : BaseEntity
    {
        [MaxLength(50)]
        public string FilingType { get; set; } = string.Empty; // PF, ESI, TDS, PT, Gratuity

        [MaxLength(20)]
        public string Period { get; set; } = string.Empty; // e.g. "Apr-2025", "Q1-2025-26"

        public DateTime DueDate { get; set; }
        public DateTime? FiledDate { get; set; }

        public decimal Amount { get; set; }
        public decimal PenaltyAmount { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Filed, Overdue, Waived

        [MaxLength(500)]
        public string? AcknowledgementNo { get; set; }

        [MaxLength(500)]
        public string? DocumentUrl { get; set; }

        public string? FiledById { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════
    // EXPENSE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    public class ExpenseClaim : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required, MaxLength(100)]
        public string Category { get; set; } = string.Empty; // Travel, Food, Accommodation, Communication, Other

        [MaxLength(500)]
        public string? Description { get; set; }

        public decimal Amount { get; set; }
        public DateTime ExpenseDate { get; set; }

        [MaxLength(500)]
        public string? ReceiptUrl { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Draft"; // Draft, Submitted, Approved, Rejected, Reimbursed

        public string? ApprovedById { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public DateTime? ReimbursedAt { get; set; }

        [MaxLength(500)]
        public string? RejectionReason { get; set; }

        [MaxLength(100)]
        public string? ProjectCode { get; set; }

        public virtual Employee Employee { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // COMPENSATION & BENEFITS
    // ═══════════════════════════════════════════════════════════════

    public class CompensationReview : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        public DateTime ReviewDate { get; set; }
        public decimal OldCTC { get; set; }
        public decimal NewCTC { get; set; }
        public decimal HikeAmount { get; set; }
        public decimal HikePercentage { get; set; }
        public DateTime EffectiveDate { get; set; }

        [MaxLength(500)]
        public string? Reason { get; set; } // Annual, Promotion, Market Correction, Performance

        [MaxLength(50)]
        public string Status { get; set; } = "Draft"; // Draft, Approved, Rejected, Implemented

        public string? ApprovedById { get; set; }
        public DateTime? ApprovedAt { get; set; }

        public virtual Employee Employee { get; set; } = null!;
    }

    public class BenefitPlan : BaseEntity
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Type { get; set; } = string.Empty; // Medical, Life, Dental, Vision, Accident, NPS

        [MaxLength(200)]
        public string? Provider { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; }

        public decimal EmployerContribution { get; set; }
        public decimal EmployeeContribution { get; set; }
        public bool IsActive { get; set; } = true;

        public virtual ICollection<EmployeeBenefit> Enrollments { get; set; } = new List<EmployeeBenefit>();
    }

    public class EmployeeBenefit : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required]
        public Guid BenefitPlanId { get; set; }

        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
        public DateTime? EndDate { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Active"; // Active, Inactive, Pending

        [MaxLength(100)]
        public string? NomineeName { get; set; }

        [MaxLength(50)]
        public string? NomineeRelation { get; set; }

        public virtual Employee Employee { get; set; } = null!;
        public virtual BenefitPlan BenefitPlan { get; set; } = null!;
    }

    public class BonusRecord : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [MaxLength(100)]
        public string BonusType { get; set; } = string.Empty; // Performance, Festival, Retention, Referral, Spot

        public decimal Amount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }

        [MaxLength(500)]
        public string? Reason { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Approved, Disbursed

        public string? ApprovedById { get; set; }
        public DateTime? DisbursedAt { get; set; }

        public virtual Employee Employee { get; set; } = null!;
    }

    public class SalaryBenchmark : BaseEntity
    {
        [Required, MaxLength(150)]
        public string RoleTitle { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Industry { get; set; }

        [MaxLength(100)]
        public string? Location { get; set; }

        [MaxLength(50)]
        public string ExperienceRange { get; set; } = string.Empty; // "0-2", "3-5", "6-10", "10+"

        public decimal P25 { get; set; }
        public decimal Median { get; set; }
        public decimal P75 { get; set; }
        public decimal P90 { get; set; }

        [MaxLength(100)]
        public string? DataSource { get; set; }

        public int DataYear { get; set; } = DateTime.UtcNow.Year;
    }

    // ═══════════════════════════════════════════════════════════════
    // PERFORMANCE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    public class Goal : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required, MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? Description { get; set; }

        [MaxLength(50)]
        public string Category { get; set; } = "Individual"; // OKR, Individual, Team, Departmental

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int Progress { get; set; } = 0; // 0–100

        [MaxLength(50)]
        public string Status { get; set; } = "Active"; // Draft, Active, Completed, Cancelled

        [MaxLength(50)]
        public string Priority { get; set; } = "Medium"; // Low, Medium, High

        public virtual Employee Employee { get; set; } = null!;
        public virtual ICollection<KeyResult> KeyResults { get; set; } = new List<KeyResult>();
    }

    public class KeyResult : BaseEntity
    {
        [Required]
        public Guid GoalId { get; set; }

        [Required, MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        public decimal TargetValue { get; set; }
        public decimal CurrentValue { get; set; }

        [MaxLength(50)]
        public string Unit { get; set; } = string.Empty; // %, count, revenue, etc.

        [NotMapped]
        public int Progress => TargetValue > 0 ? (int)Math.Min((CurrentValue / TargetValue) * 100, 100) : 0;

        [MaxLength(50)]
        public string Status { get; set; } = "OnTrack"; // OnTrack, AtRisk, Behind, Completed

        public virtual Goal Goal { get; set; } = null!;
    }

    public class ReviewCycle : BaseEntity
    {
        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty; // "Annual Review 2025", "Mid-Year 2025"

        [MaxLength(50)]
        public string Type { get; set; } = "Annual"; // Annual, MidYear, Probation, Quarterly

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime? SelfReviewDeadline { get; set; }
        public DateTime? ManagerReviewDeadline { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Upcoming"; // Upcoming, InProgress, Completed, Cancelled

        public virtual ICollection<PerformanceReview> Reviews { get; set; } = new List<PerformanceReview>();
    }

    public class PerformanceReview : BaseEntity
    {
        [Required]
        public Guid ReviewCycleId { get; set; }

        [Required]
        public Guid EmployeeId { get; set; }

        public string? ReviewerId { get; set; } // ApplicationUser.Id of manager

        public decimal? SelfRating { get; set; } // 1–5
        public decimal? ManagerRating { get; set; }
        public decimal? FinalRating { get; set; }

        [MaxLength(50)]
        public string? PerformanceGrade { get; set; } // Outstanding, Exceeds, Meets, Below, Unsatisfactory

        [MaxLength(3000)]
        public string? SelfComments { get; set; }

        [MaxLength(3000)]
        public string? ManagerComments { get; set; }

        [MaxLength(3000)]
        public string? DevelopmentPlan { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, SelfSubmitted, ManagerReview, Completed

        public DateTime? SubmittedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

        public virtual ReviewCycle ReviewCycle { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }

    public class FeedbackRequest : BaseEntity
    {
        [Required]
        public Guid FromEmployeeId { get; set; }

        [Required]
        public Guid ToEmployeeId { get; set; }

        public Guid? ReviewCycleId { get; set; }

        [MaxLength(50)]
        public string FeedbackType { get; set; } = "360"; // 360, Peer, Upward, Downward

        [MaxLength(500)]
        public string? Message { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Completed, Declined

        public DateTime? DueDate { get; set; }
        public DateTime? CompletedAt { get; set; }

        public virtual Employee FromEmployee { get; set; } = null!;
        public virtual Employee ToEmployee { get; set; } = null!;
        public virtual FeedbackResponse? Response { get; set; }
    }

    public class FeedbackResponse : BaseEntity
    {
        [Required]
        public Guid FeedbackRequestId { get; set; }

        public decimal? OverallRating { get; set; }
        public string? RatingsJson { get; set; } // JSON: { "communication": 4, "leadership": 5, ... }

        [MaxLength(3000)]
        public string? Strengths { get; set; }

        [MaxLength(3000)]
        public string? AreasToImprove { get; set; }

        [MaxLength(3000)]
        public string? AdditionalComments { get; set; }

        public bool IsAnonymous { get; set; } = false;

        public virtual FeedbackRequest FeedbackRequest { get; set; } = null!;
    }

    public class ContinuousFeedback : BaseEntity
    {
        [Required]
        public Guid FromEmployeeId { get; set; }

        [Required]
        public Guid ToEmployeeId { get; set; }

        [MaxLength(50)]
        public string FeedbackType { get; set; } = "Praise"; // Praise, Suggestion, Concern, Recognition

        [Required, MaxLength(3000)]
        public string Content { get; set; } = string.Empty;

        public bool IsAnonymous { get; set; } = false;

        [MaxLength(100)]
        public string? Tag { get; set; } // Teamwork, Innovation, Customer Focus, etc.

        public virtual Employee FromEmployee { get; set; } = null!;
        public virtual Employee ToEmployee { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // LEARNING & DEVELOPMENT
    // ═══════════════════════════════════════════════════════════════

    public class Course : BaseEntity
    {
        [Required, MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(3000)]
        public string? Description { get; set; }

        [MaxLength(100)]
        public string? Category { get; set; } // Technical, Soft Skills, Compliance, Leadership, Domain

        [MaxLength(50)]
        public string Format { get; set; } = "Online"; // Online, Offline, Blended, Self-Paced

        [MaxLength(50)]
        public string Level { get; set; } = "Beginner"; // Beginner, Intermediate, Advanced

        public int DurationHours { get; set; }

        [MaxLength(500)]
        public string? ThumbnailUrl { get; set; }

        [MaxLength(500)]
        public string? ContentUrl { get; set; }

        [MaxLength(200)]
        public string? Provider { get; set; } // Internal, Coursera, Udemy, etc.

        public bool IsMandatory { get; set; } = false;
        public bool IsActive { get; set; } = true;

        public virtual ICollection<CourseEnrollment> Enrollments { get; set; } = new List<CourseEnrollment>();
    }

    public class CourseEnrollment : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required]
        public Guid CourseId { get; set; }

        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
        public DateTime? StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public DateTime? DueDate { get; set; }

        public int ProgressPercent { get; set; } = 0;
        public decimal? Score { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Enrolled"; // Enrolled, InProgress, Completed, Failed, Dropped

        [MaxLength(500)]
        public string? CertificateUrl { get; set; }

        public virtual Employee Employee { get; set; } = null!;
        public virtual Course Course { get; set; } = null!;
    }

    public class TrainingEvent : BaseEntity
    {
        [Required, MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        public Guid? CourseId { get; set; }

        [MaxLength(200)]
        public string? TrainerName { get; set; }

        [MaxLength(100)]
        public string? TrainerOrg { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [MaxLength(200)]
        public string? Location { get; set; } // Physical address or "Virtual - Zoom"

        public int MaxParticipants { get; set; } = 20;

        [MaxLength(50)]
        public string Status { get; set; } = "Scheduled"; // Scheduled, InProgress, Completed, Cancelled

        [MaxLength(1000)]
        public string? Description { get; set; }

        public decimal? Cost { get; set; }

        public virtual Course? Course { get; set; }
        public virtual ICollection<TrainingRegistration> Registrations { get; set; } = new List<TrainingRegistration>();
    }

    public class TrainingRegistration : BaseEntity
    {
        [Required]
        public Guid TrainingEventId { get; set; }

        [Required]
        public Guid EmployeeId { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Registered"; // Registered, Attended, NoShow, Cancelled

        public decimal? FeedbackScore { get; set; }

        [MaxLength(1000)]
        public string? Feedback { get; set; }

        public virtual TrainingEvent TrainingEvent { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }

    public class SkillAssessment : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required, MaxLength(200)]
        public string SkillName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Category { get; set; } // Technical, Soft, Domain, Tool

        public int RequiredLevel { get; set; } = 3; // 1–5
        public int CurrentLevel { get; set; } = 1; // 1–5

        [NotMapped]
        public int GapLevel => Math.Max(0, RequiredLevel - CurrentLevel);

        public DateTime AssessedOn { get; set; } = DateTime.UtcNow;
        public DateTime? ReassessedOn { get; set; }

        [MaxLength(1000)]
        public string? Notes { get; set; }

        [MaxLength(500)]
        public string? RecommendedCourse { get; set; }

        public virtual Employee Employee { get; set; } = null!;
    }

    public class CertificationRecord : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        [Required, MaxLength(300)]
        public string CertificationName { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? IssuingBody { get; set; }

        [MaxLength(100)]
        public string? CertificateId { get; set; }

        public DateTime? IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }

        [MaxLength(500)]
        public string? CertificateUrl { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Valid"; // Valid, Expired, Pending, Revoked

        [NotMapped]
        public bool IsExpired => ExpiryDate.HasValue && ExpiryDate.Value < DateTime.UtcNow;

        [NotMapped]
        public int? DaysToExpiry => ExpiryDate.HasValue
            ? (int)(ExpiryDate.Value - DateTime.UtcNow).TotalDays : null;

        public virtual Employee Employee { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // DOCUMENT MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    public class Document : BaseEntity
    {
        [Required, MaxLength(100)]
        public string EntityType { get; set; } = string.Empty; // Employee, Candidate, Vendor, Policy

        public Guid EntityId { get; set; }

        [Required, MaxLength(300)]
        public string FileName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? FileUrl { get; set; }

        public long FileSizeBytes { get; set; }

        [MaxLength(100)]
        public string? MimeType { get; set; }

        [MaxLength(100)]
        public string? Category { get; set; } // Offer Letter, ID Proof, Education, Experience, Medical

        [MaxLength(500)]
        public string? Description { get; set; }

        public string? UploadedById { get; set; }
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        public bool IsConfidential { get; set; } = false;
        public DateTime? ExpiryDate { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════
    // LETTERS & CERTIFICATES
    // ═══════════════════════════════════════════════════════════════

    public class LetterTemplate : BaseEntity
    {
        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LetterType { get; set; } = string.Empty; // Offer, Appointment, Confirmation, Increment, Relieving, Experience, Salary

        [Required]
        public string Content { get; set; } = string.Empty; // HTML/text with {{Employee.Name}} placeholders

        [MaxLength(500)]
        public string? FooterText { get; set; }

        public bool IsActive { get; set; } = true;

        public virtual ICollection<IssuedLetter> IssuedLetters { get; set; } = new List<IssuedLetter>();
    }

    public class IssuedLetter : BaseEntity
    {
        [Required]
        public Guid TemplateId { get; set; }

        [Required]
        public Guid EmployeeId { get; set; }

        public string? IssuedById { get; set; }
        public DateTime IssuedAt { get; set; } = DateTime.UtcNow;

        [MaxLength(500)]
        public string? DocumentUrl { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Draft"; // Draft, Issued, Revoked

        [MaxLength(1000)]
        public string? CustomContent { get; set; } // Rendered/merged letter content

        public virtual LetterTemplate Template { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // EXIT MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    public class ExitRequest : BaseEntity
    {
        [Required]
        public Guid EmployeeId { get; set; }

        public DateTime ResignationDate { get; set; }
        public DateTime LastWorkingDay { get; set; }

        [MaxLength(100)]
        public string ExitType { get; set; } = "Resignation"; // Resignation, Termination, Retirement, Absconding

        [MaxLength(1000)]
        public string? Reason { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Approved, Completed, Withdrawn

        [MaxLength(500)]
        public string? HRComments { get; set; }

        public string? ApprovedById { get; set; }
        public DateTime? ApprovedAt { get; set; }

        public bool NoticePeriodWaived { get; set; } = false;

        [MaxLength(500)]
        public string? ExitInterviewSummary { get; set; }

        public virtual Employee Employee { get; set; } = null!;
        public virtual ICollection<ExitChecklistItem> ChecklistItems { get; set; } = new List<ExitChecklistItem>();
    }

    public class ExitChecklistItem : BaseEntity
    {
        [Required]
        public Guid ExitRequestId { get; set; }

        [Required, MaxLength(300)]
        public string Task { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Department { get; set; } // IT, Finance, Admin, HR

        public string? AssignedToId { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Done, NA

        public DateTime? CompletedAt { get; set; }

        [MaxLength(500)]
        public string? Remarks { get; set; }

        public virtual ExitRequest ExitRequest { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // EMPLOYER BRANDING
    // ═══════════════════════════════════════════════════════════════

    public class EmployerReview : BaseEntity
    {
        [MaxLength(100)]
        public string ReviewerName { get; set; } = "Anonymous";

        [MaxLength(100)]
        public string? ReviewerRole { get; set; }

        [MaxLength(50)]
        public string ReviewerType { get; set; } = "Employee"; // Employee, FormerEmployee, Candidate, Intern

        public decimal Rating { get; set; } // 1–5

        [MaxLength(3000)]
        public string? Pros { get; set; }

        [MaxLength(3000)]
        public string? Cons { get; set; }

        [MaxLength(3000)]
        public string? Advice { get; set; }

        public bool RecommendToFriend { get; set; } = true;

        [MaxLength(50)]
        public string Source { get; set; } = "Internal"; // Internal, Glassdoor, AmbitionBox, LinkedIn

        [MaxLength(50)]
        public string Status { get; set; } = "Published"; // Draft, Published, Hidden

        public DateTime ReviewDate { get; set; } = DateTime.UtcNow;
    }

    public class TalentCommunityMember : BaseEntity
    {
        [Required, MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? FullName { get; set; }

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(100)]
        public string? CurrentRole { get; set; }

        public int? ExperienceYears { get; set; }

        public string? SkillsJson { get; set; } // JSON array

        [MaxLength(50)]
        public string Status { get; set; } = "Active"; // Active, Unsubscribed, Converted

        [MaxLength(100)]
        public string? Source { get; set; } // CareersPage, LinkedIn, Referral, Event

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastEngagedAt { get; set; }
    }

    public class CareerPage : BaseEntity
    {
        [Required, MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Headline { get; set; }

        [MaxLength(3000)]
        public string? Description { get; set; }

        [MaxLength(500)]
        public string? LogoUrl { get; set; }

        [MaxLength(500)]
        public string? BannerUrl { get; set; }

        public string? ValuesJson { get; set; } // JSON array of company values

        public string? BenefitsJson { get; set; } // JSON array of benefits

        public bool IsPublished { get; set; } = false;

        [MaxLength(500)]
        public string? PublishedSlug { get; set; } // /careers/demo-corporation

        [MaxLength(30)]
        public string? ThemeColor { get; set; }
    }

    public class CampusEvent : BaseEntity
    {
        [Required, MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Institution { get; set; }

        [MaxLength(200)]
        public string? Location { get; set; }

        public DateTime EventDate { get; set; }

        [MaxLength(50)]
        public string EventType { get; set; } = "CareerFair"; // CareerFair, HackathonDrives, TechTalk, Placement

        public int ExpectedParticipants { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Planned"; // Planned, Ongoing, Completed, Cancelled

        [MaxLength(1000)]
        public string? Notes { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════
    // POLICIES & COMPLIANCE
    // ═══════════════════════════════════════════════════════════════

    public class Policy : BaseEntity
    {
        [Required, MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Category { get; set; } // Leave, Code of Conduct, IT, Security, POSH, Travel

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime? EffectiveDate { get; set; }
        public DateTime? ExpiryDate { get; set; }

        public int Version { get; set; } = 1;
        public bool IsActive { get; set; } = true;
        public bool RequiresAcknowledgment { get; set; } = true;

        [MaxLength(500)]
        public string? DocumentUrl { get; set; }

        public virtual ICollection<PolicyAcknowledgment> Acknowledgments { get; set; } = new List<PolicyAcknowledgment>();
    }

    public class PolicyAcknowledgment : BaseEntity
    {
        [Required]
        public Guid PolicyId { get; set; }

        [Required]
        public Guid EmployeeId { get; set; }

        public DateTime AcknowledgedAt { get; set; } = DateTime.UtcNow;

        [MaxLength(500)]
        public string? IpAddress { get; set; }

        public virtual Policy Policy { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }

    // ═══════════════════════════════════════════════════════════════
    // INTEGRATIONS HUB
    // ═══════════════════════════════════════════════════════════════

    public class Integration : BaseEntity
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty; // LinkedIn, Indeed, Slack, Zoom, QuickBooks

        [MaxLength(100)]
        public string? Category { get; set; } // JobBoards, Communication, Payroll, Calendar, Background

        [MaxLength(500)]
        public string? Description { get; set; }

        [MaxLength(500)]
        public string? LogoUrl { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Available"; // Available, Connected, Error, Disconnected

        public string? ConfigJson { get; set; } // Encrypted config/tokens stored as JSON

        public DateTime? LastSyncAt { get; set; }

        [MaxLength(200)]
        public string? LastSyncStatus { get; set; }

        public bool IsOAuth { get; set; } = false;
    }
}
