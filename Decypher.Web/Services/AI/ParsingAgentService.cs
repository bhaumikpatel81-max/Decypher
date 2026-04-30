using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace Decypher.Web.Services.AI
{
    public class ParsingAgentService : IAgentService
    {
        private readonly HttpClient _http;
        private readonly ILogger<ParsingAgentService> _log;

        public string AgentName => "Parsing Agent";
        public string PromptVersion => "parsing-v3.2.1";
        private const string MODEL = "gpt-4o-2024-05-13";

        public ParsingAgentService(IHttpClientFactory factory, ILogger<ParsingAgentService> log)
        {
            _http = factory.CreateClient("OpenAI");
            _log = log;
        }

        public async Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default)
        {
            var systemPrompt = $@"[PROMPT_VERSION:{PromptVersion}]
You are a resume parsing expert. Extract structured data from the resume text.
Return ONLY valid JSON — no preamble, no markdown fences.
Schema:
{{
  ""name"": string,
  ""email"": string | null,
  ""phone"": string | null,
  ""skills"": [string],
  ""totalYearsExperience"": number,
  ""education"": [{{""degree"": string, ""institution"": string, ""year"": number | null}}],
  ""workHistory"": [{{""title"": string, ""company"": string, ""durationMonths"": number | null}}],
  ""certifications"": [string]
}}";

            try
            {
                var body = new
                {
                    model = MODEL,
                    messages = new[]
                    {
                        new { role = "system", content = systemPrompt },
                        new { role = "user", content = $"Resume:\n{input.ResumeText}" }
                    },
                    temperature = 0.2,
                    response_format = new { type = "json_object" }
                };

                var resp = await _http.PostAsJsonAsync("chat/completions", body, ct);
                resp.EnsureSuccessStatusCode();
                var result = await resp.Content.ReadFromJsonAsync<OpenAIChatResponse>(ct);
                var content = result?.Choices?[0]?.Message?.Content
                    ?? throw new InvalidOperationException("Empty response from OpenAI");
                var parsed = JsonSerializer.Deserialize<Dictionary<string, object>>(content)
                    ?? throw new InvalidOperationException("Failed to deserialize parsed resume");

                return new AgentResult
                {
                    Success = true, Data = parsed, Confidence = 0.95,
                    Status = "complete", ModelVersion = MODEL, PromptVersion = PromptVersion
                };
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "ParsingAgent failed");
                return new AgentResult { Success = false, Status = "failed", Confidence = 0, ErrorMessage = ex.Message };
            }
        }
    }
}
