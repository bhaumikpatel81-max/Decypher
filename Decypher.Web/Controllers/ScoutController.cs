using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Decypher.Web.Data;
using Decypher.Web.DTOs;
using Decypher.Web.Models;
using Decypher.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/scout")]
    [Authorize]
    public class ScoutController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly ICandidateService _candidateService;
        private readonly IRequisitionService _requisitionService;
        private readonly IDocumentExtractorService _documentExtractor;
        private readonly IResumeParserService _resumeParser;

        public ScoutController(
            ApplicationDbContext db,
            ICandidateService candidateService,
            IRequisitionService requisitionService,
            IDocumentExtractorService documentExtractor,
            IResumeParserService resumeParser)
        {
            _db = db;
            _candidateService = candidateService;
            _requisitionService = requisitionService;
            _documentExtractor = documentExtractor;
            _resumeParser = resumeParser;
        }

        [HttpGet("requisitions")]
        public async Task<IActionResult> SearchRequisitions([FromQuery(Name = "q")] string? query, [FromQuery] string? status)
        {
            var tenantId = GetTenantId();
            var requisitions = await _requisitionService.ListAsync(status, tenantId);

            if (!string.IsNullOrWhiteSpace(query))
            {
                requisitions = requisitions
                    .Where(r => r.Title.Contains(query, StringComparison.OrdinalIgnoreCase)
                             || r.Department.Contains(query, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            var summaries = requisitions.Select(r => new RequisitionSummary
            {
                Id = r.Id,
                Title = r.Title,
                Department = r.Department,
                Status = r.Status
            });

            return Ok(summaries);
        }

        [HttpPost("capture-candidate")]
        public async Task<IActionResult> CaptureCandidate([FromBody] CaptureCandidateRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tenantId = GetTenantId();
            var vendorId = request.VendorId ?? Guid.Empty;

            var nameParts = SplitName(request.FirstName, request.LastName);
            if (string.IsNullOrWhiteSpace(nameParts.firstName) && request.RawExtractedData != null)
            {
                var extractedName = GetStringValue(request.RawExtractedData, "name");
                if (!string.IsNullOrWhiteSpace(extractedName))
                {
                    var extractedNameParts = extractedName.Trim().Split(' ', 2, StringSplitOptions.RemoveEmptyEntries);
                    nameParts = (extractedNameParts.Length > 0 ? extractedNameParts[0] : string.Empty,
                                 extractedNameParts.Length > 1 ? extractedNameParts[1] : string.Empty);
                }
            }
            var createDto = new CreateCandidateDTO
            {
                VendorId = vendorId,
                FirstName = nameParts.firstName,
                LastName = nameParts.lastName,
                Email = request.Email ?? string.Empty,
                Phone = request.Phone ?? string.Empty,
                CurrentRole = request.CurrentRole ?? string.Empty,
                CurrentCompany = request.CurrentCompany ?? string.Empty,
                YearsOfExperience = request.YearsOfExperience,
                CurrentSalary = request.CurrentSalary,
                Skills = request.Skills ?? Array.Empty<string>()
            };

            var candidate = await _candidateService.CreateCandidateAsync(createDto, tenantId.ToString());

            if (!string.IsNullOrWhiteSpace(request.Source))
            {
                _db.CandidateSources.Add(new CandidateSource
                {
                    CandidateId = candidate.Id,
                    Source = request.Source,
                    CampaignCode = request.SourceUrl ?? string.Empty,
                    TenantId = tenantId
                });
            }

            if (request.RequisitionId.HasValue)
            {
                var requisition = await _db.Requisitions
                    .FirstOrDefaultAsync(r => r.Id == request.RequisitionId.Value && r.TenantId == tenantId);

                if (requisition != null)
                {
                    _db.CandidateApplications.Add(new CandidateApplication
                    {
                        CandidateId = candidate.Id,
                        JobId = requisition.Id,
                        ApplicantEmail = candidate.Email,
                        ApplicantName = $"{candidate.FirstName} {candidate.LastName}".Trim(),
                        ResumeFileName = request.ProfileUrl ?? string.Empty,
                        TenantId = tenantId
                    });
                }
            }

            await _db.SaveChangesAsync();

            ResumeParserResponse? parsed = null;
            if (!string.IsNullOrWhiteSpace(request.ResumeText))
            {
                parsed = await _resumeParser.ParseAsync(request.ResumeText, tenantId, candidate.Id);
            }

            return Created(string.Empty, new CaptureCandidateResponse
            {
                Candidate = candidate,
                ParsedResume = parsed
            });
        }

        [HttpPost("upload-resume")]
        public async Task<IActionResult> UploadResume([FromForm] IFormFile file, [FromForm] Guid? candidateId = null)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "A valid resume file is required." });

            var tenantId = GetTenantId();
            await using var stream = new System.IO.MemoryStream();
            await file.CopyToAsync(stream);
            var extractedText = await _documentExtractor.ExtractTextAsync(stream.ToArray(), file.FileName, file.ContentType);

            ResumeParserResponse? parsedResume = null;
            if (candidateId.HasValue)
            {
                parsedResume = await _resumeParser.ParseAsync(extractedText, tenantId, candidateId.Value);
            }

            return Ok(new ResumeUploadResult
            {
                FileName = file.FileName,
                ExtractedText = extractedText,
                ParsedResume = parsedResume
            });
        }

        [HttpPost("extract-generic")]
        public IActionResult ExtractGeneric([FromBody] GenericExtractionRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Content) && string.IsNullOrWhiteSpace(request.PageText))
                return BadRequest(new { error = "Content or pageText is required." });

            var content = (request.Content ?? request.PageText ?? string.Empty).Trim();
            var summary = GenerateSummary(content);
            var keywords = ExtractKeywords(content);

            return Ok(new GenericExtractionResponse
            {
                ExtractedText = content,
                Summary = summary,
                Keywords = keywords
            });
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var tenantId = GetTenantId();

            var totalRequisitions = await _db.Requisitions.CountAsync(r => r.TenantId == tenantId);
            var openRequisitions = await _db.Requisitions.CountAsync(r => r.TenantId == tenantId && r.Status != "Filled" && r.Status != "Cancelled" && r.Status != "Rejected");
            var totalCandidates = await _db.Candidates.CountAsync(c => c.TenantId == tenantId);
            var capturesLast30Days = await _db.Candidates.CountAsync(c => c.TenantId == tenantId && c.SubmittedDate >= DateTime.UtcNow.AddDays(-30));
            var topSources = await _db.CandidateSources
                .Where(c => c.TenantId == tenantId)
                .GroupBy(c => c.Source)
                .Select(g => new SourceSummary { Source = g.Key, Count = g.Count() })
                .OrderByDescending(s => s.Count)
                .Take(5)
                .ToArrayAsync();

            return Ok(new ScoutStatsResponse
            {
                TotalRequisitions = totalRequisitions,
                OpenRequisitions = openRequisitions,
                TotalCandidates = totalCandidates,
                CapturesLast30Days = capturesLast30Days,
                TopSources = topSources
            });
        }

        private static string GenerateSummary(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return string.Empty;

            if (text.Length <= 320)
                return text;

            var firstPeriod = text.IndexOf('.', 160);
            if (firstPeriod > 0 && firstPeriod < 320)
                return text.Substring(0, firstPeriod + 1).Trim();

            return text.Substring(0, Math.Min(320, text.Length)).Trim() + "...";
        }

        private static string[] ExtractKeywords(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return Array.Empty<string>();

            var matches = Regex.Matches(text.ToLowerInvariant(), @"\b[a-z]{4,}\b");
            var stopWords = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "that", "with", "from", "this", "have", "your", "will", "about",
                "which", "their", "there", "other", "these", "using", "have", "also"
            };

            var frequency = matches
                .Select(m => m.Value)
                .Where(word => !stopWords.Contains(word))
                .GroupBy(word => word)
                .Select(group => new { Word = group.Key, Count = group.Count() })
                .OrderByDescending(x => x.Count)
                .ThenBy(x => x.Word)
                .Take(12)
                .Select(x => x.Word)
                .ToArray();

            return frequency;
        }

        private static string GetStringValue(Dictionary<string, object> data, string key)
        {
            if (data == null || !data.TryGetValue(key, out var rawValue) || rawValue == null)
                return string.Empty;

            if (rawValue is string stringValue)
                return stringValue;

            return rawValue.ToString() ?? string.Empty;
        }

        private static (string firstName, string lastName) SplitName(string firstName, string lastName)
        {
            if (!string.IsNullOrWhiteSpace(firstName) || !string.IsNullOrWhiteSpace(lastName))
                return (firstName?.Trim() ?? string.Empty, lastName?.Trim() ?? string.Empty);

            return (string.Empty, string.Empty);
        }

        private Guid GetTenantId()
        {
            var tenantClaim = User.FindFirst("TenantId")?.Value;
            if (Guid.TryParse(tenantClaim, out var tenantId))
                return tenantId;

            throw new InvalidOperationException("TenantId claim is missing or invalid.");
        }
    }
}
