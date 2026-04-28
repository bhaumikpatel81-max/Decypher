using Decypher.Web.Data;
using Decypher.Web.Services.AI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Decypher.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AIAgentsController : ControllerBase
    {
        private readonly IMultiAgentOrchestratorService _orchestrator;
        private readonly IJdGenerationService _jdGeneration;
        private readonly ILogger<AIAgentsController> _log;

        public AIAgentsController(
            IMultiAgentOrchestratorService orchestrator,
            IJdGenerationService jdGeneration,
            ILogger<AIAgentsController> log)
        {
            _orchestrator = orchestrator;
            _jdGeneration = jdGeneration;
            _log = log;
        }

        /// <summary>UC63: Run all 5 AI agents on a JD + Resume pair.</summary>
        [HttpPost("run-screening")]
        public async Task<IActionResult> RunScreening([FromBody] ScreeningRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.JobDescription) ||
                string.IsNullOrWhiteSpace(req.ResumeText))
                return BadRequest(new { error = "JobDescription and ResumeText are required." });

            var tenantId = User.FindFirstValue("TenantId") ?? "default";
            var actorId  = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "system";

            try
            {
                var result = await _orchestrator.RunAsync(
                    req.JobDescription, req.ResumeText, tenantId, actorId,
                    ct: HttpContext.RequestAborted);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "AI screening pipeline failed");
                return StatusCode(500, new { error = "AI processing failed. Please try again." });
            }
        }

        /// <summary>UC64: Generate a job description using AI.</summary>
        [HttpPost("generate-jd")]
        public async Task<IActionResult> GenerateJobDescription([FromBody] JdGenerationRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.JobTitle))
                return BadRequest(new { error = "JobTitle is required." });

            var tenantId = User.FindFirstValue("TenantId") ?? "default";
            var actorId  = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "system";

            var enrichedReq = req with { TenantId = tenantId, ActorId = actorId };

            try
            {
                var result = await _jdGeneration.GenerateAsync(enrichedReq, HttpContext.RequestAborted);
                return result.Success ? Ok(result) : StatusCode(500, new { error = result.ErrorMessage });
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "JD generation failed");
                return StatusCode(500, new { error = "JD generation failed. Please try again." });
            }
        }

        /// <summary>UC64: Get SLA dashboard data for tenant.</summary>
        [HttpGet("sla-dashboard")]
        public IActionResult GetSLADashboard([FromServices] ApplicationDbContext db)
        {
            var tenantId = User.FindFirstValue("TenantId") ?? "default";
            var slaTracks = db.SLATrackings
                .Where(s => s.TenantId == tenantId)
                .OrderByDescending(s => s.UpdatedAt)
                .Take(50)
                .ToList();

            return Ok(slaTracks);
        }

        /// <summary>Admin: Export audit log as CSV for a date range.</summary>
        [HttpGet("audit/export")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public IActionResult ExportAuditLog(
            [FromQuery] DateTime from, [FromQuery] DateTime to,
            [FromServices] ApplicationDbContext db)
        {
            var tenantId = User.FindFirstValue("TenantId") ?? "default";
            var logs = db.AIAuditLogs
                .Where(l => l.TenantId == tenantId && l.CreatedAt >= from && l.CreatedAt <= to)
                .OrderBy(l => l.CreatedAt)
                .ToList();

            var csv = new System.Text.StringBuilder();
            csv.AppendLine("Id,EventType,AgentName,EntityId,ModelVersion,PromptVersion,Confidence,RequiredHumanReview,Checksum,CreatedAt");
            foreach (var l in logs)
                csv.AppendLine($"{l.Id},{l.EventType},{l.AgentName},{l.EntityId},{l.ModelVersion},{l.PromptVersion},{l.Confidence},{l.RequiredHumanReview},{l.Checksum},{l.CreatedAt:O}");

            return File(System.Text.Encoding.UTF8.GetBytes(csv.ToString()), "text/csv",
                $"audit-{from:yyyyMMdd}-to-{to:yyyyMMdd}.csv");
        }
    }

    public record ScreeningRequest
    {
        public string JobDescription { get; init; }
        public string ResumeText { get; init; }
    }
}
