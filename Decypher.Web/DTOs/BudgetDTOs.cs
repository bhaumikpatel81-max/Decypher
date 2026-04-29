using System;
using System.Collections.Generic;
using Decypher.Web.Models;

namespace Decypher.Web.DTOs
{
    // ═══════════════════════════════════════════════════════════════════════════
    //  Fiscal Year
    // ═══════════════════════════════════════════════════════════════════════════

    public class BudgetFiscalYearDto
    {
        public Guid Id { get; set; }
        public string FiscalYearLabel { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalBudgetAmount { get; set; }
        public string Currency { get; set; } = "USD";
        public string Status { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        // Computed
        public decimal TotalAllocated { get; set; }
        public decimal TotalSpent { get; set; }
        public decimal Remaining { get; set; }
    }

    public class CreateFiscalYearRequest
    {
        public string FiscalYearLabel { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalBudgetAmount { get; set; }
        public string Currency { get; set; } = "USD";
        public string? Notes { get; set; }
    }

    public class UpdateFiscalYearRequest
    {
        public string? FiscalYearLabel { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? TotalBudgetAmount { get; set; }
        public string? Currency { get; set; }
        public string? Notes { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Allocation
    // ═══════════════════════════════════════════════════════════════════════════

    public class BudgetAllocationDto
    {
        public Guid Id { get; set; }
        public Guid FiscalYearId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public string? DepartmentCode { get; set; }
        public int HeadcountPlanned { get; set; }
        public decimal AllottedAmount { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Quarter { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        // Computed
        public decimal ActualSpend { get; set; }
        public decimal Variance { get; set; }
        public double UtilizationPct { get; set; }
    }

    public class CreateAllocationRequest
    {
        public Guid FiscalYearId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public string? DepartmentCode { get; set; }
        public int HeadcountPlanned { get; set; }
        public decimal AllottedAmount { get; set; }
        public BudgetCategory Category { get; set; } = BudgetCategory.Permanent;
        public BudgetQuarter Quarter { get; set; } = BudgetQuarter.Q1;
        public string? Notes { get; set; }
    }

    public class UpdateAllocationRequest
    {
        public string? DepartmentName { get; set; }
        public string? DepartmentCode { get; set; }
        public int? HeadcountPlanned { get; set; }
        public decimal? AllottedAmount { get; set; }
        public BudgetCategory? Category { get; set; }
        public BudgetQuarter? Quarter { get; set; }
        public string? Notes { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Line Item
    // ═══════════════════════════════════════════════════════════════════════════

    public class BudgetLineItemDto
    {
        public Guid Id { get; set; }
        public Guid AllocationId { get; set; }
        public string LineItemType { get; set; } = string.Empty;
        public decimal PlannedAmount { get; set; }
        public decimal? ActualAmount { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        // Computed
        public decimal Variance => PlannedAmount - (ActualAmount ?? 0);
    }

    public class CreateLineItemRequest
    {
        public Guid AllocationId { get; set; }
        public BudgetLineItemType LineItemType { get; set; }
        public decimal PlannedAmount { get; set; }
        public decimal? ActualAmount { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateLineItemRequest
    {
        public BudgetLineItemType? LineItemType { get; set; }
        public decimal? PlannedAmount { get; set; }
        public decimal? ActualAmount { get; set; }
        public string? Notes { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Actual
    // ═══════════════════════════════════════════════════════════════════════════

    public class BudgetActualDto
    {
        public Guid Id { get; set; }
        public Guid FiscalYearId { get; set; }
        public Guid? AllocationId { get; set; }
        public Guid? RequisitionId { get; set; }
        public Guid? CandidateId { get; set; }
        public string SpendCategory { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime SpendDate { get; set; }
        public string? InvoiceReference { get; set; }
        public Guid? VendorId { get; set; }
        public string? VendorName { get; set; }
        public string? ApprovedById { get; set; }
        public string? DepartmentName { get; set; }
        public bool IsApproved { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateActualRequest
    {
        public Guid FiscalYearId { get; set; }
        public Guid? AllocationId { get; set; }
        public Guid? RequisitionId { get; set; }
        public Guid? CandidateId { get; set; }
        public BudgetLineItemType SpendCategory { get; set; } = BudgetLineItemType.Other;
        public decimal Amount { get; set; }
        public DateTime SpendDate { get; set; }
        public string? InvoiceReference { get; set; }
        public Guid? VendorId { get; set; }
        public string? DepartmentName { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateActualRequest
    {
        public BudgetLineItemType? SpendCategory { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? SpendDate { get; set; }
        public string? InvoiceReference { get; set; }
        public Guid? VendorId { get; set; }
        public string? DepartmentName { get; set; }
        public bool? IsApproved { get; set; }
        public string? Notes { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Dashboard KPIs
    // ═══════════════════════════════════════════════════════════════════════════

    public class DashboardKpiDto
    {
        public decimal TotalBudget { get; set; }
        public decimal TotalSpent { get; set; }
        public decimal TotalCommitted { get; set; }
        public decimal Remaining { get; set; }
        public double UtilizationPct { get; set; }

        public int HeadcountPlanned { get; set; }
        public int HeadcountFilled { get; set; }
        public int HeadcountInProgress { get; set; }

        public decimal CostPerHireActual { get; set; }
        public decimal CostPerHireTarget { get; set; }

        public List<DeptBudgetSummary> BudgetByDepartment { get; set; } = new();
        public List<CategoryBudgetSummary> BudgetByCategory { get; set; } = new();
        public List<QuarterBudgetSummary> BudgetByQuarter { get; set; } = new();
        public List<VendorSpendDto> TopVendorsBySpend { get; set; } = new();
        public List<MonthlyTrendPoint> MonthlyTrend { get; set; } = new();
    }

    public class DeptBudgetSummary
    {
        public string Department { get; set; } = string.Empty;
        public decimal Planned { get; set; }
        public decimal Actual { get; set; }
        public double UtilizationPct => Planned > 0 ? Math.Round((double)Actual / (double)Planned * 100, 1) : 0;
    }

    public class CategoryBudgetSummary
    {
        public string Category { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public double Pct { get; set; }
    }

    public class QuarterBudgetSummary
    {
        public string Quarter { get; set; } = string.Empty;
        public decimal Planned { get; set; }
        public decimal Actual { get; set; }
        public int HeadcountPlanned { get; set; }
    }

    public class VendorSpendDto
    {
        public Guid? VendorId { get; set; }
        public string VendorName { get; set; } = string.Empty;
        public decimal TotalSpend { get; set; }
        public int TransactionCount { get; set; }
    }

    public class MonthlyTrendPoint
    {
        public string Month { get; set; } = string.Empty;
        public int Year { get; set; }
        public decimal Planned { get; set; }
        public decimal Actual { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Forecast
    // ═══════════════════════════════════════════════════════════════════════════

    public class ForecastDto
    {
        public Guid FiscalYearId { get; set; }
        public string FiscalYearLabel { get; set; } = string.Empty;
        public List<ForecastDeptRow> Rows { get; set; } = new();
        public ForecastTotals Totals { get; set; } = new();
    }

    public class ForecastDeptRow
    {
        public string Department { get; set; } = string.Empty;
        public string? DepartmentCode { get; set; }
        public decimal Q1Planned { get; set; }
        public decimal Q2Planned { get; set; }
        public decimal Q3Planned { get; set; }
        public decimal Q4Planned { get; set; }
        public decimal TotalPlanned => Q1Planned + Q2Planned + Q3Planned + Q4Planned;
        public decimal Q1Actual { get; set; }
        public decimal Q2Actual { get; set; }
        public decimal Q3Actual { get; set; }
        public decimal Q4Actual { get; set; }
        public decimal TotalActual => Q1Actual + Q2Actual + Q3Actual + Q4Actual;
        public int HeadcountPlanned { get; set; }
        public List<BudgetAllocationDto> Allocations { get; set; } = new();
    }

    public class ForecastTotals
    {
        public decimal Q1Planned { get; set; }
        public decimal Q2Planned { get; set; }
        public decimal Q3Planned { get; set; }
        public decimal Q4Planned { get; set; }
        public decimal Total => Q1Planned + Q2Planned + Q3Planned + Q4Planned;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Cost Per Hire
    // ═══════════════════════════════════════════════════════════════════════════

    public class CostPerHireDto
    {
        public decimal OverallCostPerHire { get; set; }
        public decimal TargetCostPerHire { get; set; }
        public int TotalHires { get; set; }
        public decimal TotalSpend { get; set; }
        public List<CostPerHireDeptRow> ByDepartment { get; set; } = new();
        public List<CostPerHireCategoryRow> ByCategory { get; set; } = new();
    }

    public class CostPerHireDeptRow
    {
        public string Department { get; set; } = string.Empty;
        public int Hires { get; set; }
        public decimal TotalSpend { get; set; }
        public decimal CostPerHire => Hires > 0 ? Math.Round(TotalSpend / Hires, 2) : 0;
    }

    public class CostPerHireCategoryRow
    {
        public string Category { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public double PctOfTotal { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Department Breakdown
    // ═══════════════════════════════════════════════════════════════════════════

    public class DepartmentBreakdownDto
    {
        public string Department { get; set; } = string.Empty;
        public string? DepartmentCode { get; set; }
        public decimal PlannedBudget { get; set; }
        public decimal ActualSpend { get; set; }
        public decimal Variance => PlannedBudget - ActualSpend;
        public double UtilizationPct => PlannedBudget > 0 ? Math.Round((double)ActualSpend / (double)PlannedBudget * 100, 1) : 0;
        public int HeadcountPlanned { get; set; }
        public int HeadcountFilled { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Tenant Config
    // ═══════════════════════════════════════════════════════════════════════════

    public class BudgetTenantConfigDto
    {
        public Guid Id { get; set; }
        public int FiscalYearStartMonth { get; set; } = 1;
        public string DefaultCurrency { get; set; } = "USD";
        public bool BudgetApprovalRequired { get; set; }
        public decimal? CostPerHireTargetAmount { get; set; }
        public decimal? ApprovalThresholdAmount { get; set; }
        public string BrandColor { get; set; } = "#1565C0";
    }

    public class UpsertTenantConfigRequest
    {
        public int FiscalYearStartMonth { get; set; } = 1;
        public string DefaultCurrency { get; set; } = "USD";
        public bool BudgetApprovalRequired { get; set; }
        public decimal? CostPerHireTargetAmount { get; set; }
        public decimal? ApprovalThresholdAmount { get; set; }
        public string BrandColor { get; set; } = "#1565C0";
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Cost Category Config
    // ═══════════════════════════════════════════════════════════════════════════

    public class CostCategoryConfigDto
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string CategoryCode { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public int DisplayOrder { get; set; }
        public decimal? DefaultEstimatePerHire { get; set; }
    }

    public class CreateCostCategoryRequest
    {
        public string CategoryName { get; set; } = string.Empty;
        public string CategoryCode { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public int DisplayOrder { get; set; }
        public decimal? DefaultEstimatePerHire { get; set; }
    }

    public class UpdateCostCategoryRequest
    {
        public string? CategoryName { get; set; }
        public string? CategoryCode { get; set; }
        public bool? IsActive { get; set; }
        public int? DisplayOrder { get; set; }
        public decimal? DefaultEstimatePerHire { get; set; }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    //  Export query params
    // ═══════════════════════════════════════════════════════════════════════════

    public class ExcelExportRequest
    {
        public Guid FiscalYearId { get; set; }
        public string? ReportType { get; set; } // "summary" | "allocations" | "actuals" | "cost-per-hire" | "vendor-spend" | "department" | "all"
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public string? Department { get; set; }
        public Guid? VendorId { get; set; }
    }

    public class PptExportRequest
    {
        public Guid FiscalYearId { get; set; }
    }
}
