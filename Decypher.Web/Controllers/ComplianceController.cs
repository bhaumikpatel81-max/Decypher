using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/compliance")]
    [Authorize]
    public class ComplianceController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public ComplianceController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        [HttpGet("audit-log")]
        public async Task<IActionResult> GetAuditLog([FromQuery] int page = 1, [FromQuery] int pageSize = 50,
            [FromQuery] string? eventType = null, [FromQuery] string? agentName = null)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var query = _db.AIAuditLogs.Where(a => a.TenantId == user.TenantId.ToString());
            if (!string.IsNullOrEmpty(eventType)) query = query.Where(a => a.EventType == eventType);
            if (!string.IsNullOrEmpty(agentName)) query = query.Where(a => a.AgentName == agentName);

            var total = query.Count();
            var items = query.OrderByDescending(a => a.CreatedAt)
                             .Skip((page - 1) * pageSize)
                             .Take(pageSize)
                             .ToList();

            return await Task.FromResult(Ok(new { total, page, pageSize, items }));
        }

        [HttpGet("gdpr/candidates")]
        public async Task<IActionResult> GetGdprCandidates()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var candidates = _db.Candidates
                .Where(c => c.TenantId == user.TenantId)
                .Select(c => new { c.Id, c.CandidateName, c.Email, c.CreatedAt })
                .ToList();

            return await Task.FromResult(Ok(candidates));
        }

        [HttpPost("gdpr/erase/{id}")]
        public async Task<IActionResult> EraseCandidate(Guid id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var candidate = _db.Candidates.FirstOrDefault(c => c.Id == id && c.TenantId == user.TenantId);
            if (candidate == null) return NotFound();

            // Anonymise rather than delete
            candidate.CandidateName = "ERASED";
            candidate.Email = $"erased-{id}@gdpr.local";
            candidate.Phone = null;

            await _db.SaveChangesAsync();
            return Ok(new { message = "Candidate data erased per GDPR right-to-erasure." });
        }

        [HttpGet("eeo-report")]
        public async Task<IActionResult> GetEeoReport()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var total = _db.Candidates.Count(c => c.TenantId == user.TenantId);

            return await Task.FromResult(Ok(new
            {
                totalCandidates = total,
                note = "EEO demographic data collection requires explicit candidate consent fields — extend Candidate model to include self-reported demographics."
            }));
        }
    }
}
