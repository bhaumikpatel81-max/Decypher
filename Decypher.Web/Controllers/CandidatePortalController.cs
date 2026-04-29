using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/candidate-portal")]
    public class CandidatePortalController : ControllerBase
    {
        private readonly ICandidatePortalService _service;
        private readonly UserManager<ApplicationUser> _userManager;

        public CandidatePortalController(ICandidatePortalService service, UserManager<ApplicationUser> userManager)
        {
            _service = service;
            _userManager = userManager;
        }

        [HttpGet("jobs")]
        [AllowAnonymous]
        public async Task<IActionResult> GetJobs() => Ok(await _service.GetPublicJobsAsync());

        [HttpPost("apply")]
        [AllowAnonymous]
        public async Task<IActionResult> Apply([FromBody] PortalApplicationRequest req)
        {
            var tenantId = Guid.Parse("11111111-1111-1111-1111-111111111111"); // demo tenant
            var result = await _service.ApplyAsync(req, tenantId);
            return Ok(result);
        }

        [HttpGet("status/{applicationId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStatus(Guid applicationId)
        {
            var result = await _service.GetStatusAsync(applicationId);
            if (result == null) return NotFound();
            return Ok(new { result.Id, result.Status, result.AppliedAt });
        }

        [HttpGet("incoming")]
        [Authorize]
        public async Task<IActionResult> GetIncoming()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.GetIncomingAsync(user.TenantId));
        }
    }
}
