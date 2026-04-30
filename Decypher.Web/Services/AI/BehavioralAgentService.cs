using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace Decypher.Web.Services.AI
{
    public class BehavioralAgentService : IAgentService
    {
        private readonly HttpClient _http;
        private readonly ILogger<BehavioralAgentService> _log;

        public string AgentName => "Behavioral Intelligence Agent";
        public string PromptVersion => "behavioral-v1.0.0";
        private const string MODEL = "gpt-4o-2024-05-13";

        public BehavioralAgentService(IHttpClientFactory factory, ILogger<BehavioralAgentService> log)
        {
            _http = factory.CreateClient("OpenAI");
            _log = log;
        }

        public async Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default)
        {
            var parsedData = input.Context.GetValueOrDefault("ParsedData");

            var systemPrompt = $@"[PROMPT_VERSION:{PromptVersion}]
You are an AI Behavioral Intelligence Engine inside an enterprise hiring platform (Decypher).
Your task is to infer and score behavioral, cognitive, and leadership-related skills from a candidate's CV.

These skills are NOT explicitly listed — infer them ONLY from:
* Work experience descriptions and impact statements
* Achievements and quantified outcomes
* Language patterns (""resolved"", ""led"", ""owned"", ""optimized"", ""improved"")
* Responsibilities handled and scope of authority
* Career trajectory and role transitions

SKILLS TO EVALUATE (score each 0–100):
1. PROBLEM_SOLVING    — Complex challenges resolved, process improvements, troubleshooting
2. CRITICAL_THINKING  — Analytical decisions, data-driven actions, strategic reasoning
3. OWNERSHIP          — End-to-end responsibility, accountability for outcomes
4. LEADERSHIP         — Team handling, decision authority, cross-team influence
5. COMMUNICATION      — Stakeholder interaction, client-facing roles, reporting
6. INTEGRITY          — Long tenure, consistent career path, trust-based responsibilities
7. ADAPTABILITY       — Role/domain transitions, learning new technologies
8. COLLABORATION      — Cross-functional work, team delivery, multi-stakeholder projects

SCORING RULES (STRICT):
* Score HIGH (>75) ONLY when strong, specific evidence exists in the CV
* Score MODERATE (40–60) when signals are present but not explicit
* Score LOW (<40) when there is little or no evidence
* NEVER hallucinate or assume — infer only from what is written
* Reduce score when signals are conflicting or ambiguous
* Avoid bias based on gender, age, location, or college name

Return ONLY valid JSON — no preamble, no markdown fences, no extra text:
{{
  ""behavioralScores"": {{
    ""problemSolving"": number,
    ""criticalThinking"": number,
    ""ownership"": number,
    ""leadership"": number,
    ""communication"": number,
    ""integrity"": number,
    ""adaptability"": number,
    ""collaboration"": number
  }},
  ""evidence"": {{
    ""problemSolving"": ""one-line evidence from CV"",
    ""criticalThinking"": ""one-line evidence from CV"",
    ""ownership"": ""one-line evidence from CV"",
    ""leadership"": ""one-line evidence from CV"",
    ""communication"": ""one-line evidence from CV"",
    ""integrity"": ""one-line evidence from CV"",
    ""adaptability"": ""one-line evidence from CV"",
    ""collaboration"": ""one-line evidence from CV""
  }},
  ""summary"": ""3–4 line behavioral profile of the candidate"",
  ""confidence"": number (0.0–1.0, lower if CV lacks behavioral signals)
}}";

            var userPrompt = $@"Parsed Resume JSON:
{JsonSerializer.Serialize(parsedData)}

Job Description:
{input.JobDescription}

Analyze this candidate's behavioral and soft-skill profile based solely on the evidence above.";

            try
            {
                var body = new
                {
                    model = MODEL,
                    messages = new[]
                    {
                        new { role = "system", content = systemPrompt },
                        new { role = "user",   content = userPrompt }
                    },
                    temperature = 0.3,
                    response_format = new { type = "json_object" }
                };

                var resp = await _http.PostAsJsonAsync("chat/completions", body, ct);
                resp.EnsureSuccessStatusCode();
                var result = await resp.Content.ReadFromJsonAsync<OpenAIChatResponse>(ct);
                var content = result?.Choices?[0]?.Message?.Content
                    ?? throw new InvalidOperationException("Empty response from OpenAI");
                var behavioralData = JsonSerializer.Deserialize<Dictionary<string, object>>(content)
                    ?? throw new InvalidOperationException("Failed to deserialize behavioral data");

                // Extract confidence from payload if present; default to 0.85
                double confidence = 0.85;
                if (behavioralData.TryGetValue("confidence", out var confObj) && confObj is JsonElement confEl)
                    confidence = confEl.TryGetDouble(out var c) ? c : 0.85;

                return new AgentResult
                {
                    Success = true,
                    Data = behavioralData,
                    Confidence = confidence,
                    Status = "complete",
                    ModelVersion = MODEL,
                    PromptVersion = PromptVersion
                };
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "BehavioralAgent failed");
                return new AgentResult
                {
                    Success = false,
                    Status = "failed",
                    Confidence = 0,
                    ErrorMessage = ex.Message,
                    ModelVersion = MODEL,
                    PromptVersion = PromptVersion
                };
            }
        }
    }
}
