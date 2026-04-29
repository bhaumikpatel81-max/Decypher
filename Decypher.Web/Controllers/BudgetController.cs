using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Decypher.Web.DTOs;
using Decypher.Web.Services;
using System;
using System.Security.Claims;
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

        public BudgetController(IBudgetService budget, IBudgetExportService export)
        {
            _budget = budget;
            _export = export;
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
    }
}
