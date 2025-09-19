using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using UserService.DTOs;
using UserService.Models;
using UserService.Repositories;
using UserService.Events;
using UserService.Kafka;

namespace UserService.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IKafkaProducerService _kafkaProducer;

        public UserService(IUserRepository userRepository, IKafkaProducerService kafkaProducer)
        {
            _userRepository = userRepository;
            _kafkaProducer = kafkaProducer;
        }

        public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return users.Select(MapUserToResponseDto);
        }

        public async Task<UserResponseDto> GetUserByIdAsync(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            return user == null ? null : MapUserToResponseDto(user);
        }

        public async Task<UserResponseDto> CreateUserAsync(UserCreateDto userDto)
        {
            if (await _userRepository.UserExistsAsync(userDto.Email))
                throw new InvalidOperationException($"User with email {userDto.Email} already exists.");

            var role = await _userRepository.GetRoleByIdAsync(userDto.RoleId);
            if (role == null)
                throw new InvalidOperationException($"Role with ID {userDto.RoleId} does not exist.");

            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                PhoneNumber = userDto.PhoneNumber,
                PasswordHash = HashPassword(userDto.Password),
                RoleId = userDto.RoleId,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            await _userRepository.CreateUserAsync(user);

            // Re-fetch with role info
            user = await _userRepository.GetUserByIdAsync(user.Id);
            var userResponse = MapUserToResponseDto(user);

            // 👉 Publier l’événement Kafka
            var userCreatedEvent = new UserCreatedEvent
            {
                UserId = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role?.Name ?? "Unknown",
                CreatedAt = user.CreatedAt
            };

            await _kafkaProducer.PublishAsync("user-events", userCreatedEvent, user.Id.ToString());

            return userResponse;
        }

        public async Task<UserResponseDto> UpdateUserAsync(Guid id, UserUpdateDto userDto)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
                return null;

            if (!string.IsNullOrWhiteSpace(userDto.FirstName))
                user.FirstName = userDto.FirstName;

            if (!string.IsNullOrWhiteSpace(userDto.LastName))
                user.LastName = userDto.LastName;

            if (!string.IsNullOrWhiteSpace(userDto.Email) && user.Email != userDto.Email)
            {
                if (await _userRepository.UserExistsAsync(userDto.Email))
                    throw new InvalidOperationException($"Email {userDto.Email} is already in use.");
                user.Email = userDto.Email;
            }

            if (!string.IsNullOrWhiteSpace(userDto.PhoneNumber))
                user.PhoneNumber = userDto.PhoneNumber;

            if (userDto.RoleId.HasValue && user.RoleId != userDto.RoleId.Value)
            {
                var role = await _userRepository.GetRoleByIdAsync(userDto.RoleId.Value);
                if (role == null)
                    throw new InvalidOperationException($"Role with ID {userDto.RoleId.Value} does not exist.");
                user.RoleId = userDto.RoleId.Value;
            }

            user.UpdatedAt = DateTime.UtcNow;
            await _userRepository.UpdateUserAsync(user);

            user = await _userRepository.GetUserByIdAsync(id);
            return MapUserToResponseDto(user);
        }

        public async Task<bool> UpdateUserPasswordAsync(Guid id, UserPasswordUpdateDto passwordDto)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
                return false;

            if (user.PasswordHash != HashPassword(passwordDto.CurrentPassword))
                return false;

            user.PasswordHash = HashPassword(passwordDto.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepository.UpdateUserAsync(user);
            return true;
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
                return false;

            await _userRepository.DeleteUserAsync(id);
            return true;
        }

        public async Task<IEnumerable<UserRole>> GetAllRolesAsync()
        {
            return await _userRepository.GetAllRolesAsync();
        }

        public async Task<UserRole> GetRoleByIdAsync(Guid id)
        {
            return await _userRepository.GetRoleByIdAsync(id);
        }

        public async Task<UserRole> CreateRoleAsync(UserRoleDto roleDto)
        {
            var role = new UserRole
            {
                Id = Guid.NewGuid(),
                Name = roleDto.Name,
                Description = roleDto.Description,
                CreatedAt = DateTime.UtcNow
            };

            await _userRepository.CreateRoleAsync(role);
            return role;
        }

        public async Task<UserRole> UpdateRoleAsync(Guid id, UserRoleDto roleDto)
        {
            var role = await _userRepository.GetRoleByIdAsync(id);
            if (role == null)
                return null;

            role.Name = roleDto.Name;
            role.Description = roleDto.Description;
            role.UpdatedAt = DateTime.UtcNow;

            await _userRepository.UpdateRoleAsync(role);
            return role;
        }

        public async Task<bool> DeleteRoleAsync(Guid id)
        {
            var role = await _userRepository.GetRoleByIdAsync(id);
            if (role == null)
                return false;

            await _userRepository.DeleteRoleAsync(id);
            return true;
        }

        private UserResponseDto MapUserToResponseDto(User user)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role?.Name,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                IsActive = user.IsActive
            };
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }
}

