using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Decypher.Web.Models
{
    public class VideoInterview
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CandidateId { get; set; }
        public string CandidateName { get; set; } = string.Empty;
        public string JobTitle { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public string Status { get; set; } = "Sent"; // Sent, Partial, Completed
        public DateTime? Deadline { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }

        [Column(TypeName = "jsonb")]
        public List<string> Questions { get; set; } = new();

        public ICollection<VideoResponse> Responses { get; set; } = new List<VideoResponse>();

        [NotMapped]
        public int QuestionCount => Questions.Count;
    }

    public class VideoResponse
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid VideoInterviewId { get; set; }
        public VideoInterview? VideoInterview { get; set; }
        public int QuestionIndex { get; set; }
        public string? VideoUrl { get; set; }
        public string? Transcript { get; set; }
        public string? Sentiment { get; set; }
        public int AiScore { get; set; }
        public string Duration { get; set; } = "0:00";
        public DateTime RecordedAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }
    }

    public record VideoLinkRequest(
        Guid CandidateId,
        string CandidateName,
        string JobTitle,
        List<string> Questions,
        DateTime? Deadline
    );
}
