using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserService.DTOs;
using UserService.Models;

namespace UserService.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponseDto>> GetAllUsersAsync();
        Task<UserResponseDto> GetUserByIdAsync(Guid id);
        Task<UserResponseDto> CreateUserAsync(UserCreateDto userDto);
        Task<UserResponseDto> UpdateUserAsync(Guid id, UserUpdateDto userDto);
        Task<bool> UpdateUserPasswordAsync(Guid id, UserPasswordUpdateDto passwordDto);
        Task<bool> DeleteUserAsync(Guid id);
        Task<IEnumerable<UserRole>> GetAllRolesAsync();
        Task<UserRole> GetRoleByIdAsync(Guid id);
        Task<UserRole> CreateRoleAsync(UserRoleDto roleDto);
        Task<UserRole> UpdateRoleAsync(Guid id, UserRoleDto roleDto);
        Task<bool> DeleteRoleAsync(Guid id);
    }
}
