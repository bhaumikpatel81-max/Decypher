using System.Net;
using System.Net.Mail;

namespace Decypher.Web.Services
{
    public interface INotificationService
    {
        Task SendEmailAsync(string to, string subject, string htmlBody);
        Task SendSmsAsync(string to, string body);
    }

    public class NotificationService : INotificationService
    {
        private readonly IConfiguration _config;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(IConfiguration config, ILogger<NotificationService> logger)
        {
            _config = config;
            _logger = logger;
        }

        public async Task SendEmailAsync(string to, string subject, string htmlBody)
        {
            var provider = _config["Notifications:Provider"] ?? "Stub";

            if (provider == "Smtp")
            {
                var host = _config["Notifications:SmtpHost"] ?? "localhost";
                var port = int.Parse(_config["Notifications:SmtpPort"] ?? "587");
                var from = _config["Notifications:FromEmail"] ?? "noreply@decypher.ai";
                var fromName = _config["Notifications:FromName"] ?? "Decypher";

                using var client = new SmtpClient(host, port) { EnableSsl = true };
                var msg = new MailMessage(new MailAddress(from, fromName), new MailAddress(to))
                {
                    Subject = subject,
                    Body = htmlBody,
                    IsBodyHtml = true
                };
                await client.SendMailAsync(msg);
            }
            else
            {
                // Stub: log only
                _logger.LogInformation("EMAIL (stub) to={To} subject={Subject}", to, subject);
            }
        }

        public async Task SendSmsAsync(string to, string body)
        {
            // Twilio integration placeholder — stub logs for now
            _logger.LogInformation("SMS (stub) to={To} body={Body}", to, body);
            await Task.CompletedTask;
        }
    }
}
