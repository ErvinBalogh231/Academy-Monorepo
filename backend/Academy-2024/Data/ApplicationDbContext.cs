using Academy_2024.Models;
using Microsoft.EntityFrameworkCore;

namespace Academy_2024.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Badge> Badges { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Badge>().HasData(
                new Badge { Id = 1, Name = "Beginner", Description = "Completed the first lesson", Image = "assets/badges/beginner.svg" },
                new Badge { Id = 2, Name = "Backend", Description = "Built a working ASP.NET API", Image = "assets/badges/backend.svg" },
                new Badge { Id = 3, Name = "Frontend", Description = "Built a working Angular app", Image = "assets/badges/frontend.svg" });
        }
    }
}
