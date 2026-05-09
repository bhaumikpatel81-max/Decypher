using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Decypher.Web.Data;
using Decypher.Web.DTOs;
using Decypher.Web.Models;
using Decypher.Web.Services;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Decypher.Web.Controllers
{
    [Route("api/budget")]
    [ApiController]
    [AllowAnonymous] // auth handled via GetTenantId() / GetUserId() — mirrors existing app pattern
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _budget;
        private readonly IBudgetExportService _export;
        private readonly ApplicationDbContext _db;

        public BudgetController(IBudgetService budget, IBudgetExportService export, ApplicationDbContext db)
        {
            _budget = budget;
            _export = export;
            _db = db;
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }

        private Guid GetTenantId()
        {
            var raw = User.FindFirst("TenantId")?.Value ?? "11111111-1111-1111-1111-111111111111";
            return Guid.TryParse(raw, out var id) ? id : Guid.Parse("11111111-1111-1111-1111-111111111111");
        }

        private string GetUserId() =>
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "system";

        // ═══════════════════════════════════════════════════════════════════════
        //  Fiscal Years
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("fiscal-years")]
        public async Task<IActionResult> GetFiscalYears() =>
            Ok(await _budget.GetFiscalYearsAsync(GetTenantId()));

        [HttpPost("fiscal-years")]
        public async Task<IActionResult> CreateFiscalYear([FromBody] CreateFiscalYearRequest req)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _budget.CreateFiscalYearAsync(req, GetTenantId(), GetUserId());
            return CreatedAtAction(nameof(GetFiscalYears), new { id = result.Id }, result);
        }

        [HttpPut("fiscal-years/{id:guid}")]
        public async Task<IActionResult> UpdateFiscalYear(Guid id, [FromBody] UpdateFiscalYearRequest req)
        {
            var result = await _budget.UpdateFiscalYearAsync(id, req, GetTenantId(), GetUserId());
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost("fiscal-years/{id:guid}/lock")]
        public async Task<IActionResult> LockFiscalYear(Guid id)
        {
            var ok = await _budget.LockFiscalYearAsync(id, GetTenantId(), GetUserId());
            return ok ? NoContent() : NotFound();
        }

        [HttpPost("fiscal-years/{id:guid}/clone")]
        public async Task<IActionResult> CloneFiscalYear(Guid id)
        {
            var result = await _budget.CloneFiscalYearAsync(id, GetTenantId(), GetUserId());
            return result == null ? NotFound() : Ok(result);
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Allocations
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("allocations")]
        public async Task<IActionResult> GetAllocations(
            [FromQuery] Guid? fiscalYearId,
            [FromQuery] string? dept,
            [FromQuery] string? q) =>
            Ok(await _budget.GetAllocationsAsync(GetTenantId(), fiscalYearId, dept, q));

        [HttpPost("allocations")]
        public async Task<IActionResult> CreateAllocation([FromBody] CreateAllocationRequest req)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _budget.CreateAllocationAsync(req, GetTenantId(), GetUserId());
            return Ok(result);
        }

        [HttpPut("allocations/{id:guid}")]
        public async Task<IActionResult> UpdateAllocation(Guid id, [FromBody] UpdateAllocationRequest req)
        {
            var result = await _budget.UpdateAllocationAsync(id, req, GetTenantId(), GetUserId());
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("allocations/{id:guid}")]
        public async Task<IActionResult> DeleteAllocation(Guid id)
        {
            var ok = await _budget.DeleteAllocationAsync(id, GetTenantId());
            return ok ? NoContent() : NotFound();
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Line Items
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("line-items")]
        public async Task<IActionResult> GetLineItems([FromQuery] Guid? allocationId) =>
            Ok(await _budget.GetLineItemsAsync(GetTenantId(), allocationId));

        [HttpPost("line-items")]
        public async Task<IActionResult> CreateLineItem([FromBody] CreateLineItemRequest req)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _budget.CreateLineItemAsync(req, GetTenantId(), GetUserId());
            return Ok(result);
        }

        [HttpPut("line-items/{id:guid}")]
        public async Task<IActionResult> UpdateLineItem(Guid id, [FromBody] UpdateLineItemRequest req)
        {
            var result = await _budget.UpdateLineItemAsync(id, req, GetTenantId(), GetUserId());
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("line-items/{id:guid}")]
        public async Task<IActionResult> DeleteLineItem(Guid id)
        {
            var ok = await _budget.DeleteLineItemAsync(id, GetTenantId());
            return ok ? NoContent() : NotFound();
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Actuals
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("actuals")]
        public async Task<IActionResult> GetActuals(
            [FromQuery] Guid? fiscalYearId,
            [FromQuery] DateTime? from,
            [FromQuery] DateTime? to,
            [FromQuery] string? dept,
            [FromQuery] Guid? vendorId) =>
            Ok(await _budget.GetActualsAsync(GetTenantId(), fiscalYearId, from, to, dept, vendorId));

        [HttpPost("actuals")]
        public async Task<IActionResult> CreateActual([FromBody] CreateActualRequest req)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _budget.CreateActualAsync(req, GetTenantId(), GetUserId());
            return Ok(result);
        }

        [HttpPut("actuals/{id:guid}")]
        public async Task<IActionResult> UpdateActual(Guid id, [FromBody] UpdateActualRequest req)
        {
            var result = await _budget.UpdateActualAsync(id, req, GetTenantId(), GetUserId());
            return result == null ? NotFound() : Ok(result);
        }

        [HttpDelete("actuals/{id:guid}")]
        public async Task<IActionResult> DeleteActual(Guid id)
        {
            var ok = await _budget.DeleteActualAsync(id, GetTenantId());
            return ok ? NoContent() : NotFound();
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Analytics
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard([FromQuery] Guid fiscalYearId) =>
            Ok(await _budget.GetDashboardKpisAsync(GetTenantId(), fiscalYearId));

        [HttpGet("forecast")]
        public async Task<IActionResult> GetForecast([FromQuery] Guid fiscalYearId) =>
            Ok(await _budget.GetForecastAsync(GetTenantId(), fiscalYearId));

        [HttpGet("cost-per-hire")]
        public async Task<IActionResult> GetCostPerHire([FromQuery] Guid fiscalYearId) =>
            Ok(await _budget.GetCostPerHireAsync(GetTenantId(), fiscalYearId));

        [HttpGet("vendor-spend")]
        public async Task<IActionResult> GetVendorSpend([FromQuery] Guid fiscalYearId) =>
            Ok(await _budget.GetVendorSpendAsync(GetTenantId(), fiscalYearId));

        [HttpGet("department-breakdown")]
        public async Task<IActionResult> GetDepartmentBreakdown([FromQuery] Guid fiscalYearId) =>
            Ok(await _budget.GetDepartmentBreakdownAsync(GetTenantId(), fiscalYearId));

        // ═══════════════════════════════════════════════════════════════════════
        //  Config
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("config")]
        public async Task<IActionResult> GetConfig()
        {
            var config = await _budget.GetTenantConfigAsync(GetTenantId());
            return Ok(config ?? new BudgetTenantConfigDto());
        }

        [HttpPut("config")]
        public async Task<IActionResult> UpdateConfig([FromBody] UpsertTenantConfigRequest req)
        {
            var result = await _budget.UpsertTenantConfigAsync(req, GetTenantId(), GetUserId());
            return Ok(result);
        }

        [HttpGet("cost-categories")]
        public async Task<IActionResult> GetCostCategories() =>
            Ok(await _budget.GetCostCategoriesAsync(GetTenantId()));

        [HttpPost("cost-categories")]
        public async Task<IActionResult> CreateCostCategory([FromBody] CreateCostCategoryRequest req)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _budget.CreateCostCategoryAsync(req, GetTenantId(), GetUserId());
            return Ok(result);
        }

        [HttpPut("cost-categories/{id:guid}")]
        public async Task<IActionResult> UpdateCostCategory(Guid id, [FromBody] UpdateCostCategoryRequest req)
        {
            var result = await _budget.UpdateCostCategoryAsync(id, req, GetTenantId(), GetUserId());
            return result == null ? NotFound() : Ok(result);
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Exports
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("export/excel")]
        public async Task<IActionResult> ExportExcel(
            [FromQuery] Guid fiscalYearId,
            [FromQuery] string? reportType = "all",
            [FromQuery] DateTime? from = null,
            [FromQuery] DateTime? to = null,
            [FromQuery] string? department = null,
            [FromQuery] Guid? vendorId = null)
        {
            var req = new ExcelExportRequest
            {
                FiscalYearId = fiscalYearId,
                ReportType = reportType,
                From = from,
                To = to,
                Department = department,
                VendorId = vendorId
            };
            var tenantId = GetTenantId();
            var kpis = await _budget.GetDashboardKpisAsync(tenantId, fiscalYearId);
            var allocations = await _budget.GetAllocationsAsync(tenantId, fiscalYearId, department, null);
            var actuals = await _budget.GetActualsAsync(tenantId, fiscalYearId, from, to, department, vendorId);
            var cph = await _budget.GetCostPerHireAsync(tenantId, fiscalYearId);
            var vendors = await _budget.GetVendorSpendAsync(tenantId, fiscalYearId);
            var depts = await _budget.GetDepartmentBreakdownAsync(tenantId, fiscalYearId);
            var fys = await _budget.GetFiscalYearsAsync(tenantId);
            var fyLabel = System.Linq.Enumerable.FirstOrDefault(fys, f => f.Id == fiscalYearId)?.FiscalYearLabel ?? "Budget";

            var bytes = await _export.GenerateExcelAsync(req, fyLabel, kpis, allocations, actuals, cph, vendors, depts);
            return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"Budget_{fyLabel.Replace(" ", "_")}_{DateTime.UtcNow:yyyyMMdd}.xlsx");
        }

        [HttpGet("export/ppt")]
        public async Task<IActionResult> ExportPpt([FromQuery] Guid fiscalYearId)
        {
            var tenantId = GetTenantId();
            var kpis = await _budget.GetDashboardKpisAsync(tenantId, fiscalYearId);
            var depts = await _budget.GetDepartmentBreakdownAsync(tenantId, fiscalYearId);
            var vendors = await _budget.GetVendorSpendAsync(tenantId, fiscalYearId);
            var cph = await _budget.GetCostPerHireAsync(tenantId, fiscalYearId);
            var fys = await _budget.GetFiscalYearsAsync(tenantId);
            var fy = System.Linq.Enumerable.FirstOrDefault(fys, f => f.Id == fiscalYearId);

            var bytes = await _export.GeneratePptAsync(kpis, depts, vendors, cph, fy?.FiscalYearLabel ?? "Budget", "Decypher");
            return File(bytes, "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                $"Budget_{(fy?.FiscalYearLabel ?? "Report").Replace(" ", "_")}_{DateTime.UtcNow:yyyyMMdd}.pptx");
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Budget Import Template  —  GET /api/budget/import-template
        //  Returns a 5-sheet EPPlus workbook (pre-filled with sample rows)
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("import-template")]
        public IActionResult GetImportTemplate()
        {
            using var pkg = new ExcelPackage();

            // ── Sheet 1: Instructions ─────────────────────────────────────────
            var instr = pkg.Workbook.Worksheets.Add("Instructions");
            var rows = new[]
            {
                "DECYPHER — Budget Vs Forecasting Import Template",
                $"Version: 1.0   |   Generated: {DateTime.UtcNow:dd-MM-yyyy}   |   For use with Decypher HRMS",
                "",
                "HOW TO USE THIS FILE",
                "Step 1: Fill in Sheet 2 (FiscalYear) FIRST — the Fiscal Year Label you enter here is referenced by ALL other sheets",
                "Step 2: Fill in Sheet 3 (DeptAllocations) — one row per department per quarter",
                "Step 3: Fill in Sheet 4 (LineItems) — detailed cost breakdown per allocation",
                "Step 4: Fill in Sheet 5 (ActualSpend) — real invoices and spend already incurred",
                "Step 5: Upload this completed file via Budget Vs Forecasting → Import Budget Data",
                "",
                "RULES",
                "Mandatory fields: Columns marked with * are required — blank values will cause row errors",
                "Date format: All dates must be in dd-mm-yyyy format (e.g. 01-04-2025)",
                "Do NOT delete headers: Row 1 is the column header — do not modify or delete it on any sheet",
                "FiscalYearLabel key: This value links all sheets — it must match exactly (case-sensitive) across sheets",
                "",
                "ALLOWED VALUES REFERENCE",
                "Category: Permanent | Contract | Intern | Replacement | NewRole",
                "Quarter: Q1 | Q2 | Q3 | Q4",
                "LineItemType: BaseSalary | SigningBonus | AgencyFee | BackgroundCheck | RelocationCost | TrainingCost | EquipmentCost | Other",
                "FY Status: Draft | Active | Locked | Archived",
                "IsApproved: Yes | No",
                "Currency: 3-letter ISO code (e.g. GBP, USD, EUR, INR)",
                "",
                "FISCAL YEAR REFERENCE",
                "Indian FY: Start: 01-04-YYYY   End: 31-03-YYYY+1  (e.g. FY 2025-26: 01-04-2025 to 31-03-2026)",
                "Calendar FY: Start: 01-01-YYYY   End: 31-12-YYYY   (e.g. FY 2025: 01-01-2025 to 31-12-2025)",
                "Q1 mapping (April FY): Q1 = Apr-Jun | Q2 = Jul-Sep | Q3 = Oct-Dec | Q4 = Jan-Mar",
            };
            for (int r = 0; r < rows.Length; r++)
                instr.Cells[r + 1, 1].Value = rows[r];
            instr.Cells[1, 1].Style.Font.Bold = true;
            instr.Cells[1, 1].Style.Font.Size = 13;
            instr.Column(1).Width = 90;

            // ── Sheet 2: FiscalYear ────────────────────────────────────────────
            var fyWs = pkg.Workbook.Worksheets.Add("FiscalYear");
            var fyHeaders = new[] { "FiscalYearLabel*", "StartDate*", "EndDate*", "TotalBudgetAmount*", "Currency*", "Status*", "Notes" };
            WriteSheetHeader(fyWs, fyHeaders);
            WriteInstructionRow(fyWs, 2, fyHeaders.Length, "FORMAT: FiscalYearLabel is used as the key in all other sheets. Status: Draft/Active/Locked/Archived. Dates: dd-mm-yyyy.");
            object[][] fySamples =
            {
                new object[] { "FY 2025-26", "01-04-2025", "31-03-2026", 25000000, "INR", "Active", "Annual recruitment budget approved by board April 2025" },
                new object[] { "FY 2024-25", "01-04-2024", "31-03-2025", 21000000, "INR", "Locked", "Previous year locked for audit" },
            };
            WriteSampleRows(fyWs, 3, fySamples);

            // ── Sheet 3: DeptAllocations ──────────────────────────────────────
            var allocWs = pkg.Workbook.Worksheets.Add("DeptAllocations");
            var allocHeaders = new[] { "FiscalYearLabel*", "DepartmentName*", "DepartmentCode", "HeadcountPlanned*", "AllottedAmount*", "Currency", "Category*", "Quarter*", "ActualHiringStartDate", "Notes" };
            WriteSheetHeader(allocWs, allocHeaders);
            WriteInstructionRow(allocWs, 2, allocHeaders.Length, "FORMAT: FiscalYearLabel must match Sheet 2. Quarter: Q1/Q2/Q3/Q4. Category: Permanent/Contract/Intern/Replacement/NewRole.");
            object[][] allocSamples =
            {
                new object[] { "FY 2025-26", "Engineering", "ENG", 5, 4500000, "INR", "Permanent", "Q1", "01-04-2025", "Core platform team expansion" },
                new object[] { "FY 2025-26", "Engineering", "ENG", 3, 2700000, "INR", "Contract", "Q2", "01-07-2025", "Augmentation for project peak load" },
                new object[] { "FY 2025-26", "Product", "PRD", 2, 1600000, "INR", "Permanent", "Q1", "15-04-2025", "Product design and management hires" },
                new object[] { "FY 2025-26", "Finance", "FIN", 1, 800000, "INR", "Replacement", "Q3", "01-10-2025", "Backfill for planned departure" },
                new object[] { "FY 2025-26", "HR", "HR", 1, 700000, "INR", "Intern", "Q4", "", "Summer intake carry forward to Q4" },
            };
            WriteSampleRows(allocWs, 3, allocSamples);

            // ── Sheet 4: LineItems ────────────────────────────────────────────
            var liWs = pkg.Workbook.Worksheets.Add("LineItems");
            var liHeaders = new[] { "FiscalYearLabel*", "DepartmentName*", "Quarter*", "LineItemType*", "PlannedAmount*", "ActualAmount", "Notes" };
            WriteSheetHeader(liWs, liHeaders);
            WriteInstructionRow(liWs, 2, liHeaders.Length, "FORMAT: Dept + Quarter + FY resolves parent allocation. LineItemType: BaseSalary/SigningBonus/AgencyFee/BackgroundCheck/RelocationCost/TrainingCost/EquipmentCost/Other.");
            object[][] liSamples =
            {
                new object[] { "FY 2025-26", "Engineering", "Q1", "BaseSalary", 350000, 348500, "Base salaries Q1 engineering hires" },
                new object[] { "FY 2025-26", "Engineering", "Q1", "AgencyFee", 45000, 42000, "Staffing agency fees for 3 hires" },
                new object[] { "FY 2025-26", "Engineering", "Q1", "BackgroundCheck", 5000, 4800, "BGV costs for all Q1 joiners" },
                new object[] { "FY 2025-26", "Engineering", "Q1", "EquipmentCost", 15000, 14200, "Laptops and peripherals" },
                new object[] { "FY 2025-26", "Engineering", "Q1", "SigningBonus", 20000, "", "Signing bonuses — not yet paid" },
                new object[] { "FY 2025-26", "Product", "Q1", "BaseSalary", 140000, 140000, "Product hires confirmed" },
                new object[] { "FY 2025-26", "Product", "Q1", "AgencyFee", 12000, 12000, "Agency fees settled" },
            };
            WriteSampleRows(liWs, 3, liSamples);

            // ── Sheet 5: ActualSpend ──────────────────────────────────────────
            var actWs = pkg.Workbook.Worksheets.Add("ActualSpend");
            var actHeaders = new[] { "FiscalYearLabel*", "DepartmentName", "SpendCategory*", "Amount*", "SpendDate*", "InvoiceReference", "VendorName", "RequisitionID", "CandidateEmail", "ApprovedById", "IsApproved*", "Notes" };
            WriteSheetHeader(actWs, actHeaders);
            WriteInstructionRow(actWs, 2, actHeaders.Length, "FORMAT: VendorName resolved to VendorId. IsApproved Yes = included in TotalSpent KPI. SpendDate determines monthly trend attribution.");
            object[][] actSamples =
            {
                new object[] { "FY 2025-26", "Engineering", "AgencyFee", 14000, "15-04-2025", "INV-2025-0041", "TechCorp Staffing", "REQ-001", "priya.sharma@email.com", "MGR-101", "Yes", "Placement fee for Priya Sharma" },
                new object[] { "FY 2025-26", "Engineering", "BackgroundCheck", 1600, "18-04-2025", "INV-2025-0042", "", "REQ-001", "", "HR-201", "Yes", "BGV for 2 candidates" },
                new object[] { "FY 2025-26", "Engineering", "EquipmentCost", 2400, "20-04-2025", "INV-2025-0043", "", "", "", "HR-201", "Yes", "2x MacBook Pro" },
                new object[] { "FY 2025-26", "Product", "AgencyFee", 8000, "22-04-2025", "INV-2025-0044", "Apex Recruiters", "REQ-002", "", "MGR-102", "No", "Pending CFO approval" },
            };
            WriteSampleRows(actWs, 3, actSamples);

            var fileBytes = pkg.GetAsByteArray();
            return File(fileBytes,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Budget_Import_Template.xlsx");
        }

        private static void WriteSheetHeader(ExcelWorksheet ws, string[] headers)
        {
            for (int c = 0; c < headers.Length; c++)
            {
                ws.Cells[1, c + 1].Value = headers[c];
                ws.Cells[1, c + 1].Style.Font.Bold = true;
                ws.Cells[1, c + 1].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                ws.Cells[1, c + 1].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(37, 37, 100));
                ws.Cells[1, c + 1].Style.Font.Color.SetColor(Color.White);
                ws.Column(c + 1).Width = Math.Max(headers[c].Length + 4, 18);
            }
        }

        private static void WriteInstructionRow(ExcelWorksheet ws, int row, int cols, string text)
        {
            ws.Cells[row, 1].Value = $"# {text}";
            ws.Cells[row, 1, row, cols].Merge = true;
            ws.Cells[row, 1].Style.Font.Italic = true;
            ws.Cells[row, 1].Style.Font.Color.SetColor(Color.FromArgb(100, 100, 100));
        }

        private static void WriteSampleRows(ExcelWorksheet ws, int startRow, object[][] samples)
        {
            for (int r = 0; r < samples.Length; r++)
                for (int c = 0; c < samples[r].Length; c++)
                    ws.Cells[startRow + r, c + 1].Value = samples[r][c];
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Budget Forecasting V2 — Plan-based endpoints
        // ═══════════════════════════════════════════════════════════════════════

        // ── Plans ──────────────────────────────────────────────────────────────

        [HttpGet("plans")]
        public async Task<IActionResult> GetPlans(
            [FromQuery] string? fiscalYear,
            [FromQuery] string? department,
            [FromQuery] string? status)
        {
            var tenantId = GetTenantId();
            var q = _db.BudgetPlans.Where(p => p.TenantId == tenantId && !p.IsDeleted);
            if (!string.IsNullOrEmpty(fiscalYear))   q = q.Where(p => p.FiscalYear   == fiscalYear);
            if (!string.IsNullOrEmpty(department))   q = q.Where(p => p.Department   == department);
            if (Enum.TryParse<BudgetPlanStatus>(status, true, out var s)) q = q.Where(p => p.Status == s);
            var plans = await q.OrderByDescending(p => p.CreatedAt).ToListAsync();
            return Ok(new { success = true, data = plans });
        }

        [HttpPost("plans")]
        public async Task<IActionResult> CreatePlan([FromBody] CreateBudgetPlanRequest req)
        {
            var tenantId = GetTenantId();
            var plan = new BudgetPlan
            {
                Id         = Guid.NewGuid(),
                TenantId   = tenantId,
                Name       = req.Name,
                FiscalYear = req.FiscalYear,
                Department = req.Department ?? "",
                PlanType   = req.PlanType,
                Currency   = req.Currency ?? "INR",
                TotalBudget= req.TotalBudget,
                Status     = BudgetPlanStatus.Draft,
                CreatedAt  = DateTime.UtcNow,
                UpdatedAt  = DateTime.UtcNow,
                CreatedBy  = GetUserId()
            };
            _db.BudgetPlans.Add(plan);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = plan });
        }

        [HttpPut("plans/{id:guid}")]
        public async Task<IActionResult> UpdatePlan(Guid id, [FromBody] CreateBudgetPlanRequest req)
        {
            var tenantId = GetTenantId();
            var plan = await _db.BudgetPlans.FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId && !p.IsDeleted);
            if (plan == null) return NotFound();
            if (plan.Status == BudgetPlanStatus.Locked) return BadRequest(new { error = "Locked plans cannot be edited." });
            plan.Name       = req.Name;
            plan.FiscalYear = req.FiscalYear;
            plan.Department = req.Department ?? plan.Department;
            plan.PlanType   = req.PlanType;
            plan.Currency   = req.Currency ?? plan.Currency;
            plan.TotalBudget= req.TotalBudget;
            plan.UpdatedAt  = DateTime.UtcNow;
            plan.UpdatedBy  = GetUserId();
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = plan });
        }

        [HttpPatch("plans/{id:guid}/status")]
        public async Task<IActionResult> UpdatePlanStatus(Guid id, [FromBody] PatchStatusRequest req)
        {
            var tenantId = GetTenantId();
            var plan = await _db.BudgetPlans.FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId && !p.IsDeleted);
            if (plan == null) return NotFound();
            if (!Enum.TryParse<BudgetPlanStatus>(req.Status, true, out var newStatus))
                return BadRequest(new { error = "Invalid status. Use Draft, Approved, or Locked." });
            plan.Status    = newStatus;
            plan.UpdatedAt = DateTime.UtcNow;
            plan.UpdatedBy = GetUserId();
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = plan });
        }

        [HttpDelete("plans/{id:guid}")]
        public async Task<IActionResult> DeletePlan(Guid id)
        {
            var tenantId = GetTenantId();
            var plan = await _db.BudgetPlans.FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId && !p.IsDeleted);
            if (plan == null) return NotFound();
            plan.IsDeleted = true;
            plan.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // ── Line Items ─────────────────────────────────────────────────────────

        [HttpGet("plans/{id:guid}/lineitems")]
        public async Task<IActionResult> GetPlanLineItems(Guid id)
        {
            var tenantId = GetTenantId();
            var items = await _db.BudgetPlanItems
                .Where(i => i.BudgetPlanId == id && i.TenantId == tenantId && !i.IsDeleted)
                .OrderBy(i => i.Category).ThenBy(i => i.Description)
                .ToListAsync();
            return Ok(new { success = true, data = items });
        }

        [HttpPost("plans/{id:guid}/lineitems")]
        public async Task<IActionResult> AddLineItem(Guid id, [FromBody] BudgetPlanItemRequest req)
        {
            var tenantId = GetTenantId();
            var plan = await _db.BudgetPlans.FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId && !p.IsDeleted);
            if (plan == null) return NotFound();
            if (plan.Status == BudgetPlanStatus.Locked) return BadRequest(new { error = "Locked plans cannot be edited." });
            var item = new BudgetPlanItem
            {
                Id           = Guid.NewGuid(),
                TenantId     = tenantId,
                BudgetPlanId = id,
                Category     = req.Category,
                SubCategory  = req.SubCategory ?? "",
                Description  = req.Description ?? "",
                Q1Budget     = req.Q1Budget,    Q2Budget  = req.Q2Budget,  Q3Budget  = req.Q3Budget,  Q4Budget  = req.Q4Budget,
                Q1Actual     = req.Q1Actual,    Q2Actual  = req.Q2Actual,  Q3Actual  = req.Q3Actual,  Q4Actual  = req.Q4Actual,
                Q1Forecast   = req.Q1Forecast,  Q2Forecast= req.Q2Forecast,Q3Forecast= req.Q3Forecast,Q4Forecast= req.Q4Forecast,
                Unit         = req.Unit,
                Notes        = req.Notes,
                CreatedAt    = DateTime.UtcNow,
                UpdatedAt    = DateTime.UtcNow,
                CreatedBy    = GetUserId()
            };
            _db.BudgetPlanItems.Add(item);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = item });
        }

        [HttpPut("lineitems/{id:guid}")]
        public async Task<IActionResult> UpdateLineItem(Guid id, [FromBody] BudgetPlanItemRequest req)
        {
            var tenantId = GetTenantId();
            var item = await _db.BudgetPlanItems.FirstOrDefaultAsync(i => i.Id == id && i.TenantId == tenantId && !i.IsDeleted);
            if (item == null) return NotFound();
            item.Category    = req.Category;
            item.SubCategory = req.SubCategory ?? item.SubCategory;
            item.Description = req.Description ?? item.Description;
            item.Q1Budget    = req.Q1Budget;    item.Q2Budget   = req.Q2Budget;   item.Q3Budget   = req.Q3Budget;   item.Q4Budget   = req.Q4Budget;
            item.Q1Actual    = req.Q1Actual;    item.Q2Actual   = req.Q2Actual;   item.Q3Actual   = req.Q3Actual;   item.Q4Actual   = req.Q4Actual;
            item.Q1Forecast  = req.Q1Forecast;  item.Q2Forecast = req.Q2Forecast; item.Q3Forecast = req.Q3Forecast; item.Q4Forecast = req.Q4Forecast;
            item.Unit        = req.Unit;
            item.Notes       = req.Notes;
            item.UpdatedAt   = DateTime.UtcNow;
            item.UpdatedBy   = GetUserId();
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = item });
        }

        [HttpDelete("lineitems/{id:guid}")]
        public async Task<IActionResult> DeletePlanLineItem(Guid id)
        {
            var tenantId = GetTenantId();
            var item = await _db.BudgetPlanItems.FirstOrDefaultAsync(i => i.Id == id && i.TenantId == tenantId && !i.IsDeleted);
            if (item == null) return NotFound();
            item.IsDeleted = true;
            item.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // ── Summary (TODO A3 formula) ──────────────────────────────────────────

        [HttpGet("plans/{id:guid}/summary")]
        public async Task<IActionResult> GetPlanSummary(Guid id)
        {
            var tenantId = GetTenantId();
            var plan = await _db.BudgetPlans.FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId && !p.IsDeleted);
            if (plan == null) return NotFound();

            var items = await _db.BudgetPlanItems
                .Where(i => i.BudgetPlanId == id && i.TenantId == tenantId && !i.IsDeleted)
                .ToListAsync();

            static decimal TotalBudget(BudgetPlanItem i)   => i.Q1Budget   + i.Q2Budget   + i.Q3Budget   + i.Q4Budget;
            static decimal TotalActual(BudgetPlanItem i)   => i.Q1Actual   + i.Q2Actual   + i.Q3Actual   + i.Q4Actual;
            static decimal TotalForecast(BudgetPlanItem i) => i.Q1Forecast + i.Q2Forecast + i.Q3Forecast + i.Q4Forecast;

            var totalBudget   = items.Sum(TotalBudget);
            var totalActual   = items.Sum(TotalActual);
            var totalForecast = items.Sum(TotalForecast);
            var variance      = totalBudget - totalActual;
            var variancePct   = totalBudget == 0 ? 0 : variance / totalBudget * 100;
            var burnRate      = totalBudget == 0 ? 0 : totalActual / totalBudget * 100;
            var projectedYE   = totalActual + totalForecast;
            var fVar          = totalBudget - totalForecast;
            var fVarPct       = totalBudget == 0 ? 0 : fVar / totalBudget * 100;

            var alertCount = await _db.BudgetAlerts
                .CountAsync(a => _db.BudgetPlanItems
                    .Where(i => i.BudgetPlanId == id && !i.IsDeleted)
                    .Select(i => i.Id)
                    .Contains(a.BudgetPlanItemId) && a.IsActive && !a.IsDeleted);

            var byCategory = items
                .GroupBy(i => i.Category.ToString())
                .Select(g => new
                {
                    Category      = g.Key,
                    Budget        = g.Sum(TotalBudget),
                    Actual        = g.Sum(TotalActual),
                    Forecast      = g.Sum(TotalForecast),
                    Variance      = g.Sum(TotalBudget) - g.Sum(TotalActual),
                    VariancePct   = g.Sum(TotalBudget) == 0 ? 0m :
                                    Math.Round((g.Sum(TotalBudget) - g.Sum(TotalActual)) / g.Sum(TotalBudget) * 100, 2)
                })
                .OrderByDescending(x => x.Budget)
                .ToList();

            var quarters = new[] { "Q1", "Q2", "Q3", "Q4" };
            var byQuarter = quarters.Select(q => new
            {
                Quarter  = q,
                Budget   = items.Sum(i => q == "Q1" ? i.Q1Budget   : q == "Q2" ? i.Q2Budget   : q == "Q3" ? i.Q3Budget   : i.Q4Budget),
                Actual   = items.Sum(i => q == "Q1" ? i.Q1Actual   : q == "Q2" ? i.Q2Actual   : q == "Q3" ? i.Q3Actual   : i.Q4Actual),
                Forecast = items.Sum(i => q == "Q1" ? i.Q1Forecast : q == "Q2" ? i.Q2Forecast : q == "Q3" ? i.Q3Forecast : i.Q4Forecast)
            }).ToList();

            var summary = new
            {
                PlanId               = plan.Id,
                PlanName             = plan.Name,
                FiscalYear           = plan.FiscalYear,
                Currency             = plan.Currency,
                Status               = plan.Status.ToString(),
                TotalBudget          = Math.Round(totalBudget,   2),
                TotalActual          = Math.Round(totalActual,   2),
                TotalForecast        = Math.Round(totalForecast, 2),
                Variance             = Math.Round(variance,      2),
                VariancePct          = Math.Round(variancePct,   2),
                ForecastVariance     = Math.Round(fVar,          2),
                ForecastVariancePct  = Math.Round(fVarPct,       2),
                BurnRate             = Math.Round(burnRate,       2),
                UtilizationRate      = Math.Round(burnRate,       2),
                ProjectedYearEnd     = Math.Round(projectedYE,   2),
                AlertCount           = alertCount,
                ByCategory           = byCategory,
                ByQuarter            = byQuarter
            };

            return Ok(new { success = true, data = summary });
        }

        // ── Versions ───────────────────────────────────────────────────────────

        [HttpPost("plans/{id:guid}/versions")]
        public async Task<IActionResult> SnapshotVersion(Guid id)
        {
            var tenantId = GetTenantId();
            var plan = await _db.BudgetPlans
                .Include(p => p.Items)
                .FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId && !p.IsDeleted);
            if (plan == null) return NotFound();

            var nextNum = await _db.BudgetVersions
                .Where(v => v.BudgetPlanId == id && !v.IsDeleted)
                .MaxAsync(v => (int?)v.VersionNumber) ?? 0;

            var snapshot = System.Text.Json.JsonSerializer.Serialize(new
            {
                plan.Name, plan.FiscalYear, plan.Department, plan.PlanType, plan.Currency,
                plan.TotalBudget, plan.Status, Items = plan.Items.Where(i => !i.IsDeleted)
            });

            var version = new BudgetVersion
            {
                Id              = Guid.NewGuid(),
                TenantId        = tenantId,
                BudgetPlanId    = id,
                VersionNumber   = nextNum + 1,
                Label           = $"Snapshot v{nextNum + 1} — {DateTime.UtcNow:dd MMM yyyy HH:mm}",
                SnapshotJson    = snapshot,
                CreatedByUserId = GetUserId(),
                CreatedAt       = DateTime.UtcNow,
                UpdatedAt       = DateTime.UtcNow
            };
            _db.BudgetVersions.Add(version);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = new { version.Id, version.VersionNumber, version.Label, version.CreatedAt } });
        }

        [HttpGet("plans/{id:guid}/versions")]
        public async Task<IActionResult> GetVersions(Guid id)
        {
            var tenantId = GetTenantId();
            var versions = await _db.BudgetVersions
                .Where(v => v.BudgetPlanId == id && v.TenantId == tenantId && !v.IsDeleted)
                .OrderByDescending(v => v.VersionNumber)
                .Select(v => new { v.Id, v.VersionNumber, v.Label, v.CreatedByUserId, v.CreatedAt })
                .ToListAsync();
            return Ok(new { success = true, data = versions });
        }

        [HttpGet("versions/{versionId:guid}")]
        public async Task<IActionResult> GetVersion(Guid versionId)
        {
            var tenantId = GetTenantId();
            var version = await _db.BudgetVersions
                .FirstOrDefaultAsync(v => v.Id == versionId && v.TenantId == tenantId && !v.IsDeleted);
            if (version == null) return NotFound();
            return Ok(new { success = true, data = version });
        }

        // ── Alerts ─────────────────────────────────────────────────────────────

        [HttpGet("plans/{id:guid}/alerts")]
        public async Task<IActionResult> GetPlanAlerts(Guid id)
        {
            var tenantId = GetTenantId();
            var itemIds  = await _db.BudgetPlanItems
                .Where(i => i.BudgetPlanId == id && i.TenantId == tenantId && !i.IsDeleted)
                .Select(i => i.Id).ToListAsync();
            var alerts = await _db.BudgetAlerts
                .Where(a => itemIds.Contains(a.BudgetPlanItemId) && a.IsActive && !a.IsDeleted)
                .ToListAsync();
            return Ok(new { success = true, data = alerts });
        }

        [HttpPost("plans/{id:guid}/alerts")]
        public async Task<IActionResult> CreateAlert(Guid id, [FromBody] CreateBudgetAlertRequest req)
        {
            var tenantId = GetTenantId();
            var item = await _db.BudgetPlanItems
                .FirstOrDefaultAsync(i => i.Id == req.BudgetPlanItemId && i.BudgetPlanId == id && i.TenantId == tenantId && !i.IsDeleted);
            if (item == null) return NotFound(new { error = "Line item not found on this plan." });
            var alert = new BudgetAlert
            {
                Id               = Guid.NewGuid(),
                TenantId         = tenantId,
                BudgetPlanItemId = req.BudgetPlanItemId,
                AlertType        = req.AlertType,
                Threshold        = req.Threshold,
                IsActive         = true,
                CreatedAt        = DateTime.UtcNow,
                UpdatedAt        = DateTime.UtcNow
            };
            _db.BudgetAlerts.Add(alert);
            await _db.SaveChangesAsync();
            return Ok(new { success = true, data = alert });
        }

        [HttpDelete("alerts/{alertId:guid}")]
        public async Task<IActionResult> DeleteAlert(Guid alertId)
        {
            var tenantId = GetTenantId();
            var alert = await _db.BudgetAlerts
                .FirstOrDefaultAsync(a => a.Id == alertId && a.TenantId == tenantId && !a.IsDeleted);
            if (alert == null) return NotFound();
            alert.IsDeleted = true;
            alert.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return Ok(new { success = true });
        }

        // ── Plan-level exports ─────────────────────────────────────────────────

        [HttpGet("plans/{id:guid}/export/excel")]
        public async Task<IActionResult> ExportPlanExcel(Guid id)
        {
            var tenantId = GetTenantId();
            var plan = await _db.BudgetPlans
                .Include(p => p.Items.Where(i => !i.IsDeleted))
                .FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId && !p.IsDeleted);
            if (plan == null) return NotFound();

            var tenant = await _db.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
            var companyName = tenant?.CompanyName ?? "Company";

            using var pkg = new ExcelPackage();

            // Sheet 1 — Summary
            var ws1 = pkg.Workbook.Worksheets.Add("Summary");
            ws1.Cells[1, 1].Value = companyName;      ws1.Cells[1, 1].Style.Font.Bold = true; ws1.Cells[1, 1].Style.Font.Size = 14;
            ws1.Cells[2, 1].Value = $"Plan: {plan.Name}";
            ws1.Cells[3, 1].Value = $"FY: {plan.FiscalYear}";
            ws1.Cells[4, 1].Value = $"Generated: {DateTime.UtcNow:dd MMM yyyy HH:mm} UTC";
            ws1.Cells[5, 1].Value = $"Status: {plan.Status}";

            var items = plan.Items.ToList();
            static decimal B(BudgetPlanItem i) => i.Q1Budget+i.Q2Budget+i.Q3Budget+i.Q4Budget;
            static decimal A(BudgetPlanItem i) => i.Q1Actual+i.Q2Actual+i.Q3Actual+i.Q4Actual;
            static decimal F(BudgetPlanItem i) => i.Q1Forecast+i.Q2Forecast+i.Q3Forecast+i.Q4Forecast;

            var kpiHeaders = new[] { "Total Budget", "Total Actual", "Total Forecast", "Variance", "Burn Rate %" };
            var tb = items.Sum(B); var ta = items.Sum(A); var tf = items.Sum(F);
            var kpiValues = new object[] { tb, ta, tf, tb-ta, tb==0?0:Math.Round(ta/tb*100,1) };
            for (int c = 0; c < kpiHeaders.Length; c++)
            {
                ws1.Cells[7, c+1].Value = kpiHeaders[c]; ws1.Cells[7, c+1].Style.Font.Bold = true;
                ws1.Cells[8, c+1].Value = kpiValues[c];
            }

            // Category breakdown
            ws1.Cells[11, 1].Value = "Category Breakdown"; ws1.Cells[11, 1].Style.Font.Bold = true;
            var catHeaders = new[] { "Category", "Budget", "Actual", "Forecast", "Variance", "Variance %" };
            for (int c = 0; c < catHeaders.Length; c++) { ws1.Cells[12, c+1].Value = catHeaders[c]; ws1.Cells[12, c+1].Style.Font.Bold = true; }
            var cats = items.GroupBy(i => i.Category.ToString()).ToList();
            for (int r = 0; r < cats.Count; r++)
            {
                var g = cats[r]; var gb = g.Sum(B); var ga = g.Sum(A); var gf = g.Sum(F);
                var row = new object[] { g.Key, gb, ga, gf, gb-ga, gb==0?0:Math.Round((gb-ga)/gb*100,1) };
                for (int c = 0; c < row.Length; c++) ws1.Cells[13+r, c+1].Value = row[c];
            }

            // Sheet 2 — Line Items
            var ws2 = pkg.Workbook.Worksheets.Add("Line Items");
            ws2.Row(1).Height = 22;
            ws2.View.FreezePanes(2, 1);
            var liHeaders = new[] { "Description","Category","Sub-Category","Q1 Budget","Q1 Actual","Q1 Forecast","Q2 Budget","Q2 Actual","Q2 Forecast","Q3 Budget","Q3 Actual","Q3 Forecast","Q4 Budget","Q4 Actual","Q4 Forecast","Unit","Notes" };
            for (int c = 0; c < liHeaders.Length; c++) { ws2.Cells[1, c+1].Value = liHeaders[c]; ws2.Cells[1, c+1].Style.Font.Bold = true; ws2.Column(c+1).AutoFit(); }
            ws2.Cells[1, 1, 1, liHeaders.Length].AutoFilter = true;
            for (int r = 0; r < items.Count; r++)
            {
                var i = items[r];
                var vals = new object[] { i.Description, i.Category.ToString(), i.SubCategory, i.Q1Budget, i.Q1Actual, i.Q1Forecast, i.Q2Budget, i.Q2Actual, i.Q2Forecast, i.Q3Budget, i.Q3Actual, i.Q3Forecast, i.Q4Budget, i.Q4Actual, i.Q4Forecast, i.Unit.ToString(), i.Notes ?? "" };
                for (int c = 0; c < vals.Length; c++) ws2.Cells[2+r, c+1].Value = vals[c];
                if (A(i) > B(i)) { ws2.Cells[2+r, 1, 2+r, vals.Length].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid; ws2.Cells[2+r, 1, 2+r, vals.Length].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(255, 235, 235)); }
            }

            // Sheet 3 — Scenarios
            var ws3 = pkg.Workbook.Worksheets.Add("Forecast Scenarios");
            ws3.Cells[1, 1].Value = "Scenario";  ws3.Cells[1, 2].Value = "Total Budget"; ws3.Cells[1, 3].Value = "Total Forecast"; ws3.Cells[1, 4].Value = "Projected YE";
            ws3.Cells[1, 1, 1, 4].Style.Font.Bold = true;
            var scenarios = new[] { ("Optimistic (+10%)", 1.1m), ("Base (0%)", 1.0m), ("Conservative (-10%)", 0.9m) };
            for (int r = 0; r < scenarios.Length; r++)
            {
                var (label, mult) = scenarios[r];
                ws3.Cells[2+r, 1].Value = label;
                ws3.Cells[2+r, 2].Value = tb;
                ws3.Cells[2+r, 3].Value = Math.Round(tf * mult, 2);
                ws3.Cells[2+r, 4].Value = Math.Round(ta + tf * mult, 2);
            }

            var filename = $"{companyName.Replace(" ", "-")}-Budget-{plan.FiscalYear}.xlsx";
            return File(pkg.GetAsByteArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);
        }

        [HttpGet("plans/{id:guid}/export/pdf")]
        public async Task<IActionResult> ExportPlanPdf(Guid id)
        {
            var tenantId = GetTenantId();
            var plan = await _db.BudgetPlans
                .Include(p => p.Items.Where(i => !i.IsDeleted))
                .FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId && !p.IsDeleted);
            if (plan == null) return NotFound();

            var tenant = await _db.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
            var companyName = tenant?.CompanyName ?? "Company";
            var items = plan.Items.ToList();

            static decimal B(BudgetPlanItem i) => i.Q1Budget+i.Q2Budget+i.Q3Budget+i.Q4Budget;
            static decimal A(BudgetPlanItem i) => i.Q1Actual+i.Q2Actual+i.Q3Actual+i.Q4Actual;
            static decimal F(BudgetPlanItem i) => i.Q1Forecast+i.Q2Forecast+i.Q3Forecast+i.Q4Forecast;
            var tb = items.Sum(B); var ta = items.Sum(A); var tf = items.Sum(F);

            using var ms = new MemoryStream();
            var doc = new iTextSharp.text.Document(iTextSharp.text.PageSize.A4.Rotate(), 30, 30, 40, 30);
            var writer = iTextSharp.text.pdf.PdfWriter.GetInstance(doc, ms);
            doc.Open();

            var titleFont  = iTextSharp.text.FontFactory.GetFont("Helvetica-Bold",  16);
            var headFont   = iTextSharp.text.FontFactory.GetFont("Helvetica-Bold",  10);
            var bodyFont   = iTextSharp.text.FontFactory.GetFont("Helvetica",        9);
            var smallFont  = iTextSharp.text.FontFactory.GetFont("Helvetica",        8);

            // Cover
            doc.Add(new iTextSharp.text.Paragraph(companyName, titleFont));
            doc.Add(new iTextSharp.text.Paragraph($"Budget Plan: {plan.Name}", headFont));
            doc.Add(new iTextSharp.text.Paragraph($"Fiscal Year: {plan.FiscalYear}  |  Status: {plan.Status}  |  Currency: {plan.Currency}", bodyFont));
            doc.Add(new iTextSharp.text.Paragraph($"Generated: {DateTime.UtcNow:dd MMM yyyy HH:mm} UTC  |  CONFIDENTIAL", smallFont));
            doc.Add(new iTextSharp.text.Paragraph("\n"));

            // KPI row
            var kpiTable = new iTextSharp.text.pdf.PdfPTable(5) { WidthPercentage = 100 };
            foreach (var (label, val) in new[] { ("Total Budget", tb), ("Total Actual", ta), ("Total Forecast", tf), ("Variance", tb-ta), ("Burn Rate %", tb==0?0:Math.Round(ta/tb*100,1)) })
            {
                var cell = new iTextSharp.text.pdf.PdfPCell();
                cell.AddElement(new iTextSharp.text.Paragraph(val.ToString("N0"), headFont));
                cell.AddElement(new iTextSharp.text.Paragraph(label, smallFont));
                cell.BackgroundColor = new iTextSharp.text.BaseColor(245, 243, 255);
                cell.Padding = 8;
                kpiTable.AddCell(cell);
            }
            doc.Add(kpiTable);
            doc.Add(new iTextSharp.text.Paragraph("\n"));

            // Category table
            doc.Add(new iTextSharp.text.Paragraph("Category Breakdown", headFont));
            var catTable = new iTextSharp.text.pdf.PdfPTable(6) { WidthPercentage = 100 };
            foreach (var h in new[] { "Category", "Budget", "Actual", "Forecast", "Variance", "Var %" })
            { var c = new iTextSharp.text.pdf.PdfPCell(new iTextSharp.text.Phrase(h, headFont)) { BackgroundColor = new iTextSharp.text.BaseColor(107, 77, 240), Padding = 5 }; c.Phrase.Font.Color = new iTextSharp.text.BaseColor(255, 255, 255); catTable.AddCell(c); }
            var cats = items.GroupBy(i => i.Category.ToString()).ToList();
            bool alt = false;
            foreach (var g in cats)
            {
                var gb = g.Sum(B); var ga = g.Sum(A); var gf = g.Sum(F);
                var bg = alt ? new iTextSharp.text.BaseColor(248, 248, 255) : new iTextSharp.text.BaseColor(255, 255, 255); alt = !alt;
                foreach (var v in new object[] { g.Key, gb.ToString("N0"), ga.ToString("N0"), gf.ToString("N0"), (gb-ga).ToString("N0"), gb==0?"0.0%":$"{Math.Round((gb-ga)/gb*100,1)}%" })
                { var c = new iTextSharp.text.pdf.PdfPCell(new iTextSharp.text.Phrase(v?.ToString(), bodyFont)) { BackgroundColor = bg, Padding = 4 }; catTable.AddCell(c); }
            }
            doc.Add(catTable);

            // Line items (paginated)
            doc.NewPage();
            doc.Add(new iTextSharp.text.Paragraph("Line Items", headFont));
            var liTable = new iTextSharp.text.pdf.PdfPTable(7) { WidthPercentage = 100 };
            liTable.SetWidths(new float[] { 3, 2, 1.5f, 1.5f, 1.5f, 1.5f, 1.5f });
            foreach (var h in new[] { "Description", "Category", "Total Budget", "Total Actual", "Total Forecast", "Variance", "Unit" })
            { var c = new iTextSharp.text.pdf.PdfPCell(new iTextSharp.text.Phrase(h, headFont)) { BackgroundColor = new iTextSharp.text.BaseColor(107, 77, 240), Padding = 5 }; c.Phrase.Font.Color = new iTextSharp.text.BaseColor(255, 255, 255); liTable.AddCell(c); }
            alt = false;
            foreach (var i in items)
            {
                var ib = B(i); var ia = A(i); var iff = F(i);
                var bg = ia > ib ? new iTextSharp.text.BaseColor(255, 235, 235) : (alt ? new iTextSharp.text.BaseColor(248, 248, 255) : new iTextSharp.text.BaseColor(255, 255, 255)); alt = !alt;
                foreach (var v in new object[] { i.Description, i.Category.ToString(), ib.ToString("N0"), ia.ToString("N0"), iff.ToString("N0"), (ib-ia).ToString("N0"), i.Unit.ToString() })
                { var c = new iTextSharp.text.pdf.PdfPCell(new iTextSharp.text.Phrase(v?.ToString(), bodyFont)) { BackgroundColor = bg, Padding = 4 }; liTable.AddCell(c); }
            }
            doc.Add(liTable);
            doc.Close();

            var filename = $"{companyName.Replace(" ", "-")}-Budget-{plan.FiscalYear}.pdf";
            return File(ms.ToArray(), "application/pdf", filename);
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Budget Excel Import  —  POST /api/budget/import-excel
        //  Reads 5-sheet workbook in strict order: FY → Alloc → LineItems → Actuals
        // ═══════════════════════════════════════════════════════════════════════

        [HttpPost("import-excel")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> ImportBudgetExcel(IFormFile? file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "No file uploaded." });

            var tenantId = GetTenantId();
            var userId = GetUserId();
            _db.SetCurrentTenant(tenantId);

            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            using var pkg = new ExcelPackage(stream);

            var fyResult = new ImportEntityResult();
            var allocResult = new ImportEntityResult();
            var liResult = new ImportEntityResult();
            var actResult = new ImportEntityResult();

            // ── Sheet 2: FiscalYear ────────────────────────────────────────────
            var fyWs = pkg.Workbook.Worksheets.FirstOrDefault(w => w.Name.Contains("Fiscal", StringComparison.OrdinalIgnoreCase));
            if (fyWs != null)
                fyResult = await ImportFiscalYearSheet(fyWs, tenantId, userId);

            await _db.SaveChangesAsync(); // Commit FYs before allocations need them

            // ── Sheet 3: DeptAllocations ──────────────────────────────────────
            var allocWs = pkg.Workbook.Worksheets.FirstOrDefault(w => w.Name.Contains("Alloc", StringComparison.OrdinalIgnoreCase));
            if (allocWs != null)
                allocResult = await ImportAllocationSheet(allocWs, tenantId, userId);

            await _db.SaveChangesAsync();

            // ── Sheet 4: LineItems ────────────────────────────────────────────
            var liWs = pkg.Workbook.Worksheets.FirstOrDefault(w => w.Name.Contains("Line", StringComparison.OrdinalIgnoreCase));
            if (liWs != null)
                liResult = await ImportLineItemSheet(liWs, tenantId, userId);

            await _db.SaveChangesAsync();

            // ── Sheet 5: ActualSpend ──────────────────────────────────────────
            var actWs = pkg.Workbook.Worksheets.FirstOrDefault(w => w.Name.Contains("Actual", StringComparison.OrdinalIgnoreCase));
            if (actWs != null)
                actResult = await ImportActualSpendSheet(actWs, tenantId, userId);

            await _db.SaveChangesAsync();

            var totalErrors = fyResult.Errors.Length + allocResult.Errors.Length + liResult.Errors.Length + actResult.Errors.Length;

            return Ok(new ImportBudgetResult
            {
                FiscalYears = fyResult,
                Allocations = allocResult,
                LineItems = liResult,
                Actuals = actResult,
                TotalErrors = totalErrors
            });
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  CSV Import  —  POST /api/budget/import-csv
        //  Flat single-sheet CSV: FiscalYearLabel, DepartmentName, Quarter,
        //  Category, HeadcountPlanned, PlannedAmount, Currency, Notes
        //  Creates the FiscalYear if not found (Draft status).
        // ═══════════════════════════════════════════════════════════════════════

        [HttpPost("import-csv")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> ImportBudgetCsv(IFormFile? file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "No file uploaded." });

            var tenantId = GetTenantId();
            var userId   = GetUserId();

            using var reader = new StreamReader(file.OpenReadStream());
            var content = await reader.ReadToEndAsync();
            var lines = content.Split('\n', StringSplitOptions.RemoveEmptyEntries);

            if (lines.Length < 2)
                return Ok(new { imported = 0, updated = 0, totalErrors = 0, message = "No data rows found." });

            var headers = ParseCsvLine(lines[0])
                .Select(h => h.Trim().Trim('"').ToLowerInvariant().Replace(" ", "").Replace("*", ""))
                .ToArray();

            var imported = 0;
            var errors   = new List<string>();

            for (int i = 1; i < lines.Length; i++)
            {
                var cols = ParseCsvLine(lines[i]);
                if (cols.Length == 0 || string.IsNullOrWhiteSpace(cols[0])) continue;

                var row = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                for (int c = 0; c < Math.Min(headers.Length, cols.Length); c++)
                    row[headers[c]] = cols[c].Trim().Trim('"');

                string V(params string[] keys) => keys.Select(k => row.GetValueOrDefault(k) ?? "").FirstOrDefault(v => v.Length > 0) ?? "";

                var fyLabel = V("fiscalyearlabel", "fiscalyear", "fy", "year");
                if (string.IsNullOrEmpty(fyLabel)) { errors.Add($"Row {i + 1}: Missing FiscalYearLabel"); continue; }

                var fy = await _db.BudgetFiscalYears
                    .FirstOrDefaultAsync(f => f.TenantId == tenantId && f.FiscalYearLabel == fyLabel);

                if (fy == null)
                {
                    fy = new BudgetFiscalYear
                    {
                        TenantId          = tenantId,
                        FiscalYearLabel   = fyLabel,
                        StartDate         = DateTime.UtcNow,
                        EndDate           = DateTime.UtcNow.AddYears(1),
                        TotalBudgetAmount = 0,
                        Currency          = V("currency") is { Length: > 0 } cur ? cur : "INR",
                        Status            = FiscalYearStatus.Draft,
                        CreatedBy         = userId,
                        CreatedAt         = DateTime.UtcNow
                    };
                    _db.BudgetFiscalYears.Add(fy);
                    await _db.SaveChangesAsync();
                }

                var dept   = V("departmentname", "department", "dept");
                decimal.TryParse(V("plannedamount", "amount", "allottedamount", "budget"), out var amount);
                int.TryParse(V("headcountplanned", "headcount", "hc"), out var hc);
                Enum.TryParse<BudgetQuarter>(V("quarter", "q") is { Length: > 0 } qStr ? qStr : "Q1", true, out var quarter);
                Enum.TryParse<BudgetCategory>(V("category") is { Length: > 0 } catStr ? catStr : "Permanent", true, out var category);

                _db.BudgetAllocations.Add(new BudgetAllocation
                {
                    TenantId         = tenantId,
                    FiscalYearId     = fy.Id,
                    DepartmentName   = dept,
                    DepartmentCode   = V("departmentcode", "deptcode", "code"),
                    HeadcountPlanned = hc > 0 ? hc : 1,
                    AllottedAmount   = amount,
                    Category         = category,
                    Quarter          = quarter,
                    Notes            = V("notes", "remarks", "comments"),
                    CreatedBy        = userId,
                    CreatedAt        = DateTime.UtcNow
                });
                imported++;
            }

            await _db.SaveChangesAsync();

            return Ok(new
            {
                imported,
                updated     = 0,
                totalErrors = errors.Count,
                errors,
                message     = $"{imported} allocation row(s) imported from CSV."
            });
        }

        private static string[] ParseCsvLine(string line)
        {
            var result   = new List<string>();
            var inQuotes = false;
            var current  = new StringBuilder();
            foreach (var ch in line)
            {
                if (ch == '"')        { inQuotes = !inQuotes; }
                else if (ch == ',' && !inQuotes) { result.Add(current.ToString()); current.Clear(); }
                else                  { current.Append(ch); }
            }
            result.Add(current.ToString().TrimEnd('\r'));
            return result.ToArray();
        }

        private async Task<ImportEntityResult> ImportFiscalYearSheet(ExcelWorksheet ws, Guid tenantId, string userId)
        {
            var errors = new List<ImportError>();
            var imported = 0;
            var rows = ws.Dimension?.Rows ?? 0;
            for (int r = 2; r <= rows; r++) // skip header row 1; instruction rows filtered by # prefix below
            {
                var label = ws.Cells[r, 1].Text?.Trim();
                if (string.IsNullOrEmpty(label) || label.StartsWith("#")) continue;

                if (!DateTime.TryParseExact(ws.Cells[r, 2].Text?.Trim(), "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var start))
                { errors.Add(new ImportError { Row = r, Message = "StartDate must be dd-mm-yyyy." }); continue; }
                if (!DateTime.TryParseExact(ws.Cells[r, 3].Text?.Trim(), "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var end))
                { errors.Add(new ImportError { Row = r, Message = "EndDate must be dd-mm-yyyy." }); continue; }

                _ = decimal.TryParse(ws.Cells[r, 4].Text?.Trim(), out var total);
                var currency = ws.Cells[r, 5].Text?.Trim() ?? "INR";
                var statusStr = ws.Cells[r, 6].Text?.Trim() ?? "Draft";
                var status = Enum.TryParse<FiscalYearStatus>(statusStr, true, out var s) ? s : FiscalYearStatus.Draft;

                var exists = await _db.BudgetFiscalYears.AnyAsync(f => f.TenantId == tenantId && f.FiscalYearLabel == label);
                if (exists) { errors.Add(new ImportError { Row = r, Message = $"Fiscal Year '{label}' already exists." }); continue; }

                _db.BudgetFiscalYears.Add(new BudgetFiscalYear
                {
                    TenantId = tenantId, FiscalYearLabel = label,
                    StartDate = DateTime.SpecifyKind(start, DateTimeKind.Utc),
                    EndDate = DateTime.SpecifyKind(end, DateTimeKind.Utc),
                    TotalBudgetAmount = total, Currency = currency, Status = status,
                    Notes = ws.Cells[r, 7].Text?.Trim(),
                    CreatedBy = userId, CreatedAt = DateTime.UtcNow
                });
                imported++;
            }
            return new ImportEntityResult { Imported = imported, Errors = errors.ToArray() };
        }

        private async Task<ImportEntityResult> ImportAllocationSheet(ExcelWorksheet ws, Guid tenantId, string userId)
        {
            var errors = new List<ImportError>();
            var imported = 0;
            var rows = ws.Dimension?.Rows ?? 0;
            for (int r = 2; r <= rows; r++)
            {
                var fyLabel = ws.Cells[r, 1].Text?.Trim();
                var dept = ws.Cells[r, 2].Text?.Trim();
                if (string.IsNullOrEmpty(fyLabel) || string.IsNullOrEmpty(dept) || fyLabel.StartsWith("#")) continue;

                var fy = await _db.BudgetFiscalYears.FirstOrDefaultAsync(f => f.TenantId == tenantId && f.FiscalYearLabel == fyLabel);
                if (fy == null) { errors.Add(new ImportError { Row = r, Message = $"Fiscal Year '{fyLabel}' not found." }); continue; }

                _ = int.TryParse(ws.Cells[r, 4].Text?.Trim(), out var hc);
                _ = decimal.TryParse(ws.Cells[r, 5].Text?.Trim(), out var amount);
                var quarter = Enum.TryParse<BudgetQuarter>(ws.Cells[r, 8].Text?.Trim(), true, out var q) ? q : BudgetQuarter.Q1;
                var category = Enum.TryParse<BudgetCategory>(ws.Cells[r, 7].Text?.Trim(), true, out var cat) ? cat : BudgetCategory.Permanent;

                _db.BudgetAllocations.Add(new BudgetAllocation
                {
                    TenantId = tenantId, FiscalYearId = fy.Id, DepartmentName = dept,
                    DepartmentCode = ws.Cells[r, 3].Text?.Trim(),
                    HeadcountPlanned = hc > 0 ? hc : 1, AllottedAmount = amount,
                    Category = category, Quarter = quarter,
                    Notes = ws.Cells[r, 10].Text?.Trim(),
                    CreatedBy = userId, CreatedAt = DateTime.UtcNow
                });
                imported++;
            }
            return new ImportEntityResult { Imported = imported, Errors = errors.ToArray() };
        }

        private async Task<ImportEntityResult> ImportLineItemSheet(ExcelWorksheet ws, Guid tenantId, string userId)
        {
            var errors = new List<ImportError>();
            var imported = 0;
            var rows = ws.Dimension?.Rows ?? 0;
            for (int r = 2; r <= rows; r++)
            {
                var fyLabel = ws.Cells[r, 1].Text?.Trim();
                var dept = ws.Cells[r, 2].Text?.Trim();
                if (string.IsNullOrEmpty(fyLabel) || string.IsNullOrEmpty(dept) || fyLabel.StartsWith("#")) continue;

                var fy = await _db.BudgetFiscalYears.FirstOrDefaultAsync(f => f.TenantId == tenantId && f.FiscalYearLabel == fyLabel);
                if (fy == null) { errors.Add(new ImportError { Row = r, Message = $"Fiscal Year '{fyLabel}' not found." }); continue; }

                var quarter = Enum.TryParse<BudgetQuarter>(ws.Cells[r, 3].Text?.Trim(), true, out var q) ? q : BudgetQuarter.Q1;
                var alloc = await _db.BudgetAllocations.FirstOrDefaultAsync(a => a.TenantId == tenantId && a.FiscalYearId == fy.Id && a.DepartmentName == dept && a.Quarter == quarter);
                if (alloc == null) { errors.Add(new ImportError { Row = r, Message = $"No allocation found for {dept}/{quarter} in {fyLabel}." }); continue; }

                var lineType = Enum.TryParse<BudgetLineItemType>(ws.Cells[r, 4].Text?.Trim(), true, out var lt) ? lt : BudgetLineItemType.Other;
                _ = decimal.TryParse(ws.Cells[r, 5].Text?.Trim(), out var planned);
                _ = decimal.TryParse(ws.Cells[r, 6].Text?.Trim(), out var actual);

                _db.BudgetLineItems.Add(new BudgetLineItem
                {
                    TenantId = tenantId, AllocationId = alloc.Id, LineItemType = lineType,
                    PlannedAmount = planned, ActualAmount = actual > 0 ? actual : null,
                    Notes = ws.Cells[r, 7].Text?.Trim(),
                    CreatedBy = userId, CreatedAt = DateTime.UtcNow
                });
                imported++;
            }
            return new ImportEntityResult { Imported = imported, Errors = errors.ToArray() };
        }

        private async Task<ImportEntityResult> ImportActualSpendSheet(ExcelWorksheet ws, Guid tenantId, string userId)
        {
            var errors = new List<ImportError>();
            var imported = 0;
            var rows = ws.Dimension?.Rows ?? 0;
            for (int r = 2; r <= rows; r++)
            {
                var fyLabel = ws.Cells[r, 1].Text?.Trim();
                if (string.IsNullOrEmpty(fyLabel) || fyLabel.StartsWith("#")) continue;

                var fy = await _db.BudgetFiscalYears.FirstOrDefaultAsync(f => f.TenantId == tenantId && f.FiscalYearLabel == fyLabel);
                if (fy == null) { errors.Add(new ImportError { Row = r, Message = $"Fiscal Year '{fyLabel}' not found." }); continue; }

                if (!DateTime.TryParseExact(ws.Cells[r, 5].Text?.Trim(), "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var spendDate))
                { errors.Add(new ImportError { Row = r, Message = "SpendDate must be dd-mm-yyyy." }); continue; }

                _ = decimal.TryParse(ws.Cells[r, 4].Text?.Trim(), out var amount);
                var category = Enum.TryParse<BudgetLineItemType>(ws.Cells[r, 3].Text?.Trim(), true, out var cat) ? cat : BudgetLineItemType.Other;
                var isApproved = ws.Cells[r, 11].Text?.Trim().Equals("Yes", StringComparison.OrdinalIgnoreCase) ?? false;

                var vendorName = ws.Cells[r, 7].Text?.Trim();
                Guid? vendorId = null;
                if (!string.IsNullOrEmpty(vendorName))
                {
                    var v = await _db.Vendors.FirstOrDefaultAsync(x => x.TenantId == tenantId && x.VendorName == vendorName);
                    if (v != null) vendorId = v.Id;
                }

                _db.BudgetActuals.Add(new BudgetActual
                {
                    TenantId = tenantId, FiscalYearId = fy.Id,
                    DepartmentName = ws.Cells[r, 2].Text?.Trim(),
                    SpendCategory = category, Amount = amount,
                    SpendDate = DateTime.SpecifyKind(spendDate, DateTimeKind.Utc),
                    InvoiceReference = ws.Cells[r, 6].Text?.Trim(),
                    VendorId = vendorId,
                    ApprovedById = ws.Cells[r, 10].Text?.Trim(),
                    IsApproved = isApproved,
                    Notes = ws.Cells[r, 12].Text?.Trim(),
                    CreatedBy = userId, CreatedAt = DateTime.UtcNow
                });
                imported++;
            }
            return new ImportEntityResult { Imported = imported, Errors = errors.ToArray() };
        }
    }
}
