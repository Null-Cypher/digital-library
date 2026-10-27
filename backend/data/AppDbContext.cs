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

    public DbSet<Book> Books => Set<Book>();
}
