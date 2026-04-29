namespace Decypher.Web.Models
{
    public class PipelineStage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public int Order { get; set; }
        public string Colour { get; set; } = "#6366f1";
        public Guid TenantId { get; set; }
    }

    public class CandidateStage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public Guid JobId { get; set; }
        public Guid StageId { get; set; }
        public DateTime MovedAt { get; set; } = DateTime.UtcNow;
        public string MovedByUserId { get; set; } = string.Empty;
        public Guid TenantId { get; set; }
    }

    public class MoveCandidateRequest
    {
        public Guid CandidateId { get; set; }
        public Guid JobId { get; set; }
        public Guid NewStageId { get; set; }
    }
}
