using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Decypher.Web.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;
        
        [Required]
        public Guid TenantId { get; set; }
        
        [Required]
        public UserRole Role { get; set; } = UserRole.Viewer;
        
        [MaxLength(100)]
        public string? Department { get; set; }
        
        [MaxLength(100)]
        public string? Designation { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        [MaxLength(500)]
        public string? ProfilePictureUrl { get; set; }
        
        // Navigation properties
        public virtual Tenant Tenant { get; set; } = null!;
        public virtual ICollection<RecruiterPerformance> PerformanceRecords { get; set; } = new List<RecruiterPerformance>();
        
        // Computed property
        public string FullName => $"{FirstName} {LastName}";
        
        // Initials for avatar
        public string Initials => $"{FirstName.FirstOrDefault()}{LastName.FirstOrDefault()}".ToUpper();
    }
}
