using System.ComponentModel.DataAnnotations;

namespace OpenShelf.Api.Dtos;

public class RegisterRequest
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    [StringLength(256)]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    [StringLength(128, MinimumLength = 8,
        ErrorMessage = "Password must contain 8 to 128 characters.")]
    public string Password { get; set; } = string.Empty;
}
