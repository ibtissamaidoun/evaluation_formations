using UserService.Models;
using UserService.Repositories;
using UserService.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text;
using UserService.Data;

namespace UserService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Ajouter la configuration CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularDevClient", policy =>
                {
                    policy.WithOrigins("http://localhost:4200")  // Remplace cette URL par celle de ton frontend en production
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Ajouter les services nécessaires à l'application
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Configurer Identity
            builder.Services.AddIdentityCore<User>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddSignInManager()
                .AddDefaultTokenProviders();

            // Ajouter les services de l'application
            builder.Services.AddScoped<IUserService, UserService.Services.UserService>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            // builder.Services.AddScoped<IEmailService, EmailService>(); // Assurez-vous d'ajouter le service d'email
            builder.Services.AddControllers();
            builder.Services.AddRazorPages();
            builder.Services.AddEndpointsApiExplorer();

            // Appliquer automatiquement les migrations
            var app = builder.Build();
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                db.Database.Migrate();
            }

            // Configuration du pipeline de requêtes HTTP
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseHttpsRedirection();

            // Mapping des contrôleurs et des pages Razor
            app.MapControllers();
            app.MapRazorPages();
            app.UseCors("AllowAngularDevClient");

            // Lancer l'application
            app.Run();
        }
    }
}