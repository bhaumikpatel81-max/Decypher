namespace Decypher.Web.Models
{
    public class CommMessage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Channel { get; set; } = string.Empty;        // Email | SMS | WhatsApp
        public string CandidateId { get; set; } = string.Empty;
        public string CandidateName { get; set; } = string.Empty;
        public string RecipientAddress { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public string Status { get; set; } = "Sent";               // Sent | Failed | Pending
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public Guid TenantId { get; set; }
    }

    public class BulkEmailRequest
    {
        public List<string> CandidateIds { get; set; } = new();
        public string TemplateId { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }

    public class BulkSmsRequest
    {
        public List<string> CandidateIds { get; set; } = new();
        public string Message { get; set; } = string.Empty;
    }

    public class BulkWhatsAppRequest
    {
        public List<string> CandidateIds { get; set; } = new();
        public string TemplateId { get; set; } = string.Empty;
        public Dictionary<string, string> Variables { get; set; } = new();
    }
}
