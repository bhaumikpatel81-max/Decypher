using Microsoft.AspNetCore.Identity;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Data
{
    public static class SeedData
    {
        public static async Task Initialize(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            // Ensure roles exist
            string[] roleNames = { "SuperAdmin", "TenantAdmin", "TeamLead", "Recruiter", "Viewer" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            // Get tenants
            var demoTenantId = Guid.Parse("11111111-1111-1111-1111-111111111111");
            var platformTenantId = Guid.Parse("00000000-0000-0000-0000-000000000000");
            context.SetCurrentTenant(demoTenantId);

            // Create SuperAdmin (Bhaumik)
            var adminEmail = "admin@decypher.app";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            
            if (adminUser == null)
            {
                adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true,
                    FirstName = "Bhaumik",
                    LastName = "Patel",
                    TenantId = platformTenantId,
                    Role = UserRole.SuperAdmin,
                    Department = "Administration",
                    Designation = "Platform Admin",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };
                
                var result = await userManager.CreateAsync(adminUser, "Admin@2024");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "SuperAdmin");
                }
            }

            // Create Recruiter Demo User
            var recruiterEmail = "recruiter@decypher.app";
            var recruiterUser = await userManager.FindByEmailAsync(recruiterEmail);

            if (recruiterUser == null)
            {
                recruiterUser = new ApplicationUser
                {
                    UserName = recruiterEmail,
                    Email = recruiterEmail,
                    EmailConfirmed = true,
                    FirstName = "Demo",
                    LastName = "Recruiter",
                    TenantId = demoTenantId,
                    Role = UserRole.Recruiter,
                    Department = "HR",
                    Designation = "Recruiter",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                var result = await userManager.CreateAsync(recruiterUser, "Recruiter@2024");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(recruiterUser, "Recruiter");
                }
            }

            // Create Guest Demo User
            var guestEmail = "guest@decypher.app";
            var guestUser = await userManager.FindByEmailAsync(guestEmail);
            
            if (guestUser == null)
            {
                guestUser = new ApplicationUser
                {
                    UserName = guestEmail,
                    Email = guestEmail,
                    EmailConfirmed = true,
                    FirstName = "Demo",
                    LastName = "User",
                    TenantId = demoTenantId,
                    Role = UserRole.TenantAdmin,
                    Department = "HR",
                    Designation = "HR Manager",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };
                
                var result = await userManager.CreateAsync(guestUser, "DemoGuest@2024");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(guestUser, "TenantAdmin");
                }
            }

            // Seed sample vendors for demo tenant
            if (!context.Vendors.Any(v => v.TenantId == demoTenantId))
            {
                var vendors = new List<Vendor>
                {
                    new Vendor
                    {
                        TenantId = demoTenantId,
                        VendorName = "TechStaff Solutions",
                        ContactPerson = "Rajesh Kumar",
                        Email = "rajesh@techstaff.com",
                        Phone = "+91 9876543210",
                        City = "Bangalore",
                        State = "Karnataka",
                        QualityScore = 85.5m,
                        SlaComplianceScore = 92.0m,
                        JoiningRatePercent = 78.5m,
                        TotalSubmissions = 45,
                        TotalJoinings = 32,
                        Status = "Active"
                    },
                    new Vendor
                    {
                        TenantId = demoTenantId,
                        VendorName = "HireRight India",
                        ContactPerson = "Priya Sharma",
                        Email = "priya@hireright.in",
                        Phone = "+91 9876543211",
                        City = "Pune",
                        State = "Maharashtra",
                        QualityScore = 78.0m,
                        SlaComplianceScore = 85.0m,
                        JoiningRatePercent = 72.0m,
                        TotalSubmissions = 38,
                        TotalJoinings = 25,
                        Status = "Active"
                    },
                    new Vendor
                    {
                        TenantId = demoTenantId,
                        VendorName = "QuickHire Consultancy",
                        ContactPerson = "Amit Patel",
                        Email = "amit@quickhire.co.in",
                        Phone = "+91 9876543212",
                        City = "Ahmedabad",
                        State = "Gujarat",
                        QualityScore = 90.0m,
                        SlaComplianceScore = 95.0m,
                        JoiningRatePercent = 82.0m,
                        TotalSubmissions = 52,
                        TotalJoinings = 41,
                        Status = "Active"
                    }
                };

                context.Vendors.AddRange(vendors);
                await context.SaveChangesAsync();
            }

            // Seed sample requirements
            if (!context.Requirements.Any(r => r.TenantId == demoTenantId))
            {
                var requirements = new List<Requirement>
                {
                    new Requirement
                    {
                        TenantId = demoTenantId,
                        JobTitle = "Senior Software Engineer - .NET",
                        RequirementCode = "REQ-2024-001",
                        Department = "Technology",
                        HiringManager = "Vikram Singh",
                        Positions = 3,
                        Location = "Bangalore",
                        ExperienceRange = "5-8 years",
                        SalaryRange = "15-25 LPA",
                        JobDescription = "Looking for experienced .NET developers with cloud experience",
                        RequiredSkills = "[\"C#\", \".NET Core\", \"Azure\", \"SQL Server\", \"Microservices\"]",
                        TargetDate = DateTime.UtcNow.AddMonths(1),
                        Status = "Open",
                        Priority = "High"
                    },
                    new Requirement
                    {
                        TenantId = demoTenantId,
                        JobTitle = "HR Business Partner",
                        RequirementCode = "REQ-2024-002",
                        Department = "Human Resources",
                        HiringManager = "Sneha Reddy",
                        Positions = 1,
                        Location = "Pune",
                        ExperienceRange = "3-5 years",
                        SalaryRange = "8-12 LPA",
                        JobDescription = "HRBP for technology vertical",
                        RequiredSkills = "[\"Talent Acquisition\", \"Employee Engagement\", \"HRIS\"]",
                        TargetDate = DateTime.UtcNow.AddMonths(2),
                        Status = "Open",
                        Priority = "Medium"
                    }
                };

                context.Requirements.AddRange(requirements);
                await context.SaveChangesAsync();
            }

            // Seed sample candidates
            if (!context.Candidates.Any(c => c.TenantId == demoTenantId))
            {
                var vendors = await context.Vendors.Where(v => v.TenantId == demoTenantId).ToListAsync();
                var requirements = await context.Requirements.Where(r => r.TenantId == demoTenantId).ToListAsync();
                
                if (vendors.Any() && requirements.Any())
                {
                    var candidates = new List<Candidate>
                    {
                        new Candidate
                        {
                            TenantId = demoTenantId,
                            CandidateName = "Rahul Verma",
                            Email = "rahul.verma@example.com",
                            Phone = "+91 9876543213",
                            CurrentCompany = "TCS",
                            CurrentDesignation = "Software Engineer",
                            TotalExperience = 6.5m,
                            ExpectedCTC = 22.0m,
                            CurrentCTC = 18.0m,
                            NoticePeriod = "60 days",
                            Location = "Bangalore",
                            Skills = "[\"C#\", \".NET Core\", \"Azure\", \"SQL Server\"]",
                            VendorId = vendors[0].Id,
                            RequirementId = requirements[0].Id,
                            SubmittedDate = DateTime.UtcNow.AddDays(-15),
                            Stage = "L2",
                            ScreeningResult = "Selected",
                            L1Result = "Selected",
                            CvJdMatchScore = 87.5m,
                            DropoutRiskScore = 25.0m,
                            CompetencyScore = 82.0m
                        },
                        new Candidate
                        {
                            TenantId = demoTenantId,
                            CandidateName = "Priya Desai",
                            Email = "priya.desai@example.com",
                            Phone = "+91 9876543214",
                            CurrentCompany = "Infosys",
                            CurrentDesignation = "Senior Software Engineer",
                            TotalExperience = 7.0m,
                            ExpectedCTC = 24.0m,
                            CurrentCTC = 20.0m,
                            NoticePeriod = "30 days",
                            Location = "Pune",
                            Skills = "[\"C#\", \".NET Core\", \"AWS\", \"PostgreSQL\", \"Docker\"]",
                            VendorId = vendors[1].Id,
                            RequirementId = requirements[0].Id,
                            SubmittedDate = DateTime.UtcNow.AddDays(-10),
                            Stage = "Selected",
                            ScreeningResult = "Selected",
                            L1Result = "Selected",
                            L2Result = "Selected",
                            L3Result = "Selected",
                            HrResult = "Selected",
                            OfferedCTC = 23.5m,
                            OfferDate = DateTime.UtcNow.AddDays(-2),
                            CvJdMatchScore = 92.0m,
                            DropoutRiskScore = 15.0m,
                            CompetencyScore = 90.0m
                        },
                        new Candidate
                        {
                            TenantId = demoTenantId,
                            CandidateName = "Ankit Sharma",
                            Email = "ankit.sharma@example.com",
                            Phone = "+91 9876543215",
                            CurrentCompany = "Wipro",
                            CurrentDesignation = "Tech Lead",
                            TotalExperience = 8.5m,
                            ExpectedCTC = 28.0m,
                            CurrentCTC = 24.0m,
                            NoticePeriod = "90 days",
                            Location = "Bangalore",
                            Skills = "[\"C#\", \".NET Core\", \"Azure\", \"Microservices\", \"Kubernetes\"]",
                            VendorId = vendors[2].Id,
                            RequirementId = requirements[0].Id,
                            SubmittedDate = DateTime.UtcNow.AddDays(-5),
                            Stage = "Screening",
                            CvJdMatchScore = 95.0m,
                            DropoutRiskScore = 35.0m,
                            CompetencyScore = 88.0m
                        }
                    };

                    context.Candidates.AddRange(candidates);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
