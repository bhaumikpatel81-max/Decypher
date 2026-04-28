using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace Decypher.Web.Services.AI
{
    public class ExplanationAgentService : IAgentService
    {
        private readonly HttpClient _http;
        private readonly ILogger<ExplanationAgentService> _log;

        public string AgentName => "Explanation Agent";
        public string PromptVersion => "explanation-v3.2.1";
        private const string MODEL = "gpt-4o-2024-05-13";

        public ExplanationAgentService(IHttpClientFactory factory, ILogger<ExplanationAgentService> log)
        {
            _http = factory.CreateClient("OpenAI");
            _log = log;
        }

        public async Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default)
        {
            var rankData   = input.Context.GetValueOrDefault("RankingData");
            var parsedData = input.Context.GetValueOrDefault("ParsedData");

            var systemPrompt = $@"[PROMPT_VERSION:{PromptVersion}]
You are an expert recruiter. Write a 3–5 sentence plain-English explanation for why this candidate
matches or doesn't match the role. Mention specific strengths and gaps. Be factual and bias-free.
Do not reference name, gender, ethnicity, or age. End with: SHORTLIST / REVIEW / REJECT.";

            var userPrompt = $@"Job Description: {input.JobDescription}

Candidate Profile:
{JsonSerializer.Serialize(parsedData)}

Match Scores:
{JsonSerializer.Serialize(rankData)}

Write the recruiter explanation.";

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
                    temperature = 0.7, max_tokens = 250
                };

                var resp = await _http.PostAsJsonAsync("chat/completions", body, ct);
                resp.EnsureSuccessStatusCode();
                var result = await resp.Content.ReadFromJsonAsync<OpenAIChatResponse>(ct);

                return new AgentResult
                {
                    Success = true,
                    Data = new { Explanation = result.Choices[0].Message.Content.Trim() },
                    Confidence = 0.92, Status = "complete", ModelVersion = MODEL, PromptVersion = PromptVersion
                };
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "ExplanationAgent failed");
                return new AgentResult { Success = false, Status = "failed", Confidence = 0, ErrorMessage = ex.Message };
            }
        }
    }
}
