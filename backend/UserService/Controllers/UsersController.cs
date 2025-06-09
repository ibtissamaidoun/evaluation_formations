using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserService.DTOs;
using UserService.Models;
using UserService.Services;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDto>> GetUserById(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<UserResponseDto>> CreateUser(UserCreateDto userDto)
        {
            try
            {
                var createdUser = await _userService.CreateUserAsync(userDto);
                return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserResponseDto>> UpdateUser(Guid id, UserUpdateDto userDto)
        {
            try
            {
                var updatedUser = await _userService.UpdateUserAsync(id, userDto);
                if (updatedUser == null)
                    return NotFound();

                return Ok(updatedUser);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/password")]
        public async Task<IActionResult> UpdatePassword(Guid id, UserPasswordUpdateDto passwordDto)
        {
            var result = await _userService.UpdateUserPasswordAsync(id, passwordDto);
            if (!result)
                return BadRequest("Current password is incorrect or user not found.");

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("roles")]
        public async Task<ActionResult<IEnumerable<UserRole>>> GetAllRoles()
        {
            var roles = await _userService.GetAllRolesAsync();
            return Ok(roles);
        }

        [HttpGet("roles/{id}")]
        public async Task<ActionResult<UserRole>> GetRoleById(Guid id)
        {
            var role = await _userService.GetRoleByIdAsync(id);
            if (role == null)
                return NotFound();

            return Ok(role);
        }

        [HttpPost("roles")]
        public async Task<ActionResult<UserRole>> CreateRole(UserRoleDto roleDto)
        {
            var createdRole = await _userService.CreateRoleAsync(roleDto);
            return CreatedAtAction(nameof(GetRoleById), new { id = createdRole.Id }, createdRole);
        }

        [HttpPut("roles/{id}")]
        public async Task<ActionResult<UserRole>> UpdateRole(Guid id, UserRoleDto roleDto)
        {
            var updatedRole = await _userService.UpdateRoleAsync(id, roleDto);
            if (updatedRole == null)
                return NotFound();

            return Ok(updatedRole);
        }

        [HttpDelete("roles/{id}")]
        public async Task<IActionResult> DeleteRole(Guid id)
        {
            var result = await _userService.DeleteRoleAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
