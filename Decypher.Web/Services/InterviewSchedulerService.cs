using Decypher.Web.Data;
using Decypher.Web.Models;

namespace Decypher.Web.Services
{
    public interface IInterviewSchedulerService
    {
        Task<Interview> CreateAsync(CreateInterviewRequest req, Guid tenantId);
        Task<Interview?> GetAsync(Guid id, Guid tenantId);
        Task<Interview> UpdateAsync(Guid id, CreateInterviewRequest req, Guid tenantId);
        Task CancelAsync(Guid id, Guid tenantId);
        Task<InterviewFeedback> SubmitFeedbackAsync(Guid interviewId, string reviewerId, SubmitFeedbackRequest req, Guid tenantId);
        Task<List<InterviewSlot>> GetSlotsAsync(string recruiterId, Guid tenantId);
    }

    public class InterviewSchedulerService : IInterviewSchedulerService
    {
        private readonly ApplicationDbContext _db;
        private readonly INotificationService _notifications;

        public InterviewSchedulerService(ApplicationDbContext db, INotificationService notifications)
        {
            _db = db;
            _notifications = notifications;
        }

        public async Task<Interview> CreateAsync(CreateInterviewRequest req, Guid tenantId)
        {
            var interview = new Interview
            {
                CandidateId = req.CandidateId,
                JobId = req.JobId,
                RecruiterIds = req.RecruiterIds,
                ScheduledAt = req.ScheduledAt,
                Type = req.Type,
                MeetingLink = req.MeetingLink,
                Notes = req.Notes,
                TenantId = tenantId
            };

            _db.Interviews.Add(interview);
            await _db.SaveChangesAsync();

            var candidate = _db.Candidates.FirstOrDefault(c => c.Id == req.CandidateId);
            if (candidate != null)
                await _notifications.SendEmailAsync(candidate.Email,
                    "Interview Scheduled",
                    $"<p>Your interview has been scheduled for {req.ScheduledAt:f}.</p><p>Type: {req.Type}</p>{(string.IsNullOrEmpty(req.MeetingLink) ? "" : $"<p>Link: {req.MeetingLink}</p>")}");

            return interview;
        }

        public async Task<Interview?> GetAsync(Guid id, Guid tenantId)
        {
            return await Task.FromResult(_db.Interviews.FirstOrDefault(i => i.Id == id && i.TenantId == tenantId));
        }

        public async Task<Interview> UpdateAsync(Guid id, CreateInterviewRequest req, Guid tenantId)
        {
            var interview = _db.Interviews.First(i => i.Id == id && i.TenantId == tenantId);
            interview.ScheduledAt = req.ScheduledAt;
            interview.Type = req.Type;
            interview.MeetingLink = req.MeetingLink;
            interview.Notes = req.Notes;
            interview.RecruiterIds = req.RecruiterIds;
            interview.Status = "Rescheduled";
            await _db.SaveChangesAsync();
            return interview;
        }

        public async Task CancelAsync(Guid id, Guid tenantId)
        {
            var interview = _db.Interviews.First(i => i.Id == id && i.TenantId == tenantId);
            interview.Status = "Cancelled";
            await _db.SaveChangesAsync();
        }

        public async Task<InterviewFeedback> SubmitFeedbackAsync(Guid interviewId, string reviewerId, SubmitFeedbackRequest req, Guid tenantId)
        {
            var feedback = new InterviewFeedback
            {
                InterviewId = interviewId,
                ReviewerId = reviewerId,
                Rating = req.Rating,
                HireRecommendation = req.HireRecommendation,
                Notes = req.Notes,
                TenantId = tenantId
            };

            _db.InterviewFeedbacks.Add(feedback);
            await _db.SaveChangesAsync();
            return feedback;
        }

        public async Task<List<InterviewSlot>> GetSlotsAsync(string recruiterId, Guid tenantId)
        {
            return await Task.FromResult(
                _db.InterviewSlots
                   .Where(s => s.RecruiterId == recruiterId && s.TenantId == tenantId && !s.IsBooked && s.SlotStart > DateTime.UtcNow)
                   .OrderBy(s => s.SlotStart)
                   .ToList());
        }
    }
}
