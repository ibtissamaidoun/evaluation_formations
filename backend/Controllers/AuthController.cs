using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly IUserService _userService;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IUserService userService, IEmailService emailService, IConfiguration configuration, ILogger<AuthController> logger, UserManager<User> userManager)
    {
        _userService = userService;
        _emailService = emailService;
        _configuration = configuration;
        _logger = logger;
        _userManager = userManager;
    }

    // Étape 1 : Demande de réinitialisation du mot de passe
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
    {
        _logger.LogInformation("Début ForgotPassword pour {Email}", model.Email);

        var user = await _userService.GetUserByEmailAsync(model.Email);
        if (user == null)
        {
            // Log si l'utilisateur n'est pas trouvé
            _logger.LogWarning("Aucun compte trouvé pour {Email}", model.Email);
            return Ok(new { message = "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé." });
        }

        // Générer le jeton de réinitialisation
        var token = await _userService.GeneratePasswordResetTokenAsync(user);
        _logger.LogInformation("Token généré pour {Email}: {Token}", model.Email, token);

        // Enregistrer le jeton dans la base de données
        await _userService.StorePasswordResetTokenAsync(user.Id, token);

        // Encoder l'URL de réinitialisation
        var resetLink = $"{_configuration["AppSettings:FrontendUrl"]}/reset-password?token={token}";
        _logger.LogInformation("Lien de réinitialisation généré : {ResetLink}", resetLink);

        // Envoi de l'email
        await _emailService.SendEmailAsync(
            user.Email,
            "Réinitialisation de votre mot de passe",
            $"Cliquez sur ce lien pour réinitialiser votre mot de passe : {resetLink}"
        );

        _logger.LogInformation("Email de réinitialisation envoyé à {Email}", user.Email);

        return Ok(new { message = "Un lien de réinitialisation a été envoyé à votre email." });
    }

    // Étape 2 : Réinitialisation du mot de passe
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest model)
    {
        _logger.LogInformation("Début ResetPassword pour {Email}", model.Email);

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            _logger.LogWarning("Utilisateur non trouvé pour {Email}", model.Email);
            return BadRequest(new { message = "Utilisateur non trouvé." });
        }

        // Vérification de l'expiration du token
        _logger.LogInformation("Vérification de l'expiration du token pour {Email}. Expiration du token : {ExpirationTime}", model.Email, user.PasswordResetTokenExpiration);
        if (user.PasswordResetTokenExpiration < DateTime.UtcNow)
        {
            _logger.LogWarning("Le token a expiré pour {Email}. Expiration du token : {ExpirationTime}", model.Email, user.PasswordResetTokenExpiration);
            return BadRequest(new { message = "Le token a expiré." });
        }

        // Vérification du token
        _logger.LogInformation("Vérification du token reçu pour {Email}. Token reçu : {ReceivedToken}, Token enregistré : {StoredToken}", model.Email, model.Token, user.PasswordResetToken);
        if (user.PasswordResetToken != model.Token)
        {
            _logger.LogWarning("Token invalide pour {Email}", model.Email);
            return BadRequest(new { message = "Token invalide." });
        }

        // Si le token est valide, réinitialiser le mot de passe
        var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
        if (result.Succeeded)
        {
            _logger.LogInformation("Réinitialisation réussie du mot de passe pour {Email}.", model.Email);
            return Ok(new { message = "Votre mot de passe a été réinitialisé avec succès." });
        }

        // Si l'appel échoue, log des erreurs
        foreach (var error in result.Errors)
        {
            _logger.LogWarning("Erreur lors de la réinitialisation du mot de passe pour {Email}: {Error}", model.Email, error.Description);
        }

        return BadRequest(new { message = "Erreur lors de la réinitialisation du mot de passe." });
    }
}
