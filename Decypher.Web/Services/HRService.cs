using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    // ═══════════════════════════════════════════════════════════════
    // EMPLOYEE SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface IEmployeeService
    {
        Task<IEnumerable<object>> GetAllAsync(string tenantId, string? department = null, string? status = null, string? search = null);
        Task<object?> GetByIdAsync(Guid id, string tenantId);
        Task<Employee> CreateAsync(Employee employee, string tenantId, string userId);
        Task<Employee?> UpdateAsync(Guid id, Employee patch, string tenantId, string userId);
        Task<bool> DeleteAsync(Guid id, string tenantId);
        Task<IEnumerable<object>> GetOrgChartAsync(string tenantId);
        Task<object> GetSummaryAsync(string tenantId);
        Task<string> GenerateEmployeeCodeAsync(string tenantId);
    }

    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _ctx;
        private readonly ILogger<EmployeeService> _log;

        public EmployeeService(ApplicationDbContext ctx, ILogger<EmployeeService> log)
        {
            _ctx = ctx;
            _log = log;
        }

        public async Task<IEnumerable<object>> GetAllAsync(string tenantId, string? department = null, string? status = null, string? search = null)
        {
            _ctx.SetTenantId(tenantId);
            var q = _ctx.Employees.AsNoTracking();

            if (!string.IsNullOrEmpty(department)) q = q.Where(e => e.Department == department);
            if (!string.IsNullOrEmpty(status)) q = q.Where(e => e.Status == status);
            if (!string.IsNullOrEmpty(search))
            {
                var s = search.ToLower();
                q = q.Where(e => e.FirstName.ToLower().Contains(s)
                    || e.LastName.ToLower().Contains(s)
                    || e.Email.ToLower().Contains(s)
                    || e.EmployeeCode.ToLower().Contains(s)
                    || (e.Designation != null && e.Designation.ToLower().Contains(s)));
            }

            return await q.OrderBy(e => e.FirstName).Select(e => (object)new
            {
                e.Id, e.EmployeeCode, e.FirstName, e.LastName, fullName = e.FirstName + " " + e.LastName,
                e.Email, e.Phone, e.Department, e.Designation, e.Location,
                e.Gender, e.DateOfJoining, e.Status, e.EmploymentType,
                e.ManagerId, e.ProfilePictureUrl,
                initials = (e.FirstName.Length > 0 ? e.FirstName[0].ToString() : "") +
                           (e.LastName.Length > 0 ? e.LastName[0].ToString() : "")
            }).ToListAsync();
        }

        public async Task<object?> GetByIdAsync(Guid id, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var e = await _ctx.Employees.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (e == null) return null;

            var manager = e.ManagerId.HasValue
                ? await _ctx.Employees.AsNoTracking()
                    .Where(m => m.Id == e.ManagerId.Value)
                    .Select(m => new { m.Id, fullName = m.FirstName + " " + m.LastName })
                    .FirstOrDefaultAsync()
                : null;

            return new
            {
                e.Id, e.EmployeeCode, e.FirstName, e.LastName, fullName = e.FirstName + " " + e.LastName,
                e.Email, e.Phone, e.Department, e.Designation, e.Location,
                e.Gender, e.DateOfBirth, e.DateOfJoining, e.DateOfLeaving,
                e.Status, e.EmploymentType, e.ManagerId, manager,
                e.Address, e.ProfilePictureUrl, e.PAN, e.UAN, e.ESIC,
                e.BankName, e.BankAccountNumber, e.IFSC,
                e.CreatedAt, e.UpdatedAt
            };
        }

        public async Task<Employee> CreateAsync(Employee employee, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            employee.TenantId = tid;
            employee.CreatedBy = userId;
            if (string.IsNullOrEmpty(employee.EmployeeCode))
                employee.EmployeeCode = await GenerateEmployeeCodeAsync(tenantId);

            _ctx.Employees.Add(employee);
            await _ctx.SaveChangesAsync();
            _log.LogInformation("Employee {Code} created for tenant {TenantId}", employee.EmployeeCode, tenantId);
            return employee;
        }

        public async Task<Employee?> UpdateAsync(Guid id, Employee patch, string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            var emp = await _ctx.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (emp == null) return null;

            if (!string.IsNullOrEmpty(patch.FirstName)) emp.FirstName = patch.FirstName;
            if (!string.IsNullOrEmpty(patch.LastName)) emp.LastName = patch.LastName;
            if (!string.IsNullOrEmpty(patch.Phone)) emp.Phone = patch.Phone;
            if (!string.IsNullOrEmpty(patch.Department)) emp.Department = patch.Department;
            if (!string.IsNullOrEmpty(patch.Designation)) emp.Designation = patch.Designation;
            if (!string.IsNullOrEmpty(patch.Location)) emp.Location = patch.Location;
            if (!string.IsNullOrEmpty(patch.Status)) emp.Status = patch.Status;
            if (!string.IsNullOrEmpty(patch.EmploymentType)) emp.EmploymentType = patch.EmploymentType;
            if (patch.ManagerId.HasValue) emp.ManagerId = patch.ManagerId;
            if (!string.IsNullOrEmpty(patch.Address)) emp.Address = patch.Address;
            if (!string.IsNullOrEmpty(patch.ProfilePictureUrl)) emp.ProfilePictureUrl = patch.ProfilePictureUrl;
            if (patch.DateOfBirth.HasValue) emp.DateOfBirth = patch.DateOfBirth;
            if (patch.DateOfLeaving.HasValue) emp.DateOfLeaving = patch.DateOfLeaving;
            if (!string.IsNullOrEmpty(patch.PAN)) emp.PAN = patch.PAN;
            if (!string.IsNullOrEmpty(patch.UAN)) emp.UAN = patch.UAN;
            if (!string.IsNullOrEmpty(patch.ESIC)) emp.ESIC = patch.ESIC;
            if (!string.IsNullOrEmpty(patch.BankName)) emp.BankName = patch.BankName;
            if (!string.IsNullOrEmpty(patch.BankAccountNumber)) emp.BankAccountNumber = patch.BankAccountNumber;
            if (!string.IsNullOrEmpty(patch.IFSC)) emp.IFSC = patch.IFSC;
            emp.UpdatedBy = userId;

            await _ctx.SaveChangesAsync();
            return emp;
        }

        public async Task<bool> DeleteAsync(Guid id, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var emp = await _ctx.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (emp == null) return false;
            emp.IsDeleted = true;
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<object>> GetOrgChartAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var employees = await _ctx.Employees.AsNoTracking()
                .Where(e => e.Status == "Active")
                .Select(e => new
                {
                    e.Id, e.EmployeeCode,
                    fullName = e.FirstName + " " + e.LastName,
                    e.Designation, e.Department, e.ManagerId, e.ProfilePictureUrl,
                    initials = (e.FirstName.Length > 0 ? e.FirstName[0].ToString() : "") +
                               (e.LastName.Length > 0 ? e.LastName[0].ToString() : "")
                })
                .ToListAsync();
            return employees;
        }

        public async Task<object> GetSummaryAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var total = await _ctx.Employees.CountAsync();
            var active = await _ctx.Employees.CountAsync(e => e.Status == "Active");
            var byDept = await _ctx.Employees.GroupBy(e => e.Department ?? "Unknown")
                .Select(g => new { department = g.Key, count = g.Count() })
                .ToListAsync();
            var byType = await _ctx.Employees.GroupBy(e => e.EmploymentType)
                .Select(g => new { type = g.Key, count = g.Count() })
                .ToListAsync();

            return new { total, active, inactive = total - active, byDepartment = byDept, byEmploymentType = byType };
        }

        public async Task<string> GenerateEmployeeCodeAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var count = await _ctx.Employees.CountAsync() + 1;
            return $"EMP{count:D4}";
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // DOCUMENT SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface IDocumentService
    {
        Task<IEnumerable<object>> GetForEntityAsync(string entityType, Guid entityId, string tenantId);
        Task<Document> CreateAsync(Document doc, string tenantId, string userId);
        Task<bool> DeleteAsync(Guid id, string tenantId);
    }

    public class DocumentService : IDocumentService
    {
        private readonly ApplicationDbContext _ctx;
        public DocumentService(ApplicationDbContext ctx) { _ctx = ctx; }

        public async Task<IEnumerable<object>> GetForEntityAsync(string entityType, Guid entityId, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.Documents.AsNoTracking()
                .Where(d => d.EntityType == entityType && d.EntityId == entityId)
                .OrderByDescending(d => d.UploadedAt)
                .Select(d => (object)new
                {
                    d.Id, d.FileName, d.FileUrl, d.FileSizeBytes, d.MimeType,
                    d.Category, d.Description, d.UploadedAt, d.IsConfidential, d.ExpiryDate
                }).ToListAsync();
        }

        public async Task<Document> CreateAsync(Document doc, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            doc.TenantId = tid;
            doc.UploadedById = userId;
            doc.UploadedAt = DateTime.UtcNow;
            _ctx.Documents.Add(doc);
            await _ctx.SaveChangesAsync();
            return doc;
        }

        public async Task<bool> DeleteAsync(Guid id, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var doc = await _ctx.Documents.FirstOrDefaultAsync(d => d.Id == id);
            if (doc == null) return false;
            doc.IsDeleted = true;
            await _ctx.SaveChangesAsync();
            return true;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // LETTER SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface ILetterService
    {
        Task<IEnumerable<object>> GetTemplatesAsync(string tenantId);
        Task<LetterTemplate> CreateTemplateAsync(LetterTemplate template, string tenantId, string userId);
        Task<IEnumerable<object>> GetIssuedLettersAsync(Guid? employeeId, string tenantId);
        Task<IssuedLetter> IssueLetterAsync(Guid templateId, Guid employeeId, string tenantId, string userId);
    }

    public class LetterService : ILetterService
    {
        private readonly ApplicationDbContext _ctx;
        private readonly ILogger<LetterService> _log;

        public LetterService(ApplicationDbContext ctx, ILogger<LetterService> log)
        {
            _ctx = ctx;
            _log = log;
        }

        public async Task<IEnumerable<object>> GetTemplatesAsync(string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            return await _ctx.LetterTemplates.AsNoTracking()
                .Where(t => t.IsActive)
                .Select(t => (object)new { t.Id, t.Name, t.LetterType, t.IsActive, t.CreatedAt })
                .ToListAsync();
        }

        public async Task<LetterTemplate> CreateTemplateAsync(LetterTemplate template, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            template.TenantId = tid;
            template.CreatedBy = userId;
            _ctx.LetterTemplates.Add(template);
            await _ctx.SaveChangesAsync();
            return template;
        }

        public async Task<IEnumerable<object>> GetIssuedLettersAsync(Guid? employeeId, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var q = _ctx.IssuedLetters.AsNoTracking()
                .Include(il => il.Template)
                .Include(il => il.Employee);

            if (employeeId.HasValue) q = q.Where(il => il.EmployeeId == employeeId.Value);

            return await q.OrderByDescending(il => il.IssuedAt)
                .Select(il => (object)new
                {
                    il.Id, il.EmployeeId,
                    employeeName = il.Employee.FirstName + " " + il.Employee.LastName,
                    il.TemplateId, templateName = il.Template.Name,
                    letterType = il.Template.LetterType,
                    il.IssuedAt, il.Status, il.DocumentUrl
                }).ToListAsync();
        }

        public async Task<IssuedLetter> IssueLetterAsync(Guid templateId, Guid employeeId, string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            var template = await _ctx.LetterTemplates.FindAsync(templateId)
                ?? throw new InvalidOperationException("Template not found");
            var employee = await _ctx.Employees.FindAsync(employeeId)
                ?? throw new InvalidOperationException("Employee not found");

            // Merge template placeholders
            var content = template.Content
                .Replace("{{Employee.FirstName}}", employee.FirstName)
                .Replace("{{Employee.LastName}}", employee.LastName)
                .Replace("{{Employee.FullName}}", employee.FirstName + " " + employee.LastName)
                .Replace("{{Employee.EmployeeCode}}", employee.EmployeeCode)
                .Replace("{{Employee.Designation}}", employee.Designation ?? "")
                .Replace("{{Employee.Department}}", employee.Department ?? "")
                .Replace("{{Employee.DateOfJoining}}", employee.DateOfJoining.ToString("dd MMM yyyy"))
                .Replace("{{Date}}", DateTime.UtcNow.ToString("dd MMM yyyy"));

            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            var letter = new IssuedLetter
            {
                TenantId = tid,
                TemplateId = templateId,
                EmployeeId = employeeId,
                IssuedById = userId,
                IssuedAt = DateTime.UtcNow,
                Status = "Issued",
                CustomContent = content,
                CreatedBy = userId
            };

            _ctx.IssuedLetters.Add(letter);
            await _ctx.SaveChangesAsync();
            _log.LogInformation("Letter {Type} issued to employee {EmpId}", template.LetterType, employeeId);
            return letter;
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // EXIT MANAGEMENT SERVICE
    // ═══════════════════════════════════════════════════════════════

    public interface IExitService
    {
        Task<IEnumerable<object>> GetAllAsync(string tenantId, string? status = null);
        Task<object?> GetByIdAsync(Guid id, string tenantId);
        Task<ExitRequest> CreateAsync(ExitRequest request, string tenantId, string userId);
        Task<ExitRequest?> UpdateStatusAsync(Guid id, string status, string comments, string tenantId, string userId);
        Task<ExitChecklistItem> UpdateChecklistItemAsync(Guid itemId, string status, string tenantId);
    }

    public class ExitService : IExitService
    {
        private readonly ApplicationDbContext _ctx;
        private readonly ILogger<ExitService> _log;

        public ExitService(ApplicationDbContext ctx, ILogger<ExitService> log)
        {
            _ctx = ctx;
            _log = log;
        }

        public async Task<IEnumerable<object>> GetAllAsync(string tenantId, string? status = null)
        {
            _ctx.SetTenantId(tenantId);
            var q = _ctx.ExitRequests.AsNoTracking().Include(e => e.Employee);
            if (!string.IsNullOrEmpty(status)) q = q.Where(e => e.Status == status);

            return await q.OrderByDescending(e => e.ResignationDate)
                .Select(e => (object)new
                {
                    e.Id, e.EmployeeId,
                    employeeName = e.Employee.FirstName + " " + e.Employee.LastName,
                    e.Employee.Department, e.Employee.Designation,
                    e.ResignationDate, e.LastWorkingDay, e.ExitType, e.Status
                }).ToListAsync();
        }

        public async Task<object?> GetByIdAsync(Guid id, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var request = await _ctx.ExitRequests.AsNoTracking()
                .Include(e => e.Employee)
                .Include(e => e.ChecklistItems)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (request == null) return null;

            return new
            {
                request.Id, request.EmployeeId,
                employeeName = request.Employee.FirstName + " " + request.Employee.LastName,
                request.Employee.Department, request.Employee.Designation,
                request.ResignationDate, request.LastWorkingDay, request.ExitType,
                request.Reason, request.Status, request.HRComments,
                request.NoticePeriodWaived, request.ExitInterviewSummary,
                checklistItems = request.ChecklistItems
            };
        }

        public async Task<ExitRequest> CreateAsync(ExitRequest request, string tenantId, string userId)
        {
            if (!Guid.TryParse(tenantId, out var tid)) tid = Guid.Empty;
            request.TenantId = tid;
            request.CreatedBy = userId;

            // Auto-seed default checklist items
            request.ChecklistItems = new List<ExitChecklistItem>
            {
                new() { TenantId = tid, Task = "Return laptop & accessories", Department = "IT", Status = "Pending" },
                new() { TenantId = tid, Task = "Clear email access & accounts", Department = "IT", Status = "Pending" },
                new() { TenantId = tid, Task = "Complete knowledge transfer", Department = "HR", Status = "Pending" },
                new() { TenantId = tid, Task = "Clear outstanding expense claims", Department = "Finance", Status = "Pending" },
                new() { TenantId = tid, Task = "Return ID card & access badge", Department = "Admin", Status = "Pending" },
                new() { TenantId = tid, Task = "Issue relieving & experience letter", Department = "HR", Status = "Pending" },
                new() { TenantId = tid, Task = "Final salary settlement", Department = "Finance", Status = "Pending" },
                new() { TenantId = tid, Task = "Exit interview completed", Department = "HR", Status = "Pending" }
            };

            _ctx.ExitRequests.Add(request);
            await _ctx.SaveChangesAsync();
            return request;
        }

        public async Task<ExitRequest?> UpdateStatusAsync(Guid id, string status, string comments, string tenantId, string userId)
        {
            _ctx.SetTenantId(tenantId);
            var request = await _ctx.ExitRequests.FirstOrDefaultAsync(e => e.Id == id);
            if (request == null) return null;
            request.Status = status;
            request.HRComments = comments;
            if (status == "Approved") { request.ApprovedById = userId; request.ApprovedAt = DateTime.UtcNow; }
            await _ctx.SaveChangesAsync();
            return request;
        }

        public async Task<ExitChecklistItem> UpdateChecklistItemAsync(Guid itemId, string status, string tenantId)
        {
            _ctx.SetTenantId(tenantId);
            var item = await _ctx.ExitChecklistItems.FindAsync(itemId)
                ?? throw new InvalidOperationException("Checklist item not found");
            item.Status = status;
            if (status == "Done") item.CompletedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
            return item;
        }
    }
}
