using Decypher.Web.Data;
using Decypher.Web.Models;

namespace Decypher.Web.Services
{
    public interface IOfferManagementService
    {
        Task<Offer> CreateAsync(CreateOfferRequest req, Guid tenantId);
        Task<Offer?> GetAsync(Guid id, Guid tenantId);
        Task<Offer> SendAsync(Guid id, Guid tenantId);
        Task<Offer> UpdateStatusAsync(Guid id, string status, Guid tenantId);
        Task<List<Offer>> GetPendingAsync(Guid tenantId);
    }

    public class OfferManagementService : IOfferManagementService
    {
        private readonly ApplicationDbContext _db;
        private readonly INotificationService _notifications;

        public OfferManagementService(ApplicationDbContext db, INotificationService notifications)
        {
            _db = db;
            _notifications = notifications;
        }

        public async Task<Offer> CreateAsync(CreateOfferRequest req, Guid tenantId)
        {
            var offer = new Offer
            {
                CandidateId = req.CandidateId,
                JobId = req.JobId,
                Salary = req.Salary,
                Currency = req.Currency,
                StartDate = req.StartDate,
                ExpiryDate = req.ExpiryDate,
                Benefits = req.Benefits,
                Status = "Draft",
                TenantId = tenantId
            };

            _db.Offers.Add(offer);
            await _db.SaveChangesAsync();
            return offer;
        }

        public async Task<Offer?> GetAsync(Guid id, Guid tenantId)
        {
            return await Task.FromResult(_db.Offers.FirstOrDefault(o => o.Id == id && o.TenantId == tenantId));
        }

        public async Task<Offer> SendAsync(Guid id, Guid tenantId)
        {
            var offer = _db.Offers.First(o => o.Id == id && o.TenantId == tenantId);
            offer.Status = "Sent";

            var candidate = _db.Candidates.FirstOrDefault(c => c.Id == offer.CandidateId);
            if (candidate != null)
                await _notifications.SendEmailAsync(candidate.Email,
                    "You have received a job offer",
                    $"<p>Congratulations! Please review your offer of {offer.Currency} {offer.Salary:N0}.</p><p>Offer expires: {offer.ExpiryDate:d}</p>");

            await _db.SaveChangesAsync();
            return offer;
        }

        public async Task<Offer> UpdateStatusAsync(Guid id, string status, Guid tenantId)
        {
            var offer = _db.Offers.First(o => o.Id == id && o.TenantId == tenantId);
            offer.Status = status;
            await _db.SaveChangesAsync();
            return offer;
        }

        public async Task<List<Offer>> GetPendingAsync(Guid tenantId)
        {
            return await Task.FromResult(
                _db.Offers
                   .Where(o => o.TenantId == tenantId && o.Status == "Sent")
                   .ToList());
        }
    }
}
