using Microsoft.EntityFrameworkCore;
using EvaluationService.Data;
using EvaluationService.Services;
using EvaluationService.Repositories;
using Microsoft.OpenApi.Models;
using Confluent.Kafka;
using EvaluationService.Configuration;


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
builder.Services.AddSingleton<KafkaEventPublisher>();


// 3. Ajouter les contrôleurs
builder.Services.AddControllers();
builder.Services.Configure<KafkaSettings>(builder.Configuration.GetSection("Kafka"));
// Configuration Kafka (à ajouter si absent)
builder.Services.AddSingleton<IProducer<Null, string>>(_ =>
{
    var config = new ProducerConfig
    {
        BootstrapServers = builder.Configuration["Kafka:BootstrapServers"],
        EnableIdempotence = true,
        MessageTimeoutMs = 5000,
        CompressionType = Confluent.Kafka.CompressionType.Snappy
    };

    return new ProducerBuilder<Null, string>(config).Build();
});

// Enregistrement du publisher (à ajouter si absent)

builder.Services.AddSingleton<KafkaEventPublisher>();

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
