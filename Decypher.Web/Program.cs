using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Decypher.Web.Data;
using Decypher.Web.Models;
using Decypher.Web.Services;
using Decypher.Web.Services.AI;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Run as a Windows Service (no-op when started normally)
builder.Host.UseWindowsService(options => options.ServiceName = "Decypher");

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
    // Return 401 JSON for API routes instead of redirecting
    options.Events.OnRedirectToLogin = ctx =>
    {
        if (ctx.Request.Path.StartsWithSegments("/api"))
        {
            ctx.Response.StatusCode = 401;
            return Task.CompletedTask;
        }
        ctx.Response.Redirect(ctx.RedirectUri);
        return Task.CompletedTask;
    };
});

// Add JWT Bearer as default auth scheme for API endpoints.
// IMPORTANT: AddIdentity (above) sets DefaultAuthenticateScheme to the cookie scheme.
// We must explicitly override ALL three default schemes here, otherwise [Authorize] will
// use cookie auth, find no cookie in API requests, and return 401 → logout loop.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme             = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtKey = builder.Configuration["Jwt:Key"]
        ?? throw new InvalidOperationException("Jwt:Key is not configured");
    // MapInboundClaims = true ensures the JWT 'sub' claim is mapped to
    // ClaimTypes.NameIdentifier so UserManager.GetUserAsync(User) can find the user.
    options.MapInboundClaims = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer           = true,
        ValidateAudience         = true,
        ValidateLifetime         = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer              = builder.Configuration["Jwt:Issuer"],
        ValidAudience            = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
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
var allowedOrigins = builder.Configuration["AllowedOrigins"]?.Split(',') ?? new[] { "http://localhost:5000" };
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
            {
                var uri = new Uri(origin);
                return uri.Host == "localhost" || allowedOrigins.Contains(origin);
            })
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
builder.Services.AddScoped<IDocumentExtractorService, DocumentExtractorService>();
builder.Services.AddScoped<IPipelineBoardService, PipelineBoardService>();
builder.Services.AddScoped<ICandidatePortalService, CandidatePortalService>();
builder.Services.AddScoped<IInterviewSchedulerService, InterviewSchedulerService>();
builder.Services.AddScoped<IOfferManagementService, OfferManagementService>();
builder.Services.AddScoped<ITalentPoolService, TalentPoolService>();
builder.Services.AddScoped<IRequisitionService, RequisitionService>();
builder.Services.AddScoped<ISourceTrackingService, SourceTrackingService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IDuplicateDetectionService, DuplicateDetectionService>();
// ─── Budget Module ────────────────────────────────────────────
builder.Services.AddScoped<IBudgetService, BudgetService>();
builder.Services.AddScoped<IBudgetExportService, BudgetExportService>();
// ─────────────────────────────────────────────────────────────

// ── AI Services ──────────────────────────────────────────────
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
builder.Services.AddScoped<BehavioralAgentService>();
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
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    // Wait for PostgreSQL to be ready (important when running as a Windows Service,
    // since the DB service and app service may start in parallel)
    for (int attempt = 1; attempt <= 10; attempt++)
    {
        try
        {
            await context.Database.CanConnectAsync();
            Log.Information("Database connection established on attempt {Attempt}", attempt);
            break;
        }
        catch (Exception ex)
        {
            if (attempt == 10)
            {
                Log.Error(ex, "Could not connect to database after 10 attempts. Startup aborted.");
                throw;
            }
            Log.Warning("Database not ready (attempt {Attempt}/10), retrying in {Delay}s...", attempt, attempt * 3);
            await Task.Delay(TimeSpan.FromSeconds(attempt * 3));
        }
    }

    try
    {
        await context.Database.EnsureCreatedAsync();

        // Ensure new tables exist (safe to run on every startup)
        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""ImportJobs"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Feature"" text NOT NULL DEFAULT '',
                ""FileName"" text NOT NULL DEFAULT '',
                ""Status"" text NOT NULL DEFAULT 'Processing',
                ""TotalRows"" integer NOT NULL DEFAULT 0,
                ""ImportedRows"" integer NOT NULL DEFAULT 0,
                ""WarningRows"" integer NOT NULL DEFAULT 0,
                ""ErrorRows"" integer NOT NULL DEFAULT 0,
                ""ErrorReportJson"" text,
                ""ImportedById"" text,
                ""ImportedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""ScheduledAt"" timestamp with time zone,
                CONSTRAINT ""PK_ImportJobs"" PRIMARY KEY (""Id"")
            );");

        await context.Database.ExecuteSqlRawAsync(@"
            ALTER TABLE ""SLATrackings"" ADD COLUMN IF NOT EXISTS ""HoldDays"" integer NOT NULL DEFAULT 0;");

        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""RequisitionStatusHistories"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""RequirementId"" uuid NOT NULL,
                ""FromStatus"" text NOT NULL DEFAULT '',
                ""ToStatus"" text NOT NULL DEFAULT '',
                ""Reason"" text,
                ""ChangedById"" text,
                ""ChangedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text,
                ""UpdatedBy"" text,
                ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_RequisitionStatusHistories"" PRIMARY KEY (""Id"")
            );");

        await context.Database.ExecuteSqlRawAsync(@"
            ALTER TABLE ""Requirements"" ADD COLUMN IF NOT EXISTS ""HoldReason"" text;
            ALTER TABLE ""Requirements"" ADD COLUMN IF NOT EXISTS ""HoldStartDate"" timestamp with time zone;
            ALTER TABLE ""Requirements"" ADD COLUMN IF NOT EXISTS ""CancelReason"" text;
            ALTER TABLE ""Requirements"" ADD COLUMN IF NOT EXISTS ""RevisedClosureDate"" timestamp with time zone;");

        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""InternalJobPostings"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Title"" text NOT NULL DEFAULT '',
                ""Department"" text,
                ""Location"" text,
                ""EmploymentType"" text NOT NULL DEFAULT 'FullTime',
                ""PostingType"" text NOT NULL DEFAULT 'Internal',
                ""Description"" text,
                ""Requirements"" text,
                ""SalaryBandMin"" numeric,
                ""SalaryBandMax"" numeric,
                ""Currency"" text NOT NULL DEFAULT 'GBP',
                ""ShowSalary"" boolean NOT NULL DEFAULT false,
                ""PostedDate"" timestamp with time zone,
                ""ClosingDate"" timestamp with time zone,
                ""Status"" text NOT NULL DEFAULT 'Draft',
                ""LinkedRequisitionId"" uuid,
                ""Notes"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text,
                ""UpdatedBy"" text,
                ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_InternalJobPostings"" PRIMARY KEY (""Id"")
            );");

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

// Map API controllers (attribute routing) and MVC controllers
app.MapControllers();
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
