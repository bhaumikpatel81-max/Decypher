using Decypher.Web.DTOs;
using Decypher.Web.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    public interface IVendorService
    {
        Task<IEnumerable<VendorDTO>> GetAllVendorsAsync(string tenantId);
        Task<VendorDTO?> GetVendorByIdAsync(Guid id, string tenantId);
        Task<VendorDTO> CreateVendorAsync(CreateVendorDTO dto, string tenantId, string userId);
        Task<VendorDTO?> UpdateVendorAsync(Guid id, UpdateVendorDTO dto, string tenantId);
        Task<bool> DeleteVendorAsync(Guid id, string tenantId);
        Task<IEnumerable<VendorDTO>> GetTopVendorsByPerformanceAsync(string tenantId, int count = 5);
        Task<decimal> CalculateVendorQualityScoreAsync(Guid vendorId, string tenantId);
    }
}
