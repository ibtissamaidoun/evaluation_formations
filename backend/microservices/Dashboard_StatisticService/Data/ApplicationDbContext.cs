using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Dashboard_StatisticService.Models;  // Assure-toi que tu utilises le bon espace de noms
using Microsoft.AspNetCore.Identity;  // Si tu utilises IdentityUser

using Microsoft.EntityFrameworkCore;  // Pour utiliser UseNpgsql et Migrate

public class ApplicationDbContext : IdentityDbContext<User>  // Si tu utilises Identity
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    // Définir les DbSet pour chaque entité
    public DbSet<User> Users { get; set; }
    public DbSet<Etudiant> Etudiants { get; set; }
    public DbSet<Professeur> Professeurs { get; set; }
    public DbSet<CalendarEvent> CalendarEvents { get; set; }
   
    public DbSet<Evaluation> Evaluation { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Module> Module { get; set; }


    // Configure les relations entre les entités dans OnModelCreating si nécessaire
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);  // Appelle la méthode de la classe de base pour Identity
 // Configurez Professeur et Etudiant pour utiliser leurs propres tables
    modelBuilder.Entity<Professeur>().ToTable("Professeurs");
    modelBuilder.Entity<Etudiant>().ToTable("Etudiants");
        // Exemple de configuration d'entité spécifique
        //modelBuilder.Entity<Etudiant>().HasOne(e => e.User).WithOne().HasForeignKey<Etudiant>(e => e.User_ID);
    }
}
