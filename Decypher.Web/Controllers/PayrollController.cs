using Decypher.Web.Models.HRModels;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/payroll")]
[Authorize]
public class PayrollController(
    ISalaryService salaryService,
    IPayrollRunService payrollRunService,
    IExpenseService expenseService,
    ICompensationService compensationService,
    ITaxService taxService) : ControllerBase
{
    // ── Salary Structure ──────────────────────────────────────────────────────
    [HttpGet("salary-components")]
    public async Task<IActionResult> GetComponents() => Ok(await salaryService.GetSalaryComponentsAsync());

    [HttpPost("salary-components")]
    public async Task<IActionResult> CreateComponent([FromBody] SalaryComponent component)
        => Created(string.Empty, await salaryService.CreateComponentAsync(component));

    [HttpGet("employee-salary/{employeeId:guid}")]
    public async Task<IActionResult> GetEmployeeSalary(Guid employeeId)
        => Ok(await salaryService.GetEmployeeSalaryAsync(employeeId));

    [HttpPost("employee-salary/{employeeId:guid}")]
    public async Task<IActionResult> SetEmployeeSalary(Guid employeeId, [FromBody] EmployeeSalary salary)
    {
        try { return Ok(await salaryService.SetEmployeeSalaryAsync(employeeId, salary)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    // ── Payroll Runs ──────────────────────────────────────────────────────────
    [HttpGet("runs")]
    public async Task<IActionResult> GetRuns([FromQuery] int? year, [FromQuery] int? month)
        => Ok(await payrollRunService.GetRunsAsync(year, month));

    [HttpGet("runs/{id:guid}")]
    public async Task<IActionResult> GetRunDetails(Guid id)
    {
        try { return Ok(await payrollRunService.GetRunDetailsAsync(id)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    [HttpPost("runs/process")]
    public async Task<IActionResult> ProcessPayroll([FromBody] ProcessPayrollRequest req)
    {
        try { return Ok(await payrollRunService.ProcessPayrollAsync(req.Month, req.Year)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpPost("runs/{id:guid}/approve")]
    public async Task<IActionResult> ApproveRun(Guid id)
    {
        try { return Ok(await payrollRunService.ApproveRunAsync(id)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpGet("payslips")]
    public async Task<IActionResult> GetPayslips([FromQuery] Guid? employeeId, [FromQuery] Guid? payrollRunId)
        => Ok(await payrollRunService.GetPayslipsAsync(employeeId, payrollRunId));

    // ── Expenses ──────────────────────────────────────────────────────────────
    [HttpGet("expenses")]
    public async Task<IActionResult> GetExpenses(
        [FromQuery] Guid? employeeId, [FromQuery] string? status, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        => Ok(await expenseService.GetClaimsAsync(employeeId, status, from, to));

    [HttpPost("expenses")]
    public async Task<IActionResult> CreateExpense([FromBody] ExpenseClaim claim)
        => Created(string.Empty, await expenseService.CreateClaimAsync(claim));

    [HttpPatch("expenses/{id:guid}/status")]
    public async Task<IActionResult> UpdateExpenseStatus(Guid id, [FromBody] ExpenseStatusRequest req)
    {
        try { return Ok(await expenseService.UpdateStatusAsync(id, req.Status, req.ApprovedBy, req.Remarks)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }

    // ── Compensation ──────────────────────────────────────────────────────────
    [HttpGet("compensation/reviews")]
    public async Task<IActionResult> GetCompReviews([FromQuery] Guid? employeeId, [FromQuery] string? status)
        => Ok(await compensationService.GetCompensationReviewsAsync(employeeId, status));

    [HttpPost("compensation/reviews")]
    public async Task<IActionResult> CreateCompReview([FromBody] CompensationReview review)
        => Created(string.Empty, await compensationService.CreateReviewAsync(review));

    [HttpGet("benefits")]
    public async Task<IActionResult> GetBenefitPlans() => Ok(await compensationService.GetBenefitPlansAsync());

    [HttpPost("benefits")]
    public async Task<IActionResult> CreateBenefitPlan([FromBody] BenefitPlan plan)
        => Created(string.Empty, await compensationService.CreateBenefitPlanAsync(plan));

    [HttpGet("benefits/employee/{employeeId:guid}")]
    public async Task<IActionResult> GetEmployeeBenefits(Guid employeeId)
        => Ok(await compensationService.GetEmployeeBenefitsAsync(employeeId));

    [HttpPost("benefits/enroll")]
    public async Task<IActionResult> EnrollBenefit([FromBody] EnrollBenefitRequest req)
    {
        try { return Created(string.Empty, await compensationService.EnrollBenefitAsync(req.EmployeeId, req.BenefitPlanId)); }
        catch (Exception ex) { return BadRequest(new { message = ex.Message }); }
    }

    [HttpGet("bonuses")]
    public async Task<IActionResult> GetBonuses([FromQuery] Guid? employeeId, [FromQuery] int? year)
        => Ok(await compensationService.GetBonusRecordsAsync(employeeId, year));

    [HttpPost("bonuses")]
    public async Task<IActionResult> CreateBonus([FromBody] BonusRecord bonus)
        => Created(string.Empty, await compensationService.CreateBonusAsync(bonus));

    [HttpGet("benchmarks")]
    public async Task<IActionResult> GetBenchmarks([FromQuery] string? role, [FromQuery] string? department)
        => Ok(await compensationService.GetSalaryBenchmarksAsync(role, department));

    [HttpPost("benchmarks")]
    public async Task<IActionResult> CreateBenchmark([FromBody] SalaryBenchmark benchmark)
        => Created(string.Empty, await compensationService.CreateBenchmarkAsync(benchmark));

    // ── Tax & Statutory ───────────────────────────────────────────────────────
    [HttpGet("tax/declarations")]
    public async Task<IActionResult> GetDeclarations([FromQuery] Guid? employeeId, [FromQuery] string? fiscalYear)
        => Ok(await taxService.GetDeclarationsAsync(employeeId, fiscalYear));

    [HttpPost("tax/declarations")]
    public async Task<IActionResult> SaveDeclaration([FromBody] TaxDeclaration declaration)
        => Ok(await taxService.SaveDeclarationAsync(declaration));

    [HttpGet("statutory-filings")]
    public async Task<IActionResult> GetStatutoryFilings(
        [FromQuery] string? filingType, [FromQuery] string? status, [FromQuery] int? year)
        => Ok(await taxService.GetStatutoryFilingsAsync(filingType, status, year));

    [HttpPost("statutory-filings")]
    public async Task<IActionResult> CreateFiling([FromBody] StatutoryFiling filing)
        => Created(string.Empty, await taxService.CreateFilingAsync(filing));

    [HttpPatch("statutory-filings/{id:guid}/status")]
    public async Task<IActionResult> UpdateFilingStatus(Guid id, [FromBody] FilingStatusRequest req)
    {
        try { return Ok(await taxService.UpdateFilingStatusAsync(id, req.Status, req.AcknowledgmentNumber)); }
        catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
    }
}

// ── Request DTOs ──────────────────────────────────────────────────────────────
public record ProcessPayrollRequest(int Month, int Year);
public record ExpenseStatusRequest(string Status, Guid? ApprovedBy, string? Remarks);
public record EnrollBenefitRequest(Guid EmployeeId, Guid BenefitPlanId);
public record FilingStatusRequest(string Status, string? AcknowledgmentNumber);
