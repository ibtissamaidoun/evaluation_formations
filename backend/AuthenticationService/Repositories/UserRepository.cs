using AuthenticationService.Data;
using AuthenticationService.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;




namespace AuthenticationService.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;



        public UserRepository(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task CreateUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }
        public async Task<User> GetUserByIdAsync(string userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
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
        


    }
}
