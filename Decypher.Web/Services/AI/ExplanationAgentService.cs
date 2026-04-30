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
        public string PromptVersion => "explanation-v4.0.0";
        private const string MODEL = "gpt-4o-2024-05-13";

        public ExplanationAgentService(IHttpClientFactory factory, ILogger<ExplanationAgentService> log)
        {
            _http = factory.CreateClient("OpenAI");
            _log = log;
        }

        public async Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default)
        {
            var rankData     = input.Context.GetValueOrDefault("RankingData");
            var parsedData   = input.Context.GetValueOrDefault("ParsedData");
            var behavData    = input.Context.GetValueOrDefault("BehavioralData");
            var matchData    = input.Context.GetValueOrDefault("MatchData");

            var systemPrompt = $@"[PROMPT_VERSION:{PromptVersion}]
You are a senior technical recruiter generating a detailed AI screening report for a hiring manager.
Return ONLY valid JSON with exactly these keys:
- overallAssessment: string (2-3 sentences summarizing candidate fit for the role)
- keyStrengths: array of strings (3-5 specific, evidence-based strengths from the CV)
- skillGaps: array of strings (2-4 specific gaps vs JD requirements, or [""No critical skill gaps identified""] if none)
- experienceFit: string (1-2 sentences on years/level/scope of experience vs role expectations)
- educationFit: string (1 sentence on education alignment)
- behavioralSummary: string (1-2 sentences on soft skills and behavioral alignment inferred from CV)
- riskFactors: array of strings (1-3 hiring risks, or [""No significant risk factors identified""] if none)
- recommendation: string (exactly one of: SHORTLIST, REVIEW, or REJECT)
- recommendationRationale: string (1-2 sentences justifying the recommendation with next steps)

Rules: Be factual, specific, and bias-free. Never reference name, gender, ethnicity, age, or institution prestige.";

            var userPrompt = $@"Job Description:
{input.JobDescription}

Parsed Candidate Profile:
{JsonSerializer.Serialize(parsedData)}

Match & Ranking Scores:
{JsonSerializer.Serialize(rankData)}

Skill Match Data:
{JsonSerializer.Serialize(matchData)}

Behavioral Analysis:
{JsonSerializer.Serialize(behavData)}

Generate the detailed recruiter explanation as JSON.";

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
                    temperature = 0.5,
                    max_tokens = 700,
                    response_format = new { type = "json_object" }
                };

                var resp = await _http.PostAsJsonAsync("chat/completions", body, ct);
                resp.EnsureSuccessStatusCode();
                var result = await resp.Content.ReadFromJsonAsync<OpenAIChatResponse>(ct);
                var json   = (result?.Choices?[0]?.Message?.Content
                    ?? throw new InvalidOperationException("Empty response from OpenAI")).Trim();

                using var doc  = JsonDocument.Parse(json);
                var root = doc.RootElement;

                var data = new
                {
                    OverallAssessment       = GetStr(root, "overallAssessment"),
                    KeyStrengths            = GetArr(root, "keyStrengths"),
                    SkillGaps               = GetArr(root, "skillGaps"),
                    ExperienceFit           = GetStr(root, "experienceFit"),
                    EducationFit            = GetStr(root, "educationFit"),
                    BehavioralSummary       = GetStr(root, "behavioralSummary"),
                    RiskFactors             = GetArr(root, "riskFactors"),
                    Recommendation          = GetStr(root, "recommendation"),
                    RecommendationRationale = GetStr(root, "recommendationRationale")
                };

                return new AgentResult
                {
                    Success = true, Data = data, Confidence = 0.92,
                    Status = "complete", ModelVersion = MODEL, PromptVersion = PromptVersion
                };
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "ExplanationAgent failed");
                return new AgentResult { Success = false, Status = "failed", Confidence = 0, ErrorMessage = ex.Message };
            }
        }

        private static string   GetStr(JsonElement root, string key) =>
            root.TryGetProperty(key, out var p) ? p.GetString() ?? "" : "";

        private static string[] GetArr(JsonElement root, string key) =>
            root.TryGetProperty(key, out var p)
                ? p.EnumerateArray().Select(x => x.GetString() ?? "").Where(s => s.Length > 0).ToArray()
                : Array.Empty<string>();
    }
}
