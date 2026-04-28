using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Decypher.Web.Data;

namespace Decypher.Web.Services.AI
{
    public interface IAuditLogService
    {
        Task LogAIDecisionAsync(string eventType, string agentName, string entityId,
            object rawInput, object output, string modelVersion, string promptVersion,
            double confidence, bool requiredHumanReview, string tenantId, string actorId);
    }

    public class AuditLogService : IAuditLogService
    {
        private readonly ApplicationDbContext _db;
        private static readonly string[] PII_KEYS = { "email", "phone", "name", "address", "dob" };

        public AuditLogService(ApplicationDbContext db) { _db = db; }

        public async Task LogAIDecisionAsync(
            string eventType, string agentName, string entityId,
            object rawInput, object output,
            string modelVersion, string promptVersion,
            double confidence, bool requiredHumanReview,
            string tenantId, string actorId)
        {
            var redactedInput = RedactPII(rawInput);
            var inputHash  = ComputeHash(JsonSerializer.Serialize(redactedInput));
            var outputHash = ComputeHash(JsonSerializer.Serialize(output));

            var rowRaw = $"{eventType}{agentName}{entityId}{inputHash}{outputHash}{modelVersion}{promptVersion}{confidence}";
            var checksum = ComputeHash(rowRaw);

            _db.AIAuditLogs.Add(new Models.AIAuditLog
            {
                EventType = eventType,
                AgentName = agentName,
                EntityId = entityId,
                InputHash = inputHash,
                OutputHash = outputHash,
                ModelVersion = modelVersion,
                PromptVersion = promptVersion,
                Confidence = confidence,
                RequiredHumanReview = requiredHumanReview,
                ActorId = actorId,
                TenantId = tenantId,
                Checksum = checksum
            });

            await _db.SaveChangesAsync();
        }

        private static object RedactPII(object input)
        {
            if (input == null) return null;
            var json = JsonSerializer.Serialize(input);
            var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(json) ?? new();
            foreach (var key in PII_KEYS)
                if (dict.ContainsKey(key)) dict[key] = "[REDACTED]";
            return dict;
        }

        private static string ComputeHash(string input)
        {
            var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(input));
            return Convert.ToHexString(bytes).ToLower();
        }
    }
}
