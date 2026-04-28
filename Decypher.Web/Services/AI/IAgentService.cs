namespace Decypher.Web.Services.AI
{
    public interface IAgentService
    {
        string AgentName { get; }
        string PromptVersion { get; }
        Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default);
    }

    public record AgentResult
    {
        public bool Success { get; init; }
        public object Data { get; init; }
        public double Confidence { get; init; }
        public string Status { get; init; }      // "complete" | "processing" | "failed"
        public string ModelVersion { get; init; }
        public string PromptVersion { get; init; }
        public DateTime Timestamp { get; init; } = DateTime.UtcNow;
        public string ErrorMessage { get; init; }
    }

    public record AgentInput
    {
        public string JobDescription { get; init; }
        public string ResumeText { get; init; }
        public Dictionary<string, object> Context { get; init; } = new();
    }

    public record AgentProgress
    {
        public string AgentName { get; init; }
        public string Status { get; init; }     // "pending"|"processing"|"complete"|"failed"
        public int Step { get; init; }          // 1–5
    }
}
