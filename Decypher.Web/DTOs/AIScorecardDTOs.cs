namespace Decypher.Web.DTOs
{
    public class AIScorecardRequest
    {
        public string CvText { get; set; } = string.Empty;
        public string JdText { get; set; } = string.Empty;
        public Guid? CandidateId { get; set; }
        public Guid? JobId { get; set; }
    }

    public class AIScorecardResponse
    {
        public int OverallScore { get; set; }
        public int CvJdMatchScore { get; set; }
        public int CompetencyScore { get; set; }
        public string BiasRiskLevel { get; set; } = "Low";
        public string DropoutRiskLevel { get; set; } = "Low";
        public List<string> MatchedSkills { get; set; } = new();
        public List<string> MissingSkills { get; set; } = new();
        public List<string> BiasFlags { get; set; } = new();
        public string Explanation { get; set; } = string.Empty;
        public bool RequiresHumanReview { get; set; }
        public string HumanReviewReason { get; set; } = string.Empty;
        public double Confidence { get; set; }
        public object? Breakdown { get; set; }
        public string ModelVersion { get; set; } = string.Empty;
        public string PromptVersion { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
