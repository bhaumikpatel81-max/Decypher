using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Decypher.Web.Models;

namespace Decypher.Web.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        private readonly IHttpContextAccessor? _httpContextAccessor;
        private Guid? _currentTenantId;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IHttpContextAccessor httpContextAccessor)
            : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        // DbSets
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Requirement> Requirements { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<RecruiterPerformance> RecruiterPerformances { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }

        // --- AI additions ---
        public DbSet<AIAuditLog> AIAuditLogs { get; set; }
        public DbSet<SLATracking> SLATrackings { get; set; }

        // --- New ATS modules ---
        public DbSet<ParsedResume> ParsedResumes { get; set; }
        public DbSet<PipelineStage> PipelineStages { get; set; }
        public DbSet<CandidateStage> CandidateStages { get; set; }
        public DbSet<CandidateApplication> CandidateApplications { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<InterviewSlot> InterviewSlots { get; set; }
        public DbSet<InterviewFeedback> InterviewFeedbacks { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<TalentPoolEntry> TalentPoolEntries { get; set; }
        public DbSet<TalentPoolCampaign> TalentPoolCampaigns { get; set; }
        public DbSet<Requisition> Requisitions { get; set; }
        public DbSet<CandidateSource> CandidateSources { get; set; }

        // ─── Budget Module (V1) ────────────────────────────────────────────
        public DbSet<BudgetFiscalYear> BudgetFiscalYears { get; set; }
        public DbSet<BudgetAllocation> BudgetAllocations { get; set; }
        public DbSet<BudgetLineItem> BudgetLineItems { get; set; }
        public DbSet<BudgetActual> BudgetActuals { get; set; }
        public DbSet<BudgetCostCategoryConfig> BudgetCostCategoryConfigs { get; set; }
        public DbSet<BudgetTenantConfig> BudgetTenantConfigs { get; set; }

        // ─── Budget Forecasting V2 (Plan-based) ───────────────────────────
        public DbSet<BudgetPlan>     BudgetPlans     { get; set; }
        public DbSet<BudgetPlanItem> BudgetPlanItems { get; set; }
        public DbSet<BudgetVersion>  BudgetVersions  { get; set; }
        public DbSet<BudgetAlert>    BudgetAlerts    { get; set; }

        // ─── Requisition extensions ────────────────────────────────────────
        public DbSet<RequisitionStatusHistory> RequisitionStatusHistories { get; set; }
        public DbSet<JobBroadcast> JobBroadcasts { get; set; }
        public DbSet<CommMessage> CommMessages { get; set; }
        public DbSet<OnboardingRecord> OnboardingRecords { get; set; }
        public DbSet<OnboardingChecklistItem> OnboardingChecklistItems { get; set; }

        // ─── Video Interviews ───────────────────────────────────────────────
        public DbSet<VideoInterview> VideoInterviews { get; set; }
        public DbSet<VideoResponse> VideoResponses { get; set; }

        // ─── Internal Job Postings ──────────────────────────────────────────
        public DbSet<InternalJobPosting> InternalJobPostings { get; set; }

        // ─── Import Center ──────────────────────────────────────────────────
        public DbSet<ImportJob> ImportJobs { get; set; }

        // ═══════════════════════════════════════════════════════════════════
        // HR MODULE DBSETS
        // ═══════════════════════════════════════════════════════════════════

        // Core HR
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<LetterTemplate> LetterTemplates { get; set; }
        public DbSet<IssuedLetter> IssuedLetters { get; set; }
        public DbSet<ExitRequest> ExitRequests { get; set; }
        public DbSet<ExitChecklistItem> ExitChecklistItems { get; set; }

        // Leave Management
        public DbSet<LeaveType> LeaveTypes { get; set; }
        public DbSet<LeaveBalance> LeaveBalances { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }

        // Attendance & Time
        public DbSet<AttendanceRecord> AttendanceRecords { get; set; }
        public DbSet<AttendancePolicy> AttendancePolicies { get; set; }
        public DbSet<ShiftDefinition> ShiftDefinitions { get; set; }
        public DbSet<EmployeeShift> EmployeeShifts { get; set; }
        public DbSet<TimesheetEntry> TimesheetEntries { get; set; }
        public DbSet<OvertimeRequest> OvertimeRequests { get; set; }

        // Payroll & Compensation
        public DbSet<SalaryComponent> SalaryComponents { get; set; }
        public DbSet<EmployeeSalary> EmployeeSalaries { get; set; }
        public DbSet<PayrollRun> PayrollRuns { get; set; }
        public DbSet<Payslip> Payslips { get; set; }
        public DbSet<TaxDeclaration> TaxDeclarations { get; set; }
        public DbSet<StatutoryFiling> StatutoryFilings { get; set; }
        public DbSet<ExpenseClaim> ExpenseClaims { get; set; }
        public DbSet<CompensationReview> CompensationReviews { get; set; }
        public DbSet<BenefitPlan> BenefitPlans { get; set; }
        public DbSet<EmployeeBenefit> EmployeeBenefits { get; set; }
        public DbSet<BonusRecord> BonusRecords { get; set; }
        public DbSet<SalaryBenchmark> SalaryBenchmarks { get; set; }

        // Performance Management
        public DbSet<Goal> Goals { get; set; }
        public DbSet<KeyResult> KeyResults { get; set; }
        public DbSet<ReviewCycle> ReviewCycles { get; set; }
        public DbSet<PerformanceReview> PerformanceReviews { get; set; }
        public DbSet<FeedbackRequest> FeedbackRequests { get; set; }
        public DbSet<FeedbackResponse> FeedbackResponses { get; set; }
        public DbSet<ContinuousFeedback> ContinuousFeedbacks { get; set; }
        public DbSet<OneOnOneMeeting> OneOnOneMeetings { get; set; }
        public DbSet<MoodCheckin> MoodCheckins { get; set; }

        // Learning & Development
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseEnrollment> CourseEnrollments { get; set; }
        public DbSet<TrainingEvent> TrainingEvents { get; set; }
        public DbSet<TrainingRegistration> TrainingRegistrations { get; set; }
        public DbSet<SkillAssessment> SkillAssessments { get; set; }
        public DbSet<CertificationRecord> CertificationRecords { get; set; }

        // Employer Branding
        public DbSet<EmployerReview> EmployerReviews { get; set; }
        public DbSet<TalentCommunityMember> TalentCommunityMembers { get; set; }
        public DbSet<CareerPage> CareerPages { get; set; }
        public DbSet<CampusEvent> CampusEvents { get; set; }

        // Policies & Compliance
        public DbSet<Policy> Policies { get; set; }
        public DbSet<PolicyAcknowledgment> PolicyAcknowledgments { get; set; }

        // Integrations
        public DbSet<Integration> Integrations { get; set; }

        // Helpdesk
        public DbSet<HelpdeskTicket> HelpdeskTickets { get; set; }
        public DbSet<HelpdeskTicketComment> HelpdeskTicketComments { get; set; }
        public DbSet<HelpdeskWorkflowStep> HelpdeskWorkflowSteps { get; set; }

        // Travel & Expense
        public DbSet<TravelRequest> TravelRequests { get; set; }
        public DbSet<AdvanceRequest> AdvanceRequests { get; set; }
        public DbSet<TravelExpenseClaim> TravelExpenseClaims { get; set; }
        public DbSet<TravelExpenseLineItem> TravelExpenseLineItems { get; set; }

        // Portal
        public DbSet<HRAnnouncement> HRAnnouncements { get; set; }

        // Workflow Engine
        public DbSet<WorkflowDefinition> WorkflowDefinitions { get; set; }
        public DbSet<WorkflowInstance> WorkflowInstances { get; set; }
        public DbSet<WorkflowStepHistory> WorkflowStepHistories { get; set; }

        // Internal Audit
        public DbSet<AuditReport> AuditReports { get; set; }
        public DbSet<AuditScopeArea> AuditScopeAreas { get; set; }
        public DbSet<AuditOverviewStat> AuditOverviewStats { get; set; }
        public DbSet<AuditObservation> AuditObservations { get; set; }

        // Permissions
        public DbSet<ModulePermission> ModulePermissions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure Tenant
            builder.Entity<Tenant>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.CompanyName);
                entity.Property(e => e.CompanyName).IsRequired();
            });

            // Configure ApplicationUser
            builder.Entity<ApplicationUser>(entity =>
            {
                entity.HasOne(u => u.Tenant)
                    .WithMany(t => t.Users)
                    .HasForeignKey(u => u.TenantId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => e.Email);
            });

            // Configure Vendor
            builder.Entity<Vendor>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(v => v.Tenant)
                    .WithMany(t => t.Vendors)
                    .HasForeignKey(v => v.TenantId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.VendorName });
                
                // Apply global query filter for multi-tenancy
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            // Configure Requirement
            builder.Entity<Requirement>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(r => r.Tenant)
                    .WithMany(t => t.Requirements)
                    .HasForeignKey(r => r.TenantId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => e.RequirementCode).IsUnique();
                entity.HasIndex(e => new { e.TenantId, e.Status });
                
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            // Configure Candidate
            builder.Entity<Candidate>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(c => c.Tenant)
                    .WithMany(t => t.Candidates)
                    .HasForeignKey(c => c.TenantId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(c => c.Vendor)
                    .WithMany(v => v.Candidates)
                    .HasForeignKey(c => c.VendorId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(c => c.Requirement)
                    .WithMany(r => r.Candidates)
                    .HasForeignKey(c => c.RequirementId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => e.Email);
                entity.HasIndex(e => new { e.TenantId, e.Stage });
                entity.HasIndex(e => new { e.TenantId, e.RequirementId });
                entity.HasIndex(e => new { e.TenantId, e.VendorId });
                
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            // Configure RecruiterPerformance
            builder.Entity<RecruiterPerformance>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(rp => rp.Tenant)
                    .WithMany()
                    .HasForeignKey(rp => rp.TenantId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(rp => rp.User)
                    .WithMany(u => u.PerformanceRecords)
                    .HasForeignKey(rp => rp.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.UserId, e.Year, e.Month }).IsUnique();
                
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            // Configure ActivityLog
            builder.Entity<ActivityLog>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(al => al.Tenant)
                    .WithMany()
                    .HasForeignKey(al => al.TenantId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => e.Timestamp);
                entity.HasIndex(e => new { e.TenantId, e.UserId });
            });

            // AI Audit Log — append-only, tamper-evident
            builder.Entity<AIAuditLog>()
                .HasIndex(a => a.TenantId);
            builder.Entity<AIAuditLog>()
                .HasIndex(a => new { a.EntityId, a.EventType });
            builder.Entity<AIAuditLog>()
                .Property(a => a.CreatedAt)
                .HasDefaultValueSql("NOW()");

            // SLA Tracking
            builder.Entity<SLATracking>()
                .HasOne(s => s.Requirement)
                .WithMany()
                .HasForeignKey(s => s.RequirementId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<SLATracking>()
                .HasIndex(s => new { s.TenantId, s.Status });

            // JSON column configuration for new entities
            builder.Entity<ParsedResume>()
                .Property(p => p.Skills).HasColumnType("jsonb");
            builder.Entity<ParsedResume>()
                .Property(p => p.Experience).HasColumnType("jsonb");
            builder.Entity<ParsedResume>()
                .Property(p => p.EducationHistory).HasColumnType("jsonb");
            builder.Entity<ParsedResume>()
                .Property(p => p.Certifications).HasColumnType("jsonb");

            builder.Entity<TalentPoolEntry>()
                .Property(t => t.Tags).HasColumnType("jsonb");

            builder.Entity<TalentPoolCampaign>()
                .Property(t => t.TargetTags).HasColumnType("jsonb");

            builder.Entity<Interview>()
                .Property(i => i.RecruiterIds).HasColumnType("jsonb");

            builder.Entity<Offer>()
                .Property(o => o.Benefits).HasColumnType("jsonb");

            // Seed default pipeline stages
            var demoTenantId = Guid.Parse("11111111-1111-1111-1111-111111111111");
            var defaultStages = new[]
            {
                new PipelineStage { Id = Guid.Parse("aa000001-0000-0000-0000-000000000001"), Name = "Sourced",     Order = 1, Colour = "#6366f1", TenantId = demoTenantId },
                new PipelineStage { Id = Guid.Parse("aa000002-0000-0000-0000-000000000002"), Name = "Applied",     Order = 2, Colour = "#3b82f6", TenantId = demoTenantId },
                new PipelineStage { Id = Guid.Parse("aa000003-0000-0000-0000-000000000003"), Name = "Screening",   Order = 3, Colour = "#f59e0b", TenantId = demoTenantId },
                new PipelineStage { Id = Guid.Parse("aa000004-0000-0000-0000-000000000004"), Name = "Interview",   Order = 4, Colour = "#8b5cf6", TenantId = demoTenantId },
                new PipelineStage { Id = Guid.Parse("aa000005-0000-0000-0000-000000000005"), Name = "Offer",       Order = 5, Colour = "#ec4899", TenantId = demoTenantId },
                new PipelineStage { Id = Guid.Parse("aa000006-0000-0000-0000-000000000006"), Name = "Hired",       Order = 6, Colour = "#10b981", TenantId = demoTenantId },
                new PipelineStage { Id = Guid.Parse("aa000007-0000-0000-0000-000000000007"), Name = "Rejected",    Order = 7, Colour = "#ef4444", TenantId = demoTenantId },
            };
            builder.Entity<PipelineStage>().HasData(defaultStages);

            // ─── Budget Module ─────────────────────────────────────────────
            builder.Entity<BudgetFiscalYear>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.Status });
                entity.Property(e => e.Status).HasConversion<string>();
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            builder.Entity<BudgetAllocation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(a => a.FiscalYear)
                    .WithMany(f => f.Allocations)
                    .HasForeignKey(a => a.FiscalYearId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.FiscalYearId });
                entity.Property(e => e.Category).HasConversion<string>();
                entity.Property(e => e.Quarter).HasConversion<string>();
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            builder.Entity<BudgetLineItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(l => l.Allocation)
                    .WithMany(a => a.LineItems)
                    .HasForeignKey(l => l.AllocationId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasIndex(e => e.TenantId);
                entity.Property(e => e.LineItemType).HasConversion<string>();
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            builder.Entity<BudgetActual>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(a => a.FiscalYear)
                    .WithMany(f => f.Actuals)
                    .HasForeignKey(a => a.FiscalYearId)
                    .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(a => a.Vendor)
                    .WithMany()
                    .HasForeignKey(a => a.VendorId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .IsRequired(false);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.FiscalYearId });
                entity.HasIndex(e => new { e.TenantId, e.SpendDate });
                entity.Property(e => e.SpendCategory).HasConversion<string>();
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            builder.Entity<BudgetCostCategoryConfig>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.CategoryCode });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            builder.Entity<BudgetTenantConfig>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId).IsUnique();
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            // ─── Communication Center ─────────────────────────────────
            builder.Entity<CommMessage>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.Channel });
                entity.HasIndex(e => new { e.TenantId, e.SentAt });
            });

            // ─── Onboarding ────────────────────────────────────────────────
            builder.Entity<OnboardingRecord>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.CandidateId });
                entity.HasMany(o => o.Items)
                    .WithOne(i => i.OnboardingRecord)
                    .HasForeignKey(i => i.OnboardingRecordId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<OnboardingChecklistItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.OnboardingRecordId });
            });

            // ─── Job Broadcasting ──────────────────────────────────────────
            builder.Entity<JobBroadcast>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.RequisitionId });
                entity.Property(e => e.Channels).HasColumnType("jsonb");
            });

            // ─── Video Interviews ──────────────────────────────────────────
            builder.Entity<VideoInterview>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => e.CandidateId);
                entity.Property(e => e.Questions).HasColumnType("jsonb");
                entity.HasMany(v => v.Responses)
                    .WithOne(r => r.VideoInterview)
                    .HasForeignKey(r => r.VideoInterviewId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<VideoResponse>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.VideoInterviewId);
                entity.HasIndex(e => e.TenantId);
            });

            // ─── Employee ─────────────────────────────────────────────────────
            builder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeCode }).IsUnique();
                entity.HasIndex(e => new { e.TenantId, e.Email });
                entity.HasIndex(e => new { e.TenantId, e.Department });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId && !e.IsDeleted);
                entity.HasOne(e => e.Manager)
                    .WithMany(e => e.DirectReports)
                    .HasForeignKey(e => e.ManagerId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .IsRequired(false);
            });

            // ─── Leave ────────────────────────────────────────────────────────
            builder.Entity<LeaveType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<LeaveBalance>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId, e.LeaveTypeId, e.Year });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.LeaveType).WithMany(t => t.Balances).HasForeignKey(e => e.LeaveTypeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<LeaveRequest>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasIndex(e => new { e.TenantId, e.Status });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany(emp => emp.LeaveRequests).HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.LeaveType).WithMany(t => t.Requests).HasForeignKey(e => e.LeaveTypeId).OnDelete(DeleteBehavior.Restrict);
            });

            // ─── Attendance ───────────────────────────────────────────────────
            builder.Entity<AttendanceRecord>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId, e.Date });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany(emp => emp.AttendanceRecords).HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<AttendancePolicy>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<ShiftDefinition>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<EmployeeShift>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.ShiftDefinition).WithMany(s => s.EmployeeShifts).HasForeignKey(e => e.ShiftDefinitionId).OnDelete(DeleteBehavior.Restrict);
            });
            builder.Entity<TimesheetEntry>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId, e.Date });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<OvertimeRequest>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });

            // ─── Salary & Payroll ─────────────────────────────────────────────
            builder.Entity<SalaryComponent>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<EmployeeSalary>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<PayrollRun>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.Month, e.Year });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<Payslip>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId, e.Month, e.Year });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.PayrollRun).WithMany(r => r.Payslips).HasForeignKey(e => e.PayrollRunId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<TaxDeclaration>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId, e.FinancialYear });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<StatutoryFiling>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.FilingType, e.Period });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<ExpenseClaim>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasIndex(e => new { e.TenantId, e.Status });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<CompensationReview>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<BenefitPlan>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<EmployeeBenefit>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.BenefitPlan).WithMany(p => p.Enrollments).HasForeignKey(e => e.BenefitPlanId).OnDelete(DeleteBehavior.Restrict);
            });
            builder.Entity<BonusRecord>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<SalaryBenchmark>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.RoleTitle });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            // ─── Performance ──────────────────────────────────────────────────
            builder.Entity<Goal>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasIndex(e => new { e.TenantId, e.Status });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
                entity.HasMany(e => e.KeyResults).WithOne(kr => kr.Goal).HasForeignKey(kr => kr.GoalId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<KeyResult>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<ReviewCycle>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<PerformanceReview>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasIndex(e => new { e.TenantId, e.ReviewCycleId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.ReviewCycle).WithMany(rc => rc.Reviews).HasForeignKey(e => e.ReviewCycleId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<FeedbackRequest>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.ToEmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.FromEmployee).WithMany().HasForeignKey(e => e.FromEmployeeId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.ToEmployee).WithMany().HasForeignKey(e => e.ToEmployeeId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Response).WithOne(r => r.FeedbackRequest).HasForeignKey<FeedbackResponse>(r => r.FeedbackRequestId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<FeedbackResponse>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<ContinuousFeedback>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.RecipientEmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.GiverEmployee).WithMany().HasForeignKey(e => e.GiverEmployeeId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.RecipientEmployee).WithMany().HasForeignKey(e => e.RecipientEmployeeId).OnDelete(DeleteBehavior.Restrict);
            });

            // ─── Learning ─────────────────────────────────────────────────────
            builder.Entity<Course>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<CourseEnrollment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Course).WithMany(c => c.Enrollments).HasForeignKey(e => e.CourseId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<TrainingEvent>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Course).WithMany().HasForeignKey(e => e.CourseId).OnDelete(DeleteBehavior.SetNull).IsRequired(false);
            });
            builder.Entity<TrainingRegistration>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.TrainingEventId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.TrainingEvent).WithMany(t => t.Registrations).HasForeignKey(e => e.TrainingEventId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
            });
            builder.Entity<SkillAssessment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<CertificationRecord>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });

            // ─── Core HR (Docs / Letters / Exit) ─────────────────────────────
            builder.Entity<Document>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EntityType, e.EntityId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<LetterTemplate>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<IssuedLetter>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Template).WithMany(t => t.IssuedLetters).HasForeignKey(e => e.TemplateId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<ExitRequest>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(e => e.ChecklistItems).WithOne(ci => ci.ExitRequest).HasForeignKey(ci => ci.ExitRequestId).OnDelete(DeleteBehavior.Cascade);
            });
            builder.Entity<ExitChecklistItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            // ─── Employer Branding ────────────────────────────────────────────
            builder.Entity<EmployerReview>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<TalentCommunityMember>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.Email });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<CareerPage>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<CampusEvent>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            // ─── Policies & Compliance ────────────────────────────────────────
            builder.Entity<Policy>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TenantId);
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });
            builder.Entity<PolicyAcknowledgment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.EmployeeId, e.PolicyId });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
                entity.HasOne(e => e.Policy).WithMany(p => p.Acknowledgments).HasForeignKey(e => e.PolicyId).OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Employee).WithMany().HasForeignKey(e => e.EmployeeId).OnDelete(DeleteBehavior.Cascade);
            });

            // ─── Integrations ─────────────────────────────────────────────────
            builder.Entity<Integration>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.Name });
                entity.HasQueryFilter(e => e.TenantId == _currentTenantId);
            });

            // ─── Module Permissions ───────────────────────────────────────────
            builder.Entity<ModulePermission>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.RoleName, e.ModuleKey }).IsUnique();
                entity.HasIndex(e => new { e.TenantId, e.RoleName });
            });

            builder.Entity<AuditReport>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.TenantId, e.DepartmentType });
                entity.HasIndex(e => new { e.TenantId, e.FinancialYear });
                entity.HasMany(e => e.ScopeAreas).WithOne(e => e.Report).HasForeignKey(e => e.ReportId).OnDelete(DeleteBehavior.Cascade);
                entity.HasMany(e => e.Observations).WithOne(e => e.Report).HasForeignKey(e => e.ReportId).OnDelete(DeleteBehavior.Cascade);
                entity.HasMany(e => e.OverviewStats).WithOne(e => e.Report).HasForeignKey(e => e.ReportId).OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<AuditScopeArea>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.ReportId, e.SortOrder });
            });

            builder.Entity<AuditOverviewStat>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.ReportId);
            });

            builder.Entity<AuditObservation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.ReportId, e.ObservationNumber });
                entity.Property(e => e.FinancialImpact).HasColumnType("decimal(18,2)");
            });

            // Seed data
            SeedData(builder);
        }

        private void SeedData(ModelBuilder builder)
        {
            // Seed Demo Tenant (fixed dates required by EF Core HasData)
            var demoTenantId = Guid.Parse("11111111-1111-1111-1111-111111111111");
            builder.Entity<Tenant>().HasData(new Tenant
            {
                Id = demoTenantId,
                CompanyName = "Demo Corporation",
                Industry = "Technology",
                EmployeeCount = 50,
                SubscriptionPlan = "Enterprise",
                SubscriptionStartDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                SubscriptionEndDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                IsActive = true,
                CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            });

            // Seed Decypher Platform Tenant (for SuperAdmin)
            // Uses a non-zero GUID — Guid.Empty is rejected by EF Core HasData validation.
            var platformTenantId = Guid.Parse("00000000-0000-0000-0000-000000000001");
            builder.Entity<Tenant>().HasData(new Tenant
            {
                Id = platformTenantId,
                CompanyName = "Decypher Platform",
                Industry = "HR Tech SaaS",
                EmployeeCount = 1,
                SubscriptionPlan = "Platform",
                IsActive = true,
                CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            });

        }

        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is BaseEntity && (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                var entity = (BaseEntity)entry.Entity;
                
                if (entry.State == EntityState.Added)
                {
                    entity.CreatedAt = DateTime.UtcNow;
                }
                
                entity.UpdatedAt = DateTime.UtcNow;
            }
        }

        public void SetCurrentTenant(Guid tenantId)
        {
            _currentTenantId = tenantId;
        }

        public void SetTenantId(string tenantId)
        {
            if (Guid.TryParse(tenantId, out var parsedTenantId))
            {
                SetCurrentTenant(parsedTenantId);
            }
        }
    }
}
