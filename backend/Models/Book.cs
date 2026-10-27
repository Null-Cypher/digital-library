using System.ComponentModel.DataAnnotations;

namespace OpenShelf.Api.Models;

public class Book
{
    public int Id { get; set; }

    [Required]
    [MaxLength(250)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string Author { get; set; } = string.Empty;

    public int PublishYear { get; set; }

    [MaxLength(100)]
    public string Topic { get; set; } = string.Empty;
}
