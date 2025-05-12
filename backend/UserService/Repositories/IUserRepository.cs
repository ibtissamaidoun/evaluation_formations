using UserService.Models;
using UserService.Services;

namespace UserService.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(string id);
        Task<bool> AddAsync(User user, string password);
        Task<bool> UpdateAsync(User user);
        Task<bool> DeleteAsync(string id);
    }
}
