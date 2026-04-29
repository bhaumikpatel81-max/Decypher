using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/requisitions")]
    [Authorize]
    public class RequisitionController : ControllerBase
    {
        private readonly IRequisitionService _service;
        private readonly UserManager<ApplicationUser> _userManager;

        public RequisitionController(IRequisitionService service, UserManager<ApplicationUser> userManager)
        {
            _service = service;
            _userManager = userManager;
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
    }
}
