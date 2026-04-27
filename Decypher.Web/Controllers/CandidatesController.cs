using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Decypher.Web.Services;
using Decypher.Web.DTOs;
using System;
using System.Threading.Tasks;

namespace Decypher.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CandidatesController : ControllerBase
    {
        private readonly ICandidateService _candidateService;

        public CandidatesController(ICandidateService candidateService)
        {
            _candidateService = candidateService;
        }

        private string GetTenantId() => User.FindFirst("TenantId")?.Value ?? "11111111-1111-1111-1111-111111111111";

        [HttpGet]
        public async Task<IActionResult> GetAllCandidates()
        {
            var candidates = await _candidateService.GetAllCandidatesAsync(GetTenantId());
            return Ok(candidates);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCandidateById(Guid id)
        {
            var candidate = await _candidateService.GetCandidateByIdAsync(id, GetTenantId());
            if (candidate == null)
                return NotFound();

            return Ok(candidate);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCandidate([FromBody] CreateCandidateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var candidate = await _candidateService.CreateCandidateAsync(dto, GetTenantId());
            return CreatedAtAction(nameof(GetCandidateById), new { id = candidate.Id }, candidate);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCandidate(Guid id, [FromBody] UpdateCandidateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var candidate = await _candidateService.UpdateCandidateAsync(id, dto, GetTenantId());
            if (candidate == null)
                return NotFound();

            return Ok(candidate);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCandidate(Guid id)
        {
            var result = await _candidateService.DeleteCandidateAsync(id, GetTenantId());
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("high-risk")]
        public async Task<IActionResult> GetHighRiskCandidates(decimal threshold = 70)
        {
            var candidates = await _candidateService.GetHighRiskCandidatesAsync(GetTenantId(), threshold);
            return Ok(candidates);
        }

        [HttpGet("by-stage/{stage}")]
        public async Task<IActionResult> GetCandidatesByStage(string stage)
        {
            var candidates = await _candidateService.GetCandidatesByStageAsync(GetTenantId(), stage);
            return Ok(candidates);
        }

        [HttpGet("stage-counts")]
        public async Task<IActionResult> GetStageCounts()
        {
            var counts = await _candidateService.GetCandidateCountByStageAsync(GetTenantId());
            return Ok(counts);
        }
    }
}
