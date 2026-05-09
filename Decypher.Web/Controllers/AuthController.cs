using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _db;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IConfiguration configuration,
        ApplicationDbContext db)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _db = db;
    }

    [HttpPost("login")]
    [EnableRateLimiting("auth")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { error = "Email and password are required" });

        try
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                return Unauthorized(new { error = "No account found with this email address." });
            if (!user.IsActive)
                return Unauthorized(new { error = "This account has been deactivated. Please contact your administrator." });

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);
            if (!result.Succeeded)
            {
                if (result.IsLockedOut)
                    return Unauthorized(new { error = "Account locked due to multiple failed attempts. Try again in a few minutes." });
                return Unauthorized(new { error = "Incorrect password. Please try again." });
            }

            user.LastLoginAt = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);

            var token   = GenerateJwtToken(user);
            var refresh = await CreateRefreshTokenAsync(user.Id, GetClientIp());
            return Ok(new { token, refreshToken = refresh.Token, user = MapToCurrentUser(user) });
        }
        catch (Exception ex) when (ex is Npgsql.NpgsqlException || ex is InvalidOperationException { InnerException: Npgsql.NpgsqlException })
        {
            return StatusCode(503, new { error = "Service temporarily unavailable. Please try again in a moment." });
        }
    }

    [HttpPost("guest")]
    [EnableRateLimiting("auth")]
    public async Task<IActionResult> GuestLogin()
    {
        var guestUser = await _userManager.FindByEmailAsync("guest@decypher.app");
        if (guestUser == null)
            return StatusCode(503, new { error = "Guest account not available" });

        var token   = GenerateJwtToken(guestUser);
        var refresh = await CreateRefreshTokenAsync(guestUser.Id, GetClientIp());
        return Ok(new { token, refreshToken = refresh.Token, user = MapToCurrentUser(guestUser) });
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
    {
        var stored = await _db.RefreshTokens.FirstOrDefaultAsync(r => r.Token == request.RefreshToken);
        if (stored == null || !stored.IsActive)
            return Unauthorized(new { error = "Invalid or expired refresh token." });

        var user = await _userManager.FindByIdAsync(stored.UserId);
        if (user == null || !user.IsActive)
            return Unauthorized(new { error = "User not found." });

        // Rotate: revoke old, issue new
        stored.IsRevoked = true;
        stored.RevokedAt = DateTime.UtcNow;
        var newRefresh = await CreateRefreshTokenAsync(user.Id, GetClientIp());
        stored.ReplacedByToken = newRefresh.Token;
        await _db.SaveChangesAsync();

        return Ok(new { token = GenerateJwtToken(user), refreshToken = newRefresh.Token, user = MapToCurrentUser(user) });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshRequest? request)
    {
        if (!string.IsNullOrEmpty(request?.RefreshToken))
        {
            var stored = await _db.RefreshTokens.FirstOrDefaultAsync(r => r.Token == request.RefreshToken);
            if (stored != null && !stored.IsRevoked)
            {
                stored.IsRevoked = true;
                stored.RevokedAt = DateTime.UtcNow;
                await _db.SaveChangesAsync();
            }
        }
        return Ok(new { message = "Logged out." });
    }

    private async Task<RefreshToken> CreateRefreshTokenAsync(string userId, string? ip)
    {
        var token = new RefreshToken
        {
            UserId       = userId,
            Token        = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            ExpiresAt    = DateTime.UtcNow.AddDays(30),
            CreatedByIp  = ip
        };
        _db.RefreshTokens.Add(token);
        await _db.SaveChangesAsync();
        return token;
    }

    private string? GetClientIp() => HttpContext.Connection.RemoteIpAddress?.ToString();

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
            [UserRole.TenantAdmin] = [
                "dashboard", "employee-directory", "org-chart", "document-management",
                "letters-certificates", "exit-management", "internal-job-postings",
                "attendance", "leave-management", "shift-management", "timesheet", "overtime",
                "payroll", "salary-structure", "tax-statutory", "expense-management", "payslip-portal",
                "compensation-planning", "benefits-admin", "salary-benchmarking", "bonus-incentives",
                "goals-okr", "performance-reviews", "feedback-360", "continuous-feedback",
                "learning-management", "training-calendar", "skill-gap", "certification-tracker",
                "onboarding", "communications",
                "candidates", "requirements", "vendors", "pipeline-board", "candidate-portal",
                "interview-scheduler", "offer-management", "source-tracking", "job-broadcasting",
                "video-interviews", "resume-parser", "ai-scorecard", "ai-features", "jd-generator",
                "careers-builder", "talent-community", "social-recruiting", "campus-connect",
                "employee-advocacy", "employer-reviews",
                "reports", "sla-dashboard", "budget", "analytics",
                "policy-management", "statutory-compliance", "compliance", "audit-trail",
                "import-center", "integrations", "settings",
                "helpdesk", "admin-travel", "portal", "workflow-builder"
            ],
            [UserRole.TeamLead]    = [
                "dashboard", "employee-directory", "org-chart", "attendance", "leave-management",
                "timesheet", "overtime", "payslip-portal",
                "goals-okr", "performance-reviews", "feedback-360", "continuous-feedback",
                "learning-management", "skill-gap", "certification-tracker",
                "candidates", "requirements", "pipeline-board", "interview-scheduler",
                "offer-management", "resume-parser",
                "helpdesk", "portal"
            ],
            [UserRole.Recruiter]   = [
                "dashboard", "candidates", "requirements", "pipeline-board",
                "candidate-portal", "interview-scheduler", "offer-management",
                "source-tracking", "job-broadcasting", "resume-parser",
                "talent-community", "campus-connect",
                "helpdesk", "portal"
            ],
            [UserRole.Viewer]      = ["dashboard", "portal", "helpdesk"]
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
public record RefreshRequest(string RefreshToken);

public record CurrentUserDto
{
    public string   Id       { get; init; } = "";
    public string   FullName { get; init; } = "";
    public string   Email    { get; init; } = "";
    public string   Role     { get; init; } = "";
    public string   Initials { get; init; } = "";
    public string[] Access   { get; init; } = [];
}
