using System;

namespace Decypher.Web.DTOs
{
    public class VendorDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int TotalSubmissions { get; set; }
        public int SuccessfulPlacements { get; set; }
        public decimal QualityScore { get; set; }
        public decimal SLAScore { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateVendorDTO
    {
        public string Name { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Category { get; set; } = "General";
    }

    public class UpdateVendorDTO
    {
        public string? Name { get; set; }
        public string? ContactPerson { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Status { get; set; }
    }
}
