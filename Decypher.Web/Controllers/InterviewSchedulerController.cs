using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/interviews")]
    [Authorize]
    public class InterviewSchedulerController : ControllerBase
    {
        private readonly IInterviewSchedulerService _service;
        private readonly UserManager<ApplicationUser> _userManager;

        public InterviewSchedulerController(IInterviewSchedulerService service, UserManager<ApplicationUser> userManager)
        {
            _service = service;
            _userManager = userManager;
        }

        [HttpGet("slots/{recruiterId}")]
        public async Task<IActionResult> GetSlots(string recruiterId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.GetSlotsAsync(recruiterId, user.TenantId));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateInterviewRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.CreateAsync(req, user.TenantId));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            var result = await _service.GetAsync(id, user.TenantId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CreateInterviewRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.UpdateAsync(id, req, user.TenantId));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(Guid id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            await _service.CancelAsync(id, user.TenantId);
            return Ok(new { success = true });
        }

        [HttpPost("{id}/feedback")]
        public async Task<IActionResult> SubmitFeedback(Guid id, [FromBody] SubmitFeedbackRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.SubmitFeedbackAsync(id, user.Id, req, user.TenantId));
        }
    }
}
