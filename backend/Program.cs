using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Ajouter la chaîne de connexion à la base de données
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));  // Si tu utilises PostgreSQL
// Pour SQL Server, utilise : options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")).
builder.Services.Configure<SecurityStampValidatorOptions>(options =>
{
    options.ValidationInterval = TimeSpan.Zero;
});
// Ajouter Identity pour la gestion des utilisateurs
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    // Configurer les options de mot de passe (exigences)
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Ajouter les services personnalisés
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// Ajouter Razor Pages pour les pages Web
builder.Services.AddRazorPages();

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
// Construire l'application
var app = builder.Build();

//  Appliquer automatiquement les migrations (Ajout important ici)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

// Configurer le pipeline HTTP
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAllOrigins");  // Appliquer CORS
app.UseAuthentication();  // Authentification des utilisateurs
app.UseAuthorization();   // Autorisation

app.MapRazorPages();  // Si tu utilises des Razor Pages
app.MapControllers(); // Pour les APIs REST

app.Run();  // Lancer l'application
