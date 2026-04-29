using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/talent-pool")]
    [Authorize]
    public class TalentPoolController : ControllerBase
    {
        private readonly ITalentPoolService _service;
        private readonly UserManager<ApplicationUser> _userManager;

        public TalentPoolController(ITalentPoolService service, UserManager<ApplicationUser> userManager)
        {
            _service = service;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery] string? tag, [FromQuery] string? search)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.ListAsync(tag, search, user.TenantId));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddToPoolRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.AddAsync(req.CandidateId, user.TenantId));
        }

        [HttpPut("{id}/tags")]
        public async Task<IActionResult> UpdateTags(Guid id, [FromBody] UpdateTagsRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.UpdateTagsAsync(id, req.Tags, user.TenantId));
        }

        [HttpPost("campaigns")]
        public async Task<IActionResult> CreateCampaign([FromBody] CreateCampaignRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.CreateCampaignAsync(req, user.TenantId));
        }

        [HttpPost("campaigns/{id}/send")]
        public async Task<IActionResult> SendCampaign(Guid id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            await _service.SendCampaignAsync(id, user.TenantId);
            return Ok(new { success = true });
        }
    }

    public class AddToPoolRequest
    {
        public Guid CandidateId { get; set; }
    }
}
