using AuthenticationService.Models;
using System.Threading.Tasks;

namespace AuthenticationService.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
        Task CreateUserAsync(User user);
        Task<bool> UserExistsAsync(string email);
        Task<User> GetUserByIdAsync(string userId);
        Task<bool> UpdateUserAsync(User user);
        Task<string> GeneratePasswordResetTokenAsync(User user);
        Task<bool> ResetPasswordAsync( string email,string token, string newPassword);
        
        
    }
}
