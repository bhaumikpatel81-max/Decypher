using Decypher.Web.Data;
using Decypher.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Decypher.Web.Services
{
    public interface IPipelineBoardService
    {
        Task<object> GetBoardAsync(Guid jobId, Guid tenantId);
        Task MoveCandidateAsync(MoveCandidateRequest req, string userId, Guid tenantId);
        Task<PipelineStage> CreateStageAsync(PipelineStage stage);
        Task<List<PipelineStage>> GetStagesAsync(Guid tenantId);
    }

    public class PipelineBoardService : IPipelineBoardService
    {
        private readonly ApplicationDbContext _db;

        public PipelineBoardService(ApplicationDbContext db) => _db = db;

        public async Task<object> GetBoardAsync(Guid jobId, Guid tenantId)
        {
            var stages = _db.PipelineStages
                            .Where(s => s.TenantId == tenantId)
                            .OrderBy(s => s.Order)
                            .ToList();

            var candidateStages = _db.CandidateStages
                                     .Where(cs => cs.JobId == jobId && cs.TenantId == tenantId)
                                     .ToList();

            return await Task.FromResult(stages.Select(s => new
            {
                stage = s,
                candidates = candidateStages
                    .Where(cs => cs.StageId == s.Id)
                    .Select(cs => new { cs.CandidateId, cs.MovedAt, cs.MovedByUserId })
                    .ToList()
            }));
        }

        public async Task MoveCandidateAsync(MoveCandidateRequest req, string userId, Guid tenantId)
        {
            var existing = _db.CandidateStages
                              .FirstOrDefault(cs => cs.CandidateId == req.CandidateId && cs.JobId == req.JobId && cs.TenantId == tenantId);

            if (existing != null)
            {
                existing.StageId = req.NewStageId;
                existing.MovedAt = DateTime.UtcNow;
                existing.MovedByUserId = userId;
            }
            else
            {
                _db.CandidateStages.Add(new CandidateStage
                {
                    CandidateId = req.CandidateId,
                    JobId = req.JobId,
                    StageId = req.NewStageId,
                    MovedByUserId = userId,
                    TenantId = tenantId
                });
            }

            await _db.SaveChangesAsync();
        }

        public async Task<PipelineStage> CreateStageAsync(PipelineStage stage)
        {
            _db.PipelineStages.Add(stage);
            await _db.SaveChangesAsync();
            return stage;
        }

        public async Task<List<PipelineStage>> GetStagesAsync(Guid tenantId)
        {
            return await Task.FromResult(
                _db.PipelineStages
                   .Where(s => s.TenantId == tenantId)
                   .OrderBy(s => s.Order)
                   .ToList());
        }
    }
}
