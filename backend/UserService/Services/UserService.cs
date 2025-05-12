using Microsoft.AspNetCore.Identity;
using UserService.Models;
using UserService.DTOs;
using UserService.Repositories;

namespace UserService.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> CreateUserAsync(UserDTO userDto)
        {
            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Name = userDto.Name,
                Role = userDto.Role
            };

            var success = await _userRepository.AddAsync(user, userDto.Password);
            if (!success)
            {
                throw new Exception("Failed to create user");
            }

            return user;
        }

        public async Task<User?> GetUserByIdAsync(string id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            // Since we don't have a method for this in the repository yet,
            // we'll need to implement it or use a different approach
            throw new NotImplementedException("GetAllUsersAsync is not implemented yet");
        }

        public async Task<User?> UpdateUserAsync(string id, UserDTO userDto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            user.UserName = userDto.UserName;
            user.Email = userDto.Email;
            user.Name = userDto.Name;
            user.Role = userDto.Role;

            var success = await _userRepository.UpdateAsync(user);
            if (!success)
            {
                throw new Exception("Failed to update user");
            }

            return user;
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            return await _userRepository.DeleteAsync(id);
        }
    }
}
