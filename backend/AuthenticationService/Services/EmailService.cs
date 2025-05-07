using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using AuthenticationService.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    // Injection de ILogger dans le constructeur
    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        var smtpServer = _configuration["EmailSettings:SmtpServer"];
        var username = _configuration["EmailSettings:Username"];
        var password = _configuration["EmailSettings:Password"];
        var fromAddress = _configuration["EmailSettings:FromAddress"];

        var client = new SmtpClient(smtpServer)
        {
            Port = 587,
            Credentials = new NetworkCredential(username, password),
            EnableSsl = true,
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(fromAddress),
            Subject = subject,
            Body = message,
            IsBodyHtml = true,
        };

        mailMessage.To.Add(toEmail);

        // Log de début de l'envoi
        _logger.LogInformation($"Début de l'envoi d'un e-mail à {toEmail} avec le sujet {subject}");

        try
        {
            await client.SendMailAsync(mailMessage);
            _logger.LogInformation($"E-mail envoyé avec succès à {toEmail}");
        }
        catch (SmtpException ex)
        {
            _logger.LogError($"Erreur SMTP lors de l'envoi de l'e-mail : {ex.Message}");
            // Ajouter plus de détails sur l'erreur
            if (ex.InnerException != null)
            {
                _logger.LogError($"Détails internes : {ex.InnerException.Message}");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"Erreur générale lors de l'envoi de l'e-mail : {ex.Message}");
        }
    }
}

