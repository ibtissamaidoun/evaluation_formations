using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Backend.Models; // Adapter si nécessaire à ton projet

[ApiController]
[Route("api/test-user")]
public class TestUserController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public TestUserController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateTestUser()
    {
        var user = new User
        {
            
    Id = Guid.NewGuid().ToString(),
            UserName = "aidoun.ibtissam@etu.uae.ac.ma",
            Email = "aidoun.ibtissam@etu.uae.ac.ma",
            EmailConfirmed = true
        };

        var result = await _userManager.CreateAsync(user, "Test1234!");

        if (result.Succeeded)
        {
            return Ok(new { message = "Utilisateur créé avec succès." });
        }
        else
        {
            return BadRequest(result.Errors);
        }
    }
}
