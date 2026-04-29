using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Decypher.Web.Data;
using Decypher.Web.Models;
using Decypher.Web.Services;
using Decypher.Web.Services.AI;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("logs/decypher-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllersWithViews()
    .AddControllersAsServices();

// Configure PostgreSQL with Supabase
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? Environment.GetEnvironmentVariable("DATABASE_URL");

if (!string.IsNullOrEmpty(connectionString))
{
    // Handle Supabase/Render connection string format (postgres://)
    if (connectionString.StartsWith("postgres://"))
    {
        connectionString = connectionString.Replace("postgres://", "");
        var parts = connectionString.Split('@');
        var userInfo = parts[0].Split(':');
        var hostInfo = parts[1].Split('/');
        var hostPort = hostInfo[0].Split(':');
        
        connectionString = $"Host={hostPort[0]};Port={hostPort[1]};Database={hostInfo[1]};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
    }
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.")));

// Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Password settings
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
    
    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;
    
    // User settings
    options.User.RequireUniqueEmail = true;
    options.SignIn.RequireConfirmedEmail = false; // Set to true in production with email service
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Configure cookie authentication
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromHours(24);
    options.LoginPath = "/Account/Login";
    options.LogoutPath = "/Account/Logout";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.SlidingExpiration = true;
});

// Add HttpContextAccessor for multi-tenancy
builder.Services.AddHttpContextAccessor();

// Add session
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// Configure CORS
var allowedOrigins = builder.Configuration["AllowedOrigins"]?.Split(',') ?? new[] { "http://localhost:4200" };
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Add application services
builder.Services.AddScoped<IVendorService, VendorService>();
builder.Services.AddScoped<ICandidateService, CandidateService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IAgenticAIService, AgenticAIService>();
builder.Services.AddHttpClient<IAIService, AIService>();
builder.Services.AddHttpClient();

// ── New ATS services ─────────────────────────────────────────
builder.Services.AddScoped<IResumeParserService, ResumeParserService>();
builder.Services.AddScoped<IPipelineBoardService, PipelineBoardService>();
builder.Services.AddScoped<ICandidatePortalService, CandidatePortalService>();
builder.Services.AddScoped<IInterviewSchedulerService, InterviewSchedulerService>();
builder.Services.AddScoped<IOfferManagementService, OfferManagementService>();
builder.Services.AddScoped<ITalentPoolService, TalentPoolService>();
builder.Services.AddScoped<IRequisitionService, RequisitionService>();
builder.Services.AddScoped<ISourceTrackingService, SourceTrackingService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
// ─────────────────────────────────────────────────────────────

// ── UC63 / UC64 AI Services ──────────────────────────────────
builder.Services.AddHttpClient("OpenAI", client =>
{
    client.BaseAddress = new Uri("https://api.openai.com/v1/");
    client.DefaultRequestHeaders.Authorization =
        new System.Net.Http.Headers.AuthenticationHeaderValue(
            "Bearer", builder.Configuration["OpenAI:ApiKey"]);
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddScoped<ParsingAgentService>();
builder.Services.AddScoped<MatchingAgentService>();
builder.Services.AddScoped<RankingAgentService>();
builder.Services.AddScoped<ExplanationAgentService>();
builder.Services.AddScoped<BiasDetectionAgentService>();
builder.Services.AddScoped<IMultiAgentOrchestratorService, MultiAgentOrchestratorService>();
builder.Services.AddScoped<IAuditLogService, AuditLogService>();
builder.Services.AddScoped<IJdGenerationService, JdGenerationService>();
// ─────────────────────────────────────────────────────────────

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Add response compression
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});

// Add response caching
builder.Services.AddResponseCaching();

// Health checks
builder.Services.AddHealthChecks();

var app = builder.Build();

// Ensure database is created and migrations are applied
using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        
        await context.Database.EnsureCreatedAsync();
        
        // Seed data
        await SeedData.Initialize(context, userManager, roleManager);
        
        Log.Information("Database initialized successfully");
    }
    catch (Exception ex)
    {
        Log.Error(ex, "An error occurred while initializing the database");
    }
}

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseResponseCompression();
app.UseResponseCaching();

app.UseRouting();

// Use CORS
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.UseSession();

// Multi-tenancy middleware
app.Use(async (context, next) =>
{
    if (context.User.Identity?.IsAuthenticated == true)
    {
        var userManager = context.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
        var user = await userManager.GetUserAsync(context.User);
        
        if (user != null)
        {
            var dbContext = context.RequestServices.GetRequiredService<ApplicationDbContext>();
            dbContext.SetCurrentTenant(user.TenantId);
            
            // Store in HttpContext for easy access
            context.Items["TenantId"] = user.TenantId;
            context.Items["UserRole"] = user.Role;
        }
    }
    
    await next();
});

// Map controllers
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Health check endpoint
app.MapHealthChecks("/health");
app.MapGet("/health/db", async (ApplicationDbContext db) =>
    await db.Database.CanConnectAsync()
        ? Results.Ok(new { status = "ok", database = "connected" })
        : Results.Problem("Database is not reachable"));

// Serve the Angular app from the same ASP.NET Core host/port.
app.MapFallbackToFile("index.html");

// Log startup
Log.Information("Decypher application started successfully");

app.Run();
