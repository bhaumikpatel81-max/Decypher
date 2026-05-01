namespace Decypher.Web.Models
{
    public class Requisition
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public int Headcount { get; set; } = 1;
        public decimal? BudgetMin { get; set; }
        public decimal? BudgetMax { get; set; }
        public string Priority { get; set; } = "Medium"; // Low | Medium | High | Critical
        public string Status { get; set; } = "Draft"; // Draft | Pending | Approved | Rejected | Filled
        public string Justification { get; set; } = string.Empty;
        public string RequestedById { get; set; } = string.Empty;
        public string? ApprovedById { get; set; }
        public string? RejectionReason { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ApprovedAt { get; set; }
        public Guid TenantId { get; set; }
    }

    public class CreateRequisitionRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public int Headcount { get; set; } = 1;
        public decimal? BudgetMin { get; set; }
        public decimal? BudgetMax { get; set; }
        public string Priority { get; set; } = "Medium";
        public string Justification { get; set; } = string.Empty;
    }

    public class RejectRequisitionRequest
    {
        public string Reason { get; set; } = string.Empty;
    }

    public class JobBroadcast
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid RequisitionId { get; set; }
        public List<string> Channels { get; set; } = new();
        public DateTime BroadcastAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }
    }

    public class BroadcastRequest
    {
        public List<string> Channels { get; set; } = new();
    }
}
