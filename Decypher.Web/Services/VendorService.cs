using Decypher.Web.Data;
using Decypher.Web.DTOs;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    public class VendorService : IVendorService
    {
        private readonly ApplicationDbContext _context;

        public VendorService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<VendorDTO>> GetAllVendorsAsync(string tenantId)
        {
            _context.SetTenantId(tenantId);
            return await _context.Vendors
                .AsNoTracking()
                .Select(v => new VendorDTO
                {
                    Id = v.Id,
                    Name = v.VendorName,
                    ContactPerson = v.ContactPerson ?? string.Empty,
                    Email = v.Email ?? string.Empty,
                    Phone = v.Phone ?? string.Empty,
                    Category = "General",
                    TotalSubmissions = v.TotalSubmissions,
                    SuccessfulPlacements = v.TotalJoinings,
                    QualityScore = v.QualityScore,
                    SLAScore = v.SlaComplianceScore,
                    Status = v.Status,
                    CreatedAt = v.CreatedAt,
                    UpdatedAt = v.UpdatedAt
                })
                .ToListAsync();
        }

        public async Task<VendorDTO?> GetVendorByIdAsync(Guid id, string tenantId)
        {
            _context.SetTenantId(tenantId);
            var vendor = await _context.Vendors
                .AsNoTracking()
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vendor == null) return null;

            return new VendorDTO
            {
                Id = vendor.Id,
                Name = vendor.VendorName,
                ContactPerson = vendor.ContactPerson ?? string.Empty,
                Email = vendor.Email ?? string.Empty,
                Phone = vendor.Phone ?? string.Empty,
                Category = "General",
                TotalSubmissions = vendor.TotalSubmissions,
                SuccessfulPlacements = vendor.TotalJoinings,
                QualityScore = vendor.QualityScore,
                SLAScore = vendor.SlaComplianceScore,
                Status = vendor.Status,
                CreatedAt = vendor.CreatedAt,
                UpdatedAt = vendor.UpdatedAt
            };
        }

        public async Task<VendorDTO> CreateVendorAsync(CreateVendorDTO dto, string tenantId, string userId)
        {
            var vendor = new Vendor
            {
                TenantId = Guid.TryParse(tenantId, out var parsedTenantId) ? parsedTenantId : Guid.Empty,
                VendorName = dto.Name,
                ContactPerson = dto.ContactPerson,
                Email = dto.Email,
                Phone = dto.Phone,
                CreatedBy = userId,
                QualityScore = 0,
                SlaComplianceScore = 0
            };

            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();

            return new VendorDTO
            {
                Id = vendor.Id,
                Name = vendor.VendorName,
                ContactPerson = vendor.ContactPerson ?? string.Empty,
                Email = vendor.Email ?? string.Empty,
                Phone = vendor.Phone ?? string.Empty,
                Category = dto.Category,
                TotalSubmissions = vendor.TotalSubmissions,
                SuccessfulPlacements = vendor.TotalJoinings,
                QualityScore = vendor.QualityScore,
                SLAScore = vendor.SlaComplianceScore,
                Status = vendor.Status,
                CreatedAt = vendor.CreatedAt,
                UpdatedAt = vendor.UpdatedAt
            };
        }

        public async Task<VendorDTO?> UpdateVendorAsync(Guid id, UpdateVendorDTO dto, string tenantId)
        {
            _context.SetTenantId(tenantId);
            var vendor = await _context.Vendors.FirstOrDefaultAsync(v => v.Id == id);

            if (vendor == null) return null;

            if (!string.IsNullOrEmpty(dto.Name)) vendor.VendorName = dto.Name;
            if (!string.IsNullOrEmpty(dto.ContactPerson)) vendor.ContactPerson = dto.ContactPerson;
            if (!string.IsNullOrEmpty(dto.Email)) vendor.Email = dto.Email;
            if (!string.IsNullOrEmpty(dto.Phone)) vendor.Phone = dto.Phone;
            if (!string.IsNullOrEmpty(dto.Status)) vendor.Status = dto.Status;

            await _context.SaveChangesAsync();

            return new VendorDTO
            {
                Id = vendor.Id,
                Name = vendor.VendorName,
                ContactPerson = vendor.ContactPerson ?? string.Empty,
                Email = vendor.Email ?? string.Empty,
                Phone = vendor.Phone ?? string.Empty,
                Category = "General",
                TotalSubmissions = vendor.TotalSubmissions,
                SuccessfulPlacements = vendor.TotalJoinings,
                QualityScore = vendor.QualityScore,
                SLAScore = vendor.SlaComplianceScore,
                Status = vendor.Status,
                CreatedAt = vendor.CreatedAt,
                UpdatedAt = vendor.UpdatedAt
            };
        }

        public async Task<bool> DeleteVendorAsync(Guid id, string tenantId)
        {
            _context.SetTenantId(tenantId);
            var vendor = await _context.Vendors.FirstOrDefaultAsync(v => v.Id == id);
            if (vendor == null) return false;

            _context.Vendors.Remove(vendor);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<VendorDTO>> GetTopVendorsByPerformanceAsync(string tenantId, int count = 5)
        {
            _context.SetTenantId(tenantId);
            return await _context.Vendors
                .AsNoTracking()
                .OrderByDescending(v => v.QualityScore)
                .Take(count)
                .Select(v => new VendorDTO
                {
                    Id = v.Id,
                    Name = v.VendorName,
                    QualityScore = v.QualityScore,
                    SLAScore = v.SlaComplianceScore,
                    TotalSubmissions = v.TotalSubmissions,
                    SuccessfulPlacements = v.TotalJoinings,
                    Status = v.Status
                })
                .ToListAsync();
        }

        public async Task<decimal> CalculateVendorQualityScoreAsync(Guid vendorId, string tenantId)
        {
            _context.SetTenantId(tenantId);
            var vendor = await _context.Vendors.FirstOrDefaultAsync(v => v.Id == vendorId);
            if (vendor == null) return 0;

            var totalSubmissions = vendor.TotalSubmissions;
            if (totalSubmissions == 0) return 0;

            var successRate = (decimal)vendor.TotalJoinings / totalSubmissions * 100;
            return Math.Min(successRate, 100);
        }
    }
}
