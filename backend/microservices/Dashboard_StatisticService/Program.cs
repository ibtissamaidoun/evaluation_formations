using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Dashboard_StatisticService.Models;


var builder = WebApplication.CreateBuilder(args);

// Configuring DbContext for PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registering the repository and service
builder.Services.AddScoped<IProfessorDashboardRepository, ProfessorDashboardRepository>();
builder.Services.AddScoped<IStudentDashboardRepository, StudentDashboardRepository>();
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();

builder.Services.AddScoped<ProfessorDashboardService>();
builder.Services.AddScoped<DashboardService2>();
builder.Services.AddScoped<StudentDashboardService>();
builder.Services.AddScoped<NotificationService>();

// Add OpenAPI/Swagger for API documentation
builder.Services.AddOpenApi();

// Add Controllers
builder.Services.AddControllers();

var app = builder.Build();

// Apply migrations automatically at startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();  // Apply migrations to the database
}

// Configure the HTTP request pipeline
app.UseHttpsRedirection();
app.MapControllers();  // Register API endpoints

app.Run();
