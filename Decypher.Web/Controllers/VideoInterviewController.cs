using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Decypher.Web.Controllers
{
    [Route("api/interviews")]
    [ApiController]
    [AllowAnonymous]
    public class VideoInterviewController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public VideoInterviewController(ApplicationDbContext db)
        {
            _db = db;
        }

        private string GetTenantId() => User.FindFirst("TenantId")?.Value ?? "11111111-1111-1111-1111-111111111111";

        [HttpGet("video")]
        public async Task<IActionResult> GetAll()
        {
            _db.SetTenantId(GetTenantId());
            var list = await _db.VideoInterviews
                .AsNoTracking()
                .Include(v => v.Responses)
                .OrderByDescending(v => v.CreatedAt)
                .ToListAsync();
            return Ok(list.Select(v => new
            {
                v.Id, v.CandidateName, v.JobTitle, v.Status,
                v.Deadline, v.CreatedAt, v.Link,
                questionCount = v.Questions.Count,
                responses = v.Responses.Count
            }));
        }

        [HttpPost("video-link")]
        public async Task<IActionResult> GenerateLink([FromBody] VideoLinkRequest req)
        {
            _db.SetTenantId(GetTenantId());
            var tenantGuid = Guid.TryParse(GetTenantId(), out var t) ? t : Guid.Empty;

            var token = Guid.NewGuid().ToString("N")[..12];
            var link = $"https://interviews.decypher.app/v/{token}";

            var interview = new VideoInterview
            {
                CandidateId = req.CandidateId,
                CandidateName = req.CandidateName,
                JobTitle = req.JobTitle,
                Questions = req.Questions,
                Deadline = req.Deadline,
                Link = link,
                Status = "Sent",
                TenantId = tenantGuid
            };

            _db.VideoInterviews.Add(interview);
            await _db.SaveChangesAsync();

            return Ok(new { interview.Id, link, interview.Status });
        }

        [HttpGet("video-responses/{id:guid}")]
        public async Task<IActionResult> GetResponses(Guid id)
        {
            _db.SetTenantId(GetTenantId());
            var interview = await _db.VideoInterviews
                .Include(v => v.Responses)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (interview == null) return NotFound();
            return Ok(interview);
        }
    }
}
