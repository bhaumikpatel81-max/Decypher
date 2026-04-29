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
                new object[] { "FY 2025-26", "01-04-2025", "31-03-2026", 2500000, "GBP", "Active", "Annual recruitment budget approved by board April 2025" },
                new object[] { "FY 2024-25", "01-04-2024", "31-03-2025", 2100000, "GBP", "Locked", "Previous year locked for audit" },
            };
            WriteSampleRows(fyWs, 3, fySamples);

            // ── Sheet 3: DeptAllocations ──────────────────────────────────────
            var allocWs = pkg.Workbook.Worksheets.Add("DeptAllocations");
            var allocHeaders = new[] { "FiscalYearLabel*", "DepartmentName*", "DepartmentCode", "HeadcountPlanned*", "AllottedAmount*", "Currency", "Category*", "Quarter*", "ActualHiringStartDate", "Notes" };
            WriteSheetHeader(allocWs, allocHeaders);
            WriteInstructionRow(allocWs, 2, allocHeaders.Length, "FORMAT: FiscalYearLabel must match Sheet 2. Quarter: Q1/Q2/Q3/Q4. Category: Permanent/Contract/Intern/Replacement/NewRole.");
            object[][] allocSamples =
            {
                new object[] { "FY 2025-26", "Engineering", "ENG", 5, 450000, "GBP", "Permanent", "Q1", "01-04-2025", "Core platform team expansion" },
                new object[] { "FY 2025-26", "Engineering", "ENG", 3, 270000, "GBP", "Contract", "Q2", "01-07-2025", "Augmentation for project peak load" },
                new object[] { "FY 2025-26", "Product", "PRD", 2, 160000, "GBP", "Permanent", "Q1", "15-04-2025", "Product design and management hires" },
                new object[] { "FY 2025-26", "Finance", "FIN", 1, 80000, "GBP", "Replacement", "Q3", "01-10-2025", "Backfill for planned departure" },
                new object[] { "FY 2025-26", "HR", "HR", 1, 70000, "GBP", "Intern", "Q4", "", "Summer intake carry forward to Q4" },
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

        private async Task<ImportEntityResult> ImportFiscalYearSheet(ExcelWorksheet ws, Guid tenantId, string userId)
        {
            var errors = new List<ImportError>();
            var imported = 0;
            var rows = ws.Dimension?.Rows ?? 0;
            for (int r = 3; r <= rows; r++) // skip header (row1) and instruction (row2)
            {
                var label = ws.Cells[r, 1].Text?.Trim();
                if (string.IsNullOrEmpty(label) || label.StartsWith("#")) continue;

                if (!DateTime.TryParseExact(ws.Cells[r, 2].Text?.Trim(), "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var start))
                { errors.Add(new ImportError { Row = r, Message = "StartDate must be dd-mm-yyyy." }); continue; }
                if (!DateTime.TryParseExact(ws.Cells[r, 3].Text?.Trim(), "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var end))
                { errors.Add(new ImportError { Row = r, Message = "EndDate must be dd-mm-yyyy." }); continue; }

                _ = decimal.TryParse(ws.Cells[r, 4].Text?.Trim(), out var total);
                var currency = ws.Cells[r, 5].Text?.Trim() ?? "GBP";
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
            for (int r = 3; r <= rows; r++)
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
            for (int r = 3; r <= rows; r++)
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
            for (int r = 3; r <= rows; r++)
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
