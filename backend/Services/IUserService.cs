
using Backend.Models;

public interface IUserService

{
    Task<string> GeneratePasswordResetTokenAsync(User user);
    Task<bool> ResetPasswordAsync( string email,string token, string newPassword);
    Task<User> GetUserByEmailAsync(string email);
}
