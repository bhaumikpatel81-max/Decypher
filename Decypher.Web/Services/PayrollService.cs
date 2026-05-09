using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    // ═══════════════════════════════════════════════════════════════
    // SALARY SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface ISalaryService
    {
        Task<IEnumerable<object>> GetSalaryComponentsAsync(string tenantId);
        Task<SalaryComponent> CreateComponentAsync(SalaryComponent component, string tenantId, string userId);
        Task<object?> GetEmployeeSalaryAsync(Guid employeeId, string tenantId);
        Task<EmployeeSalary> SetEmployeeSalaryAsync(EmployeeSalary salary, string tenantId, string userId);
    }

    public class SalaryService : ISalaryService
    {
        private readonly ApplicationDbContext _ctx;
        public SalaryService(ApplicationDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<object>> GetSalaryComponentsAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.SalaryComponents.AsNoTracking()
                .Where(c => c.IsActive)
                .OrderBy(c => c.DisplayOrder)
                .Select(c => (object)new
                {
                    c.Id, c.Name, c.ComponentCode, c.Type,
                    c.IsFixed, c.FixedAmount, c.PercentageOfBasic, c.IsTaxable
                }).ToListAsync();
        }

        public async Task<SalaryComponent> CreateComponentAsync(SalaryComponent component, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            component.TenantId = tid;
            component.CreatedBy = userId;
            _ctx.SalaryComponents.Add(component);
            await _ctx.SaveChangesAsync();
            return component;
        }

        public async Task<object?> GetEmployeeSalaryAsync(Guid employeeId, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var salary = await _ctx.EmployeeSalaries.AsNoTracking()
                .Where(s => s.EmployeeId == employeeId && s.IsActive)
                .OrderByDescending(s => s.EffectiveFrom)
                .FirstOrDefaultAsync();

            if (salary == null) return null;

            return new
            {
                salary.Id, salary.EmployeeId,
                salary.BasicSalary, salary.HRA, salary.SpecialAllowance,
                salary.ConveyanceAllowance, salary.MedicalAllowance, salary.OtherAllowances,
                grossSalary = salary.BasicSalary + salary.HRA + salary.SpecialAllowance
                    + salary.ConveyanceAllowance + salary.MedicalAllowance + salary.OtherAllowances,
                salary.EmployeePF, salary.EmployerPF, salary.EmployeeESIC,
                salary.ProfessionalTax, salary.IncomeTax,
                totalDeductions = salary.EmployeePF + salary.EmployeeESIC + salary.ProfessionalTax + salary.IncomeTax,
                netSalary = salary.BasicSalary + salary.HRA + salary.SpecialAllowance
                    + salary.ConveyanceAllowance + salary.MedicalAllowance + salary.OtherAllowances
                    - (salary.EmployeePF + salary.EmployeeESIC + salary.ProfessionalTax + salary.IncomeTax),
                salary.TotalCTC, salary.EffectiveFrom
            };
        }

        public async Task<EmployeeSalary> SetEmployeeSalaryAsync(EmployeeSalary salary, string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            // Deactivate current salary
            var current = await _ctx.EmployeeSalaries
                .Where(s => s.EmployeeId == salary.EmployeeId && s.IsActive).ToListAsync();
            foreach (var s in current) { s.IsActive = false; s.EffectiveTo = salary.EffectiveFrom; }

            salary.TenantId = tid;
            salary.IsActive = true;
            salary.CreatedBy = userId;
            _ctx.EmployeeSalaries.Add(salary);
            await _ctx.SaveChangesAsync();
            return salary;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // PAYROLL SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface IPayrollRunService
    {
        Task<IEnumerable<object>> GetRunsAsync(string tenantId);
        Task<object?> GetRunDetailsAsync(Guid runId, string tenantId);
        Task<PayrollRun> ProcessPayrollAsync(int month, int year, string tenantId, string userId);
        Task<PayrollRun?> ApproveRunAsync(Guid runId, string tenantId, string userId);
        Task<IEnumerable<object>> GetPayslipsAsync(string tenantId, Guid? employeeId, int? month, int? year);
    }

    public class PayrollRunService : IPayrollRunService
    {
        private readonly ApplicationDbContext _ctx;
        private readonly ILogger<PayrollRunService> _log;

        public PayrollRunService(ApplicationDbContext ctx, ILogger<PayrollRunService> log)
        {
            _ctx = ctx;
            _log = log;
        }

        public async Task<IEnumerable<object>> GetRunsAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.PayrollRuns.AsNoTracking()
                .OrderByDescending(r => r.Year).ThenByDescending(r => r.Month)
                .Select(r => (object)new
                {
                    r.Id, r.Month, r.Year, r.Status, r.RunDate,
                    r.TotalGross, r.TotalDeductions, r.TotalNet, r.EmployeeCount
                }).ToListAsync();
        }

        public async Task<object?> GetRunDetailsAsync(Guid runId, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var run = await _ctx.PayrollRuns.AsNoTracking()
                .Include(r => r.Payslips).ThenInclude(p => p.Employee)
                .FirstOrDefaultAsync(r => r.Id == runId);

            if (run == null) return null;

            return new
            {
                run.Id, run.Month, run.Year, run.Status,
                run.TotalGross, run.TotalDeductions, run.TotalNet, run.EmployeeCount,
                payslips = run.Payslips.Select(p => new
                {
                    p.Id, p.EmployeeId,
                    employeeName = p.Employee.FirstName + " " + p.Employee.LastName,
                    p.Employee.Department, p.GrossPay, p.TotalDeductions, p.NetPay,
                    p.WorkingDays, p.PresentDays, p.Status
                })
            };
        }

        public async Task<PayrollRun> ProcessPayrollAsync(int month, int year, string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;

            // Check not already processed
            var existing = await _ctx.PayrollRuns
                .FirstOrDefaultAsync(r => r.Month == month && r.Year == year);
            if (existing != null && existing.Status != "Draft")
                throw new InvalidOperationException("Payroll already processed for this period");

            var employees = await _ctx.Employees.AsNoTracking()
                .Where(e => e.Status == "Active").ToListAsync();
            var salaries = await _ctx.EmployeeSalaries.AsNoTracking()
                .Where(s => s.IsActive).ToListAsync();

            // Get working days in the month
            var from = new DateTime(year, month, 1, 0, 0, 0, DateTimeKind.Utc);
            var to = from.AddMonths(1).AddDays(-1);
            var totalWorkingDays = 0;
            for (var d = from.Date; d <= to.Date; d = d.AddDays(1))
                if (d.DayOfWeek != DayOfWeek.Saturday && d.DayOfWeek != DayOfWeek.Sunday) totalWorkingDays++;

            var run = existing ?? new PayrollRun
            {
                TenantId = tid, Month = month, Year = year,
                Status = "Processing", RunDate = DateTime.UtcNow,
                RunById = userId, CreatedBy = userId
            };

            var payslips = new List<Payslip>();
            foreach (var emp in employees)
            {
                var sal = salaries.FirstOrDefault(s => s.EmployeeId == emp.Id);
                if (sal == null) continue;

                var attendance = await _ctx.AttendanceRecords.AsNoTracking()
                    .Where(r => r.EmployeeId == emp.Id && r.Date >= from && r.Date <= to)
                    .ToListAsync();

                var presentDays = attendance.Count(r => r.Status is "Present" or "Late");
                var leaveDays = await _ctx.LeaveRequests.AsNoTracking()
                    .Where(lr => lr.EmployeeId == emp.Id && lr.Status == "Approved"
                        && lr.StartDate >= from && lr.EndDate <= to)
                    .SumAsync(lr => lr.Days);

                // Pro-rate if needed
                var payFactor = totalWorkingDays > 0
                    ? (decimal)(presentDays + (double)leaveDays) / totalWorkingDays
                    : 1m;

                var gross = (sal.BasicSalary + sal.HRA + sal.SpecialAllowance
                    + sal.ConveyanceAllowance + sal.MedicalAllowance + sal.OtherAllowances) * payFactor;

                var pfAmount = sal.EmployeePF;
                var esicAmount = sal.EmployeeESIC;
                var ptAmount = sal.ProfessionalTax;
                var tdsAmount = sal.IncomeTax / 12m;

                payslips.Add(new Payslip
                {
                    TenantId = tid, EmployeeId = emp.Id,
                    Month = month, Year = year,
                    BasicSalary = sal.BasicSalary * payFactor,
                    HRA = sal.HRA * payFactor,
                    SpecialAllowance = sal.SpecialAllowance * payFactor,
                    ConveyanceAllowance = sal.ConveyanceAllowance * payFactor,
                    MedicalAllowance = sal.MedicalAllowance * payFactor,
                    OtherAllowances = sal.OtherAllowances * payFactor,
                    GrossPay = gross,
                    EmployeePF = pfAmount, EmployeeESIC = esicAmount,
                    ProfessionalTax = ptAmount, IncomeTaxTDS = tdsAmount,
                    TotalDeductions = pfAmount + esicAmount + ptAmount + tdsAmount,
                    NetPay = gross - (pfAmount + esicAmount + ptAmount + tdsAmount),
                    WorkingDays = totalWorkingDays,
                    PresentDays = presentDays,
                    LeaveDays = (int)leaveDays,
                    AbsentDays = Math.Max(0, totalWorkingDays - presentDays - (int)leaveDays),
                    Status = "Generated", CreatedBy = userId
                });
            }

            run.Payslips = payslips;
            run.TotalGross = payslips.Sum(p => p.GrossPay);
            run.TotalDeductions = payslips.Sum(p => p.TotalDeductions);
            run.TotalNet = payslips.Sum(p => p.NetPay);
            run.EmployeeCount = payslips.Count;
            run.Status = "Processed";

            if (existing == null) _ctx.PayrollRuns.Add(run);
            else run.Status = "Processed";
            await _ctx.SaveChangesAsync();

            _log.LogInformation("Payroll processed for {Month}/{Year}: {Count} employees", month, year, payslips.Count);
            return run;
        }

        public async Task<PayrollRun?> ApproveRunAsync(Guid runId, string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            var run = await _ctx.PayrollRuns.FindAsync(runId);
            if (run == null) return null;
            run.Status = "Approved";
            run.ApprovedById = userId;
            run.ApprovedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
            return run;
        }

        public async Task<IEnumerable<object>> GetPayslipsAsync(string tenantId, Guid? employeeId, int? month, int? year)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<Payslip> q = _ctx.Payslips.AsNoTracking().Include(p => p.Employee);
            if (employeeId.HasValue) q = q.Where(p => p.EmployeeId == employeeId.Value);
            if (month.HasValue) q = q.Where(p => p.Month == month.Value);
            if (year.HasValue) q = q.Where(p => p.Year == year.Value);

            return await q.OrderByDescending(p => p.Year).ThenByDescending(p => p.Month)
                .Select(p => (object)new
                {
                    p.Id, p.EmployeeId,
                    employeeName = p.Employee.FirstName + " " + p.Employee.LastName,
                    p.Employee.Department, p.Month, p.Year,
                    p.BasicSalary, p.HRA, p.SpecialAllowance,
                    p.GrossPay, p.TotalDeductions, p.NetPay,
                    p.WorkingDays, p.PresentDays, p.LeaveDays, p.AbsentDays,
                    p.Status, p.PayslipUrl
                }).ToListAsync();
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // EXPENSE SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface IExpenseService
    {
        Task<IEnumerable<object>> GetClaimsAsync(string tenantId, Guid? employeeId, string? status);
        Task<ExpenseClaim> CreateClaimAsync(ExpenseClaim claim, string tenantId, string userId);
        Task<ExpenseClaim?> UpdateStatusAsync(Guid id, string status, string tenantId, string userId);
    }

    public class ExpenseService : IExpenseService
    {
        private readonly ApplicationDbContext _ctx;
        public ExpenseService(ApplicationDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<object>> GetClaimsAsync(string tenantId, Guid? employeeId, string? status)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<ExpenseClaim> q = _ctx.ExpenseClaims.AsNoTracking().Include(c => c.Employee);
            if (employeeId.HasValue) q = q.Where(c => c.EmployeeId == employeeId.Value);
            if (!string.IsNullOrEmpty(status)) q = q.Where(c => c.Status == status);

            return await q.OrderByDescending(c => c.ExpenseDate).Select(c => (object)new
            {
                c.Id, c.EmployeeId,
                employeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                c.Category, c.Description, c.Amount, c.ExpenseDate,
                c.ReceiptUrl, c.Status, c.ProjectCode
            }).ToListAsync();
        }

        public async Task<ExpenseClaim> CreateClaimAsync(ExpenseClaim claim, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            claim.TenantId = tid;
            claim.Status = "Submitted";
            claim.CreatedBy = userId;
            _ctx.ExpenseClaims.Add(claim);
            await _ctx.SaveChangesAsync();
            return claim;
        }

        public async Task<ExpenseClaim?> UpdateStatusAsync(Guid id, string status, string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            var claim = await _ctx.ExpenseClaims.FindAsync(id);
            if (claim == null) return null;
            claim.Status = status;
            if (status == "Approved") { claim.ApprovedById = userId; claim.ApprovedAt = DateTime.UtcNow; }
            if (status == "Reimbursed") claim.ReimbursedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
            return claim;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // COMPENSATION & BENEFITS SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface ICompensationService
    {
        Task<IEnumerable<object>> GetCompensationReviewsAsync(string tenantId, Guid? employeeId);
        Task<CompensationReview> CreateReviewAsync(CompensationReview review, string tenantId, string userId);
        Task<IEnumerable<object>> GetBenefitPlansAsync(string tenantId);
        Task<BenefitPlan> CreateBenefitPlanAsync(BenefitPlan plan, string tenantId, string userId);
        Task<IEnumerable<object>> GetEmployeeBenefitsAsync(string tenantId, Guid employeeId);
        Task<EmployeeBenefit> EnrollBenefitAsync(Guid employeeId, Guid planId, string nomineeName, string tenantId, string userId);
        Task<IEnumerable<object>> GetBonusRecordsAsync(string tenantId, Guid? employeeId, int? year);
        Task<BonusRecord> CreateBonusAsync(BonusRecord bonus, string tenantId, string userId);
        Task<IEnumerable<object>> GetSalaryBenchmarksAsync(string tenantId, string? roleTitle, string? industry);
        Task<SalaryBenchmark> CreateBenchmarkAsync(SalaryBenchmark benchmark, string tenantId, string userId);
    }

    public class CompensationService : ICompensationService
    {
        private readonly ApplicationDbContext _ctx;
        public CompensationService(ApplicationDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<object>> GetCompensationReviewsAsync(string tenantId, Guid? employeeId)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<CompensationReview> q = _ctx.CompensationReviews.AsNoTracking().Include(r => r.Employee);
            if (employeeId.HasValue) q = q.Where(r => r.EmployeeId == employeeId.Value);

            return await q.OrderByDescending(r => r.ReviewDate).Select(r => (object)new
            {
                r.Id, r.EmployeeId,
                employeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                r.Employee.Department, r.ReviewDate, r.OldCTC, r.NewCTC,
                r.HikeAmount, r.HikePercentage, r.EffectiveDate, r.Reason, r.Status
            }).ToListAsync();
        }

        public async Task<CompensationReview> CreateReviewAsync(CompensationReview review, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            review.TenantId = tid;
            review.HikeAmount = review.NewCTC - review.OldCTC;
            review.HikePercentage = review.OldCTC > 0 ? Math.Round((review.HikeAmount / review.OldCTC) * 100, 2) : 0;
            review.CreatedBy = userId;
            _ctx.CompensationReviews.Add(review);
            await _ctx.SaveChangesAsync();
            return review;
        }

        public async Task<IEnumerable<object>> GetBenefitPlansAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.BenefitPlans.AsNoTracking()
                .Where(p => p.IsActive)
                .Select(p => (object)new
                {
                    p.Id, p.Name, p.Type, p.Provider, p.Description,
                    p.EmployerContribution, p.EmployeeContribution
                }).ToListAsync();
        }

        public async Task<BenefitPlan> CreateBenefitPlanAsync(BenefitPlan plan, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            plan.TenantId = tid;
            plan.CreatedBy = userId;
            _ctx.BenefitPlans.Add(plan);
            await _ctx.SaveChangesAsync();
            return plan;
        }

        public async Task<IEnumerable<object>> GetEmployeeBenefitsAsync(string tenantId, Guid employeeId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.EmployeeBenefits.AsNoTracking()
                .Include(eb => eb.BenefitPlan)
                .Where(eb => eb.EmployeeId == employeeId)
                .Select(eb => (object)new
                {
                    eb.Id, eb.EmployeeId, eb.BenefitPlanId,
                    planName = eb.BenefitPlan.Name, planType = eb.BenefitPlan.Type,
                    eb.EnrolledAt, eb.Status, eb.NomineeName
                }).ToListAsync();
        }

        public async Task<EmployeeBenefit> EnrollBenefitAsync(Guid employeeId, Guid planId, string nomineeName, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            var benefit = new EmployeeBenefit
            {
                TenantId = tid, EmployeeId = employeeId,
                BenefitPlanId = planId, NomineeName = nomineeName,
                Status = "Active", CreatedBy = userId
            };
            _ctx.EmployeeBenefits.Add(benefit);
            await _ctx.SaveChangesAsync();
            return benefit;
        }

        public async Task<IEnumerable<object>> GetBonusRecordsAsync(string tenantId, Guid? employeeId, int? year)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<BonusRecord> q = _ctx.BonusRecords.AsNoTracking().Include(b => b.Employee);
            if (employeeId.HasValue) q = q.Where(b => b.EmployeeId == employeeId.Value);
            if (year.HasValue) q = q.Where(b => b.Year == year.Value);

            return await q.OrderByDescending(b => b.Year).ThenByDescending(b => b.Month)
                .Select(b => (object)new
                {
                    b.Id, b.EmployeeId,
                    employeeName = b.Employee.FirstName + " " + b.Employee.LastName,
                    b.BonusType, b.Amount, b.Month, b.Year, b.Reason, b.Status
                }).ToListAsync();
        }

        public async Task<BonusRecord> CreateBonusAsync(BonusRecord bonus, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            bonus.TenantId = tid;
            bonus.CreatedBy = userId;
            _ctx.BonusRecords.Add(bonus);
            await _ctx.SaveChangesAsync();
            return bonus;
        }

        public async Task<IEnumerable<object>> GetSalaryBenchmarksAsync(string tenantId, string? roleTitle, string? industry)
        {
            _ctx.SetTenantId(tenantId);
            var q = _ctx.SalaryBenchmarks.AsNoTracking();
            if (!string.IsNullOrEmpty(roleTitle))
                q = q.Where(b => b.RoleTitle.ToLower().Contains(roleTitle.ToLower()));
            if (!string.IsNullOrEmpty(industry))
                q = q.Where(b => b.Industry == industry);

            return await q.Select(b => (object)new
            {
                b.Id, b.RoleTitle, b.Industry, b.Location,
                b.ExperienceRange, b.P25, b.Median, b.P75, b.P90,
                b.DataSource, b.DataYear
            }).ToListAsync();
        }

        public async Task<SalaryBenchmark> CreateBenchmarkAsync(SalaryBenchmark benchmark, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            benchmark.TenantId = tid;
            benchmark.CreatedBy = userId;
            _ctx.SalaryBenchmarks.Add(benchmark);
            await _ctx.SaveChangesAsync();
            return benchmark;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // TAX SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface ITaxService
    {
        Task<IEnumerable<object>> GetDeclarationsAsync(string tenantId, Guid? employeeId, string? fy);
        Task<TaxDeclaration> SaveDeclarationAsync(TaxDeclaration declaration, string tenantId, string userId);
        Task<IEnumerable<object>> GetStatutoryFilingsAsync(string tenantId, string? type, string? status);
        Task<StatutoryFiling> CreateFilingAsync(StatutoryFiling filing, string tenantId, string userId);
        Task<StatutoryFiling?> UpdateFilingStatusAsync(Guid id, string status, string ackNo, string tenantId);
    }

    public class TaxService : ITaxService
    {
        private readonly ApplicationDbContext _ctx;
        public TaxService(ApplicationDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<object>> GetDeclarationsAsync(string tenantId, Guid? employeeId, string? fy)
        {
            _ctx.SetTenantId(tenantId);
            IQueryable<TaxDeclaration> q = _ctx.TaxDeclarations.AsNoTracking().Include(d => d.Employee);
            if (employeeId.HasValue) q = q.Where(d => d.EmployeeId == employeeId.Value);
            if (!string.IsNullOrEmpty(fy)) q = q.Where(d => d.FinancialYear == fy);

            return await q.Select(d => (object)new
            {
                d.Id, d.EmployeeId,
                employeeName = d.Employee.FirstName + " " + d.Employee.LastName,
                d.FinancialYear, d.TaxRegime, d.TotalDeductions,
                d.TaxableIncome, d.EstimatedTax, d.TDSDeducted, d.Status
            }).ToListAsync();
        }

        public async Task<TaxDeclaration> SaveDeclarationAsync(TaxDeclaration declaration, string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            var existing = await _ctx.TaxDeclarations
                .FirstOrDefaultAsync(d => d.EmployeeId == declaration.EmployeeId
                    && d.FinancialYear == declaration.FinancialYear);

            if (existing != null)
            {
                existing.TaxRegime = declaration.TaxRegime;
                existing.EPF = declaration.EPF; existing.PPF = declaration.PPF;
                existing.LIC = declaration.LIC; existing.ELSS = declaration.ELSS;
                existing.HomeLoanPrincipal = declaration.HomeLoanPrincipal;
                existing.OtherSection80C = declaration.OtherSection80C;
                existing.HRAExemption = declaration.HRAExemption;
                existing.LTAExemption = declaration.LTAExemption;
                existing.MedicalInsurance80D = declaration.MedicalInsurance80D;
                existing.HomeLoanInterest = declaration.HomeLoanInterest;
                existing.NPS80CCD = declaration.NPS80CCD;
                existing.TotalDeductions = declaration.TotalDeductions;
                existing.TaxableIncome = declaration.TaxableIncome;
                existing.EstimatedTax = declaration.EstimatedTax;
                existing.Status = "Submitted";
                existing.UpdatedBy = userId;
                await _ctx.SaveChangesAsync();
                return existing;
            }

            declaration.TenantId = tid;
            declaration.Status = "Submitted";
            declaration.CreatedBy = userId;
            _ctx.TaxDeclarations.Add(declaration);
            await _ctx.SaveChangesAsync();
            return declaration;
        }

        public async Task<IEnumerable<object>> GetStatutoryFilingsAsync(string tenantId, string? type, string? status)
        {
            _ctx.SetTenantId(tenantId);
            var q = _ctx.StatutoryFilings.AsNoTracking();
            if (!string.IsNullOrEmpty(type)) q = q.Where(f => f.FilingType == type);
            if (!string.IsNullOrEmpty(status)) q = q.Where(f => f.Status == status);

            return await q.OrderByDescending(f => f.DueDate).Select(f => (object)new
            {
                f.Id, f.FilingType, f.Period, f.DueDate, f.FiledDate,
                f.Amount, f.PenaltyAmount, f.Status, f.AcknowledgementNo
            }).ToListAsync();
        }

        public async Task<StatutoryFiling> CreateFilingAsync(StatutoryFiling filing, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            filing.TenantId = tid;
            filing.CreatedBy = userId;
            _ctx.StatutoryFilings.Add(filing);
            await _ctx.SaveChangesAsync();
            return filing;
        }

        public async Task<StatutoryFiling?> UpdateFilingStatusAsync(Guid id, string status, string ackNo, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var filing = await _ctx.StatutoryFilings.FindAsync(id);
            if (filing == null) return null;
            filing.Status = status;
            filing.AcknowledgementNo = ackNo;
            if (status == "Filed") filing.FiledDate = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
            return filing;
        }
    }
}
