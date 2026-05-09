using Decypher.Web.Data;
using Decypher.Web.Models;
using Decypher.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace Decypher.Web.Controllers;

[ApiController]
[Route("api/workflows")]
[Authorize]
public class WorkflowController(ApplicationDbContext db) : ControllerBase
{
    private Guid TenantId => Guid.TryParse(
        User.FindFirst("TenantId")?.Value ?? User.FindFirst("tenantId")?.Value, out var tid) ? tid : Guid.Empty;

    private string ActorId   => User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "";
    private string ActorName => User.FindFirst("fullName")?.Value ?? User.FindFirst(ClaimTypes.Name)?.Value ?? "System";

    // â”€â”€ Definitions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    [HttpGet("definitions")]
    public async Task<IActionResult> GetDefinitions([FromQuery] string? entityType)
    {
        var q = db.WorkflowDefinitions.Where(d => d.TenantId == TenantId && !d.IsDeleted && d.IsActive);
        if (!string.IsNullOrEmpty(entityType)) q = q.Where(d => d.EntityType == entityType);
        return Ok(await q.OrderBy(d => d.Name).ToListAsync());
    }

    [HttpGet("definitions/{id:guid}")]
    public async Task<IActionResult> GetDefinition(Guid id)
    {
        var def = await db.WorkflowDefinitions.FirstOrDefaultAsync(d => d.Id == id && d.TenantId == TenantId && !d.IsDeleted);
        return def == null ? NotFound() : Ok(def);
    }

    [HttpPost("definitions")]
    public async Task<IActionResult> CreateDefinition([FromBody] WorkflowDefinition def)
    {
        def.TenantId = TenantId;
        db.WorkflowDefinitions.Add(def);
        await db.SaveChangesAsync();
        return Created(string.Empty, def);
    }

    [HttpPut("definitions/{id:guid}")]
    public async Task<IActionResult> UpdateDefinition(Guid id, [FromBody] WorkflowDefinition req)
    {
        var def = await db.WorkflowDefinitions.FirstOrDefaultAsync(d => d.Id == id && d.TenantId == TenantId && !d.IsDeleted);
        if (def == null) return NotFound();
        def.Name       = req.Name;
        def.EntityType = req.EntityType;
        def.StepsJson  = req.StepsJson;
        def.IsActive   = req.IsActive;
        def.UpdatedAt  = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(def);
    }

    [HttpDelete("definitions/{id:guid}")]
    public async Task<IActionResult> DeleteDefinition(Guid id)
    {
        var def = await db.WorkflowDefinitions.FirstOrDefaultAsync(d => d.Id == id && d.TenantId == TenantId && !d.IsDeleted);
        if (def == null) return NotFound();
        def.IsDeleted = true;
        await db.SaveChangesAsync();
        return NoContent();
    }

    // â”€â”€ Instances â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    [HttpGet("instances")]
    public async Task<IActionResult> GetInstances([FromQuery] string? entityType, [FromQuery] string? status, [FromQuery] Guid? entityId)
    {
        var q = db.WorkflowInstances
            .Include(i => i.Definition)
            .Where(i => i.TenantId == TenantId && !i.IsDeleted);
        if (!string.IsNullOrEmpty(entityType)) q = q.Where(i => i.EntityType == entityType);
        if (!string.IsNullOrEmpty(status))     q = q.Where(i => i.Status == status);
        if (entityId.HasValue)                 q = q.Where(i => i.EntityId == entityId.Value);

        return Ok(await q.OrderByDescending(i => i.StartedAt).ToListAsync());
    }

    [HttpGet("instances/{id:guid}")]
    public async Task<IActionResult> GetInstance(Guid id)
    {
        var inst = await db.WorkflowInstances
            .Include(i => i.Definition)
            .Include(i => i.StepHistory.OrderBy(s => s.StepIndex))
            .FirstOrDefaultAsync(i => i.Id == id && i.TenantId == TenantId && !i.IsDeleted);
        return inst == null ? NotFound() : Ok(inst);
    }

    // POST /api/workflows/start â€” start a workflow instance for an entity
    [HttpPost("start")]
    public async Task<IActionResult> StartWorkflow([FromBody] StartWorkflowRequest req)
    {
        var def = await db.WorkflowDefinitions.FirstOrDefaultAsync(d => d.Id == req.DefinitionId && d.TenantId == TenantId && !d.IsDeleted);
        if (def == null) return NotFound(new { message = "Workflow definition not found." });

        var steps = JsonSerializer.Deserialize<JsonElement[]>(def.StepsJson) ?? [];
        var slaDays = steps.Length > 0 && steps[0].TryGetProperty("slaDays", out var sla) ? sla.GetInt32() : 3;

        var instance = new WorkflowInstance
        {
            TenantId     = TenantId,
            DefinitionId = def.Id,
            EntityId     = req.EntityId,
            EntityType   = def.EntityType,
            CurrentStep  = 0,
            TotalSteps   = steps.Length,
            Status       = "InProgress",
            SLADeadline  = DateTime.UtcNow.AddDays(slaDays)
        };
        db.WorkflowInstances.Add(instance);

        db.WorkflowStepHistories.Add(new WorkflowStepHistory
        {
            TenantId    = TenantId,
            InstanceId  = instance.Id,
            StepIndex   = 0,
            StepName    = steps.Length > 0 && steps[0].TryGetProperty("name", out var n) ? n.GetString()! : "Start",
            Action      = "Created",
            ActorName   = ActorName,
            ActorId     = ActorId,
            Notes       = req.Notes
        });

        await db.SaveChangesAsync();
        return Created(string.Empty, instance);
    }

    // POST /api/workflows/instances/{id}/approve
    [HttpPost("instances/{id:guid}/approve")]
    public async Task<IActionResult> ApproveStep(Guid id, [FromBody] WorkflowActionRequest req)
    {
        var inst = await db.WorkflowInstances.Include(i => i.Definition)
            .FirstOrDefaultAsync(i => i.Id == id && i.TenantId == TenantId && !i.IsDeleted);
        if (inst == null) return NotFound();
        if (inst.Status != "InProgress") return BadRequest(new { message = "Workflow is not in progress." });

        var steps = JsonSerializer.Deserialize<JsonElement[]>(inst.Definition.StepsJson) ?? [];
        var stepName = inst.CurrentStep < steps.Length && steps[inst.CurrentStep].TryGetProperty("name", out var n)
            ? n.GetString()! : $"Step {inst.CurrentStep}";

        db.WorkflowStepHistories.Add(new WorkflowStepHistory
        {
            TenantId   = TenantId,
            InstanceId = inst.Id,
            StepIndex  = inst.CurrentStep,
            StepName   = stepName,
            Action     = "Approved",
            ActorName  = ActorName,
            ActorId    = ActorId,
            Notes      = req.Notes
        });

        inst.CurrentStep++;
        if (inst.CurrentStep >= inst.TotalSteps)
        {
            inst.Status      = "Approved";
            inst.CompletedAt = DateTime.UtcNow;
        }
        inst.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(inst);
    }

    // POST /api/workflows/instances/{id}/reject
    [HttpPost("instances/{id:guid}/reject")]
    public async Task<IActionResult> RejectStep(Guid id, [FromBody] WorkflowActionRequest req)
    {
        var inst = await db.WorkflowInstances.Include(i => i.Definition)
            .FirstOrDefaultAsync(i => i.Id == id && i.TenantId == TenantId && !i.IsDeleted);
        if (inst == null) return NotFound();
        if (inst.Status != "InProgress") return BadRequest(new { message = "Workflow is not in progress." });

        var steps = JsonSerializer.Deserialize<JsonElement[]>(inst.Definition.StepsJson) ?? [];
        var stepName = inst.CurrentStep < steps.Length && steps[inst.CurrentStep].TryGetProperty("name", out var n)
            ? n.GetString()! : $"Step {inst.CurrentStep}";

        db.WorkflowStepHistories.Add(new WorkflowStepHistory
        {
            TenantId   = TenantId,
            InstanceId = inst.Id,
            StepIndex  = inst.CurrentStep,
            StepName   = stepName,
            Action     = "Rejected",
            ActorName  = ActorName,
            ActorId    = ActorId,
            Notes      = req.Notes
        });

        inst.Status      = "Rejected";
        inst.CompletedAt = DateTime.UtcNow;
        inst.UpdatedAt   = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(inst);
    }

    // GET /api/workflows/sla-breaches â€” instances past their SLA deadline
    [HttpGet("sla-breaches")]
    public async Task<IActionResult> GetSLABreaches()
    {
        var now = DateTime.UtcNow;
        var breached = await db.WorkflowInstances
            .Include(i => i.Definition)
            .Where(i => i.TenantId == TenantId && !i.IsDeleted && i.Status == "InProgress"
                     && i.SLADeadline != null && i.SLADeadline < now)
            .OrderBy(i => i.SLADeadline)
            .ToListAsync();

        // Mark as breached
        foreach (var inst in breached.Where(i => !i.SLABreached))
        {
            inst.SLABreached = true;
        }
        await db.SaveChangesAsync();

        return Ok(breached);
    }
}

public record StartWorkflowRequest(Guid DefinitionId, Guid EntityId, string? Notes);
public record WorkflowActionRequest(string? Notes);

