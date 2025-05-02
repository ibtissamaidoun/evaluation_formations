using Backend.Models;
using Microsoft.AspNetCore.Identity;

public class UserService : IUserService
{
       private readonly UserManager<User> _userManager;

    public UserService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    // Générer un token de réinitialisation du mot de passe
    public async Task<string> GeneratePasswordResetTokenAsync(User user)
    {
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        return token;
    }

    // Réinitialiser le mot de passe
    public async Task<bool> ResetPasswordAsync(string email, string token, string newPassword)
{
    // Récupérer l'utilisateur par son email
    var user = await _userManager.FindByEmailAsync(email);

    if (user == null)
    {
        return false; 
    }
 token = System.Net.WebUtility.UrlDecode(token);

    // Réinitialiser le mot de passe avec le token et le nouveau mot de passe
    var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
    return result.Succeeded; // Retourne si l'opération a réussi ou non
}


    // Récupérer un utilisateur par email
    public async Task<User> GetUserByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }


}
