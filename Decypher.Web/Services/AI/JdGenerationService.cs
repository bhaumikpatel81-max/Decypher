using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace Decypher.Web.Services.AI
{
    public interface IJdGenerationService
    {
        Task<JdGenerationResult> GenerateAsync(JdGenerationRequest request, CancellationToken ct = default);
    }

    public class JdGenerationService : IJdGenerationService
    {
        private readonly HttpClient _http;
        private readonly IAuditLogService _audit;
        private readonly ILogger<JdGenerationService> _log;

        private const string MODEL = "gpt-4o-2024-05-13";
        private const string PROMPT_VERSION = "jd-gen-v1.0.0";

        public JdGenerationService(IHttpClientFactory factory, IAuditLogService audit,
            ILogger<JdGenerationService> log)
        {
            _http = factory.CreateClient("OpenAI");
            _audit = audit;
            _log = log;
        }

        public async Task<JdGenerationResult> GenerateAsync(JdGenerationRequest req, CancellationToken ct = default)
        {
            var systemPrompt = $@"[PROMPT_VERSION:{PROMPT_VERSION}]
You are an expert HR professional. Generate a complete, professional job description.
Return ONLY valid JSON with this schema:
{{
  ""title"": string,
  ""overview"": string,
  ""responsibilities"": [string],
  ""requirements"": [string],
  ""niceToHave"": [string],
  ""benefits"": [string],
  ""employmentType"": string,
  ""experienceRange"": string
}}
Be specific, inclusive, and bias-free. Use action verbs. Do not reference age, gender, or ethnicity.";

            var userPrompt = $@"Generate a job description for:
Title: {req.JobTitle}
Department: {req.Department}
Required Skills: {string.Join(", ", req.RequiredSkills)}
Experience: {req.MinYearsExperience}–{req.MaxYearsExperience} years
Employment Type: {req.EmploymentType}
Additional Context: {req.AdditionalContext ?? "None"}";

            try
            {
                var body = new
                {
                    model = MODEL,
                    messages = new[]
                    {
                        new { role = "system", content = systemPrompt },
                        new { role = "user", content = userPrompt }
                    },
                    temperature = 0.7,
                    response_format = new { type = "json_object" }
                };

                var resp = await _http.PostAsJsonAsync("chat/completions", body, ct);
                resp.EnsureSuccessStatusCode();
                var openAiResult = await resp.Content.ReadFromJsonAsync<OpenAIChatResponse>(ct);
                var jdData = JsonSerializer.Deserialize<JdData>(
                    openAiResult.Choices[0].Message.Content,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                await _audit.LogAIDecisionAsync(
                    "jd_generation", "JD Generation Agent", req.JobTitle,
                    new { req.JobTitle, req.Department }, jdData,
                    MODEL, PROMPT_VERSION, 0.90, false,
                    req.TenantId, req.ActorId);

                return new JdGenerationResult
                {
                    Success = true,
                    Data = jdData,
                    ModelVersion = MODEL,
                    PromptVersion = PROMPT_VERSION,
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "JdGenerationService failed for {JobTitle}", req.JobTitle);
                return new JdGenerationResult { Success = false, ErrorMessage = ex.Message };
            }
        }
    }

    public record JdGenerationRequest
    {
        public string JobTitle { get; init; }
        public string Department { get; init; }
        public List<string> RequiredSkills { get; init; } = new();
        public int MinYearsExperience { get; init; }
        public int MaxYearsExperience { get; init; }
        public string EmploymentType { get; init; } = "Full-time";
        public string AdditionalContext { get; init; }
        public string TenantId { get; init; }
        public string ActorId { get; init; }
    }

    public class JdData
    {
        [System.Text.Json.Serialization.JsonPropertyName("title")]
        public string Title { get; set; }
        [System.Text.Json.Serialization.JsonPropertyName("overview")]
        public string Overview { get; set; }
        [System.Text.Json.Serialization.JsonPropertyName("responsibilities")]
        public List<string> Responsibilities { get; set; } = new();
        [System.Text.Json.Serialization.JsonPropertyName("requirements")]
        public List<string> Requirements { get; set; } = new();
        [System.Text.Json.Serialization.JsonPropertyName("niceToHave")]
        public List<string> NiceToHave { get; set; } = new();
        [System.Text.Json.Serialization.JsonPropertyName("benefits")]
        public List<string> Benefits { get; set; } = new();
        [System.Text.Json.Serialization.JsonPropertyName("employmentType")]
        public string EmploymentType { get; set; }
        [System.Text.Json.Serialization.JsonPropertyName("experienceRange")]
        public string ExperienceRange { get; set; }
    }

    public record JdGenerationResult
    {
        public bool Success { get; init; }
        public JdData Data { get; init; }
        public string ModelVersion { get; init; }
        public string PromptVersion { get; init; }
        public DateTime Timestamp { get; init; }
        public string ErrorMessage { get; init; }
    }
}
