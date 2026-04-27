using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Decypher.Web.Services;
using Decypher.Web.DTOs;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Decypher.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class VendorsController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorsController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        private string GetTenantId() => User.FindFirst("TenantId")?.Value ?? "11111111-1111-1111-1111-111111111111";

        [HttpGet]
        public async Task<IActionResult> GetAllVendors()
        {
            var vendors = await _vendorService.GetAllVendorsAsync(GetTenantId());
            return Ok(vendors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVendorById(Guid id)
        {
            var vendor = await _vendorService.GetVendorByIdAsync(id, GetTenantId());
            if (vendor == null)
                return NotFound();

            return Ok(vendor);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVendor([FromBody] CreateVendorDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "system";
            var vendor = await _vendorService.CreateVendorAsync(dto, GetTenantId(), userId);

            return CreatedAtAction(nameof(GetVendorById), new { id = vendor.Id }, vendor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVendor(Guid id, [FromBody] UpdateVendorDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vendor = await _vendorService.UpdateVendorAsync(id, dto, GetTenantId());
            if (vendor == null)
                return NotFound();

            return Ok(vendor);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendor(Guid id)
        {
            var result = await _vendorService.DeleteVendorAsync(id, GetTenantId());
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("top-performers")]
        public async Task<IActionResult> GetTopVendors(int count = 5)
        {
            var vendors = await _vendorService.GetTopVendorsByPerformanceAsync(GetTenantId(), count);
            return Ok(vendors);
        }

        [HttpGet("performance-metrics")]
        public async Task<IActionResult> GetPerformanceMetrics()
        {
            var vendors = await _vendorService.GetAllVendorsAsync(GetTenantId());
            var vendorList = vendors.ToList();

            return Ok(new
            {
                avgQualityScore = vendorList.Any() ? Math.Round(vendorList.Average(v => v.QualityScore), 2) : 0,
                submissionsThisMonth = vendorList.Sum(v => v.TotalSubmissions),
                totalVendors = vendorList.Count
            });
        }
    }
}
