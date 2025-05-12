using UserService.Models;
using UserService.Services;
using UserService.Repositories;

namespace UserService.DTOs
{
    public class UserDTO
    {
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}