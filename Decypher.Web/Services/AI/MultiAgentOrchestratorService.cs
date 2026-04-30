using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Decypher.Web.Services.AI
{
    public interface IMultiAgentOrchestratorService
    {
        Task<MultiAgentResult> RunAsync(
            string jobDescription, string resumeText,
            string tenantId, string actorId,
            IProgress<AgentProgress>? progress = null,
            CancellationToken ct = default);
    }

    public class MultiAgentOrchestratorService : IMultiAgentOrchestratorService
    {
        private readonly ParsingAgentService            _parsing;
        private readonly MatchingAgentService           _matching;
        private readonly RankingAgentService            _ranking;
        private readonly BehavioralAgentService         _behavioral;
        private readonly ExplanationAgentService        _explanation;
        private readonly BiasDetectionAgentService      _bias;
        private readonly IAuditLogService               _audit;
        private readonly IConfiguration                 _config;
        private readonly ILogger<MultiAgentOrchestratorService> _log;

        public MultiAgentOrchestratorService(
            ParsingAgentService parsing,
            MatchingAgentService matching,
            RankingAgentService ranking,
            BehavioralAgentService behavioral,
            ExplanationAgentService explanation,
            BiasDetectionAgentService bias,
            IAuditLogService audit,
            IConfiguration config,
            ILogger<MultiAgentOrchestratorService> log)
        {
            _parsing = parsing; _matching = matching; _ranking = ranking;
            _behavioral = behavioral; _explanation = explanation; _bias = bias;
            _audit = audit; _config = config; _log = log;
        }

        public async Task<MultiAgentResult> RunAsync(
            string jobDescription, string resumeText,
            string tenantId, string actorId,
            IProgress<AgentProgress>? progress = null,
            CancellationToken ct = default)
        {
            double confidenceThreshold = _config.GetValue<double>("AI:ConfidenceThreshold", 0.60);
            var jobId = Guid.NewGuid().ToString();

            var input = new AgentInput
            {
                JobDescription = jobDescription,
                ResumeText     = resumeText,
                Context        = new Dictionary<string, object>()
            };

            AgentResult Run(string name, int step, Func<Task<AgentResult>> fn)
            {
                progress?.Report(new AgentProgress { AgentName = name, Status = "processing", Step = step });
                var r = fn().GetAwaiter().GetResult();
                progress?.Report(new AgentProgress { AgentName = name, Status = r.Success ? "complete" : "failed", Step = step });
                return r;
            }

            // ── Pipeline: 6 agents in sequence ─────────────────────────────
            var parsing = Run("Parsing Agent", 1, () => _parsing.ProcessAsync(input, ct));
            input = input with { Context = new Dictionary<string, object>(input.Context) { ["ParsedData"] = parsing.Data ?? new object() } };

            var matching = Run("Matching Agent", 2, () => _matching.ProcessAsync(input, ct));
            input = input with { Context = new Dictionary<string, object>(input.Context) { ["MatchData"] = matching.Data ?? new object() } };

            var ranking = Run("Ranking Agent", 3, () => _ranking.ProcessAsync(input, ct));
            input = input with { Context = new Dictionary<string, object>(input.Context) { ["RankingData"] = ranking.Data ?? new object() } };

            // Behavioral runs after parsing so it has structured resume data in context
            var behavioral = Run("Behavioral Intelligence Agent", 4, () => _behavioral.ProcessAsync(input, ct));
            input = input with { Context = new Dictionary<string, object>(input.Context) { ["BehavioralData"] = behavioral.Data ?? new object() } };

            // Explanation now has access to behavioral insights as well
            var explanation = Run("Explanation Agent", 5, () => _explanation.ProcessAsync(input, ct));
            var bias        = Run("Bias Detection Agent", 6, () => _bias.ProcessAsync(input, ct));
            // ───────────────────────────────────────────────────────────────

            bool needsReview = ranking.Confidence < confidenceThreshold;

            foreach (var (agent, result) in new[]
            {
                (_parsing.AgentName,    parsing),
                (_matching.AgentName,   matching),
                (_ranking.AgentName,    ranking),
                (_behavioral.AgentName, behavioral),
                (_explanation.AgentName,explanation),
                (_bias.AgentName,       bias)
            })
            {
                await _audit.LogAIDecisionAsync(
                    "resume_screening", agent, jobId,
                    new { JobDescriptionLength = jobDescription.Length }, result.Data ?? new object(),
                    result.ModelVersion ?? "", result.PromptVersion ?? "",
                    result.Confidence, needsReview, tenantId, actorId);
            }

            return new MultiAgentResult
            {
                JobId               = jobId,
                ParsingResult       = parsing,
                MatchingResult      = matching,
                RankingResult       = ranking,
                BehavioralResult    = behavioral,
                ExplanationResult   = explanation,
                BiasDetectionResult = bias,
                RequiresHumanReview = needsReview,
                HumanReviewReason   = needsReview
                    ? $"AI confidence ({ranking.Confidence:P0}) is below threshold ({confidenceThreshold:P0}). Manual review required."
                    : null,
                Timestamp = DateTime.UtcNow
            };
        }
    }

    public record MultiAgentResult
    {
        public string?      JobId               { get; init; }
        public AgentResult? ParsingResult       { get; init; }
        public AgentResult? MatchingResult      { get; init; }
        public AgentResult? RankingResult       { get; init; }
        public AgentResult? BehavioralResult    { get; init; }
        public AgentResult? ExplanationResult   { get; init; }
        public AgentResult? BiasDetectionResult { get; init; }
        public bool         RequiresHumanReview { get; init; }
        public string?      HumanReviewReason   { get; init; }
        public DateTime     Timestamp           { get; init; }
    }
}
