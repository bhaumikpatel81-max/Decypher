using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Decypher.Web.Data;
using Decypher.Web.Models;
using System.Security.Claims;
using System.Text.Json;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace Decypher.Web.Controllers
{
    [ApiController]
    [Route("api/internal-audit")]
    [Authorize]
    public class InternalAuditController(ApplicationDbContext db) : ControllerBase
    {
        private Guid TenantId => Guid.TryParse(User.FindFirst("tenantId")?.Value, out var t) ? t : Guid.Empty;
        private string UserName => User.FindFirst(ClaimTypes.Name)?.Value ?? User.FindFirst("sub")?.Value ?? "System";
        private bool IsSuperAdmin => User.IsInRole("SuperAdmin");

        // ─── DTOs ───────────────────────────────────────────────────────────

        public record CreateAuditReportDto(
            string Title,
            string DepartmentType,
            string FinancialYear,
            DateTime? AuditDate,
            string? AuditedBy,
            string? ReviewedBy,
            string? ApprovedBy,
            string? ExecutiveSummary
        );

        public record UpdateAuditReportDto(
            string Title,
            string DepartmentType,
            string Status,
            string FinancialYear,
            DateTime? AuditDate,
            string? AuditedBy,
            string? ReviewedBy,
            string? ApprovedBy,
            string? ExecutiveSummary
        );

        public record AuditObservationDto(
            string Title,
            string RiskLevel,
            string Status,
            string? ProcessArea,
            string? Background,
            string? DetailedObservation,
            List<string>? Risks,
            List<string>? Recommendations,
            string? MgmtCause,
            string? MgmtCorrectiveAction,
            string? MgmtPreventiveAction,
            DateTime? MgmtTargetDate,
            string? MgmtResponsiblePerson,
            string? MgmtResponsibleDesignation,
            bool IsAlreadyImplemented,
            bool IsProcessImprovement,
            decimal? FinancialImpact
        );

        public record AuditOverviewStatDto(
            string Category,
            string Label,
            string? Value,
            string? Unit
        );

        // ─── GET /api/internal-audit/reports ────────────────────────────────

        [HttpGet("reports")]
        public async Task<IActionResult> GetReports(
            [FromQuery] string? departmentType,
            [FromQuery] string? status,
            [FromQuery] string? financialYear)
        {
            var query = db.AuditReports
                .Where(r => r.TenantId == TenantId);

            if (!string.IsNullOrEmpty(departmentType))
                query = query.Where(r => r.DepartmentType == departmentType);
            if (!string.IsNullOrEmpty(status))
                query = query.Where(r => r.Status == status);
            if (!string.IsNullOrEmpty(financialYear))
                query = query.Where(r => r.FinancialYear == financialYear);

            var reports = await query
                .OrderByDescending(r => r.AuditDate)
                .Select(r => new
                {
                    r.Id, r.Title, r.DepartmentType, r.Status, r.FinancialYear,
                    r.AuditDate, r.AuditedBy, r.TotalObservations,
                    r.HighRiskCount, r.MediumRiskCount, r.LowRiskCount, r.ClosedCount,
                    r.CreatedAt
                })
                .ToListAsync();

            return Ok(reports);
        }

        // ─── GET /api/internal-audit/reports/{id} ───────────────────────────

        [HttpGet("reports/{id}")]
        public async Task<IActionResult> GetReport(Guid id)
        {
            var report = await db.AuditReports
                .Where(r => r.Id == id && r.TenantId == TenantId)
                .Include(r => r.ScopeAreas.OrderBy(s => s.SortOrder))
                .Include(r => r.OverviewStats)
                .Include(r => r.Observations.OrderBy(o => o.ObservationNumber))
                .FirstOrDefaultAsync();

            if (report == null) return NotFound();

            return Ok(new
            {
                report.Id, report.Title, report.DepartmentType, report.Status,
                report.FinancialYear, report.AuditDate, report.AuditedBy,
                report.ReviewedBy, report.ApprovedBy, report.ExecutiveSummary,
                report.TotalObservations, report.HighRiskCount, report.MediumRiskCount,
                report.LowRiskCount, report.ClosedCount, report.CreatedAt, report.UpdatedAt,
                scopeAreas = report.ScopeAreas.Select(s => new { s.Id, s.Name, s.Description, s.SortOrder }),
                overviewStats = report.OverviewStats.Select(s => new { s.Id, s.Category, s.Label, s.Value, s.Unit }),
                observations = report.Observations.Select(o => new
                {
                    o.Id, o.ObservationNumber, o.Title, o.RiskLevel, o.Status,
                    o.ProcessArea, o.Background, o.DetailedObservation,
                    risks = TryParseJson(o.Risks),
                    recommendations = TryParseJson(o.Recommendations),
                    o.MgmtCause, o.MgmtCorrectiveAction, o.MgmtPreventiveAction,
                    o.MgmtTargetDate, o.MgmtResponsiblePerson, o.MgmtResponsibleDesignation,
                    o.IsAlreadyImplemented, o.IsProcessImprovement, o.FinancialImpact
                })
            });
        }

        // ─── POST /api/internal-audit/reports ───────────────────────────────

        [HttpPost("reports")]
        [Authorize(Roles = "SuperAdmin,TenantAdmin")]
        public async Task<IActionResult> CreateReport([FromBody] CreateAuditReportDto dto)
        {
            var report = new AuditReport
            {
                TenantId = TenantId,
                Title = dto.Title,
                DepartmentType = dto.DepartmentType,
                FinancialYear = dto.FinancialYear,
                AuditDate = dto.AuditDate ?? DateTime.UtcNow,
                AuditedBy = dto.AuditedBy ?? UserName,
                ReviewedBy = dto.ReviewedBy,
                ApprovedBy = dto.ApprovedBy,
                ExecutiveSummary = dto.ExecutiveSummary,
                Status = "Draft"
            };

            db.AuditReports.Add(report);

            var defaultAreas = GetDefaultScopeAreas(dto.DepartmentType);
            for (int i = 0; i < defaultAreas.Count; i++)
            {
                db.AuditScopeAreas.Add(new AuditScopeArea
                {
                    ReportId = report.Id,
                    TenantId = TenantId,
                    Name = defaultAreas[i].name,
                    Description = defaultAreas[i].desc,
                    SortOrder = i + 1
                });
            }

            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReport), new { id = report.Id }, new { report.Id });
        }

        // ─── PUT /api/internal-audit/reports/{id} ───────────────────────────

        [HttpPut("reports/{id}")]
        [Authorize(Roles = "SuperAdmin,TenantAdmin")]
        public async Task<IActionResult> UpdateReport(Guid id, [FromBody] UpdateAuditReportDto dto)
        {
            var report = await db.AuditReports
                .Include(r => r.Observations)
                .FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId);

            if (report == null) return NotFound();

            report.Title = dto.Title;
            report.DepartmentType = dto.DepartmentType;
            report.Status = dto.Status;
            report.FinancialYear = dto.FinancialYear;
            report.AuditDate = dto.AuditDate ?? report.AuditDate;
            report.AuditedBy = dto.AuditedBy;
            report.ReviewedBy = dto.ReviewedBy;
            report.ApprovedBy = dto.ApprovedBy;
            report.ExecutiveSummary = dto.ExecutiveSummary;

            RecomputeCounts(report);
            await db.SaveChangesAsync();
            return Ok(new { report.Id, report.Status });
        }

        // ─── DELETE /api/internal-audit/reports/{id} ────────────────────────

        [HttpDelete("reports/{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteReport(Guid id)
        {
            var report = await db.AuditReports.FirstOrDefaultAsync(r => r.Id == id && r.TenantId == TenantId);
            if (report == null) return NotFound();
            db.AuditReports.Remove(report);
            await db.SaveChangesAsync();
            return NoContent();
        }

        // ─── POST /api/internal-audit/reports/{reportId}/observations ───────

        [HttpPost("reports/{reportId}/observations")]
        public async Task<IActionResult> AddObservation(Guid reportId, [FromBody] AuditObservationDto dto)
        {
            var report = await db.AuditReports
                .Include(r => r.Observations)
                .FirstOrDefaultAsync(r => r.Id == reportId && r.TenantId == TenantId);

            if (report == null) return NotFound();

            int nextNum = report.Observations.Any() ? report.Observations.Max(o => o.ObservationNumber) + 1 : 1;

            var obs = new AuditObservation
            {
                ReportId = reportId,
                TenantId = TenantId,
                ObservationNumber = nextNum,
                Title = dto.Title,
                RiskLevel = dto.RiskLevel,
                Status = dto.Status,
                ProcessArea = dto.ProcessArea,
                Background = dto.Background,
                DetailedObservation = dto.DetailedObservation,
                Risks = dto.Risks != null ? JsonSerializer.Serialize(dto.Risks) : null,
                Recommendations = dto.Recommendations != null ? JsonSerializer.Serialize(dto.Recommendations) : null,
                MgmtCause = dto.MgmtCause,
                MgmtCorrectiveAction = dto.MgmtCorrectiveAction,
                MgmtPreventiveAction = dto.MgmtPreventiveAction,
                MgmtTargetDate = dto.MgmtTargetDate,
                MgmtResponsiblePerson = dto.MgmtResponsiblePerson,
                MgmtResponsibleDesignation = dto.MgmtResponsibleDesignation,
                IsAlreadyImplemented = dto.IsAlreadyImplemented,
                IsProcessImprovement = dto.IsProcessImprovement,
                FinancialImpact = dto.FinancialImpact
            };

            db.AuditObservations.Add(obs);
            report.Observations.Add(obs);
            RecomputeCounts(report);
            await db.SaveChangesAsync();
            return Ok(new { obs.Id, obs.ObservationNumber });
        }

        // ─── PUT /api/internal-audit/observations/{id} ──────────────────────

        [HttpPut("observations/{id}")]
        public async Task<IActionResult> UpdateObservation(Guid id, [FromBody] AuditObservationDto dto)
        {
            var obs = await db.AuditObservations.FirstOrDefaultAsync(o => o.Id == id && o.TenantId == TenantId);
            if (obs == null) return NotFound();

            obs.Title = dto.Title;
            obs.RiskLevel = dto.RiskLevel;
            obs.Status = dto.Status;
            obs.ProcessArea = dto.ProcessArea;
            obs.Background = dto.Background;
            obs.DetailedObservation = dto.DetailedObservation;
            obs.Risks = dto.Risks != null ? JsonSerializer.Serialize(dto.Risks) : null;
            obs.Recommendations = dto.Recommendations != null ? JsonSerializer.Serialize(dto.Recommendations) : null;
            obs.MgmtCause = dto.MgmtCause;
            obs.MgmtCorrectiveAction = dto.MgmtCorrectiveAction;
            obs.MgmtPreventiveAction = dto.MgmtPreventiveAction;
            obs.MgmtTargetDate = dto.MgmtTargetDate;
            obs.MgmtResponsiblePerson = dto.MgmtResponsiblePerson;
            obs.MgmtResponsibleDesignation = dto.MgmtResponsibleDesignation;
            obs.IsAlreadyImplemented = dto.IsAlreadyImplemented;
            obs.IsProcessImprovement = dto.IsProcessImprovement;
            obs.FinancialImpact = dto.FinancialImpact;
            obs.UpdatedAt = DateTime.UtcNow;

            var report = await db.AuditReports.Include(r => r.Observations)
                .FirstOrDefaultAsync(r => r.Id == obs.ReportId);
            if (report != null) RecomputeCounts(report);

            await db.SaveChangesAsync();
            return Ok(new { obs.Id });
        }

        // ─── DELETE /api/internal-audit/observations/{id} ───────────────────

        [HttpDelete("observations/{id}")]
        public async Task<IActionResult> DeleteObservation(Guid id)
        {
            var obs = await db.AuditObservations.FirstOrDefaultAsync(o => o.Id == id && o.TenantId == TenantId);
            if (obs == null) return NotFound();
            var reportId = obs.ReportId;
            db.AuditObservations.Remove(obs);
            await db.SaveChangesAsync();

            var report = await db.AuditReports.Include(r => r.Observations)
                .FirstOrDefaultAsync(r => r.Id == reportId);
            if (report != null) { RecomputeCounts(report); await db.SaveChangesAsync(); }

            return NoContent();
        }

        // ─── POST /api/internal-audit/reports/{reportId}/stats ──────────────

        [HttpPost("reports/{reportId}/stats")]
        [Authorize(Roles = "SuperAdmin,TenantAdmin")]
        public async Task<IActionResult> UpsertStats(Guid reportId, [FromBody] List<AuditOverviewStatDto> stats)
        {
            var report = await db.AuditReports.FirstOrDefaultAsync(r => r.Id == reportId && r.TenantId == TenantId);
            if (report == null) return NotFound();

            var existing = await db.AuditOverviewStats.Where(s => s.ReportId == reportId).ToListAsync();
            db.AuditOverviewStats.RemoveRange(existing);

            foreach (var s in stats)
            {
                db.AuditOverviewStats.Add(new AuditOverviewStat
                {
                    ReportId = reportId,
                    TenantId = TenantId,
                    Category = s.Category,
                    Label = s.Label,
                    Value = s.Value,
                    Unit = s.Unit
                });
            }

            await db.SaveChangesAsync();
            return Ok();
        }

        // ─── GET /api/internal-audit/reports/{id}/export/pdf ────────────────

        [HttpGet("reports/{id}/export/pdf")]
        public async Task<IActionResult> ExportPdf(Guid id)
        {
            var report = await db.AuditReports
                .Where(r => r.Id == id && r.TenantId == TenantId)
                .Include(r => r.ScopeAreas.OrderBy(s => s.SortOrder))
                .Include(r => r.OverviewStats)
                .Include(r => r.Observations.OrderBy(o => o.ObservationNumber))
                .FirstOrDefaultAsync();

            if (report == null) return NotFound();

            using var ms = new MemoryStream();
            var doc = new Document(PageSize.A4, 36, 36, 54, 36);
            var writer = PdfWriter.GetInstance(doc, ms);
            doc.Open();

            var navy = new BaseColor(41, 41, 102);
            var amber = new BaseColor(184, 83, 9);
            var gray3 = new BaseColor(100, 116, 139);
            var lightGray = new BaseColor(248, 250, 252);

            var fontH1 = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 20, navy);
            var fontH2 = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 13, navy);
            var fontH3 = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 11, BaseColor.WHITE);
            var fontBody = FontFactory.GetFont(FontFactory.HELVETICA, 9, BaseColor.BLACK);
            var fontSmall = FontFactory.GetFont(FontFactory.HELVETICA, 8, gray3);
            var fontBold = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 9, BaseColor.BLACK);
            var fontAmber = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 9, amber);

            // Cover header
            var titlePara = new Paragraph(report.Title, fontH1) { SpacingAfter = 6 };
            doc.Add(titlePara);

            var meta = new PdfPTable(3) { WidthPercentage = 100, SpacingAfter = 16 };
            meta.SetWidths(new float[] { 1, 1, 1 });
            AddMetaCell(meta, "Department", report.DepartmentType, fontSmall, fontBody);
            AddMetaCell(meta, "Financial Year", report.FinancialYear, fontSmall, fontBody);
            AddMetaCell(meta, "Audit Date", report.AuditDate.ToString("dd MMM yyyy"), fontSmall, fontBody);
            AddMetaCell(meta, "Audited By", report.AuditedBy ?? "—", fontSmall, fontBody);
            AddMetaCell(meta, "Reviewed By", report.ReviewedBy ?? "—", fontSmall, fontBody);
            AddMetaCell(meta, "Status", report.Status, fontSmall, fontBold);
            doc.Add(meta);

            // Observation summary bar
            var summaryTable = new PdfPTable(5) { WidthPercentage = 100, SpacingAfter = 20 };
            summaryTable.SetWidths(new float[] { 1, 1, 1, 1, 1 });
            AddSummaryCell(summaryTable, report.TotalObservations.ToString(), "Total", navy);
            AddSummaryCell(summaryTable, report.HighRiskCount.ToString(), "High Risk", new BaseColor(220, 38, 38));
            AddSummaryCell(summaryTable, report.MediumRiskCount.ToString(), "Medium Risk", new BaseColor(245, 158, 11));
            AddSummaryCell(summaryTable, report.LowRiskCount.ToString(), "Low Risk", new BaseColor(16, 185, 129));
            AddSummaryCell(summaryTable, report.ClosedCount.ToString(), "Closed", new BaseColor(107, 114, 128));
            doc.Add(summaryTable);

            // Executive Summary
            if (!string.IsNullOrEmpty(report.ExecutiveSummary))
            {
                doc.Add(new Paragraph("Executive Summary", fontH2) { SpacingAfter = 6 });
                doc.Add(new Paragraph(report.ExecutiveSummary, fontBody) { SpacingAfter = 16 });
            }

            // Scope of Audit
            if (report.ScopeAreas.Any())
            {
                doc.Add(new Paragraph("Scope of Audit", fontH2) { SpacingAfter = 6 });
                var scopeList = new List(false, 10);
                foreach (var area in report.ScopeAreas)
                {
                    var item = new ListItem(area.Name, fontBody);
                    if (!string.IsNullOrEmpty(area.Description))
                        item.Add(new Chunk($" — {area.Description}", fontSmall));
                    scopeList.Add(item);
                }
                doc.Add(scopeList);
                doc.Add(new Paragraph(" ") { SpacingAfter = 10 });
            }

            // Overview Stats
            if (report.OverviewStats.Any())
            {
                doc.Add(new Paragraph("Overview Statistics", fontH2) { SpacingAfter = 6 });
                var statsTable = new PdfPTable(4) { WidthPercentage = 100, SpacingAfter = 16 };
                statsTable.SetWidths(new float[] { 1.5f, 1, 1, 1 });
                foreach (var header in new[] { "Category", "Label", "Value", "Unit" })
                {
                    var cell = new PdfPCell(new Phrase(header, fontH3)) { BackgroundColor = navy, Padding = 6 };
                    statsTable.AddCell(cell);
                }
                foreach (var s in report.OverviewStats)
                {
                    statsTable.AddCell(new PdfPCell(new Phrase(s.Category, fontBody)) { Padding = 5 });
                    statsTable.AddCell(new PdfPCell(new Phrase(s.Label, fontBody)) { Padding = 5 });
                    statsTable.AddCell(new PdfPCell(new Phrase(s.Value ?? "—", fontBold)) { Padding = 5 });
                    statsTable.AddCell(new PdfPCell(new Phrase(s.Unit ?? "—", fontSmall)) { Padding = 5 });
                }
                doc.Add(statsTable);
            }

            // Observations
            if (report.Observations.Any())
            {
                doc.Add(new Paragraph("Audit Observations", fontH2) { SpacingAfter = 10 });

                foreach (var obs in report.Observations)
                {
                    var riskColor = obs.RiskLevel == "High" ? new BaseColor(220, 38, 38)
                        : obs.RiskLevel == "Medium" ? new BaseColor(245, 158, 11)
                        : new BaseColor(16, 185, 129);

                    var obsHeader = new PdfPTable(1) { WidthPercentage = 100, SpacingBefore = 8, SpacingAfter = 0 };
                    var headerCell = new PdfPCell(new Phrase($"Observation {obs.ObservationNumber}: {obs.Title}", fontH3))
                    {
                        BackgroundColor = navy, Padding = 8, Border = Rectangle.NO_BORDER
                    };
                    obsHeader.AddCell(headerCell);
                    doc.Add(obsHeader);

                    var detailTable = new PdfPTable(2) { WidthPercentage = 100, SpacingAfter = 0 };
                    detailTable.SetWidths(new float[] { 1, 3 });

                    AddDetailRow(detailTable, "Risk Level", obs.RiskLevel, fontBold, new Font(fontBold) { Color = riskColor });
                    AddDetailRow(detailTable, "Status", obs.Status, fontBold, fontAmber);
                    if (!string.IsNullOrEmpty(obs.ProcessArea))
                        AddDetailRow(detailTable, "Process Area", obs.ProcessArea, fontBold, fontBody);
                    if (!string.IsNullOrEmpty(obs.Background))
                        AddDetailRow(detailTable, "Background", obs.Background, fontBold, fontBody);
                    if (!string.IsNullOrEmpty(obs.DetailedObservation))
                        AddDetailRow(detailTable, "Observation", obs.DetailedObservation, fontBold, fontBody);

                    var risks = TryParseJson(obs.Risks);
                    if (risks.Any())
                        AddDetailRow(detailTable, "Risks", string.Join("\n• ", risks.Prepend("")), fontBold, fontBody);

                    var recs = TryParseJson(obs.Recommendations);
                    if (recs.Any())
                        AddDetailRow(detailTable, "Recommendations", string.Join("\n• ", recs.Prepend("")), fontBold, fontBody);

                    if (!string.IsNullOrEmpty(obs.MgmtCause))
                        AddDetailRow(detailTable, "Mgmt Cause", obs.MgmtCause, fontBold, fontBody);
                    if (!string.IsNullOrEmpty(obs.MgmtCorrectiveAction))
                        AddDetailRow(detailTable, "Corrective Action", obs.MgmtCorrectiveAction, fontBold, fontBody);
                    if (!string.IsNullOrEmpty(obs.MgmtPreventiveAction))
                        AddDetailRow(detailTable, "Preventive Action", obs.MgmtPreventiveAction, fontBold, fontBody);
                    if (obs.MgmtTargetDate.HasValue)
                        AddDetailRow(detailTable, "Target Date", obs.MgmtTargetDate.Value.ToString("dd MMM yyyy"), fontBold, fontBody);
                    if (!string.IsNullOrEmpty(obs.MgmtResponsiblePerson))
                        AddDetailRow(detailTable, "Responsible", $"{obs.MgmtResponsiblePerson} ({obs.MgmtResponsibleDesignation})", fontBold, fontBody);

                    doc.Add(detailTable);
                }
            }

            doc.Close();
            var fileName = $"InternalAudit_{report.DepartmentType}_{report.FinancialYear}.pdf"
                .Replace(" ", "_");
            return File(ms.ToArray(), "application/pdf", fileName);
        }

        // ─── GET /api/internal-audit/reports/{id}/export/pptx ───────────────

        [HttpGet("reports/{id}/export/pptx")]
        public async Task<IActionResult> ExportPptx(Guid id)
        {
            var report = await db.AuditReports
                .Where(r => r.Id == id && r.TenantId == TenantId)
                .Include(r => r.Observations.OrderBy(o => o.ObservationNumber))
                .FirstOrDefaultAsync();

            if (report == null) return NotFound();

            // TODO: Full PPTX generation using DocumentFormat.OpenXml
            return Ok(new { message = "PPTX export coming soon", reportId = id });
        }

        // ─── Helpers ────────────────────────────────────────────────────────

        private static void RecomputeCounts(AuditReport report)
        {
            report.TotalObservations = report.Observations.Count;
            report.HighRiskCount = report.Observations.Count(o => o.RiskLevel == "High");
            report.MediumRiskCount = report.Observations.Count(o => o.RiskLevel == "Medium");
            report.LowRiskCount = report.Observations.Count(o => o.RiskLevel == "Low");
            report.ClosedCount = report.Observations.Count(o => o.Status == "Closed");
        }

        private static List<string> TryParseJson(string? json)
        {
            if (string.IsNullOrEmpty(json)) return [];
            try { return JsonSerializer.Deserialize<List<string>>(json) ?? []; }
            catch { return []; }
        }

        private static void AddMetaCell(PdfPTable table, string label, string value, Font labelFont, Font valueFont)
        {
            var cell = new PdfPCell();
            cell.AddElement(new Phrase(label.ToUpper(), labelFont));
            cell.AddElement(new Phrase(value, valueFont));
            cell.Border = Rectangle.NO_BORDER;
            cell.Padding = 4;
            table.AddCell(cell);
        }

        private static void AddSummaryCell(PdfPTable table, string value, string label, BaseColor color)
        {
            var fontVal = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.WHITE);
            var fontLbl = FontFactory.GetFont(FontFactory.HELVETICA, 8, BaseColor.WHITE);
            var cell = new PdfPCell();
            cell.BackgroundColor = color;
            cell.AddElement(new Paragraph(value, fontVal) { Alignment = Element.ALIGN_CENTER });
            cell.AddElement(new Paragraph(label, fontLbl) { Alignment = Element.ALIGN_CENTER });
            cell.HorizontalAlignment = Element.ALIGN_CENTER;
            cell.Padding = 10;
            cell.Border = Rectangle.NO_BORDER;
            table.AddCell(cell);
        }

        private static void AddDetailRow(PdfPTable table, string label, string value, Font labelFont, Font valueFont)
        {
            var labelCell = new PdfPCell(new Phrase(label, labelFont))
            {
                BackgroundColor = new BaseColor(248, 250, 252), Padding = 6,
                Border = Rectangle.BOX, BorderColor = new BaseColor(226, 232, 240)
            };
            var valueCell = new PdfPCell(new Phrase(value, valueFont))
            {
                Padding = 6, Border = Rectangle.BOX,
                BorderColor = new BaseColor(226, 232, 240)
            };
            table.AddCell(labelCell);
            table.AddCell(valueCell);
        }

        private static List<(string name, string desc)> GetDefaultScopeAreas(string deptType) => deptType switch
        {
            "HR" => [
                ("Recruitment & Onboarding", "End-to-end hiring process, background verification, onboarding checklists"),
                ("Payroll & Compensation", "Salary processing, statutory deductions, reimbursement controls"),
                ("Leave & Attendance Management", "Leave policy adherence, attendance records, overtime approval"),
                ("Performance Management", "Appraisal cycles, goal-setting process, rating distribution"),
                ("Training & Development", "Training needs analysis, training effectiveness, certification tracking"),
                ("Employee Separation", "Exit interview process, F&F settlement, knowledge transfer"),
                ("HR Compliance & Statutory", "PF, ESI, gratuity compliance, labour law adherence"),
                ("Employee Data Management", "HRIS data accuracy, data privacy controls, access management")
            ],
            "IT" => [
                ("IT Asset Management", "Inventory tracking, asset lifecycle, disposal procedures"),
                ("Access Control & IAM", "User provisioning, privilege management, access reviews"),
                ("Network & Infrastructure Security", "Firewall rules, patch management, vulnerability assessments"),
                ("Data Backup & Recovery", "Backup frequency, RTO/RPO targets, DR drill outcomes"),
                ("Software License Compliance", "License inventory, unused licenses, procurement process"),
                ("Incident & Change Management", "Change approval process, incident response SLAs, post-mortems"),
                ("Cybersecurity Awareness", "Phishing simulations, security training completion rates"),
                ("Vendor & Third-Party Risk", "SLA monitoring, vendor assessments, contract reviews")
            ],
            "Finance" => [
                ("Accounts Payable", "Invoice processing, payment authorization, duplicate payment controls"),
                ("Accounts Receivable", "Credit policy, collections process, bad-debt provisioning"),
                ("Cash & Bank Management", "Bank reconciliation, petty cash controls, fund transfers"),
                ("Budgeting & Forecasting", "Budget preparation process, variance analysis, reforecasting"),
                ("Fixed Asset Management", "Capitalization policy, depreciation calculation, physical verification"),
                ("Revenue Recognition", "Revenue accounting policies, contract billing, cut-off procedures"),
                ("Tax Compliance", "Direct & indirect tax filings, TDS/GST reconciliation"),
                ("Financial Reporting", "Month-end close process, financial statement accuracy, disclosures")
            ],
            "Admin" => [
                ("Facility Management", "Office maintenance, housekeeping standards, vendor contracts"),
                ("Procurement & Purchase", "Purchase order process, vendor empanelment, price comparisons"),
                ("Travel & Expense Management", "Travel policy adherence, advance settlements, expense verification"),
                ("Vehicle & Fleet Management", "Vehicle log books, fuel consumption, maintenance schedules"),
                ("Mail & Courier Management", "Inward/outward register, courier vendor performance"),
                ("Security & Access Control", "Visitor management, access cards, CCTV monitoring"),
                ("Inventory & Stationery", "Stock register maintenance, consumption monitoring"),
                ("Canteen & Pantry Management", "Food safety standards, vendor compliance, billing accuracy")
            ],
            "Procurement" => [
                ("Vendor Onboarding & Empanelment", "Due diligence process, documentation, approval matrix"),
                ("RFQ & Tendering Process", "Bid evaluation, single-source justification, approval workflow"),
                ("Purchase Order Management", "PO creation, amendment controls, approval authority matrix"),
                ("Contract Management", "Contract terms, renewal tracking, penalty clauses"),
                ("Receiving & Quality Inspection", "GRN process, quality checks, rejection handling"),
                ("Payment Processing", "Invoice matching, payment terms adherence, debit notes"),
                ("Inventory Management", "Stock levels, reorder points, write-off procedures"),
                ("Compliance & Ethics", "Conflict of interest disclosures, gifts policy, code of conduct")
            ],
            "Safety" => [
                ("Workplace Hazard Identification", "Risk assessments, near-miss reporting, HIRA records"),
                ("Safety Training & Drills", "Training coverage, emergency drill frequency, records"),
                ("PPE Compliance", "PPE availability, usage monitoring, replacement schedule"),
                ("Incident Investigation & Reporting", "Incident register, RCA quality, CAPA implementation"),
                ("Fire Safety & Emergency Preparedness", "Fire NOC, extinguisher maintenance, evacuation plans"),
                ("Contractor Safety Management", "Contractor induction, work permit system, monitoring"),
                ("Environmental Compliance", "Waste disposal, emissions monitoring, pollution control"),
                ("Safety Audit & Inspection", "Internal inspections, statutory audits, corrective actions")
            ],
            "Legal" => [
                ("Contract Drafting & Review", "Standard templates, approval matrix, turnaround times"),
                ("Litigation Management", "Case register, lawyer empanelment, contingent liability provisions"),
                ("Intellectual Property", "Trademark/patent registrations, NDA management"),
                ("Regulatory Compliance Monitoring", "License renewals, regulatory filings, notices tracker"),
                ("Data Privacy & GDPR Compliance", "Privacy policy, consent management, data subject requests"),
                ("Labour Law Compliance", "Employment contracts, standing orders, disciplinary procedures"),
                ("Corporate Governance", "Board resolutions, shareholder agreements, statutory filings"),
                ("Legal Entity Management", "ROC filings, annual returns, director KYC")
            ],
            "Operations" => [
                ("Process Documentation & SOPs", "SOP availability, review frequency, version control"),
                ("Quality Management System", "ISO compliance, internal audits, CAPA management"),
                ("Production Planning & Control", "Capacity utilization, schedule adherence, WIP management"),
                ("Supply Chain Management", "Lead time management, supplier scorecards, stockouts"),
                ("Customer Order Fulfillment", "Order accuracy, on-time delivery, returns management"),
                ("Maintenance Management", "Preventive maintenance schedule, breakdown frequency, MTTR"),
                ("KPI & Performance Monitoring", "Operational dashboards, target-setting, review cadence"),
                ("Continuous Improvement", "Kaizen/lean initiatives, cost savings, project tracking")
            ],
            _ => [
                ("Policy & Procedure Compliance", "Adherence to documented policies and standard procedures"),
                ("Risk Management", "Risk identification, mitigation, and monitoring framework"),
                ("Financial Controls", "Authorization limits, reconciliations, financial reporting accuracy"),
                ("Operational Efficiency", "Process effectiveness, resource utilization, output quality"),
                ("Data Integrity & Security", "Data accuracy, access controls, retention policies"),
                ("Vendor & Third-Party Management", "Contract compliance, SLA monitoring, due diligence"),
                ("Regulatory & Statutory Compliance", "Applicable laws and regulations adherence"),
                ("Internal Controls Review", "Control environment, control activities, monitoring")
            ]
        };
    }
}
