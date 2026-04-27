using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    public interface IDashboardService
    {
        Task<dynamic> GetDashboardMetricsAsync(string tenantId);
        Task<dynamic> GetHiringFunnelAsync(string tenantId);
        Task<dynamic> GetVendorPerformanceAsync(string tenantId);
        Task<dynamic> GetCandidatePipelineAsync(string tenantId);
        Task<dynamic> GetTimeToHireMetricsAsync(string tenantId);
    }
}
