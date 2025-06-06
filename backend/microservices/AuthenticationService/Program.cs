using AuthenticationService.Models;
using AuthenticationService.Repositories;
using AuthenticationService.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthenticationService.Data;

namespace AuthenticationService
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
            
            // Vérifier que les paramètres de configuration sont présents
            string? secretKey = builder.Configuration["Jwt:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("JWT SecretKey not configured.");
            }

            // Ajouter Identity pour la gestion des utilisateurs
            builder.Services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            // Configuration de l'authentification JWT
            builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                    };
                });

            builder.Services.AddAuthorization();

            // Ajouter les services de l'application
            builder.Services.AddScoped<AuthService>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IEmailService, EmailService>(); // Assurez-vous d'ajouter le service d'email
            builder.Services.AddControllers();
            builder.Services.AddRazorPages();

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





             // Créer un nouvel objet PasswordHasher
            var passwordHasher = new PasswordHasher<User>();  // Utiliser User ici

            // Mot de passe à hacher
            string password = "MotDePasseTest123";

            // Générer le mot de passe haché
            string hashedPassword = passwordHasher.HashPassword(null, password);  // Remplacez 'null' par l'utilisateur si nécessaire

            // Afficher le mot de passe haché dans la console
            Console.WriteLine("Mot de passe haché: " + hashedPassword);

            // Lancer l'application
            app.Run();
        }
    }
}
