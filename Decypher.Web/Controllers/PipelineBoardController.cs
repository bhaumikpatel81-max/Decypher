using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/pipeline-board")]
    [Authorize]
    public class PipelineBoardController : ControllerBase
    {
        private readonly IPipelineBoardService _service;
        private readonly UserManager<ApplicationUser> _userManager;

        public PipelineBoardController(IPipelineBoardService service, UserManager<ApplicationUser> userManager)
        {
            _service = service;
            _userManager = userManager;
        }

        [HttpGet("{jobId}")]
        public async Task<IActionResult> GetBoard(Guid jobId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.GetBoardAsync(jobId, user.TenantId));
        }

        [HttpGet("stages")]
        public async Task<IActionResult> GetStages()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            return Ok(await _service.GetStagesAsync(user.TenantId));
        }

        [HttpPost("move")]
        public async Task<IActionResult> MoveCandidate([FromBody] MoveCandidateRequest req)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            await _service.MoveCandidateAsync(req, user.Id, user.TenantId);
            return Ok(new { success = true });
        }

        [HttpPost("stages")]
        public async Task<IActionResult> CreateStage([FromBody] PipelineStage stage)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            stage.TenantId = user.TenantId;
            return Ok(await _service.CreateStageAsync(stage));
        }
    }
}
