using Decypher.Web.Data;
using Decypher.Web.Models;

namespace Decypher.Web.Services
{
    public interface ICandidatePortalService
    {
        Task<List<object>> GetPublicJobsAsync();
        Task<CandidateApplication> ApplyAsync(PortalApplicationRequest req, Guid tenantId);
        Task<CandidateApplication?> GetStatusAsync(Guid applicationId);
        Task<List<CandidateApplication>> GetIncomingAsync(Guid tenantId);
    }

    public class CandidatePortalService : ICandidatePortalService
    {
        private readonly ApplicationDbContext _db;
        private readonly INotificationService _notifications;

        public CandidatePortalService(ApplicationDbContext db, INotificationService notifications)
        {
            _db = db;
            _notifications = notifications;
        }

        public async Task<List<object>> GetPublicJobsAsync()
        {
            var reqs = _db.Requirements
                          .Where(r => r.Status == "Open")
                          .Select(r => new { r.Id, Title = r.JobTitle, r.Department, r.Location, r.CreatedAt })
                          .ToList();
            return await Task.FromResult(reqs.Cast<object>().ToList());
        }

        public async Task<CandidateApplication> ApplyAsync(PortalApplicationRequest req, Guid tenantId)
        {
            var application = new CandidateApplication
            {
                JobId = req.JobId,
                ApplicantName = req.ApplicantName,
                ApplicantEmail = req.ApplicantEmail,
                CoverLetter = req.CoverLetter,
                Status = "Applied",
                TenantId = tenantId
            };

            _db.CandidateApplications.Add(application);
            await _db.SaveChangesAsync();

            await _notifications.SendEmailAsync(req.ApplicantEmail,
                "Application Received",
                $"<p>Hi {req.ApplicantName}, your application has been received. Your reference: <strong>{application.Id}</strong></p>");

            return application;
        }

        public async Task<CandidateApplication?> GetStatusAsync(Guid applicationId)
        {
            return await Task.FromResult(_db.CandidateApplications.FirstOrDefault(a => a.Id == applicationId));
        }

        public async Task<List<CandidateApplication>> GetIncomingAsync(Guid tenantId)
        {
            return await Task.FromResult(
                _db.CandidateApplications
                   .Where(a => a.TenantId == tenantId)
                   .OrderByDescending(a => a.AppliedAt)
                   .ToList());
        }
    }
}
