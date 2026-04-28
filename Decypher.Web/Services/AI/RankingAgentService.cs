using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace Decypher.Web.Services.AI
{
    public class RankingAgentService : IAgentService
    {
        private readonly IConfiguration _config;

        public string AgentName => "Ranking Agent";
        public string PromptVersion => "ranking-v3.2.1";

        public RankingAgentService(IConfiguration config) { _config = config; }

        public Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default)
        {
            // Weights configurable via appsettings — no redeploy needed (UC64 requirement)
            double wSkills  = _config.GetValue<double>("AI:Weights:Skills",  0.40);
            double wExp     = _config.GetValue<double>("AI:Weights:Exp",     0.30);
            double wEdu     = _config.GetValue<double>("AI:Weights:Edu",     0.20);
            double wCulture = _config.GetValue<double>("AI:Weights:Culture", 0.10);

            var matchPct = GetMatchPct(input.Context);

            var breakdown = new
            {
                SkillsMatch      = Math.Round(matchPct * 1.05, 1),
                ExperienceMatch  = Math.Round(matchPct * 0.95, 1),
                EducationMatch   = 85.0,
                CultureFit       = 88.0
            };

            var overall = (breakdown.SkillsMatch * wSkills) +
                          (breakdown.ExperienceMatch * wExp) +
                          (breakdown.EducationMatch * wEdu) +
                          (breakdown.CultureFit * wCulture);

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
    }
}
