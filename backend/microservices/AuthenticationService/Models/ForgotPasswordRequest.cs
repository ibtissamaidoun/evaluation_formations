using Microsoft.AspNetCore.Identity;

namespace AuthenticationService.Models
{

public class ForgotPasswordRequest
{
    public string Email { get; set; }
}
}