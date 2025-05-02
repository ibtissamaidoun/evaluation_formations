using Microsoft.AspNetCore.Identity.EntityFrameworkCore;  
using Microsoft.EntityFrameworkCore;  
using Backend.Models;  

public class ApplicationDbContext : IdentityDbContext<User>
{
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)  // Appelle le constructeur de IdentityDbContext avec les options
    {
    }

   
}

