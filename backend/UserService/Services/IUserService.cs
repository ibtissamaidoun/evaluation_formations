using UserService.Models;
using UserService.DTOs;

namespace UserService.Services
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(UserDTO userDto);
        Task<User?> GetUserByIdAsync(string id);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> UpdateUserAsync(string id, UserDTO userDto);
        Task<bool> DeleteUserAsync(string id);
    }
} 