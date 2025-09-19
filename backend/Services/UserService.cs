using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;  // N'oublie pas d'ajouter cet using
using System;
using System.Linq;
using System.Threading.Tasks;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UserService> _logger;  // Déclaration du logger

    // Ajout du logger dans le constructeur
    public UserService(UserManager<User> userManager, ApplicationDbContext context, ILogger<UserService> logger)
    {
        _userManager = userManager;
        _context = context;
        _logger = logger;  // Initialisation du logger
    }

    // Générer un token de réinitialisation du mot de passe
    public async Task<string> GeneratePasswordResetTokenAsync(User user)
    {
        // Générer le token de réinitialisation
        _logger.LogInformation("[UserService] Génération du token pour {Email}.", user.Email);
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        // Définir l'expiration du token (ici, 1 heure après la génération)
        var expiration = DateTime.UtcNow.AddHours(1);  // 1 heure d'expiration

        // Stocke le token et son expiration dans l'utilisateur
        user.PasswordResetToken = token;
        user.PasswordResetTokenExpiration = expiration;

        // Sauvegarde les modifications dans la base de données
        await _context.SaveChangesAsync();

        _logger.LogInformation("[UserService] Token généré pour {Email} avec expiration à {ExpirationTime}.", user.Email, expiration);

        // Retourne le token généré
        return token;
    }

    // Réinitialiser le mot de passe
    public async Task<bool> ResetPasswordAsync(string email, string token, string newPassword)
    {
        _logger.LogInformation("[UserService] Début ResetPasswordAsync pour {Email}.", email);

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            _logger.LogWarning("[UserService] Utilisateur {Email} introuvable.", email);
            return false;
        }

        _logger.LogInformation("[UserService] Utilisateur {Email} trouvé. Tentative de reset du mot de passe...", email);

        // Vérification du token
        if (user.PasswordResetToken != token)
        {
            _logger.LogWarning("[UserService] Token invalide pour {Email}.", email);
            return false;
        }

        // Réinitialiser le mot de passe
        var result = await _userManager.ResetPasswordAsync(user, token, newPassword);

        if (result.Succeeded)
        {
            _logger.LogInformation("[UserService] Mot de passe réinitialisé avec succès pour {Email}.", email);
        }
        else
        {
            foreach (var error in result.Errors)
            {
                _logger.LogWarning("[UserService] Erreur lors de la réinitialisation du mot de passe pour {Email}: {Error}", email, error.Description);
            }
        }

        return result.Succeeded;
    }

    // Récupérer un utilisateur par email
    public async Task<User> GetUserByEmailAsync(string email)
    {
        _logger.LogInformation("[UserService] Recherche de l'utilisateur {Email}.", email);
        return await _userManager.FindByEmailAsync(email);
    }

    // Récupérer le token de réinitialisation stocké
    public async Task<string> GetStoredPasswordResetTokenAsync(string userId)
    {
        var user = await _context.Users
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            _logger.LogWarning("[UserService] Utilisateur avec ID {UserId} introuvable.", userId);
            return null;
        }

        return user.PasswordResetToken;
    }

    // Stocker le token de réinitialisation
    public async Task StorePasswordResetTokenAsync(string userId, string token)
    {
        var user = await _context.Users
            .Where(u => u.Id == userId)
            .FirstOrDefaultAsync();

        if (user != null)
        {
            user.PasswordResetToken = token;
            await _context.SaveChangesAsync();

            _logger.LogInformation("[UserService] Token de réinitialisation stocké pour {Email}.", user.Email);
        }
        else
        {
            _logger.LogWarning("[UserService] Utilisateur avec ID {UserId} introuvable pour stocker le token.", userId);
        }
    }
}
