using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/offers")]
    [Authorize]
    public class OfferManagementController : ControllerBase
    {
        private readonly IOfferManagementService _service;
        private readonly UserManager<ApplicationUser> _userManager;

        public OfferManagementController(IOfferManagementService service, UserManager<ApplicationUser> userManager)
        {
            _service = service;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOfferRequest req)
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
            var offer = await _service.GetAsync(id, user.TenantId);
            if (offer == null) return NotFound();
            return Ok(offer);
        }

        [HttpPut("{id}/send")]
        public async Task<IActionResult> Send(Guid id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.SendAsync(id, user.TenantId));
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateOfferStatusRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.UpdateStatusAsync(id, req.Status, user.TenantId));
        }

        [HttpGet("pending")]
        public async Task<IActionResult> GetPending()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.GetPendingAsync(user.TenantId));
        }
    }
}
