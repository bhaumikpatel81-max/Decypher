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
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Requirement> Requirements { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<RecruiterPerformance> RecruiterPerformances { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }

        // --- UC63 / UC64 additions ---
        public DbSet<AIAuditLog> AIAuditLogs { get; set; }
        public DbSet<SLATracking> SLATrackings { get; set; }

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

            // Seed data
            SeedData(builder);
        }

        private void SeedData(ModelBuilder builder)
        {
            // Seed Demo Tenant
            var demoTenantId = Guid.Parse("11111111-1111-1111-1111-111111111111");
            builder.Entity<Tenant>().HasData(new Tenant
            {
                Id = demoTenantId,
                CompanyName = "Demo Corporation",
                Industry = "Technology",
                EmployeeCount = 50,
                SubscriptionPlan = "Enterprise",
                SubscriptionStartDate = DateTime.UtcNow,
                SubscriptionEndDate = DateTime.UtcNow.AddYears(1),
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            });

            // Seed Decypher Platform Tenant (for SuperAdmin)
            var platformTenantId = Guid.Parse("00000000-0000-0000-0000-000000000000");
            builder.Entity<Tenant>().HasData(new Tenant
            {
                Id = platformTenantId,
                CompanyName = "Decypher Platform",
                Industry = "HR Tech SaaS",
                EmployeeCount = 1,
                SubscriptionPlan = "Platform",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
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
