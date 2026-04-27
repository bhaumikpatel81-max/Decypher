using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Decypher.Web.Services;
using Decypher.Web.Models;
using System;
using System.Threading.Tasks;

namespace Decypher.Web.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AgenticAIController : ControllerBase
    {
        private readonly IAgenticAIService _aiService;

        public AgenticAIController(IAgenticAIService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("auto-match")]
        public async Task<IActionResult> AutoMatchCandidates([FromBody] dynamic request)
        {
            var matches = await _aiService.AutoMatchCandidates(request.jobDescription.ToString(), 10);
            return Ok(new { success = true, matches });
        }

        [HttpPost("score-resume")]
        public async Task<IActionResult> ScoreResume([FromBody] dynamic request)
        {
            var score = await _aiService.ScoreResumeAgainstJD(
                request.resumeText.ToString(), 
                request.jobDescription.ToString()
            );
            return Ok(new { success = true, score });
        }
    }
}
