using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/onboarding")]
    [Authorize]
    public class OnboardingController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        private static readonly string[][] DefaultChecklist = new[]
        {
            new[] { "ITSetup",         "Laptop & Equipment Provisioned",    "false" },
            new[] { "ITSetup",         "Email & System Access Created",      "false" },
            new[] { "Documents",       "Offer Letter Collected",             "false" },
            new[] { "Documents",       "ID & Address Proof Verified",        "false" },
            new[] { "Documents",       "Bank Details Submitted",             "false" },
            new[] { "Orientation",     "Induction Session Scheduled",        "false" },
            new[] { "Orientation",     "Team Introduction Completed",        "false" },
            new[] { "BackgroundCheck", "Employment History Verified",        "false" },
            new[] { "BackgroundCheck", "Education Credentials Verified",     "false" },
            new[] { "ESignature",      "Employment Agreement Signed",        "true"  },
            new[] { "ESignature",      "NDA / Confidentiality Agreement",    "true"  },
        };

        public OnboardingController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Initiate([FromBody] InitiateOnboardingRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var existing = await _db.OnboardingRecords
                .FirstOrDefaultAsync(o => o.CandidateId == req.CandidateId && o.TenantId == user.TenantId);
            if (existing != null)
                return Ok(existing);

            var record = new OnboardingRecord
            {
                CandidateId      = req.CandidateId,
                CandidateName    = req.CandidateName,
                JobTitle         = req.JobTitle,
                OfferId          = req.OfferId,
                ExpectedStartDate = req.ExpectedStartDate,
                OverallStatus    = "Pending",
                TenantId         = user.TenantId,
                Items            = DefaultChecklist.Select(row => new OnboardingChecklistItem
                {
                    Category          = row[0],
                    Title             = row[1],
                    RequiresSignature = row[2] == "true",
                    Status            = "Pending",
                    TenantId          = user.TenantId
                }).ToList()
            };

            _db.OnboardingRecords.Add(record);
            await _db.SaveChangesAsync();
            return Ok(record);
        }

        [HttpGet("{candidateId}")]
        public async Task<IActionResult> GetByCandidateId(string candidateId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var record = await _db.OnboardingRecords
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.CandidateId == candidateId && o.TenantId == user.TenantId);

            if (record == null) return NotFound();
            return Ok(record);
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var records = await _db.OnboardingRecords
                .Include(o => o.Items)
                .Where(o => o.TenantId == user.TenantId)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return Ok(records);
        }

        [HttpPatch("{id}/item")]
        public async Task<IActionResult> UpdateItem(Guid id, [FromBody] UpdateChecklistItemRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var item = await _db.OnboardingChecklistItems
                .Include(i => i.OnboardingRecord)
                .FirstOrDefaultAsync(i => i.Id == id && i.TenantId == user.TenantId);

            if (item == null) return NotFound();

            item.Status = req.Status;
            if (req.Notes != null) item.Notes = req.Notes;
            if (req.Signed.HasValue) item.Signed = req.Signed.Value;
            if (req.Status == "Complete") item.CompletedAt = DateTime.UtcNow;

            // Recalculate overall status
            if (item.OnboardingRecord != null)
            {
                var allItems = await _db.OnboardingChecklistItems
                    .Where(i => i.OnboardingRecordId == item.OnboardingRecordId)
                    .ToListAsync();

                var allComplete  = allItems.All(i => i.Status == "Complete");
                var anyInProgress = allItems.Any(i => i.Status == "InProgress" || i.Status == "Complete");

                item.OnboardingRecord.OverallStatus = allComplete ? "Complete"
                    : anyInProgress ? "InProgress" : "Pending";
            }

            await _db.SaveChangesAsync();
            return Ok(item);
        }
    }
}
