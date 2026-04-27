using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Decypher.Web.Services;
using System.Threading.Tasks;

namespace Decypher.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AIController : ControllerBase
    {
        private readonly IAIService _aiService;

        public AIController(IAIService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("score-resume")]
        public async Task<IActionResult> ScoreResume([FromBody] dynamic request)
        {
            if (request == null)
                return BadRequest("Request body required");

            var result = await _aiService.ScoreResumeAsync(
                request.resume?.ToString() ?? "",
                request.jobTitle?.ToString() ?? ""
            );

            return Ok(result);
        }

        [HttpPost("match-cv-jd")]
        public async Task<IActionResult> MatchCvJd([FromBody] dynamic request)
        {
            if (request == null)
                return BadRequest("Request body required");

            var result = await _aiService.MatchCvJdAsync(
                request.resume?.ToString() ?? "",
                request.jobDescription?.ToString() ?? ""
            );

            return Ok(result);
        }

        [HttpPost("generate-questions")]
        public async Task<IActionResult> GenerateQuestions([FromBody] dynamic request)
        {
            if (request == null)
                return BadRequest("Request body required");

            var skills = request.skills?.ToObject<string[]>() ?? System.Array.Empty<string>();
            var result = await _aiService.GenerateInterviewQuestionsAsync(
                request.jobTitle?.ToString() ?? "",
                skills
            );

            return Ok(result);
        }

        [HttpPost("chatbot")]
        public async Task<IActionResult> Chatbot([FromBody] dynamic request)
        {
            if (request == null)
                return BadRequest("Request body required");

            var result = await _aiService.ChatbotAsync(
                request.message?.ToString() ?? "",
                request.context?.ToString() ?? ""
            );

            return Ok(result);
        }

        [HttpPost("analyze-jd")]
        public async Task<IActionResult> AnalyzeJD([FromBody] dynamic request)
        {
            if (request == null)
                return BadRequest("Request body required");

            var result = await _aiService.AnalyzeJobDescriptionAsync(
                request.jobDescription?.ToString() ?? ""
            );

            return Ok(result);
        }

        [HttpPost("predict-dropout")]
        public async Task<IActionResult> PredictDropout([FromBody] dynamic request)
        {
            if (request == null)
                return BadRequest("Request body required");

            var result = await _aiService.PredictDropoutRiskAsync(
                request.profile?.ToString() ?? ""
            );

            return Ok(result);
        }

        [HttpPost("rank-competencies")]
        public async Task<IActionResult> RankCompetencies([FromBody] dynamic request)
        {
            if (request == null)
                return BadRequest("Request body required");

            var candidateSkills = request.candidateSkills?.ToObject<string[]>() ?? System.Array.Empty<string>();
            var jobRequirements = request.jobRequirements?.ToObject<string[]>() ?? System.Array.Empty<string>();

            var result = await _aiService.RankCompetenciesAsync(candidateSkills, jobRequirements);

            return Ok(result);
        }
    }
}
