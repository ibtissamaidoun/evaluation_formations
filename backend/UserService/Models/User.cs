using Microsoft.AspNetCore.Identity;
using UserService.Services;
using UserService.Repositories;
namespace UserService.Models
{
    public class User : IdentityUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }  // Rôle de l'utilisateur
    }
}
