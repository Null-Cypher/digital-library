using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OpenShelf.Api.Data;
using OpenShelf.Api.Dtos;
using OpenShelf.Api.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace OpenShelf.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IPasswordHasher<AppUser> _passwordHasher;

    public AuthController(
        AppDbContext context,
        IPasswordHasher<AppUser> passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] RegisterRequest request)
    {
        // 1. Chuan hoa email
        var email = request.Email.Trim();
        var normalizedEmail = email.ToUpperInvariant();

        // 2. Kiem tra email da ton tai
        var emailExists = await _context.Users
            .AnyAsync(u => u.NormalizedEmail == normalizedEmail);

        if (emailExists)
        {
            return Conflict(new
            {
                message = "Email already registered."
            });
        }

        // 3. Tao doi tuong user
        var user = new AppUser
        {
            Email = email,
            NormalizedEmail = normalizedEmail,
            CreatedAtUtc = DateTime.UtcNow
        };

        // 4. Bam mat khau truoc khi luu
        user.PasswordHash =
            _passwordHasher.HashPassword(
                user,
                request.Password
            );

        // 5. Luu vao SQL Server
        _context.Users.Add(user);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
            when (ex.InnerException is SqlException sql &&
                  (sql.Number == 2601 || sql.Number == 2627))
        {
            return Conflict(new
            {
                message = "Email already registered."
            });
        }

        // 6. Tra ve ket qua, khong tra PasswordHash
        return StatusCode(201, new
        {
            message = "Registration successful.",
            user = new
            {
                user.Id,
                user.Email,
                user.CreatedAtUtc
            }
        });
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] LoginRequest request)
    {
        // 1. Chuan hoa email
        var normalizedEmail =
            request.Email.Trim().ToUpperInvariant();

        // 2. Tim tai khoan trong SQL Server
        var user = await _context.Users
            .FirstOrDefaultAsync(
                u => u.NormalizedEmail == normalizedEmail);

        if (user == null)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        // 3. Xac minh mat khau da bam
        var verificationResult =
            _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                request.Password);

        if (verificationResult == PasswordVerificationResult.Failed)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        // 4. Cap nhat hash neu thuat toan yeu cau
        if (verificationResult ==
            PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.PasswordHash =
                _passwordHasher.HashPassword(user, request.Password);

            await _context.SaveChangesAsync();
        }

        // 5. Tao thong tin danh tinh cho phien dang nhap
        var claims = new List<Claim>
    {
        new Claim(
            ClaimTypes.NameIdentifier,
            user.Id.ToString()),

        new Claim(
            ClaimTypes.Email,
            user.Email),

        new Claim(
            ClaimTypes.Name,
            user.Email)
    };

        var identity = new ClaimsIdentity(
            claims,
            CookieAuthenticationDefaults.AuthenticationScheme);

        var principal = new ClaimsPrincipal(identity);

        // 6. Phat hanh cookie xac thuc
        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            principal,
            new AuthenticationProperties
            {
                IsPersistent = false
            });

        return Ok(new
        {
            message = "Login successful.",
            user = new
            {
                user.Id,
                user.Email
            }
        });
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        // Lay user ID tu cookie da xac thuc
        var userIdValue =
            User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdValue, out var userId))
        {
            return Unauthorized();
        }

        // Truy van lai user trong database
        var user = await _context.Users
            .AsNoTracking()
            .Where(u => u.Id == userId)
            .Select(u => new
            {
                u.Id,
                u.Email
            })
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(new { user });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);

        return Ok(new
        {
            message = "Logout successful."
        });
    }
}
