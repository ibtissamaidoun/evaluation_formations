using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserService.Models;

namespace UserService.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid id);
        Task<User> GetUserByEmailAsync(string email);
        Task<bool> UserExistsAsync(string email);
        Task<User> CreateUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(Guid id);
        Task<IEnumerable<UserRole>> GetAllRolesAsync();
        Task<UserRole> GetRoleByIdAsync(Guid id);
        Task<UserRole> CreateRoleAsync(UserRole role);
        Task UpdateRoleAsync(UserRole role);
        Task DeleteRoleAsync(Guid id);
    }
}
