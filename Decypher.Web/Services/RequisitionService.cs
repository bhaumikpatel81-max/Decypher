using Decypher.Web.Data;
using Decypher.Web.Models;

namespace Decypher.Web.Services
{
    public interface IRequisitionService
    {
        Task<List<Requisition>> ListAsync(string? status, Guid tenantId);
        Task<Requisition> CreateAsync(CreateRequisitionRequest req, string requestedById, Guid tenantId);
        Task<Requisition> ApproveAsync(Guid id, string approvedById, Guid tenantId);
        Task<Requisition> RejectAsync(Guid id, string approvedById, string reason, Guid tenantId);
    }

    public class RequisitionService : IRequisitionService
    {
        private readonly ApplicationDbContext _db;
        private readonly INotificationService _notifications;

        public RequisitionService(ApplicationDbContext db, INotificationService notifications)
        {
            _db = db;
            _notifications = notifications;
        }

        public async Task<List<Requisition>> ListAsync(string? status, Guid tenantId)
        {
            var query = _db.Requisitions.Where(r => r.TenantId == tenantId);
            if (!string.IsNullOrEmpty(status))
                query = query.Where(r => r.Status == status);
            return await Task.FromResult(query.OrderByDescending(r => r.CreatedAt).ToList());
        }

        public async Task<Requisition> CreateAsync(CreateRequisitionRequest req, string requestedById, Guid tenantId)
        {
            var requisition = new Requisition
            {
                Title = req.Title,
                Department = req.Department,
                Headcount = req.Headcount,
                BudgetMin = req.BudgetMin,
                BudgetMax = req.BudgetMax,
                Priority = req.Priority,
                Justification = req.Justification,
                RequestedById = requestedById,
                Status = "Pending",
                TenantId = tenantId
            };
            _db.Requisitions.Add(requisition);
            await _db.SaveChangesAsync();
            return requisition;
        }

        public async Task<Requisition> ApproveAsync(Guid id, string approvedById, Guid tenantId)
        {
            var req = _db.Requisitions.First(r => r.Id == id && r.TenantId == tenantId);
            req.Status = "Approved";
            req.ApprovedById = approvedById;
            req.ApprovedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return req;
        }

        public async Task<Requisition> RejectAsync(Guid id, string approvedById, string reason, Guid tenantId)
        {
            var req = _db.Requisitions.First(r => r.Id == id && r.TenantId == tenantId);
            req.Status = "Rejected";
            req.ApprovedById = approvedById;
            req.RejectionReason = reason;
            await _db.SaveChangesAsync();
            return req;
        }
    }
}
