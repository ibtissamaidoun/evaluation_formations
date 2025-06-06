using AuthenticationService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using AuthenticationService.DTOs;
using AuthenticationService.Repositories;
using System.Net;
using System.Text.RegularExpressions;


namespace AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;


        public AuthController(AuthService authService, IEmailService emailService, IConfiguration configuration)
        {
            _authService = authService;
            _emailService = emailService;
            _configuration = configuration;
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _authService.ValidateUserAsync(loginDto.Email, loginDto.Password);
            if (user == null)
                return Unauthorized("Invalid credentials");

            // Vérifier si l'utilisateur a activé "Remember Me"
            var tokenExpiration = loginDto.RememberMe ? _configuration.GetValue<int>("Jwt:RememberMeExpirationMinutes") : _configuration.GetValue<int>("Jwt:TokenExpirationMinutes");

            // Générer un token JWT avec une expiration adaptée
            var token = _authService.GenerateJwtToken(user, tokenExpiration);

            // Retourner le token
            return Ok(new { Token = token });
        }

         // POST: api/Auth/forgot-password
        // Méthode pour demander la réinitialisation de mot de passe
        
        // POST: api/Auth/forgot-password
        // Méthode pour demander la réinitialisation de mot de passe
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto model)
        {
            try
            {
                // Vérifier si l'email est vide
                if (string.IsNullOrWhiteSpace(model.Email))
                {
                    return BadRequest(new { message = "L'email ne peut pas être vide." });
                }

                // Validation de l'email avec une expression régulière pour s'assurer qu'il a un format valide
                var emailRegex = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
                if (!Regex.IsMatch(model.Email, emailRegex))
                {
                    return BadRequest(new { message = "L'email fourni n'a pas un format valide." });
                }

                // Appeler le service pour demander la réinitialisation du mot de passe
                var (token, result) = await _authService.ForgotPasswordAsync(model.Email);

                // Vérifier si l'email existe dans la base de données
                if (result.Contains("n'existe pas"))
                {
                    return NotFound(new { message = result }); // Retourner une erreur 404 pour l'email non trouvé
                }

                // Si un lien de réinitialisation est envoyé
                return Ok(new { message = result, token = token }); // Retourner le message et le token
            }
            catch (Exception ex)
            {
                // En cas d'exception générale
                return StatusCode(500, new { message = $"Une erreur est survenue : {ex.Message}" });
            }
        }

        // POST: api/Auth/reset-password
        // Méthode pour réinitialiser le mot de passe
        // POST: api/Auth/reset-password
        // Méthode pour réinitialiser le mot de passe
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDto model)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Token) || string.IsNullOrWhiteSpace(model.NewPassword))
                {
                    return BadRequest(new { message = "Tous les champs sont requis." });
                }

                var (succeeded, errorMessage) = await _authService.ResetPasswordAsync(model.Email, model.Token, model.NewPassword);

                if (!succeeded)
                    return BadRequest(new { message = errorMessage });

                return Ok(new { message = "Le mot de passe a été réinitialisé avec succès." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Une erreur est survenue : {ex.Message}" });
            }
        }


    }
}
