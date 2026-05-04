using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace Decypher.Web.Services.AI
{
    public class RankingAgentService : IAgentService
    {
        private readonly IConfiguration _config;

        public string AgentName => "Ranking Agent";
        public string PromptVersion => "ranking-v3.3.0";

        public RankingAgentService(IConfiguration config) { _config = config; }

        public Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default)
        {
            // Weights configurable via appsettings — no redeploy needed
            double wSkills    = _config.GetValue<double>("AI:Weights:Skills",    0.35);
            double wExp       = _config.GetValue<double>("AI:Weights:Exp",       0.25);
            double wEdu       = _config.GetValue<double>("AI:Weights:Edu",       0.15);
            double wCulture   = _config.GetValue<double>("AI:Weights:Culture",   0.10);
            double wStability = _config.GetValue<double>("AI:Weights:Stability", 0.15);

            var matchPct      = GetMatchPct(input.Context);
            var stability     = CalculateStability(input.Context);

            var breakdown = new
            {
                SkillsMatch      = Math.Round(matchPct * 1.05, 1),
                ExperienceMatch  = Math.Round(matchPct * 0.95, 1),
                EducationMatch   = 85.0,
                CultureFit       = 88.0,
                StabilityScore   = stability.Score,
                StabilityLevel   = stability.Level,
                StabilityDetail  = stability.Detail
            };

            var overall = (breakdown.SkillsMatch    * wSkills)    +
                          (breakdown.ExperienceMatch * wExp)       +
                          (breakdown.EducationMatch  * wEdu)       +
                          (breakdown.CultureFit      * wCulture)   +
                          (breakdown.StabilityScore  * wStability);

            return Task.FromResult(new AgentResult
            {
                Success = true,
                Data = new { OverallScore = Math.Round(Math.Min(overall, 100), 1), Breakdown = breakdown },
                Confidence = 0.88,
                Status = "complete", ModelVersion = "weighted-scoring-v1", PromptVersion = PromptVersion
            });
        }

        private static double GetMatchPct(Dictionary<string, object> ctx)
        {
            if (ctx.TryGetValue("MatchData", out var md) && md is JsonElement el)
                return el.GetProperty("MatchPercentage").GetDouble();
            return 75.0;
        }

        private record StabilityInfo(double Score, string Level, string Detail);

        /// <summary>
        /// Stability = weighted combination of three factors derived from parsed work history:
        ///   50% — Longest single-company tenure as % of total experience (≥20-25% threshold)
        ///   30% — Average tenure per company (longer avg = more stable)
        ///   20% — Job-hopping penalty (stints shorter than 12 months)
        /// </summary>
        private static StabilityInfo CalculateStability(Dictionary<string, object> ctx)
        {
            if (!ctx.TryGetValue("ParsedData", out var pd) || pd == null)
                return new StabilityInfo(65.0, "Moderate", "Insufficient work history data.");

            // ParsedData arrives as Dictionary<string,object> from ParsingAgent (System.Text.Json deserialises
            // values as JsonElement). Re-serialise to a JsonElement so the rest of the code is uniform.
            JsonElement parsed;
            if (pd is JsonElement je)
            {
                parsed = je;
            }
            else
            {
                try
                {
                    var json = JsonSerializer.Serialize(pd);
                    using var doc = JsonDocument.Parse(json);
                    parsed = doc.RootElement.Clone();
                }
                catch
                {
                    return new StabilityInfo(65.0, "Moderate", "Insufficient work history data.");
                }
            }

            var workHistory = new List<(string Company, double Months)>();

            if (parsed.TryGetProperty("workHistory", out var wh) && wh.ValueKind == JsonValueKind.Array)
                foreach (var job in wh.EnumerateArray())
                {
                    var company  = job.TryGetProperty("company",        out var c) ? c.GetString() ?? "" : "";
                    var duration = job.TryGetProperty("durationMonths", out var d) && d.ValueKind != JsonValueKind.Null
                        ? d.GetDouble() : 0;
                    if (duration > 0)
                        workHistory.Add((company, duration));
                }

            double totalMonths = workHistory.Any() ? workHistory.Sum(w => w.Months) : 0;
            if (totalMonths <= 0 && parsed.TryGetProperty("totalYearsExperience", out var ty))
                totalMonths = ty.GetDouble() * 12;

            if (totalMonths <= 0 || !workHistory.Any())
                return new StabilityInfo(65.0, "Moderate", "Insufficient work history data.");

            // Factor 1 (50%): Longest single-company tenure ≥ 20-25% of total (user requirement)
            double maxMonths    = workHistory.Max(w => w.Months);
            double longestRatio = maxMonths / totalMonths;
            double f1 = longestRatio >= 0.25 ? 100
                      : longestRatio >= 0.20 ? 75
                      : longestRatio >= 0.15 ? 50
                      :                        25;

            // Factor 2 (30%): Average tenure per company
            double avgMonths = workHistory.Average(w => w.Months);
            double f2 = avgMonths >= 36 ? 100
                      : avgMonths >= 24 ? 80
                      : avgMonths >= 18 ? 60
                      : avgMonths >= 12 ? 40
                      :                   20;

            // Factor 3 (20%): Job-hopping count — stints under 12 months
            int hops  = workHistory.Count(w => w.Months < 12);
            double f3 = hops == 0 ? 100 : hops == 1 ? 75 : hops == 2 ? 50 : 25;

            double score  = Math.Round((f1 * 0.50) + (f2 * 0.30) + (f3 * 0.20), 1);
            string level  = score >= 70 ? "High" : score >= 45 ? "Moderate" : "Low";
            string detail = $"Longest tenure: {(int)maxMonths}m ({longestRatio:P0} of total) · Avg tenure: {(int)avgMonths}m · Job hops (<12m): {hops}";

            return new StabilityInfo(score, level, detail);
        }
    }
}
