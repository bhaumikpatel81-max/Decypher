using Decypher.Web.Data;
using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/requisitions")]
    [Authorize]
    public class RequisitionController : ControllerBase
    {
        private readonly IRequisitionService _service;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _db;

        public RequisitionController(IRequisitionService service, UserManager<ApplicationUser> userManager, ApplicationDbContext db)
        {
            _service = service;
            _userManager = userManager;
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery] string? status)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.ListAsync(status, user.TenantId));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRequisitionRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.CreateAsync(req, user.Id, user.TenantId));
        }

        [HttpPut("{id}/approve")]
        public async Task<IActionResult> Approve(Guid id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.ApproveAsync(id, user.Id, user.TenantId));
        }

        [HttpPut("{id}/reject")]
        public async Task<IActionResult> Reject(Guid id, [FromBody] RejectRequisitionRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.RejectAsync(id, user.Id, req.Reason, user.TenantId));
        }

        [HttpPut("{id}/hold")]
        public async Task<IActionResult> Hold(Guid id, [FromBody] HoldRequisitionRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var req_ = await _db.Requirements.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == user.TenantId);
            if (req_ == null) return NotFound();

            var prev = req_.Status;
            req_.Status = "OnHold";
            req_.HoldReason = req.Reason;
            req_.HoldStartDate = DateTime.UtcNow;
            req_.UpdatedAt = DateTime.UtcNow;

            _db.RequisitionStatusHistories.Add(new RequisitionStatusHistory
            {
                TenantId = user.TenantId,
                RequirementId = id,
                FromStatus = prev,
                ToStatus = "OnHold",
                Reason = req.Reason,
                ChangedById = user.Id,
                ChangedAt = DateTime.UtcNow
            });
            await _db.SaveChangesAsync();
            return Ok(new { message = "Requisition placed on hold." });
        }

        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> Cancel(Guid id, [FromBody] CancelRequisitionRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var req_ = await _db.Requirements.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == user.TenantId);
            if (req_ == null) return NotFound();

            var prev = req_.Status;
            req_.Status = "Cancelled";
            req_.CancelReason = req.Reason;
            req_.UpdatedAt = DateTime.UtcNow;

            _db.RequisitionStatusHistories.Add(new RequisitionStatusHistory
            {
                TenantId = user.TenantId,
                RequirementId = id,
                FromStatus = prev,
                ToStatus = "Cancelled",
                Reason = req.Reason,
                ChangedById = user.Id,
                ChangedAt = DateTime.UtcNow
            });
            await _db.SaveChangesAsync();
            return Ok(new { message = "Requisition cancelled." });
        }

        [HttpPut("{id}/revise-date")]
        public async Task<IActionResult> ReviseDate(Guid id, [FromBody] ReviseDateRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var req_ = await _db.Requirements.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == user.TenantId);
            if (req_ == null) return NotFound();

            req_.RevisedClosureDate = req.NewDate;
            req_.TargetDate = req.NewDate;
            req_.UpdatedAt = DateTime.UtcNow;

            _db.RequisitionStatusHistories.Add(new RequisitionStatusHistory
            {
                TenantId = user.TenantId,
                RequirementId = id,
                FromStatus = req_.Status,
                ToStatus = req_.Status,
                Reason = $"Closure date revised to {req.NewDate:dd-MMM-yyyy}",
                ChangedById = user.Id,
                ChangedAt = DateTime.UtcNow
            });
            await _db.SaveChangesAsync();
            return Ok(new { message = "Closure date revised." });
        }

        [HttpGet("{id}/history")]
        public async Task<IActionResult> GetHistory(Guid id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var history = await _db.RequisitionStatusHistories
                .Where(h => h.RequirementId == id && h.TenantId == user.TenantId)
                .OrderByDescending(h => h.ChangedAt)
                .Select(h => new { h.FromStatus, h.ToStatus, h.Reason, h.ChangedAt, h.ChangedById })
                .ToListAsync();
            return Ok(history);
        }

        [HttpPost("{id}/broadcast")]
        public async Task<IActionResult> Broadcast(Guid id, [FromBody] BroadcastRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            if (req.Channels == null || !req.Channels.Any())
                return BadRequest(new { error = "At least one channel is required." });

            var broadcast = new JobBroadcast
            {
                RequisitionId = id,
                Channels = req.Channels,
                BroadcastAt = DateTime.UtcNow,
                TenantId = user.TenantId
            };
            _db.JobBroadcasts.Add(broadcast);
            await _db.SaveChangesAsync();

            return Ok(new { success = true, broadcastedChannels = req.Channels, broadcastAt = broadcast.BroadcastAt });
        }

        [HttpGet("{id}/broadcast-status")]
        public async Task<IActionResult> GetBroadcastStatus(Guid id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var history = await _db.JobBroadcasts
                .Where(b => b.RequisitionId == id && b.TenantId == user.TenantId)
                .OrderByDescending(b => b.BroadcastAt)
                .ToListAsync();

            // Build per-channel summary: latest post time per channel
            var channelMap = history
                .SelectMany(b => b.Channels.Select(ch => new { channelId = ch, b.BroadcastAt }))
                .GroupBy(x => x.channelId)
                .Select(g => new {
                    channelId = g.Key,
                    lastPosted = g.Max(x => x.BroadcastAt),
                    status = "Posted"
                });

            return Ok(new {
                channels = channelMap,
                history = history.Select(b => new { b.Channels, b.BroadcastAt })
            });
        }
    }

    public class HoldRequisitionRequest { public string Reason { get; set; } = string.Empty; }
    public class CancelRequisitionRequest { public string Reason { get; set; } = string.Empty; }
    public class ReviseDateRequest { public DateTime NewDate { get; set; } }
}
