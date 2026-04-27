using Decypher.Web.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    public interface ICandidateService
    {
        Task<IEnumerable<CandidateDTO>> GetAllCandidatesAsync(string tenantId);
        Task<CandidateDTO?> GetCandidateByIdAsync(Guid id, string tenantId);
        Task<CandidateDTO> CreateCandidateAsync(CreateCandidateDTO dto, string tenantId);
        Task<CandidateDTO?> UpdateCandidateAsync(Guid id, UpdateCandidateDTO dto, string tenantId);
        Task<bool> DeleteCandidateAsync(Guid id, string tenantId);
        Task<IEnumerable<CandidateDTO>> GetHighRiskCandidatesAsync(string tenantId, decimal threshold = 70);
        Task<IEnumerable<CandidateDTO>> GetCandidatesByStageAsync(string tenantId, string stage);
        Task<Dictionary<string, int>> GetCandidateCountByStageAsync(string tenantId);
        Task<decimal> CalculateDropoutRiskAsync(Guid candidateId, string tenantId);
    }
}
