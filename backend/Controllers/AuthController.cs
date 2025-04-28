using Microsoft.AspNetCore.Mvc;
using System.Net;
using Backend.Models;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _configuration;

    public AuthController(IUserService userService, IEmailService emailService, IConfiguration configuration)
    {
        _userService = userService;
        _emailService = emailService;
        _configuration = configuration;
    }

    // Méthode pour demander la réinitialisation de mot de passe
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
    {
        var user = await _userService.GetUserByEmailAsync(model.Email);
        if (user == null)
        {
            return Ok(new { message = "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé." });
        }

        // Générer le token
        var token = await _userService.GeneratePasswordResetTokenAsync(user);

        // Encoder le token pour le rendre sûr dans l'URL
        token = WebUtility.UrlEncode(token);

        // Construire le lien de réinitialisation
        var resetLink = $"{_configuration["AppSettings:FrontendUrl"]}/reset-password?token={token}";

        // Envoyer l'email avec le lien
        await _emailService.SendEmailAsync(
            user.Email,
            "Réinitialisation de votre mot de passe",
            $"Cliquez sur ce lien pour réinitialiser votre mot de passe : {resetLink}"
        );

        return Ok(new { message = "Un lien de réinitialisation a été envoyé à votre email." });
    }

    // Méthode pour réinitialiser le mot de passe
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest model)
    {
        // Décoder le token récupéré du frontend
        var decodedToken = WebUtility.UrlDecode(model.Token);

        var result = await _userService.ResetPasswordAsync(model.Email, decodedToken, model.NewPassword);

        if (result)
        {
            return Ok(new { message = "Votre mot de passe a été réinitialisé avec succès." });
        }

        return BadRequest(new { message = "Le token est invalide ou a expiré." });
    }
}
