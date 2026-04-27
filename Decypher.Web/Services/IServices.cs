using Decypher.Web.Models;

namespace Decypher.Web.Services
{
    public interface ITenantService
    {
        Task<Tenant?> GetTenantByIdAsync(Guid tenantId);
        Task<Tenant?> GetTenantByUserIdAsync(string userId);
        Task<bool> UpdateTenantAsync(Tenant tenant);
    }

    public interface IVendorService
    {
        Task<List<Vendor>> GetAllVendorsAsync(Guid tenantId);
        Task<Vendor?> GetVendorByIdAsync(Guid id);
        Task<bool> CreateVendorAsync(Vendor vendor);
        Task<bool> UpdateVendorAsync(Vendor vendor);
        Task<bool> DeleteVendorAsync(Guid id);
        Task<Dictionary<string, object>> GetVendorPerformanceMetricsAsync(Guid tenantId);
    }

    public interface IRequirementService
    {
        Task<List<Requirement>> GetAllRequirementsAsync(Guid tenantId);
        Task<Requirement?> GetRequirementByIdAsync(Guid id);
        Task<bool> CreateRequirementAsync(Requirement requirement);
        Task<bool> UpdateRequirementAsync(Requirement requirement);
        Task<bool> DeleteRequirementAsync(Guid id);
        Task<Dictionary<string, int>> GetRequirementStatusCountsAsync(Guid tenantId);
    }

    public interface ICandidateService
    {
        Task<List<Candidate>> GetAllCandidatesAsync(Guid tenantId);
        Task<Candidate?> GetCandidateByIdAsync(Guid id);
        Task<bool> CreateCandidateAsync(Candidate candidate);
        Task<bool> UpdateCandidateAsync(Candidate candidate);
        Task<bool> DeleteCandidateAsync(Guid id);
        Task<List<Candidate>> GetCandidatesByRequirementAsync(Guid requirementId);
        Task<List<Candidate>> GetCandidatesByVendorAsync(Guid vendorId);
        Task<Dictionary<string, int>> GetCandidateStageCountsAsync(Guid tenantId);
        Task<List<Candidate>> GetHighRiskCandidatesAsync(Guid tenantId, decimal riskThreshold = 70);
    }

    public interface IReportService
    {
        Task<Dictionary<string, object>> GetDashboardMetricsAsync(Guid tenantId);
        Task<List<RecruiterPerformance>> GetRecruiterPerformanceAsync(Guid tenantId, int? month = null, int? year = null);
        Task<Dictionary<string, object>> GetPipelineVelocityAsync(Guid tenantId);
    }

    public interface IAIService
    {
        Task<decimal> CalculateCvJdMatchScoreAsync(string cvText, string jdText);
        Task<decimal> PredictDropoutRiskAsync(Candidate candidate);
        Task<decimal> CalculateCompetencyScoreAsync(Candidate candidate, Dictionary<string, decimal> weights);
        Task<Dictionary<string, object>> AnalyzeJobDescriptionAsync(string jdText);
    }
}
