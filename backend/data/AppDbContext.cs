using Microsoft.EntityFrameworkCore;
using OpenShelf.Api.Models;

namespace OpenShelf.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(
        DbContextOptions<AppDbContext> options
    ) : base(options)
    {
    }

    // Lab 2 - Book Management
    public DbSet<Book> Books => Set<Book>();

    // Lab 3 - User Authentication
    public DbSet<AppUser> Users => Set<AppUser>();

    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>()
            .HasIndex(u => u.NormalizedEmail)
            .IsUnique();
    }
}
