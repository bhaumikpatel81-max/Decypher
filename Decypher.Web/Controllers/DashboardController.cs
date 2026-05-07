using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Decypher.Web.Services;
using System.Threading.Tasks;

namespace Decypher.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        private string GetTenantId() => User.FindFirst("TenantId")?.Value ?? "11111111-1111-1111-1111-111111111111";

        [HttpGet("metrics")]
        public async Task<IActionResult> GetDashboardMetrics()
        {
            var metrics = await _dashboardService.GetDashboardMetricsAsync(GetTenantId());
            return Ok(metrics);
        }

        [HttpGet("funnel")]
        public async Task<IActionResult> GetHiringFunnel()
        {
            var funnel = await _dashboardService.GetHiringFunnelAsync(GetTenantId());
            return Ok(funnel);
        }

        [HttpGet("vendors")]
        public async Task<IActionResult> GetVendorPerformance()
        {
            var vendors = await _dashboardService.GetVendorPerformanceAsync(GetTenantId());
            return Ok(vendors);
        }

        [HttpGet("pipeline")]
        public async Task<IActionResult> GetCandidatePipeline()
        {
            var pipeline = await _dashboardService.GetCandidatePipelineAsync(GetTenantId());
            return Ok(pipeline);
        }

        [HttpGet("time-to-hire")]
        public async Task<IActionResult> GetTimeToHireMetrics()
        {
            var metrics = await _dashboardService.GetTimeToHireMetricsAsync(GetTenantId());
            return Ok(metrics);
        }

        [HttpGet("monthly-trend")]
        public async Task<IActionResult> GetMonthlyTrend([FromQuery] int months = 6)
        {
            var trend = await _dashboardService.GetMonthlyTrendAsync(GetTenantId(), months);
            return Ok(trend);
        }

        [HttpGet("top-skills")]
        public async Task<IActionResult> GetTopSkills([FromQuery] int topN = 6)
        {
            var skills = await _dashboardService.GetTopSkillsAsync(GetTenantId(), topN);
            return Ok(skills);
        }

        [HttpGet("time-to-fill")]
        public async Task<IActionResult> GetTimeToFill()
        {
            var data = await _dashboardService.GetTimeToFillByRoleAsync(GetTenantId());
            return Ok(data);
        }
    }
}
