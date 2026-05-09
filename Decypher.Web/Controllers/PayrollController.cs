using Decypher.Web.Data;
using Decypher.Web.Models.HRModels;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/payroll")]
[Authorize]
public class PayrollController(
    ISalaryService salaryService,
    IPayrollRunService payrollRunService,
    IExpenseService expenseService,
    ICompensationService compensationService,
    ITaxService taxService,
    ApplicationDbContext db) : ControllerBase
{
    private string TenantId => User.FindFirst("tenantId")?.Value ?? string.Empty;
    private string UserId => User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

    // ── Salary Structure ──────────────────────────────────────────────────────
    [HttpGet("salary-components")]
    public async Task<IActionResult> GetComponents() => Ok(await salaryService.GetSalaryComponentsAsync(TenantId));

    [HttpPost("salary-components")]
    public async Task<IActionResult> CreateComponent([FromBody] SalaryComponent component)
        => Created(string.Empty, await salaryService.CreateComponentAsync(component, TenantId, UserId));

    [HttpGet("employee-salary/{employeeId:guid}")]
    public async Task<IActionResult> GetEmployeeSalary(Guid employeeId)
        => Ok(await salaryService.GetEmployeeSalaryAsync(employeeId, TenantId));

    [HttpPost("employee-salary/{employeeId:guid}")]
    public async Task<IActionResult> SetEmployeeSalary(Guid employeeId, [FromBody] EmployeeSalary salary)
    {
        try { return Ok(await salaryService.SetEmployeeSalaryAsync(salary, TenantId, UserId)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    // ── Payroll Runs ──────────────────────────────────────────────────────────
    [HttpGet("runs")]
    public async Task<IActionResult> GetRuns()
        => Ok(await payrollRunService.GetRunsAsync(TenantId));

    [HttpGet("runs/{id:guid}")]
    public async Task<IActionResult> GetRunDetails(Guid id)
    {
        var result = await payrollRunService.GetRunDetailsAsync(id, TenantId);
        return result == null ? NotFound() : Ok(result);
    }

    [HttpPost("runs/process")]
    public async Task<IActionResult> ProcessPayroll([FromBody] ProcessPayrollRequest req)
    {
        try { return Ok(await payrollRunService.ProcessPayrollAsync(req.Month, req.Year, TenantId, UserId)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPost("runs/{id:guid}/approve")]
    public async Task<IActionResult> ApproveRun(Guid id)
    {
        try { return Ok(await payrollRunService.ApproveRunAsync(id, TenantId, UserId)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpGet("payslips")]
    public async Task<IActionResult> GetPayslips([FromQuery] Guid? employeeId, [FromQuery] int? month, [FromQuery] int? year)
    {
        var tenantId = User.FindFirst("tenantId")?.Value ?? string.Empty;
        return Ok(await payrollRunService.GetPayslipsAsync(tenantId, employeeId, month, year));
    }

    [HttpGet("export/csv")]
    public async Task<IActionResult> ExportPayrollCsv([FromQuery] int? month, [FromQuery] int? year)
    {
        var tenantId = User.FindFirst("tenantId")?.Value ?? string.Empty;
        var payslips = await payrollRunService.GetPayslipsAsync(tenantId, null, month, year);
        var sb = new System.Text.StringBuilder();
        sb.AppendLine("EmployeeId,Month,Year,BasicSalary,HRA,SpecialAllowance,GrossPay,TotalDeductions,NetPay");
        foreach (dynamic ps in payslips)
        {
            sb.AppendLine($"{ps.EmployeeId},{ps.Month},{ps.Year},{ps.BasicSalary},{ps.HRA},{ps.SpecialAllowance},{ps.GrossPay},{ps.TotalDeductions},{ps.NetPay}");
        }
        var bytes = System.Text.Encoding.UTF8.GetBytes(sb.ToString());
        return File(bytes, "text/csv", $"payroll-{DateTime.UtcNow:yyyy-MM-dd}.csv");
    }

    [HttpGet("payslips/{id:guid}/download")]
    public async Task<IActionResult> DownloadPayslip(Guid id)
    {
        var ps = await db.Payslips.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        if (ps == null) return NotFound();
        var month = System.Globalization.CultureInfo.InvariantCulture.DateTimeFormat.GetMonthName(ps.Month);
        var content = $"PAYSLIP — {month} {ps.Year}\n\n" +
                      $"Employee ID : {ps.EmployeeId}\n\n" +
                      $"EARNINGS\n" +
                      $"  Basic Salary       : {ps.BasicSalary:N2}\n" +
                      $"  HRA                : {ps.HRA:N2}\n" +
                      $"  Special Allowance  : {ps.SpecialAllowance:N2}\n" +
                      $"  Conveyance         : {ps.ConveyanceAllowance:N2}\n" +
                      $"  Medical            : {ps.MedicalAllowance:N2}\n" +
                      $"  Overtime Pay       : {ps.OvertimePay:N2}\n" +
                      $"  Bonus              : {ps.Bonus:N2}\n" +
                      $"  Gross Pay          : {ps.GrossPay:N2}\n\n" +
                      $"DEDUCTIONS\n" +
                      $"  Employee PF        : {ps.EmployeePF:N2}\n" +
                      $"  Employee ESIC      : {ps.EmployeeESIC:N2}\n\n" +
                      $"  NET PAY            : {ps.NetPay:N2}\n";
        var bytes = System.Text.Encoding.UTF8.GetBytes(content);
        return File(bytes, "application/octet-stream", $"payslip_{month}_{ps.Year}.txt");
    }

    // ── Expenses ──────────────────────────────────────────────────────────────
    [HttpGet("expenses")]
    public async Task<IActionResult> GetExpenses([FromQuery] Guid? employeeId, [FromQuery] string? status)
        => Ok(await expenseService.GetClaimsAsync(TenantId, employeeId, status));

    [HttpPost("expenses")]
    public async Task<IActionResult> CreateExpense([FromBody] ExpenseClaim claim)
        => Created(string.Empty, await expenseService.CreateClaimAsync(claim, TenantId, UserId));

    [HttpPatch("expenses/{id:guid}/status")]
    public async Task<IActionResult> UpdateExpenseStatus(Guid id, [FromBody] ExpenseStatusRequest req)
    {
        var result = await expenseService.UpdateStatusAsync(id, req.Status, TenantId, UserId);
        return result == null ? NotFound() : Ok(result);
    }

    // ── Compensation ──────────────────────────────────────────────────────────
    [HttpGet("compensation/reviews")]
    public async Task<IActionResult> GetCompReviews([FromQuery] Guid? employeeId)
        => Ok(await compensationService.GetCompensationReviewsAsync(TenantId, employeeId));

    [HttpPost("compensation/reviews")]
    public async Task<IActionResult> CreateCompReview([FromBody] CompensationReview review)
        => Created(string.Empty, await compensationService.CreateReviewAsync(review, TenantId, UserId));

    [HttpGet("benefits")]
    public async Task<IActionResult> GetBenefitPlans() => Ok(await compensationService.GetBenefitPlansAsync(TenantId));

    [HttpPost("benefits")]
    public async Task<IActionResult> CreateBenefitPlan([FromBody] BenefitPlan plan)
        => Created(string.Empty, await compensationService.CreateBenefitPlanAsync(plan, TenantId, UserId));

    [HttpGet("benefits/employee/{employeeId:guid}")]
    public async Task<IActionResult> GetEmployeeBenefits(Guid employeeId)
        => Ok(await compensationService.GetEmployeeBenefitsAsync(TenantId, employeeId));

    [HttpPost("benefits/enroll")]
    public async Task<IActionResult> EnrollBenefit([FromBody] EnrollBenefitRequest req)
    {
        try { return Created(string.Empty, await compensationService.EnrollBenefitAsync(req.EmployeeId, req.BenefitPlanId, null, TenantId, UserId)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpGet("bonuses")]
    public async Task<IActionResult> GetBonuses([FromQuery] Guid? employeeId, [FromQuery] int? year)
        => Ok(await compensationService.GetBonusRecordsAsync(TenantId, employeeId, year));

    [HttpPost("bonuses")]
    public async Task<IActionResult> CreateBonus([FromBody] BonusRecord bonus)
        => Created(string.Empty, await compensationService.CreateBonusAsync(bonus, TenantId, UserId));

    [HttpGet("benchmarks")]
    public async Task<IActionResult> GetBenchmarks([FromQuery] string? role, [FromQuery] string? department)
        => Ok(await compensationService.GetSalaryBenchmarksAsync(TenantId, role, department));

    [HttpPost("benchmarks")]
    public async Task<IActionResult> CreateBenchmark([FromBody] SalaryBenchmark benchmark)
        => Created(string.Empty, await compensationService.CreateBenchmarkAsync(benchmark, TenantId, UserId));

    // ── Tax & Statutory ───────────────────────────────────────────────────────
    [HttpGet("tax/declarations")]
    public async Task<IActionResult> GetDeclarations([FromQuery] Guid? employeeId, [FromQuery] string? fiscalYear)
        => Ok(await taxService.GetDeclarationsAsync(TenantId, employeeId, fiscalYear));

    [HttpPost("tax/declarations")]
    public async Task<IActionResult> SaveDeclaration([FromBody] TaxDeclaration declaration)
        => Ok(await taxService.SaveDeclarationAsync(declaration, TenantId, UserId));

    [HttpGet("statutory-filings")]
    public async Task<IActionResult> GetStatutoryFilings([FromQuery] string? filingType, [FromQuery] string? status)
        => Ok(await taxService.GetStatutoryFilingsAsync(TenantId, filingType, status));

    [HttpPost("statutory-filings")]
    public async Task<IActionResult> CreateFiling([FromBody] StatutoryFiling filing)
        => Created(string.Empty, await taxService.CreateFilingAsync(filing, TenantId, UserId));

    [HttpPatch("statutory-filings/{id:guid}/status")]
    public async Task<IActionResult> UpdateFilingStatus(Guid id, [FromBody] FilingStatusRequest req)
    {
        var result = await taxService.UpdateFilingStatusAsync(id, req.Status, req.AcknowledgmentNumber ?? string.Empty, TenantId);
        return result == null ? NotFound() : Ok(result);
    }
}

// ── Request DTOs ──────────────────────────────────────────────────────────────
public record ProcessPayrollRequest(int Month, int Year);
public record ExpenseStatusRequest(string Status, Guid? ApprovedBy, string? Remarks);
public record EnrollBenefitRequest(Guid EmployeeId, Guid BenefitPlanId);
public record FilingStatusRequest(string Status, string? AcknowledgmentNumber);
