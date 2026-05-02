using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Decypher.Web.Models;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/resume-parser")]
    [Authorize]
    public class ResumeParserController : ControllerBase
    {
        private readonly IResumeParserService _service;
        private readonly IDocumentExtractorService _extractor;
        private readonly UserManager<ApplicationUser> _userManager;

        public ResumeParserController(
            IResumeParserService service,
            IDocumentExtractorService extractor,
            UserManager<ApplicationUser> userManager)
        {
            _service   = service;
            _extractor = extractor;
            _userManager = userManager;
        }

        [HttpPost("parse")]
        public async Task<IActionResult> Parse([FromBody] ResumeParserRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.CvText))
                return BadRequest(new { error = "CV text is required." });

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var result = await _service.ParseAsync(request.CvText, user.TenantId, Guid.Empty);
            return Ok(result);
        }

        [HttpPost("parse-file")]
        public async Task<IActionResult> ParseFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "No file provided." });

            var allowed = new[] { ".pdf", ".docx", ".doc", ".txt" };
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowed.Contains(ext))
                return BadRequest(new { error = "Only PDF, DOCX, DOC, or TXT files are accepted." });

            using var reader = new StreamReader(file.OpenReadStream());
            var text = await reader.ReadToEndAsync();

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var result = await _service.ParseAsync(text, user.TenantId, Guid.Empty);
            return Ok(result);
        }

        [HttpGet("{candidateId}")]
        public async Task<IActionResult> GetParsed(Guid candidateId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var result = await _service.GetLastParsedAsync(candidateId, user.TenantId);
            if (result == null) return NotFound();
            return Ok(result);
        }

        /// <summary>
        /// Accepts a base64-encoded file (PDF, DOCX, DOC, JPG, PNG) and returns extracted plain text.
        /// Called by the AI Scorecard upload zone.
        /// </summary>
        [HttpPost("extract-text")]
        public async Task<IActionResult> ExtractText([FromBody] ExtractTextRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FileData))
                return BadRequest(new { error = "fileData is required." });
            if (string.IsNullOrWhiteSpace(request.FileName))
                return BadRequest(new { error = "fileName is required." });

            byte[] bytes;
            try { bytes = Convert.FromBase64String(request.FileData); }
            catch { return BadRequest(new { error = "fileData is not valid base64." }); }

            try
            {
                var text = await _extractor.ExtractTextAsync(bytes, request.FileName, request.MimeType ?? "application/octet-stream");
                if (string.IsNullOrWhiteSpace(text))
                    return BadRequest(new { error = "No text could be extracted from the file." });
                return Ok(new { text });
            }
            catch (NotSupportedException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Extraction failed: {ex.Message}" });
            }
        }
    }

    public class ExtractTextRequest
    {
        public string FileData { get; set; } = "";
        public string FileName { get; set; } = "";
        public string? MimeType { get; set; }
    }
}
