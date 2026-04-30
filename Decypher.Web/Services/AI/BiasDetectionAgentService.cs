using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace Decypher.Web.Services.AI
{
    public class BiasDetectionAgentService : IAgentService
    {
        private readonly HttpClient _http;
        private readonly ILogger<BiasDetectionAgentService> _log;

        public string AgentName => "Bias Detection Agent";
        public string PromptVersion => "bias-v3.2.1";
        private const string MODEL = "gpt-4o-2024-05-13";

        public BiasDetectionAgentService(IHttpClientFactory factory, ILogger<BiasDetectionAgentService> log)
        {
            _http = factory.CreateClient("OpenAI");
            _log = log;
        }

        public async Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default)
        {
            var parsedData = input.Context.GetValueOrDefault("ParsedData");

            var systemPrompt = $@"[PROMPT_VERSION:{PromptVersion}]
You are a bias detection expert for recruitment AI.
Analyze for: gender bias, location bias, college-tier bias, age bias.
Return ONLY valid JSON:
{{
  ""genderBias"":   {{""detected"": bool, ""score"": 0.0–1.0, ""details"": string}},
  ""locationBias"": {{""detected"": bool, ""score"": 0.0–1.0, ""details"": string}},
  ""collegeBias"":  {{""detected"": bool, ""score"": 0.0–1.0, ""details"": string}},
  ""ageBias"":      {{""detected"": bool, ""score"": 0.0–1.0, ""details"": string}},
  ""overallBiasFreeScore"": 0.0–1.0
}}
overallBiasFreeScore = 1 means completely bias-free.";

            var userPrompt = $@"Job Description: {input.JobDescription}
Candidate Profile: {JsonSerializer.Serialize(parsedData)}
Analyze.";

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
                    temperature = 0.2,
                    response_format = new { type = "json_object" }
                };

                var resp = await _http.PostAsJsonAsync("chat/completions", body, ct);
                resp.EnsureSuccessStatusCode();
                var result = await resp.Content.ReadFromJsonAsync<OpenAIChatResponse>(ct);
                var content = result?.Choices?[0]?.Message?.Content
                    ?? throw new InvalidOperationException("Empty response from OpenAI");
                var biasData = JsonSerializer.Deserialize<Dictionary<string, object>>(content)
                    ?? throw new InvalidOperationException("Failed to deserialize bias data");

                return new AgentResult
                {
                    Success = true, Data = biasData, Confidence = 0.90,
                    Status = "complete", ModelVersion = MODEL, PromptVersion = PromptVersion
                };
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "BiasDetectionAgent failed");
                return new AgentResult { Success = false, Status = "failed", Confidence = 0, ErrorMessage = ex.Message };
            }
        }
    }
}
