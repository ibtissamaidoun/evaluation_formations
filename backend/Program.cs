using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

        // Ajouter la configuration CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins", policy =>
            {
                policy.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        


            // Ajout des services de base pour l'application, comme les contrôleurs et les pages Razor
            builder.Services.AddControllers();
            builder.Services.AddRazorPages();

            // Si vous souhaitez ajouter des services communs aux microservices
            // builder.Services.AddScoped<IMyService, MyService>(); 

            var app = builder.Build();

            // Configurer le pipeline HTTP
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors("AllowAngularDevClient");
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.MapControllers();
            app.MapRazorPages();

            app.Run();
        }
    }
}
