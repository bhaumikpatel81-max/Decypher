using System.Text;
using System.Text.Json;
using Decypher.Web.Data;
using Decypher.Web.Models;

namespace Decypher.Web.Services
{
    public interface IResumeParserService
    {
        Task<ResumeParserResponse> ParseAsync(string rawText, Guid tenantId, Guid candidateId);
        Task<ParsedResume?> GetLastParsedAsync(Guid candidateId, Guid tenantId);
    }

    public class ResumeParserService : IResumeParserService
    {
        private readonly IHttpClientFactory _httpFactory;
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _db;

        public ResumeParserService(IHttpClientFactory httpFactory, IConfiguration config, ApplicationDbContext db)
        {
            _httpFactory = httpFactory;
            _config = config;
            _db = db;
        }

        public async Task<ResumeParserResponse> ParseAsync(string rawText, Guid tenantId, Guid candidateId)
        {
            var systemPrompt = @"You are a resume parser. Extract structured data from the CV text.
Return ONLY valid JSON matching this schema (no markdown, no explanation):
{
  ""fullName"": string,
  ""email"": string,
  ""phone"": string,
  ""summary"": string,
  ""skills"": [string],
  ""experience"": [{""company"":string,""title"":string,""startDate"":string,""endDate"":string,""description"":string}],
  ""educationHistory"": [{""institution"":string,""degree"":string,""field"":string,""graduationYear"":string}],
  ""certifications"": [string]
}";

            var client = _httpFactory.CreateClient("OpenAI");
            var payload = new
            {
                model = "gpt-4o",
                messages = new[]
                {
                    new { role = "system", content = systemPrompt },
                    new { role = "user", content = rawText }
                },
                temperature = 0.1,
                response_format = new { type = "json_object" }
            };

            var response = await client.PostAsync("chat/completions",
                new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json"));

            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            var root = JsonSerializer.Deserialize<JsonElement>(json);
            var content = root.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString() ?? "{}";

            var parsed = JsonSerializer.Deserialize<ParsedResume>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
                         ?? new ParsedResume();

            parsed.Id = Guid.NewGuid();
            parsed.RawText = rawText;
            parsed.ParsedAt = DateTime.UtcNow;
            parsed.TenantId = tenantId;
            parsed.CandidateId = candidateId;

            _db.ParsedResumes.Add(parsed);
            await _db.SaveChangesAsync();

            return new ResumeParserResponse
            {
                Id = parsed.Id,
                FullName = parsed.FullName,
                Email = parsed.Email,
                Phone = parsed.Phone,
                Summary = parsed.Summary,
                Skills = parsed.Skills,
                Experience = parsed.Experience,
                EducationHistory = parsed.EducationHistory,
                Certifications = parsed.Certifications,
                ParsedAt = parsed.ParsedAt
            };
        }

        public async Task<ParsedResume?> GetLastParsedAsync(Guid candidateId, Guid tenantId)
        {
            return await Task.FromResult(
                _db.ParsedResumes
                   .Where(p => p.CandidateId == candidateId && p.TenantId == tenantId)
                   .OrderByDescending(p => p.ParsedAt)
                   .FirstOrDefault());
        }
    }
}
