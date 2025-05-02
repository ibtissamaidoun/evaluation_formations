#pragma warning disable CA1050 // Declare types in namespaces
public class ResetPasswordRequest

{
     public string Email { get; set; } 
    public string Token { get; set; }
    public string NewPassword { get; set; }
}
