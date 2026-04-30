using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Decypher.Web.Models;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { error = "Email and password are required" });

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null || !user.IsActive)
            return Unauthorized(new { error = "Invalid credentials" });

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);
        if (!result.Succeeded)
            return Unauthorized(new { error = "Invalid credentials" });

        user.LastLoginAt = DateTime.UtcNow;
        await _userManager.UpdateAsync(user);

        return Ok(new { token = GenerateJwtToken(user), user = MapToCurrentUser(user) });
    }

    [HttpPost("guest")]
    public async Task<IActionResult> GuestLogin()
    {
        var guestUser = await _userManager.FindByEmailAsync("guest@decypher.app");
        if (guestUser == null)
            return StatusCode(503, new { error = "Guest account not available" });

        return Ok(new { token = GenerateJwtToken(guestUser), user = MapToCurrentUser(guestUser) });
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT key not configured")));

        var expiry = DateTime.UtcNow.AddMinutes(
            int.TryParse(_configuration["Jwt:ExpiryMinutes"], out var mins) ? mins : 1440);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("role", user.Role.ToString()),
            new Claim("tenantId", user.TenantId.ToString()),
            new Claim("fullName", user.FullName)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expiry,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static CurrentUserDto MapToCurrentUser(ApplicationUser user)
    {
        var accessMap = new Dictionary<UserRole, string[]>
        {
            [UserRole.SuperAdmin]  = ["*"],
            [UserRole.TenantAdmin] = ["dashboard", "candidates", "requirements", "vendors", "analytics", "settings", "budget"],
            [UserRole.TeamLead]    = ["dashboard", "candidates", "requirements", "vendors", "analytics"],
            [UserRole.Recruiter]   = ["dashboard", "candidates", "requirements"],
            [UserRole.Viewer]      = ["dashboard"]
        };

        return new CurrentUserDto
        {
            Id       = user.Id,
            FullName = user.FullName,
            Email    = user.Email!,
            Role     = user.Role.ToString(),
            Initials = user.Initials,
            Access   = accessMap.TryGetValue(user.Role, out var access) ? access : []
        };
    }
}

public record LoginRequest(string Email, string Password);

public record CurrentUserDto
{
    public string   Id       { get; init; } = "";
    public string   FullName { get; init; } = "";
    public string   Email    { get; init; } = "";
    public string   Role     { get; init; } = "";
    public string   Initials { get; init; } = "";
    public string[] Access   { get; init; } = [];
}
