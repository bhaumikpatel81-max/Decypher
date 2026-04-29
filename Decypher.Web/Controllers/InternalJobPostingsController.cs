using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/internal-job-postings")]
    [AllowAnonymous]
    public class InternalJobPostingsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public InternalJobPostingsController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        private Guid GetTenantId()
        {
            var claim = User.FindFirst("TenantId")?.Value;
            return Guid.TryParse(claim, out var g) ? g : Guid.Empty;
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery] string? status)
        {
            var tenantId = GetTenantId();
            _db.SetCurrentTenant(tenantId);
            var q = _db.InternalJobPostings.Where(j => j.TenantId == tenantId && !j.IsDeleted);
            if (!string.IsNullOrEmpty(status)) q = q.Where(j => j.Status == status);
            return Ok(await q.OrderByDescending(j => j.PostedDate).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var tenantId = GetTenantId();
            var posting = await _db.InternalJobPostings.FirstOrDefaultAsync(j => j.Id == id && j.TenantId == tenantId);
            return posting == null ? NotFound() : Ok(posting);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InternalJobPosting posting)
        {
            var tenantId = GetTenantId();
            posting.Id = Guid.NewGuid();
            posting.TenantId = tenantId;
            posting.CreatedAt = DateTime.UtcNow;
            posting.UpdatedAt = DateTime.UtcNow;
            _db.InternalJobPostings.Add(posting);
            await _db.SaveChangesAsync();
            return Ok(posting);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] InternalJobPosting dto)
        {
            var tenantId = GetTenantId();
            var posting = await _db.InternalJobPostings.FirstOrDefaultAsync(j => j.Id == id && j.TenantId == tenantId);
            if (posting == null) return NotFound();
            posting.Title = dto.Title;
            posting.Department = dto.Department;
            posting.Location = dto.Location;
            posting.EmploymentType = dto.EmploymentType;
            posting.PostingType = dto.PostingType;
            posting.Description = dto.Description;
            posting.Requirements = dto.Requirements;
            posting.SalaryBandMin = dto.SalaryBandMin;
            posting.SalaryBandMax = dto.SalaryBandMax;
            posting.Currency = dto.Currency;
            posting.ShowSalary = dto.ShowSalary;
            posting.PostedDate = dto.PostedDate;
            posting.ClosingDate = dto.ClosingDate;
            posting.Status = dto.Status;
            posting.LinkedRequisitionId = dto.LinkedRequisitionId;
            posting.Notes = dto.Notes;
            posting.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return Ok(posting);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var tenantId = GetTenantId();
            var posting = await _db.InternalJobPostings.FirstOrDefaultAsync(j => j.Id == id && j.TenantId == tenantId);
            if (posting == null) return NotFound();
            posting.IsDeleted = true;
            posting.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return Ok(new { message = "Deleted." });
        }
    }
}
