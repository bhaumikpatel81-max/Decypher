using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/source-tracking")]
    [Authorize]
    public class SourceTrackingController : ControllerBase
    {
        private readonly ISourceTrackingService _service;
        private readonly UserManager<ApplicationUser> _userManager;

        public SourceTrackingController(ISourceTrackingService service, UserManager<ApplicationUser> userManager)
        {
            _service = service;
            _userManager = userManager;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.GetSummaryAsync(user.TenantId));
        }

        [HttpGet("candidates")]
        public async Task<IActionResult> GetCandidates()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.GetCandidatesGroupedAsync(user.TenantId));
        }

        [HttpPut("/api/candidates/{id}/source")]
        public async Task<IActionResult> UpdateSource(Guid id, [FromBody] UpdateSourceRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.UpdateSourceAsync(id, req.Source, req.CampaignCode, user.TenantId));
        }
    }
}
