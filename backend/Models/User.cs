namespace Backend.Models;
using Microsoft.AspNetCore.Identity;

using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; }
     public string?  PasswordResetToken { get; set; }
      public DateTime PasswordResetTokenExpiration { get; set; }
}
