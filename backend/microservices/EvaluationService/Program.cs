using Microsoft.EntityFrameworkCore;
using EvaluationService.Data;
using EvaluationService.Services;
using EvaluationService.Repositories;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. Ajouter DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<EspaceEvaluationService>();
builder.Services.AddScoped<EvaluationHoraireService>();
builder.Services.AddScoped<ModuleEvaluationService>();
builder.Services.AddScoped<EvaluationEtudiantService>();

// 2. Ajouter les services métiers
builder.Services.AddScoped<IEvaluationRepository, EvaluationRepository>();
builder.Services.AddScoped<IHoraireEvaluationRepository, HoraireEvaluationRepository>();
builder.Services.AddScoped<IModuleEvaluationRepository, ModuleEvaluationRepository>();
builder.Services.AddScoped<IEspaceEvaluationRepository, EspaceEvaluationRepository>();
builder.Services.AddScoped<IEvaluationEtudiantRepository, EvaluationEtudiantRepository>();



// 3. Ajouter les contrôleurs
builder.Services.AddControllers();

// 4. Ajouter Swagger pour la documentation de l'API
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Evaluation API", Version = "v1" });
});

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// 5. Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Permet l'accès à Swagger UI
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Evaluation API v1");
    });
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
