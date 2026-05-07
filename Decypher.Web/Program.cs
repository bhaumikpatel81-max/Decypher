using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.RateLimiting;
using Decypher.Web.Data;
using Decypher.Web.Models;
using Decypher.Web.Services;
using Decypher.Web.Services.AI;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// ── Startup validation: fail fast if required configuration is absent ──────────
var startupErrors = new List<string>();
if (string.IsNullOrWhiteSpace(builder.Configuration["Jwt:Key"]) || builder.Configuration["Jwt:Key"]!.Length < 32)
    startupErrors.Add("Jwt:Key must be set to a string of at least 32 characters.");
if (string.IsNullOrWhiteSpace(builder.Configuration.GetConnectionString("DefaultConnection"))
    && string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("DATABASE_URL")))
    startupErrors.Add("A database connection string must be configured via ConnectionStrings:DefaultConnection or DATABASE_URL.");
if (startupErrors.Count > 0)
    throw new InvalidOperationException("Startup configuration errors:\n" + string.Join("\n", startupErrors));

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
// In development, allow localhost. In production, only explicitly listed origins are permitted.
var allowedOrigins = builder.Configuration["AllowedOrigins"]
    ?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
            {
                if (builder.Environment.IsDevelopment())
                    return new Uri(origin).Host == "localhost";
                return allowedOrigins.Contains(origin, StringComparer.OrdinalIgnoreCase);
            })
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// ── Rate limiting ─────────────────────────────────────────────────────────────
builder.Services.AddRateLimiter(opts =>
{
    // Auth endpoints: 10 attempts per minute per IP
    opts.AddFixedWindowLimiter("auth", o =>
    {
        o.Window           = TimeSpan.FromMinutes(1);
        o.PermitLimit      = 10;
        o.QueueLimit       = 0;
        o.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
    // AI endpoints: 20 requests per minute per IP
    opts.AddFixedWindowLimiter("ai", o =>
    {
        o.Window           = TimeSpan.FromMinutes(1);
        o.PermitLimit      = 20;
        o.QueueLimit       = 5;
        o.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
    opts.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
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

// ── HR Module Services ────────────────────────────────────────
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<ILetterService, LetterService>();
builder.Services.AddScoped<IExitService, ExitService>();
// Attendance
builder.Services.AddScoped<ILeaveService, LeaveService>();
builder.Services.AddScoped<IAttendanceService, AttendanceService>();
builder.Services.AddScoped<IShiftService, ShiftService>();
builder.Services.AddScoped<ITimesheetService, TimesheetService>();
builder.Services.AddScoped<IOvertimeService, OvertimeService>();
// Payroll
builder.Services.AddScoped<ISalaryService, SalaryService>();
builder.Services.AddScoped<IPayrollRunService, PayrollRunService>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<ICompensationService, CompensationService>();
builder.Services.AddScoped<ITaxService, TaxService>();
// Performance
builder.Services.AddScoped<IGoalService, GoalService>();
builder.Services.AddScoped<IReviewCycleService, ReviewCycleService>();
builder.Services.AddScoped<IPerformanceReviewService, PerformanceReviewService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
// Learning
builder.Services.AddScoped<ILearningService, LearningService>();
builder.Services.AddScoped<ITrainingService, TrainingService>();
builder.Services.AddScoped<ISkillService, SkillService>();
// Branding
builder.Services.AddScoped<IEmployerReviewService, EmployerReviewService>();
builder.Services.AddScoped<ITalentCommunityService, TalentCommunityService>();
builder.Services.AddScoped<ICareerPageService, CareerPageService>();
builder.Services.AddScoped<ICampusService, CampusService>();
// Compliance
builder.Services.AddScoped<IPolicyService, PolicyService>();
builder.Services.AddScoped<IStatutoryService, StatutoryService>();
builder.Services.AddScoped<IIntegrationService, IntegrationService>();
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

        // ─── HR MODULE TABLES ─────────────────────────────────────────────
        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""Employees"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeCode"" text NOT NULL DEFAULT '',
                ""FirstName"" text NOT NULL DEFAULT '',
                ""LastName"" text NOT NULL DEFAULT '',
                ""Email"" text NOT NULL DEFAULT '',
                ""Phone"" text,
                ""Department"" text,
                ""Designation"" text,
                ""Location"" text,
                ""Gender"" text NOT NULL DEFAULT 'Other',
                ""DateOfBirth"" timestamp with time zone,
                ""DateOfJoining"" timestamp with time zone NOT NULL DEFAULT now(),
                ""DateOfLeaving"" timestamp with time zone,
                ""EmploymentType"" text NOT NULL DEFAULT 'FullTime',
                ""Status"" text NOT NULL DEFAULT 'Active',
                ""ManagerId"" uuid,
                ""Address"" text,
                ""ProfilePictureUrl"" text,
                ""PAN"" text,
                ""UAN"" text,
                ""ESIC"" text,
                ""BankName"" text,
                ""BankAccountNumber"" text,
                ""IFSC"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text,
                ""UpdatedBy"" text,
                ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_Employees"" PRIMARY KEY (""Id"")
            );
            CREATE INDEX IF NOT EXISTS ""IX_Employees_TenantId"" ON ""Employees""(""TenantId"");
            CREATE UNIQUE INDEX IF NOT EXISTS ""IX_Employees_TenantId_Code"" ON ""Employees""(""TenantId"", ""EmployeeCode"");");

        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""LeaveTypes"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Name"" text NOT NULL DEFAULT '',
                ""Description"" text,
                ""MaxDaysPerYear"" integer NOT NULL DEFAULT 12,
                ""CarryForwardAllowed"" boolean NOT NULL DEFAULT false,
                ""MaxCarryForwardDays"" integer NOT NULL DEFAULT 0,
                ""IsHalfDayAllowed"" boolean NOT NULL DEFAULT true,
                ""RequiresDocuments"" boolean NOT NULL DEFAULT false,
                ""IsActive"" boolean NOT NULL DEFAULT true,
                ""Color"" text NOT NULL DEFAULT '#6b4df0',
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_LeaveTypes"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""LeaveBalances"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""LeaveTypeId"" uuid NOT NULL,
                ""Year"" integer NOT NULL DEFAULT 2025,
                ""Allocated"" numeric NOT NULL DEFAULT 0,
                ""Used"" numeric NOT NULL DEFAULT 0,
                ""Pending"" numeric NOT NULL DEFAULT 0,
                ""CarriedForward"" numeric NOT NULL DEFAULT 0,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_LeaveBalances"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""LeaveRequests"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""LeaveTypeId"" uuid NOT NULL,
                ""StartDate"" timestamp with time zone NOT NULL,
                ""EndDate"" timestamp with time zone NOT NULL,
                ""Days"" numeric NOT NULL DEFAULT 0,
                ""IsHalfDay"" boolean NOT NULL DEFAULT false,
                ""HalfDayPeriod"" text NOT NULL DEFAULT '',
                ""Reason"" text,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""ApprovedById"" text,
                ""ApprovedAt"" timestamp with time zone,
                ""ApproverComments"" text,
                ""DocumentUrl"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_LeaveRequests"" PRIMARY KEY (""Id"")
            );");

        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""AttendancePolicies"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Name"" text NOT NULL DEFAULT 'Default Policy',
                ""ShiftStartTime"" interval NOT NULL DEFAULT '09:00:00',
                ""ShiftEndTime"" interval NOT NULL DEFAULT '18:00:00',
                ""GraceMinutes"" integer NOT NULL DEFAULT 15,
                ""RequiredHoursPerDay"" double precision NOT NULL DEFAULT 8,
                ""GeoFenceRadiusMeters"" double precision NOT NULL DEFAULT 200,
                ""GeoFenceEnabled"" boolean NOT NULL DEFAULT false,
                ""BiometricEnabled"" boolean NOT NULL DEFAULT false,
                ""IsDefault"" boolean NOT NULL DEFAULT true,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_AttendancePolicies"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""AttendanceRecords"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""Date"" timestamp with time zone NOT NULL,
                ""PunchIn"" timestamp with time zone,
                ""PunchOut"" timestamp with time zone,
                ""Status"" text NOT NULL DEFAULT 'Absent',
                ""PunchInMethod"" text NOT NULL DEFAULT 'Manual',
                ""InLatitude"" double precision,
                ""InLongitude"" double precision,
                ""OutLatitude"" double precision,
                ""OutLongitude"" double precision,
                ""WithinGeoFence"" boolean NOT NULL DEFAULT true,
                ""InAddress"" text,
                ""OutAddress"" text,
                ""DoorAccessGranted"" boolean NOT NULL DEFAULT false,
                ""Notes"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_AttendanceRecords"" PRIMARY KEY (""Id"")
            );
            CREATE INDEX IF NOT EXISTS ""IX_AttendanceRecords_TenantId_EmpDate"" ON ""AttendanceRecords""(""TenantId"", ""EmployeeId"", ""Date"");
            CREATE TABLE IF NOT EXISTS ""ShiftDefinitions"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Name"" text NOT NULL DEFAULT '',
                ""StartTime"" interval NOT NULL,
                ""EndTime"" interval NOT NULL,
                ""WorkingHours"" double precision NOT NULL DEFAULT 8,
                ""IsNightShift"" boolean NOT NULL DEFAULT false,
                ""Color"" text NOT NULL DEFAULT '#6b4df0',
                ""IsActive"" boolean NOT NULL DEFAULT true,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_ShiftDefinitions"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""EmployeeShifts"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""ShiftDefinitionId"" uuid NOT NULL,
                ""EffectiveFrom"" timestamp with time zone NOT NULL,
                ""EffectiveTo"" timestamp with time zone,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_EmployeeShifts"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""TimesheetEntries"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""Date"" timestamp with time zone NOT NULL,
                ""ProjectCode"" text,
                ""TaskDescription"" text,
                ""HoursWorked"" double precision NOT NULL DEFAULT 0,
                ""IsBillable"" boolean NOT NULL DEFAULT true,
                ""Status"" text NOT NULL DEFAULT 'Draft',
                ""SubmittedById"" text,
                ""SubmittedAt"" timestamp with time zone,
                ""ApprovedById"" text,
                ""ApprovedAt"" timestamp with time zone,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_TimesheetEntries"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""OvertimeRequests"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""Date"" timestamp with time zone NOT NULL,
                ""StartTime"" interval NOT NULL,
                ""EndTime"" interval NOT NULL,
                ""Hours"" double precision NOT NULL DEFAULT 0,
                ""Reason"" text,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""ApprovedById"" text,
                ""ApprovedAt"" timestamp with time zone,
                ""CompensationType"" text NOT NULL DEFAULT 'Pay',
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_OvertimeRequests"" PRIMARY KEY (""Id"")
            );");

        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""SalaryComponents"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Name"" text NOT NULL DEFAULT '',
                ""ComponentCode"" text NOT NULL DEFAULT '',
                ""Type"" text NOT NULL DEFAULT 'Earning',
                ""IsFixed"" boolean NOT NULL DEFAULT true,
                ""FixedAmount"" numeric,
                ""PercentageOfBasic"" numeric,
                ""IsTaxable"" boolean NOT NULL DEFAULT true,
                ""IsActive"" boolean NOT NULL DEFAULT true,
                ""DisplayOrder"" integer NOT NULL DEFAULT 0,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_SalaryComponents"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""EmployeeSalaries"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""BasicSalary"" numeric NOT NULL DEFAULT 0,
                ""HRA"" numeric NOT NULL DEFAULT 0,
                ""SpecialAllowance"" numeric NOT NULL DEFAULT 0,
                ""ConveyanceAllowance"" numeric NOT NULL DEFAULT 0,
                ""MedicalAllowance"" numeric NOT NULL DEFAULT 0,
                ""OtherAllowances"" numeric NOT NULL DEFAULT 0,
                ""EmployeePF"" numeric NOT NULL DEFAULT 0,
                ""EmployerPF"" numeric NOT NULL DEFAULT 0,
                ""EmployeeESIC"" numeric NOT NULL DEFAULT 0,
                ""EmployerESIC"" numeric NOT NULL DEFAULT 0,
                ""ProfessionalTax"" numeric NOT NULL DEFAULT 0,
                ""IncomeTax"" numeric NOT NULL DEFAULT 0,
                ""TotalCTC"" numeric NOT NULL DEFAULT 0,
                ""EffectiveFrom"" timestamp with time zone NOT NULL DEFAULT now(),
                ""EffectiveTo"" timestamp with time zone,
                ""IsActive"" boolean NOT NULL DEFAULT true,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_EmployeeSalaries"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""PayrollRuns"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Month"" integer NOT NULL,
                ""Year"" integer NOT NULL,
                ""Status"" text NOT NULL DEFAULT 'Draft',
                ""RunDate"" timestamp with time zone,
                ""DisbursementDate"" timestamp with time zone,
                ""TotalGross"" numeric NOT NULL DEFAULT 0,
                ""TotalDeductions"" numeric NOT NULL DEFAULT 0,
                ""TotalNet"" numeric NOT NULL DEFAULT 0,
                ""EmployeeCount"" integer NOT NULL DEFAULT 0,
                ""RunById"" text,
                ""ApprovedById"" text,
                ""ApprovedAt"" timestamp with time zone,
                ""Notes"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_PayrollRuns"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""Payslips"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""PayrollRunId"" uuid NOT NULL,
                ""Month"" integer NOT NULL,
                ""Year"" integer NOT NULL,
                ""BasicSalary"" numeric NOT NULL DEFAULT 0,
                ""HRA"" numeric NOT NULL DEFAULT 0,
                ""SpecialAllowance"" numeric NOT NULL DEFAULT 0,
                ""ConveyanceAllowance"" numeric NOT NULL DEFAULT 0,
                ""MedicalAllowance"" numeric NOT NULL DEFAULT 0,
                ""OtherAllowances"" numeric NOT NULL DEFAULT 0,
                ""OvertimePay"" numeric NOT NULL DEFAULT 0,
                ""Bonus"" numeric NOT NULL DEFAULT 0,
                ""GrossPay"" numeric NOT NULL DEFAULT 0,
                ""EmployeePF"" numeric NOT NULL DEFAULT 0,
                ""EmployeeESIC"" numeric NOT NULL DEFAULT 0,
                ""ProfessionalTax"" numeric NOT NULL DEFAULT 0,
                ""IncomeTaxTDS"" numeric NOT NULL DEFAULT 0,
                ""LoanDeduction"" numeric NOT NULL DEFAULT 0,
                ""OtherDeductions"" numeric NOT NULL DEFAULT 0,
                ""TotalDeductions"" numeric NOT NULL DEFAULT 0,
                ""NetPay"" numeric NOT NULL DEFAULT 0,
                ""WorkingDays"" integer NOT NULL DEFAULT 0,
                ""PresentDays"" integer NOT NULL DEFAULT 0,
                ""LeaveDays"" integer NOT NULL DEFAULT 0,
                ""AbsentDays"" integer NOT NULL DEFAULT 0,
                ""Status"" text NOT NULL DEFAULT 'Generated',
                ""PayslipUrl"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_Payslips"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""TaxDeclarations"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""FinancialYear"" text NOT NULL DEFAULT '',
                ""TaxRegime"" text NOT NULL DEFAULT 'New',
                ""EPF"" numeric NOT NULL DEFAULT 0, ""PPF"" numeric NOT NULL DEFAULT 0,
                ""LIC"" numeric NOT NULL DEFAULT 0, ""ELSS"" numeric NOT NULL DEFAULT 0,
                ""HomeLoanPrincipal"" numeric NOT NULL DEFAULT 0, ""OtherSection80C"" numeric NOT NULL DEFAULT 0,
                ""HRAExemption"" numeric NOT NULL DEFAULT 0, ""LTAExemption"" numeric NOT NULL DEFAULT 0,
                ""MedicalInsurance80D"" numeric NOT NULL DEFAULT 0, ""HomeLoanInterest"" numeric NOT NULL DEFAULT 0,
                ""NPS80CCD"" numeric NOT NULL DEFAULT 0,
                ""TotalDeductions"" numeric NOT NULL DEFAULT 0,
                ""TaxableIncome"" numeric NOT NULL DEFAULT 0,
                ""EstimatedTax"" numeric NOT NULL DEFAULT 0,
                ""TDSDeducted"" numeric NOT NULL DEFAULT 0,
                ""Status"" text NOT NULL DEFAULT 'Draft',
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_TaxDeclarations"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""StatutoryFilings"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""FilingType"" text NOT NULL DEFAULT '',
                ""Period"" text NOT NULL DEFAULT '',
                ""DueDate"" timestamp with time zone NOT NULL,
                ""FiledDate"" timestamp with time zone,
                ""Amount"" numeric NOT NULL DEFAULT 0,
                ""PenaltyAmount"" numeric NOT NULL DEFAULT 0,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""AcknowledgementNo"" text,
                ""DocumentUrl"" text,
                ""FiledById"" text,
                ""Notes"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_StatutoryFilings"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""ExpenseClaims"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""Category"" text NOT NULL DEFAULT '',
                ""Description"" text,
                ""Amount"" numeric NOT NULL DEFAULT 0,
                ""ExpenseDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""ReceiptUrl"" text,
                ""Status"" text NOT NULL DEFAULT 'Draft',
                ""ApprovedById"" text,
                ""ApprovedAt"" timestamp with time zone,
                ""ReimbursedAt"" timestamp with time zone,
                ""RejectionReason"" text,
                ""ProjectCode"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_ExpenseClaims"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""CompensationReviews"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""ReviewDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""OldCTC"" numeric NOT NULL DEFAULT 0,
                ""NewCTC"" numeric NOT NULL DEFAULT 0,
                ""HikeAmount"" numeric NOT NULL DEFAULT 0,
                ""HikePercentage"" numeric NOT NULL DEFAULT 0,
                ""EffectiveDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""Reason"" text,
                ""Status"" text NOT NULL DEFAULT 'Draft',
                ""ApprovedById"" text,
                ""ApprovedAt"" timestamp with time zone,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_CompensationReviews"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""BenefitPlans"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Name"" text NOT NULL DEFAULT '',
                ""Type"" text NOT NULL DEFAULT '',
                ""Provider"" text,
                ""Description"" text,
                ""EmployerContribution"" numeric NOT NULL DEFAULT 0,
                ""EmployeeContribution"" numeric NOT NULL DEFAULT 0,
                ""IsActive"" boolean NOT NULL DEFAULT true,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_BenefitPlans"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""EmployeeBenefits"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""BenefitPlanId"" uuid NOT NULL,
                ""EnrolledAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""EndDate"" timestamp with time zone,
                ""Status"" text NOT NULL DEFAULT 'Active',
                ""NomineeName"" text,
                ""NomineeRelation"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_EmployeeBenefits"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""BonusRecords"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""BonusType"" text NOT NULL DEFAULT '',
                ""Amount"" numeric NOT NULL DEFAULT 0,
                ""Month"" integer NOT NULL DEFAULT 1,
                ""Year"" integer NOT NULL DEFAULT 2025,
                ""Reason"" text,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""ApprovedById"" text,
                ""DisbursedAt"" timestamp with time zone,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_BonusRecords"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""SalaryBenchmarks"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""RoleTitle"" text NOT NULL DEFAULT '',
                ""Industry"" text,
                ""Location"" text,
                ""ExperienceRange"" text NOT NULL DEFAULT '',
                ""P25"" numeric NOT NULL DEFAULT 0,
                ""Median"" numeric NOT NULL DEFAULT 0,
                ""P75"" numeric NOT NULL DEFAULT 0,
                ""P90"" numeric NOT NULL DEFAULT 0,
                ""DataSource"" text,
                ""DataYear"" integer NOT NULL DEFAULT 2025,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_SalaryBenchmarks"" PRIMARY KEY (""Id"")
            );");

        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""Goals"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""Title"" text NOT NULL DEFAULT '',
                ""Description"" text,
                ""Category"" text NOT NULL DEFAULT 'Individual',
                ""StartDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""EndDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""Progress"" integer NOT NULL DEFAULT 0,
                ""Status"" text NOT NULL DEFAULT 'Active',
                ""Priority"" text NOT NULL DEFAULT 'Medium',
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_Goals"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""KeyResults"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""GoalId"" uuid NOT NULL,
                ""Title"" text NOT NULL DEFAULT '',
                ""TargetValue"" numeric NOT NULL DEFAULT 0,
                ""CurrentValue"" numeric NOT NULL DEFAULT 0,
                ""Unit"" text NOT NULL DEFAULT '',
                ""Status"" text NOT NULL DEFAULT 'OnTrack',
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_KeyResults"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""ReviewCycles"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Name"" text NOT NULL DEFAULT '',
                ""Type"" text NOT NULL DEFAULT 'Annual',
                ""StartDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""EndDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""SelfReviewDeadline"" timestamp with time zone,
                ""ManagerReviewDeadline"" timestamp with time zone,
                ""Status"" text NOT NULL DEFAULT 'Upcoming',
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_ReviewCycles"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""PerformanceReviews"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""ReviewCycleId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""ReviewerId"" text,
                ""SelfRating"" numeric,
                ""ManagerRating"" numeric,
                ""FinalRating"" numeric,
                ""PerformanceGrade"" text,
                ""SelfComments"" text,
                ""ManagerComments"" text,
                ""DevelopmentPlan"" text,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""SubmittedAt"" timestamp with time zone,
                ""CompletedAt"" timestamp with time zone,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_PerformanceReviews"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""FeedbackRequests"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""FromEmployeeId"" uuid NOT NULL,
                ""ToEmployeeId"" uuid NOT NULL,
                ""ReviewCycleId"" uuid,
                ""FeedbackType"" text NOT NULL DEFAULT '360',
                ""Message"" text,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""DueDate"" timestamp with time zone,
                ""CompletedAt"" timestamp with time zone,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_FeedbackRequests"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""FeedbackResponses"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""FeedbackRequestId"" uuid NOT NULL,
                ""OverallRating"" numeric,
                ""RatingsJson"" text,
                ""Strengths"" text,
                ""AreasToImprove"" text,
                ""AdditionalComments"" text,
                ""IsAnonymous"" boolean NOT NULL DEFAULT false,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_FeedbackResponses"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""ContinuousFeedbacks"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""FromEmployeeId"" uuid NOT NULL,
                ""ToEmployeeId"" uuid NOT NULL,
                ""FeedbackType"" text NOT NULL DEFAULT 'Praise',
                ""Content"" text NOT NULL DEFAULT '',
                ""IsAnonymous"" boolean NOT NULL DEFAULT false,
                ""Tag"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_ContinuousFeedbacks"" PRIMARY KEY (""Id"")
            );");

        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""Courses"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Title"" text NOT NULL DEFAULT '',
                ""Description"" text,
                ""Category"" text,
                ""Format"" text NOT NULL DEFAULT 'Online',
                ""Level"" text NOT NULL DEFAULT 'Beginner',
                ""DurationHours"" integer NOT NULL DEFAULT 0,
                ""ThumbnailUrl"" text,
                ""ContentUrl"" text,
                ""Provider"" text,
                ""IsMandatory"" boolean NOT NULL DEFAULT false,
                ""IsActive"" boolean NOT NULL DEFAULT true,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_Courses"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""CourseEnrollments"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""CourseId"" uuid NOT NULL,
                ""EnrolledAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""StartedAt"" timestamp with time zone,
                ""CompletedAt"" timestamp with time zone,
                ""DueDate"" timestamp with time zone,
                ""ProgressPercent"" integer NOT NULL DEFAULT 0,
                ""Score"" numeric,
                ""Status"" text NOT NULL DEFAULT 'Enrolled',
                ""CertificateUrl"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_CourseEnrollments"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""TrainingEvents"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Title"" text NOT NULL DEFAULT '',
                ""CourseId"" uuid,
                ""TrainerName"" text,
                ""TrainerOrg"" text,
                ""StartDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""EndDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""Location"" text,
                ""MaxParticipants"" integer NOT NULL DEFAULT 20,
                ""Status"" text NOT NULL DEFAULT 'Scheduled',
                ""Description"" text,
                ""Cost"" numeric,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_TrainingEvents"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""TrainingRegistrations"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""TrainingEventId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""Status"" text NOT NULL DEFAULT 'Registered',
                ""FeedbackScore"" numeric,
                ""Feedback"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_TrainingRegistrations"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""SkillAssessments"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""SkillName"" text NOT NULL DEFAULT '',
                ""Category"" text,
                ""RequiredLevel"" integer NOT NULL DEFAULT 3,
                ""CurrentLevel"" integer NOT NULL DEFAULT 1,
                ""AssessedOn"" timestamp with time zone NOT NULL DEFAULT now(),
                ""ReassessedOn"" timestamp with time zone,
                ""Notes"" text,
                ""RecommendedCourse"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_SkillAssessments"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""CertificationRecords"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""CertificationName"" text NOT NULL DEFAULT '',
                ""IssuingBody"" text,
                ""CertificateId"" text,
                ""IssueDate"" timestamp with time zone,
                ""ExpiryDate"" timestamp with time zone,
                ""CertificateUrl"" text,
                ""Status"" text NOT NULL DEFAULT 'Valid',
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_CertificationRecords"" PRIMARY KEY (""Id"")
            );");

        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""Documents"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EntityType"" text NOT NULL DEFAULT '',
                ""EntityId"" uuid NOT NULL,
                ""FileName"" text NOT NULL DEFAULT '',
                ""FileUrl"" text,
                ""FileSizeBytes"" bigint NOT NULL DEFAULT 0,
                ""MimeType"" text,
                ""Category"" text,
                ""Description"" text,
                ""UploadedById"" text,
                ""UploadedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""IsConfidential"" boolean NOT NULL DEFAULT false,
                ""ExpiryDate"" timestamp with time zone,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_Documents"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""LetterTemplates"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Name"" text NOT NULL DEFAULT '',
                ""LetterType"" text NOT NULL DEFAULT '',
                ""Content"" text NOT NULL DEFAULT '',
                ""FooterText"" text,
                ""IsActive"" boolean NOT NULL DEFAULT true,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_LetterTemplates"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""IssuedLetters"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""TemplateId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""IssuedById"" text,
                ""IssuedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""DocumentUrl"" text,
                ""Status"" text NOT NULL DEFAULT 'Draft',
                ""CustomContent"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_IssuedLetters"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""ExitRequests"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""ResignationDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""LastWorkingDay"" timestamp with time zone NOT NULL DEFAULT now(),
                ""ExitType"" text NOT NULL DEFAULT 'Resignation',
                ""Reason"" text,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""HRComments"" text,
                ""ApprovedById"" text,
                ""ApprovedAt"" timestamp with time zone,
                ""NoticePeriodWaived"" boolean NOT NULL DEFAULT false,
                ""ExitInterviewSummary"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_ExitRequests"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""ExitChecklistItems"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""ExitRequestId"" uuid NOT NULL,
                ""Task"" text NOT NULL DEFAULT '',
                ""Department"" text,
                ""AssignedToId"" text,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""CompletedAt"" timestamp with time zone,
                ""Remarks"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_ExitChecklistItems"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""EmployerReviews"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""ReviewerName"" text NOT NULL DEFAULT 'Anonymous',
                ""ReviewerRole"" text,
                ""ReviewerType"" text NOT NULL DEFAULT 'Employee',
                ""Rating"" numeric NOT NULL DEFAULT 0,
                ""Pros"" text, ""Cons"" text, ""Advice"" text,
                ""RecommendToFriend"" boolean NOT NULL DEFAULT true,
                ""Source"" text NOT NULL DEFAULT 'Internal',
                ""Status"" text NOT NULL DEFAULT 'Published',
                ""ReviewDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_EmployerReviews"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""TalentCommunityMembers"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Email"" text NOT NULL DEFAULT '',
                ""FullName"" text,
                ""Phone"" text,
                ""CurrentRole"" text,
                ""ExperienceYears"" integer,
                ""SkillsJson"" text,
                ""Status"" text NOT NULL DEFAULT 'Active',
                ""Source"" text,
                ""JoinedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""LastEngagedAt"" timestamp with time zone,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_TalentCommunityMembers"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""CareerPages"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Title"" text NOT NULL DEFAULT '',
                ""Headline"" text,
                ""Description"" text,
                ""LogoUrl"" text,
                ""BannerUrl"" text,
                ""ValuesJson"" text,
                ""BenefitsJson"" text,
                ""IsPublished"" boolean NOT NULL DEFAULT false,
                ""PublishedSlug"" text,
                ""ThemeColor"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_CareerPages"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""CampusEvents"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Title"" text NOT NULL DEFAULT '',
                ""Institution"" text,
                ""Location"" text,
                ""EventDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""EventType"" text NOT NULL DEFAULT 'CareerFair',
                ""ExpectedParticipants"" integer NOT NULL DEFAULT 0,
                ""Status"" text NOT NULL DEFAULT 'Planned',
                ""Notes"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_CampusEvents"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""Policies"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Title"" text NOT NULL DEFAULT '',
                ""Category"" text,
                ""Content"" text NOT NULL DEFAULT '',
                ""EffectiveDate"" timestamp with time zone,
                ""ExpiryDate"" timestamp with time zone,
                ""Version"" integer NOT NULL DEFAULT 1,
                ""IsActive"" boolean NOT NULL DEFAULT true,
                ""RequiresAcknowledgment"" boolean NOT NULL DEFAULT true,
                ""DocumentUrl"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_Policies"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""PolicyAcknowledgments"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""PolicyId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""AcknowledgedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""IpAddress"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_PolicyAcknowledgments"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""Integrations"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Name"" text NOT NULL DEFAULT '',
                ""Category"" text,
                ""Description"" text,
                ""LogoUrl"" text,
                ""Status"" text NOT NULL DEFAULT 'Available',
                ""ConfigJson"" text,
                ""LastSyncAt"" timestamp with time zone,
                ""LastSyncStatus"" text,
                ""IsOAuth"" boolean NOT NULL DEFAULT false,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_Integrations"" PRIMARY KEY (""Id"")
            );");
        // ─── END HR MODULE TABLES ─────────────────────────────────────────────

        // ─── Helpdesk & Travel tables ─────────────────────────────────────────
        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""HelpdeskTickets"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""TicketNumber"" text NOT NULL DEFAULT '',
                ""Title"" text NOT NULL DEFAULT '',
                ""Description"" text,
                ""Category"" text NOT NULL DEFAULT 'IT',
                ""SubCategory"" text NOT NULL DEFAULT '',
                ""Priority"" text NOT NULL DEFAULT 'Medium',
                ""Status"" text NOT NULL DEFAULT 'Open',
                ""RequesterId"" uuid NOT NULL,
                ""RequesterName"" text NOT NULL DEFAULT '',
                ""RequesterEmail"" text,
                ""AssigneeId"" uuid,
                ""AssigneeName"" text,
                ""AssignedTeam"" text,
                ""DueDate"" timestamp with time zone,
                ""ResolvedAt"" timestamp with time zone,
                ""Resolution"" text,
                ""SatisfactionRating"" integer,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_HelpdeskTickets"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""HelpdeskTicketComments"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""TicketId"" uuid NOT NULL,
                ""AuthorId"" text NOT NULL DEFAULT '',
                ""AuthorName"" text NOT NULL DEFAULT '',
                ""Content"" text NOT NULL DEFAULT '',
                ""IsInternal"" boolean NOT NULL DEFAULT false,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_HelpdeskTicketComments"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""HelpdeskWorkflowSteps"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""TicketId"" uuid NOT NULL,
                ""Action"" text NOT NULL DEFAULT '',
                ""ActorName"" text NOT NULL DEFAULT '',
                ""Notes"" text,
                ""Timestamp"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_HelpdeskWorkflowSteps"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""TravelRequests"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""RequestNumber"" text NOT NULL DEFAULT '',
                ""EmployeeId"" uuid NOT NULL,
                ""EmployeeName"" text NOT NULL DEFAULT '',
                ""TravelType"" text NOT NULL DEFAULT 'Domestic',
                ""Purpose"" text NOT NULL DEFAULT '',
                ""FromCity"" text NOT NULL DEFAULT '',
                ""ToCity"" text NOT NULL DEFAULT '',
                ""DepartureDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""ReturnDate"" timestamp with time zone NOT NULL DEFAULT now(),
                ""EstimatedBudget"" numeric NOT NULL DEFAULT 0,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""ApproverId"" text,
                ""ApproverName"" text,
                ""ApprovedAt"" timestamp with time zone,
                ""RejectionReason"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_TravelRequests"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""AdvanceRequests"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""TravelRequestId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""EmployeeName"" text NOT NULL DEFAULT '',
                ""RequestedAmount"" numeric NOT NULL DEFAULT 0,
                ""ApprovedAmount"" numeric,
                ""Status"" text NOT NULL DEFAULT 'Pending',
                ""ApproverId"" text,
                ""DisbursedAt"" timestamp with time zone,
                ""SettledAt"" timestamp with time zone,
                ""Notes"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_AdvanceRequests"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""TravelExpenseClaims"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""TravelRequestId"" uuid NOT NULL,
                ""EmployeeId"" uuid NOT NULL,
                ""EmployeeName"" text NOT NULL DEFAULT '',
                ""TotalAmount"" numeric NOT NULL DEFAULT 0,
                ""Status"" text NOT NULL DEFAULT 'Draft',
                ""SubmittedAt"" timestamp with time zone,
                ""ApproverId"" text,
                ""ApprovedAt"" timestamp with time zone,
                ""RejectionReason"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_TravelExpenseClaims"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""TravelExpenseLineItems"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""ClaimId"" uuid NOT NULL,
                ""Category"" text NOT NULL DEFAULT '',
                ""Description"" text NOT NULL DEFAULT '',
                ""Date"" timestamp with time zone NOT NULL DEFAULT now(),
                ""Amount"" numeric NOT NULL DEFAULT 0,
                ""ReceiptUrl"" text,
                ""IsApproved"" boolean NOT NULL DEFAULT false,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_TravelExpenseLineItems"" PRIMARY KEY (""Id"")
            );");

        // ─── Security & Platform tables ───────────────────────────────────────
        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS ""RefreshTokens"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""UserId"" text NOT NULL,
                ""Token"" text NOT NULL,
                ""ExpiresAt"" timestamp with time zone NOT NULL,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedByIp"" text,
                ""IsRevoked"" boolean NOT NULL DEFAULT false,
                ""RevokedAt"" timestamp with time zone,
                ""ReplacedByToken"" text,
                CONSTRAINT ""PK_RefreshTokens"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""WorkflowDefinitions"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Name"" text NOT NULL DEFAULT '',
                ""EntityType"" text NOT NULL DEFAULT '',
                ""StepsJson"" text NOT NULL DEFAULT '[]',
                ""IsActive"" boolean NOT NULL DEFAULT true,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_WorkflowDefinitions"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""WorkflowInstances"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""DefinitionId"" uuid NOT NULL,
                ""EntityId"" uuid NOT NULL,
                ""EntityType"" text NOT NULL DEFAULT '',
                ""CurrentStep"" integer NOT NULL DEFAULT 0,
                ""TotalSteps"" integer NOT NULL DEFAULT 0,
                ""Status"" text NOT NULL DEFAULT 'InProgress',
                ""StartedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CompletedAt"" timestamp with time zone,
                ""SLADeadline"" timestamp with time zone,
                ""SLABreached"" boolean NOT NULL DEFAULT false,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_WorkflowInstances"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""WorkflowStepHistories"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""InstanceId"" uuid NOT NULL,
                ""StepIndex"" integer NOT NULL DEFAULT 0,
                ""StepName"" text NOT NULL DEFAULT '',
                ""Action"" text NOT NULL DEFAULT '',
                ""ActorName"" text NOT NULL DEFAULT '',
                ""ActorId"" text,
                ""Notes"" text,
                ""ActedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_WorkflowStepHistories"" PRIMARY KEY (""Id"")
            );
            CREATE TABLE IF NOT EXISTS ""HRAnnouncements"" (
                ""Id"" uuid NOT NULL DEFAULT gen_random_uuid(),
                ""TenantId"" uuid NOT NULL,
                ""Title"" text NOT NULL DEFAULT '',
                ""Body"" text NOT NULL DEFAULT '',
                ""Category"" text NOT NULL DEFAULT 'General',
                ""IsPinned"" boolean NOT NULL DEFAULT false,
                ""PublishedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""ExpiresAt"" timestamp with time zone,
                ""AuthorId"" text,
                ""AuthorName"" text,
                ""CreatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""UpdatedAt"" timestamp with time zone NOT NULL DEFAULT now(),
                ""CreatedBy"" text, ""UpdatedBy"" text, ""IsDeleted"" boolean NOT NULL DEFAULT false,
                CONSTRAINT ""PK_HRAnnouncements"" PRIMARY KEY (""Id"")
            );
            ALTER TABLE ""AttendancePolicies""
                ADD COLUMN IF NOT EXISTS ""GeoFenceName"" text,
                ADD COLUMN IF NOT EXISTS ""GeoFenceLat"" double precision,
                ADD COLUMN IF NOT EXISTS ""GeoFenceLng"" double precision,
                ADD COLUMN IF NOT EXISTS ""StrictGeoFence"" boolean NOT NULL DEFAULT false;");
        // ─── END SECURITY & PLATFORM TABLES ──────────────────────────────────

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

app.UseRateLimiter();

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
