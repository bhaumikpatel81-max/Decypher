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
    [Route("api/notifications")]
    [Authorize]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notification;
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public NotificationsController(
            INotificationService notification,
            ApplicationDbContext db,
            UserManager<ApplicationUser> userManager)
        {
            _notification = notification;
            _db = db;
            _userManager = userManager;
        }

        [HttpPost("email")]
        public async Task<IActionResult> SendEmail([FromBody] BulkEmailRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var candidates = await _db.Candidates
                .Where(c => req.CandidateIds.Contains(c.Id.ToString()) && c.TenantId == user.TenantId)
                .ToListAsync();

            foreach (var candidate in candidates)
            {
                await _notification.SendEmailAsync(candidate.Email, req.Subject, req.Body);
                _db.CommMessages.Add(new CommMessage
                {
                    Channel          = "Email",
                    CandidateId      = candidate.Id.ToString(),
                    CandidateName    = candidate.CandidateName,
                    RecipientAddress = candidate.Email,
                    Subject          = req.Subject,
                    Body             = req.Body,
                    Status           = "Sent",
                    TenantId         = user.TenantId
                });
            }
            await _db.SaveChangesAsync();
            return Ok(new { sent = candidates.Count });
        }

        [HttpPost("sms")]
        public async Task<IActionResult> SendSms([FromBody] BulkSmsRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var candidates = await _db.Candidates
                .Where(c => req.CandidateIds.Contains(c.Id.ToString()) && c.TenantId == user.TenantId)
                .ToListAsync();

            foreach (var candidate in candidates)
            {
                await _notification.SendSmsAsync(candidate.Phone ?? string.Empty, req.Message);
                _db.CommMessages.Add(new CommMessage
                {
                    Channel          = "SMS",
                    CandidateId      = candidate.Id.ToString(),
                    CandidateName    = candidate.CandidateName,
                    RecipientAddress = candidate.Phone ?? string.Empty,
                    Body             = req.Message,
                    Status           = "Sent",
                    TenantId         = user.TenantId
                });
            }
            await _db.SaveChangesAsync();
            return Ok(new { sent = candidates.Count });
        }

        [HttpPost("whatsapp")]
        public async Task<IActionResult> SendWhatsApp([FromBody] BulkWhatsAppRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var candidates = await _db.Candidates
                .Where(c => req.CandidateIds.Contains(c.Id.ToString()) && c.TenantId == user.TenantId)
                .ToListAsync();

            foreach (var candidate in candidates)
            {
                await _notification.SendWhatsAppAsync(candidate.Phone ?? string.Empty, req.TemplateId, req.Variables);
                _db.CommMessages.Add(new CommMessage
                {
                    Channel          = "WhatsApp",
                    CandidateId      = candidate.Id.ToString(),
                    CandidateName    = candidate.CandidateName,
                    RecipientAddress = candidate.Phone ?? string.Empty,
                    Subject          = req.TemplateId,
                    Body             = string.Join(", ", req.Variables.Select(kv => $"{kv.Key}={kv.Value}")),
                    Status           = "Sent",
                    TenantId         = user.TenantId
                });
            }
            await _db.SaveChangesAsync();
            return Ok(new { sent = candidates.Count });
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory([FromQuery] int page = 1, [FromQuery] int pageSize = 50)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var items = await _db.CommMessages
                .Where(m => m.TenantId == user.TenantId)
                .OrderByDescending(m => m.SentAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new {
                    m.Id, m.Channel, m.CandidateName,
                    m.RecipientAddress, m.Subject, m.Status, m.SentAt
                })
                .ToListAsync();

            return Ok(items);
        }
    }
}
