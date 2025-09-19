
using Microsoft.AspNetCore.Identity;


namespace AuthenticationService.Models
{
    public class User : IdentityUser
    {
        public new int Id { get; set; }

        //Ajoutez le mot clé "required" ici
        public required string Username { get; set; }

        // Ajoutez le mot clé "required" ici
        public new required string Email { get; set; }

        // Ajoutez le mot clé "required" ici
        public required string Address { get; set; }

        // Ajoutez le mot clé "required" ici
        public new required string PasswordHash { get; set; }

        // Ajoutez le mot clé "required" ici
        public required string Role { get; set; }

    }
}

