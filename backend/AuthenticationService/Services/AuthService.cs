using AuthenticationService.Models;
using AuthenticationService.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using IdentityUser = Microsoft.AspNetCore.Identity.IdentityUser;
using System.Net;
using System.Text.RegularExpressions;
using AuthenticationService.Data;
using Microsoft.EntityFrameworkCore;





namespace AuthenticationService.Services
{
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
         private readonly ApplicationDbContext _context;

        public AuthService(IUserRepository userRepository, IConfiguration configuration, UserManager<User> userManager, IEmailService emailService, ApplicationDbContext context)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
            _context = context;
            
        }

        // Méthode pour générer une clé secrète
        public static string GenerateSecretKey()
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                byte[] secretKey = new byte[32]; // 256 bits
                rng.GetBytes(secretKey);
                return Convert.ToBase64String(secretKey); // Retourne la clé sous forme de chaîne Base64
            }
        }

        // Hashage du mot de passe (méthode synchronique)
        public string HashPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
                throw new ArgumentException("Password cannot be null or empty", nameof(password));

            var passwordHasher = new PasswordHasher<User>();
            return passwordHasher.HashPassword(null, password);
        }

        // Validation de l'utilisateur avec email et mot de passe (méthode asynchrone correcte)
        public async Task<User?> ValidateUserAsync(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null) return null;

            // Maintenant, tu as l'utilisateur, et tu peux accéder au mot de passe haché
            var hashedPassword = user.PasswordHash;

            // Déclare la variable providedPassword (remplace par la valeur réelle)
            var providedPassword = password; // ou loginRequest.Password si tu utilises un objet de requête

            // Créer le PasswordHasher
            var passwordHasher = new PasswordHasher<User>();

            // Comparer le mot de passe fourni avec celui stocké
            var result = passwordHasher.VerifyHashedPassword(user, hashedPassword, providedPassword);



            if (result == PasswordVerificationResult.Failed)
                return null;

            return user;
        }

        // Génération du JWT (token)
        public string GenerateJwtToken(User user, int expirationMinutes)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            // Vérifier si le UserName est null, si oui, utiliser l'Email comme fallback
            string userName = user.UserName ?? user.Email;

            var claims = new[] 
            {
                new Claim(ClaimTypes.Name, userName),  // Utiliser userName ici
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            // Utiliser la clé secrète depuis la configuration (appsettings.json)
            string secretKey = _configuration["Jwt:SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey not configured.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Utilisation de la durée d'expiration dynamique
            var expirationDate = DateTime.Now.AddMinutes(expirationMinutes);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expirationDate,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // Forgot password
        // Forgot password
        public async Task<Tuple<string, string>> ForgotPasswordAsync(string email)
        {
            try
            {
                // Vérifier si l'email est vide
                if (string.IsNullOrWhiteSpace(email))
                    return new Tuple<string, string>(null, "L'email ne peut pas être vide.");

                // Vérifier le format de l'email
                var emailRegex = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
                if (!Regex.IsMatch(email, emailRegex))
                    return new Tuple<string, string>(null, "L'email fourni n'a pas un format valide.");

                // Vérifier si l'utilisateur existe
                var user = await _userRepository.GetUserByEmailAsync(email);
                if (user == null)
                    return new Tuple<string, string>(null, "L'email n'existe pas dans notre base de données.");

                // Générer un token GUID brut
                var token = Guid.NewGuid().ToString();

                // Hacher le token avant stockage
                string hashedToken = HashToken(token);

                // Créer et enregistrer le token
                var passwordResetToken = new PasswordResetToken
                {
                    UserId = user.Id.ToString(),
                    Token = hashedToken,
                    ExpirationDate = DateTime.UtcNow.AddHours(1)
                };

                await _context.PasswordResetTokens.AddAsync(passwordResetToken);
                await _context.SaveChangesAsync();

                // Générer le lien vers le frontend Angular
                string resetLink = $"{_configuration["AppSettings:FrontendUrl"]}/reset?token={WebUtility.UrlEncode(token)}";

                // Envoyer le lien par email
                await _emailService.SendEmailAsync(
                    user.Email,
                    "Réinitialisation de votre mot de passe",
                    $"<p>Cliquez sur ce lien pour réinitialiser votre mot de passe :</p><p><a href=\"{resetLink}\">{resetLink}</a></p>"
                );

                return new Tuple<string, string>(token, "Un lien de réinitialisation a été généré avec succès.");
            }
            catch (Exception ex)
            {
                return new Tuple<string, string>(null, $"Une erreur est survenue : {ex.Message}");
            }
        }


        private string HashToken(string token)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] tokenBytes = Encoding.UTF8.GetBytes(token);
                byte[] hashBytes = sha256.ComputeHash(tokenBytes);
                return Convert.ToBase64String(hashBytes);
            }
        }




        // Reset password
        public async Task<(bool Succeeded, string ErrorMessage)> ResetPasswordAsync(string email, string token, string newPassword)
        {
            // Validation de base
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(token) || string.IsNullOrWhiteSpace(newPassword))
                return (false, "Email, token ou mot de passe manquant.");

            // Rechercher l'utilisateur
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
                return (false, "Utilisateur non trouvé.");

            // Hacher le token fourni
            var hashedToken = HashToken(token);

            // Rechercher le token correspondant
            var resetToken = await _context.PasswordResetTokens
                .FirstOrDefaultAsync(t => t.UserId == user.Id.ToString() && t.Token == hashedToken);

            if (resetToken == null)
                return (false, "Token invalide.");
            if (resetToken.ExpirationDate < DateTime.UtcNow)
                return (false, "Token expiré.");

            // Hacher le nouveau mot de passe et le mettre à jour
            user.PasswordHash = HashPassword(newPassword);
            _context.Users.Update(user);

            // Supprimer le token utilisé
            _context.PasswordResetTokens.Remove(resetToken);

            await _context.SaveChangesAsync();
            return (true, null);
        }



    }
}
