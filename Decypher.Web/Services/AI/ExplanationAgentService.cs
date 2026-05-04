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
        public string PromptVersion => "explanation-v4.1.0";
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
            var behavData  = input.Context.GetValueOrDefault("BehavioralData");
            var matchData  = input.Context.GetValueOrDefault("MatchData");

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
                    max_tokens = 1500,
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
                _log.LogWarning(ex, "ExplanationAgent OpenAI call failed — generating local score-based explanation");
                return BuildLocalFallback(input);
            }
        }

        private AgentResult BuildLocalFallback(AgentInput input)
        {
            double overallScore = 0, matchPct = 0;
            double skillsMatch = 0, expMatch = 0, eduMatch = 0, cultureFit = 0;
            string stabilityLevel = "Moderate";
            var skills = Array.Empty<string>();

            try
            {
                if (input.Context.TryGetValue("RankingData", out var rd) && rd != null)
                {
                    using var rdDoc = JsonDocument.Parse(JsonSerializer.Serialize(rd));
                    var rdRoot = rdDoc.RootElement;
                    overallScore = TryDouble(rdRoot, "OverallScore");
                    if (rdRoot.TryGetProperty("Breakdown", out var bd))
                    {
                        skillsMatch    = TryDouble(bd, "SkillsMatch");
                        expMatch       = TryDouble(bd, "ExperienceMatch");
                        eduMatch       = TryDouble(bd, "EducationMatch");
                        cultureFit     = TryDouble(bd, "CultureFit");
                        stabilityLevel = bd.TryGetProperty("StabilityLevel", out var sl)
                            ? sl.GetString() ?? "Moderate" : "Moderate";
                    }
                }
                if (input.Context.TryGetValue("MatchData", out var md) && md != null)
                {
                    using var mdDoc = JsonDocument.Parse(JsonSerializer.Serialize(md));
                    matchPct = TryDouble(mdDoc.RootElement, "MatchPercentage");
                }
                if (input.Context.TryGetValue("ParsedData", out var pd) && pd != null)
                {
                    using var pdDoc = JsonDocument.Parse(JsonSerializer.Serialize(pd));
                    if (pdDoc.RootElement.TryGetProperty("skills", out var sk) && sk.ValueKind == JsonValueKind.Array)
                        skills = sk.EnumerateArray()
                            .Select(x => x.GetString() ?? "").Where(s => s.Length > 0).Take(8).ToArray();
                }
            }
            catch { /* use defaults */ }

            string rec      = overallScore >= 70 ? "SHORTLIST" : overallScore >= 50 ? "REVIEW" : "REJECT";
            string fitLevel = overallScore >= 70 ? "strong"    : overallScore >= 50 ? "moderate" : "limited";

            // ── Overall Assessment ──────────────────────────────────────────────
            string assessment = overallScore > 0
                ? $"The candidate demonstrates {fitLevel} overall alignment with the role, " +
                  $"achieving a composite match score of {overallScore:F0}%" +
                  (matchPct > 0 ? $" and a semantic CV-JD similarity of {matchPct:F0}%" : "") +
                  $". Skills alignment stands at {skillsMatch:F0}% and experience fit at {expMatch:F0}%, " +
                  (overallScore >= 70
                      ? "indicating a well-rounded profile that meets the core role requirements."
                      : overallScore >= 50
                      ? "suggesting potential with some areas that warrant closer review."
                      : "indicating notable gaps that may make this role a stretch fit for the candidate.")
                : "Candidate profile analysis is complete. Enable OpenAI integration for AI-generated narrative explanation.";

            // ── Key Strengths ───────────────────────────────────────────────────
            var strengths = new List<string>();
            if (skillsMatch >= 70) strengths.Add($"Strong technical alignment — skills match of {skillsMatch:F0}% meets or exceeds the role threshold.");
            if (expMatch >= 70)    strengths.Add($"Relevant experience — experience fit of {expMatch:F0}% indicates appropriate background for this level.");
            if (eduMatch >= 70)    strengths.Add($"Education aligned — education fit of {eduMatch:F0}% meets role requirements.");
            if (cultureFit >= 70)  strengths.Add($"Culture fit of {cultureFit:F0}% suggests good alignment with team and working style expectations.");
            if (stabilityLevel == "High") strengths.Add("High career stability — consistent tenure indicates reliability and long-term commitment potential.");
            if (skills.Length > 0) strengths.Add($"Profile includes relevant skills: {string.Join(", ", skills.Take(5))}.");
            if (strengths.Count == 0) strengths.Add("Automated scoring complete — configure OpenAI API key for evidence-based strength extraction.");

            // ── Skill Gaps ──────────────────────────────────────────────────────
            var gaps = new List<string>();
            if (skillsMatch > 0 && skillsMatch < 60) gaps.Add($"Skills match of {skillsMatch:F0}% is below the 70% threshold — technical skill gaps may need addressing.");
            if (expMatch > 0 && expMatch < 60)    gaps.Add($"Experience fit of {expMatch:F0}% suggests the candidate may lack seniority for this role level.");
            if (eduMatch > 0 && eduMatch < 60)    gaps.Add($"Education fit of {eduMatch:F0}% may indicate a partial mismatch with role academic requirements.");
            if (stabilityLevel == "Low")           gaps.Add("Low career stability — frequent short-term roles may represent a retention risk.");
            if (gaps.Count == 0) gaps.Add("No critical skill gaps identified at automated scoring level.");

            // ── Experience Fit ──────────────────────────────────────────────────
            string expFit = expMatch > 0
                ? $"Experience alignment is {expMatch:F0}%, indicating " +
                  (expMatch >= 70 ? "strong relevance to the role's seniority and scope."
                      : expMatch >= 50 ? "moderate relevance — some experience gaps may require bridging."
                      : "limited relevance — the candidate may be under-experienced for this role.")
                : "Experience alignment assessed via automated scoring.";

            // ── Education Fit ───────────────────────────────────────────────────
            string eduFit = eduMatch > 0
                ? $"Education fit is {eduMatch:F0}%, " +
                  (eduMatch >= 70 ? "meeting or exceeding role educational requirements."
                      : "partially meeting role requirements — further review may be needed.")
                : "Education alignment assessed via automated scoring.";

            // ── Behavioral Summary ──────────────────────────────────────────────
            string behavSummary = "Behavioural insights are visible in the Behavioral Intelligence section above. " +
                "Enable OpenAI integration for a narrative behavioural summary tied to specific CV evidence.";

            // ── Risk Factors ────────────────────────────────────────────────────
            var risks = new List<string>();
            if (overallScore > 0 && overallScore < 50) risks.Add($"Below-threshold overall score ({overallScore:F0}%) — significant fit gaps detected across scoring dimensions.");
            if (stabilityLevel == "Low")               risks.Add("Low career stability — frequent job changes may indicate a retention risk.");
            if (matchPct > 0 && matchPct < 45)         risks.Add($"Low semantic CV-JD similarity ({matchPct:F0}%) — candidate language and experience may not closely match this role.");
            if (risks.Count == 0) risks.Add("No significant risk factors identified at automated scoring level.");

            // ── Recommendation Rationale ────────────────────────────────────────
            string rationale = rec == "SHORTLIST"
                ? $"Strong alignment across scoring dimensions (overall {overallScore:F0}%) supports advancing this candidate. Recommend scheduling a technical interview to validate fit."
                : rec == "REVIEW"
                ? $"Moderate alignment (overall {overallScore:F0}%) warrants a structured screening call before committing to a full interview process."
                : $"Below-threshold alignment (overall {overallScore:F0}%) suggests a poor fit for this role at this time. Consider re-evaluating if role requirements change.";

            return new AgentResult
            {
                Success      = true,
                Data = new
                {
                    OverallAssessment       = assessment,
                    KeyStrengths            = strengths.ToArray(),
                    SkillGaps               = gaps.ToArray(),
                    ExperienceFit           = expFit,
                    EducationFit            = eduFit,
                    BehavioralSummary       = behavSummary,
                    RiskFactors             = risks.ToArray(),
                    Recommendation          = rec,
                    RecommendationRationale = rationale
                },
                Confidence   = 0.70,
                Status       = "complete",
                ModelVersion = "local-template-v1",
                PromptVersion = PromptVersion
            };
        }

        private static double TryDouble(JsonElement el, string key)
        {
            try { return el.TryGetProperty(key, out var p) && p.TryGetDouble(out var v) ? v : 0; }
            catch { return 0; }
        }

        private static string GetStr(JsonElement root, string key) =>
            root.TryGetProperty(key, out var p) ? p.GetString() ?? "" : "";

        private static string[] GetArr(JsonElement root, string key) =>
            root.TryGetProperty(key, out var p)
                ? p.EnumerateArray().Select(x => x.GetString() ?? "").Where(s => s.Length > 0).ToArray()
                : Array.Empty<string>();
    }
}
