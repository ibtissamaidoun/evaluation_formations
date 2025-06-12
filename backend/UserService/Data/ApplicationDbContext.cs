using Microsoft.EntityFrameworkCore;
using UserService.Models;

namespace UserService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Seed default roles
            modelBuilder.Entity<UserRole>().HasData(
                new UserRole { Id = Guid.Parse("8d04dce2-969a-435d-bba4-df3f325983dc"), Name = "Administrator", Description = "System administrator with full access" },
                new UserRole { Id = Guid.Parse("c37ba5f7-a8e7-4c5a-b7d8-f40e08e5f3c5"), Name = "Teacher", Description = "Teacher with access to courses and students" },
                new UserRole { Id = Guid.Parse("01b168fe-810b-432d-9010-233ba0b380e9"), Name = "Student", Description = "Student with limited access" }
            );
        }
    }
}
