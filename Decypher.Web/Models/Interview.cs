namespace Decypher.Web.Models
{
    public class Interview
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public Guid JobId { get; set; }
        public List<string> RecruiterIds { get; set; } = new();
        public DateTime ScheduledAt { get; set; }
        public string Type { get; set; } = "Video"; // Phone | Video | Onsite
        public string MeetingLink { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public string Status { get; set; } = "Scheduled"; // Scheduled | Completed | Cancelled | Rescheduled
        public Guid TenantId { get; set; }
    }

    public class InterviewSlot
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string RecruiterId { get; set; } = string.Empty;
        public DateTime SlotStart { get; set; }
        public DateTime SlotEnd { get; set; }
        public bool IsBooked { get; set; }
        public Guid TenantId { get; set; }
    }

    public class InterviewFeedback
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid InterviewId { get; set; }
        public string ReviewerId { get; set; } = string.Empty;
        public int Rating { get; set; } // 1–5
        public bool HireRecommendation { get; set; }
        public string Notes { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }
    }

    public class CreateInterviewRequest
    {
        public Guid CandidateId { get; set; }
        public Guid JobId { get; set; }
        public List<string> RecruiterIds { get; set; } = new();
        public DateTime ScheduledAt { get; set; }
        public string Type { get; set; } = "Video";
        public string MeetingLink { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }

    public class SubmitFeedbackRequest
    {
        public int Rating { get; set; }
        public bool HireRecommendation { get; set; }
        public string Notes { get; set; } = string.Empty;
    }
}
