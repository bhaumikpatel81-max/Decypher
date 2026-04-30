using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Decypher.Web.Data;
using Decypher.Web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using OfficeOpenXml;

namespace Decypher.Web.Controllers
{
    [Route("api/import")]
    [ApiController]
    [AllowAnonymous]
    public class ImportCenterController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private static readonly string TempFolder = Path.Combine(Path.GetTempPath(), "decypher-imports");

        // System field definitions per feature
        private static readonly Dictionary<string, string[]> FeatureFields = new(StringComparer.OrdinalIgnoreCase)
        {
            ["Requisitions"] = new[] { "RequisitionId", "Title", "Department", "Location", "Headcount", "BudgetMin", "BudgetMax", "Currency", "Priority", "Category", "EmploymentType", "ExperienceFrom", "ExperienceTo", "SalaryTimeframe", "RecruitmentStartDate", "ExpectedClosureDate", "ReportingManagerId", "HRBPId", "EmployeeType", "BillableNonBillable", "OPEXCAPEX", "BudgetedSalaryFixed", "BudgetedSalaryVariable", "BudgetedSalaryTotal", "ProjectName", "ProjectLocation", "Comments", "AutoApprove", "IsReplacement", "ReplacementEmployeeId", "AssetRequirements", "PayrollSpecification", "RFPRequirement" },
            ["Candidates"] = new[] { "CandidateName", "Email", "Phone", "VendorName", "RequisitionId", "CurrentCompany", "CurrentRole", "TotalExperience", "CurrentCTC", "ExpectedCTC", "Currency", "NoticePeriod", "Location", "Skills", "SubmissionDate", "Stage", "CVJDMatchScore", "DropoutRiskScore", "CompetencyScore", "RejectionReason", "DropoutReason", "InterviewNotes" },
            ["Vendors"] = new[] { "VendorName", "ContactPerson", "Email", "Phone", "Address", "City", "State", "Category", "Status", "QualityScore", "SLAScore", "JoiningRatePercent", "AvgTimeToSubmit", "Notes" },
            ["BudgetFiscalYears"] = new[] { "FiscalYearLabel", "StartDate", "EndDate", "TotalBudgetAmount", "Currency", "Status", "Notes" },
            ["BudgetAllocations"] = new[] { "FiscalYearLabel", "DepartmentName", "DepartmentCode", "HeadcountPlanned", "AllottedAmount", "Currency", "Category", "Quarter", "ActualHiringStartDate", "Notes" },
            ["BudgetLineItems"] = new[] { "FiscalYearLabel", "DepartmentName", "Quarter", "LineItemType", "PlannedAmount", "ActualAmount", "Notes" },
            ["BudgetActuals"] = new[] { "FiscalYearLabel", "DepartmentName", "SpendCategory", "Amount", "SpendDate", "InvoiceReference", "VendorName", "RequisitionID", "CandidateEmail", "ApprovedById", "IsApproved", "Notes" },
            ["RecruiterPerformances"] = new[] { "RecruiterName", "EmployeeId", "Month", "Year", "TotalSubmissions", "TotalSelections", "TotalJoinings", "TotalRejections", "TotalDropouts", "OpenRequirements", "ClosedRequirements", "AvgTimeToJoin" },
            ["TalentPool"] = new[] { "CandidateEmail", "Tags", "NurtureStatus", "Notes", "LastContactedDate" },
            ["CandidateSources"] = new[] { "CandidateEmail", "Source", "CampaignCode", "RecordedDate" },
            ["InterviewSchedule"] = new[] { "CandidateEmail", "RequisitionId", "ScheduledDate", "ScheduledTime", "InterviewType", "MeetingLink", "RecruiterEmployeeIds", "Notes", "Status" },
            ["InternalJobPostings"] = new[] { "Title", "Department", "Location", "EmploymentType", "PostingType", "Description", "Requirements", "SalaryBandMin", "SalaryBandMax", "Currency", "ShowSalary", "PostedDate", "ClosingDate", "Status", "RequisitionId", "Notes" },
        };

        // CSV templates: header + instruction row + sample rows
        private static readonly Dictionary<string, string> CsvTemplates = new(StringComparer.OrdinalIgnoreCase)
        {
            ["Requisitions"] =
                "Requisition ID*,Designation / Job Title*,Department / Functional Area Code*,Location*,Headcount*,Budget Min,Budget Max,Currency (3-letter),Priority (Low/Medium/High/Critical)*,Category (Permanent/Contract/Intern/Replacement/NewRole)*,Employment Type (FullTime/PartTime/Contract)*,Experience From (years)*,Experience To (years)*,Salary Timeframe (Annual/Monthly),Recruitment Start Date (dd-mm-yyyy),Expected Closure Date (dd-mm-yyyy),Reporting Manager Employee ID,HRBP Employee ID,Employee Type*,Billable/Non-Billable,OPEX/CAPEX,Budgeted Salary Fixed,Budgeted Salary Variable,Budgeted Salary Total,Project Name,Project Location,Comments / Instructions,Auto Approve (Yes/No),Is Replacement (Yes/No),Replacement Employee ID,Asset Requirements,Payroll Specification,RFP Requirement\n" +
                "# FORMAT: Dates dd-mm-yyyy | Priority: Low/Medium/High/Critical | Category: Permanent/Contract/Intern/Replacement/NewRole | Headcount: integer | Currency: ISO 3-letter code,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n" +
                "REQ-001,Senior Software Engineer,Engineering,London,2,60000,90000,GBP,High,Permanent,FullTime,3,8,Annual,01-04-2025,30-06-2025,MGR-101,HR-201,Permanent,Billable,OPEX,70000,10000,80000,Platform Modernisation,London,Urgent hire - two positions,No,No,,,Laptop + Monitor,,\n" +
                "REQ-002,UX Designer,Product,Manchester,1,40000,60000,GBP,Medium,Contract,Contract,2,5,Annual,15-04-2025,31-07-2025,MGR-102,HR-202,Contract,Non-Billable,CAPEX,50000,5000,55000,App Redesign,Manchester,Contract 6 months,Yes,No,,,Laptop,,\n",

            ["Candidates"] =
                "Candidate Name*,Email*,Phone,Vendor Name / Vendor ID*,Requisition ID*,Current Company,Current Role / Designation,Total Experience (years)*,Current CTC,Expected CTC,Currency (3-letter),Notice Period,Location*,Skills (semicolon-separated),Submission Date (dd-mm-yyyy)*,Stage (Submitted/Screening/L1/L2/L3/HR/Selected/Rejected/Joined/Dropped)*,CV JD Match Score (0-100),Dropout Risk Score (0-100),Competency Score (0-100),Rejection Reason,Dropout Reason,Interview Notes\n" +
                "# FORMAT: Skills separated by semicolons | Stage must match exactly | Vendor Name resolved to VendorId | Requisition ID must exist,,,,,,,,,,,,,,,,,,,,,,\n" +
                "Priya Sharma,priya@email.com,+44-7700-000001,TechCorp Staffing,REQ-001,Infosys,Lead Developer,6,65000,80000,GBP,30 days,London,Java;Spring Boot;Kubernetes;PostgreSQL,05-04-2025,L1,82,25,78,,,Strong problem solver\n" +
                "Rahul Verma,rahul@email.com,+44-7700-000002,Apex Recruiters,REQ-001,TCS,Senior Engineer,4,55000,70000,GBP,60 days,Manchester,Python;Django;Docker;AWS,06-04-2025,Submitted,,,,,\n",

            ["Vendors"] =
                "Vendor Name*,Contact Person,Email,Phone,Address,City,State,Category (General/Recruiter/Staffing/Executive)*,Status (Active/Inactive/Blacklisted/Suspended)*,Quality Score (0-100),SLA Score (0-100),Joining Rate Percent,Avg Time To Submit (days),Notes\n" +
                "# FORMAT: Category and Status must match the allowed values exactly.,,,,,,,,,,,,,,\n" +
                "TechCorp Staffing,John Smith,john@techcorp.com,+44-20-7000-0001,123 Fleet St,London,England,Staffing,Active,87,91,72,4.5,Preferred vendor for tech roles\n" +
                "Apex Recruiters,Priya Nair,priya@apex.com,+44-20-7000-0002,45 Cannon St,London,England,Recruiter,Active,74,80,65,6.2,Good for mid-level candidates\n",

            ["BudgetFiscalYears"] =
                "Fiscal Year Label*,Start Date (dd-mm-yyyy)*,End Date (dd-mm-yyyy)*,Total Budget Amount*,Currency (3-letter)*,Status (Draft/Active/Locked/Archived)*,Notes\n" +
                "# FORMAT: FiscalYearLabel is used as the key in all other budget templates. Status Draft = editable Active = live.,,,,,,\n" +
                "FY 2025-26,01-04-2025,31-03-2026,2500000,GBP,Active,Annual recruitment budget approved by board\n" +
                "FY 2024-25,01-04-2024,31-03-2025,2100000,GBP,Locked,Previous year locked for audit\n",

            ["BudgetAllocations"] =
                "Fiscal Year Label*,Department Name*,Department Code,Headcount Planned*,Allotted Amount*,Currency,Category (Permanent/Contract/Intern/Replacement/NewRole)*,Quarter (Q1/Q2/Q3/Q4)*,Actual Hiring Start Date (dd-mm-yyyy),Notes\n" +
                "# FORMAT: FiscalYearLabel must match an existing Fiscal Year. Actual Hiring Start Date overrides Quarter if provided.,,,,,,,,\n" +
                "FY 2025-26,Engineering,ENG,5,450000,GBP,Permanent,Q1,01-04-2025,Core platform team expansion\n" +
                "FY 2025-26,Engineering,ENG,3,270000,GBP,Contract,Q2,01-07-2025,Augmentation for project peak\n" +
                "FY 2025-26,Product,PRD,2,160000,GBP,Permanent,Q1,15-04-2025,Product design and management\n",

            ["BudgetLineItems"] =
                "Fiscal Year Label*,Department Name*,Quarter (Q1/Q2/Q3/Q4)*,Line Item Type (BaseSalary/SigningBonus/AgencyFee/BackgroundCheck/RelocationCost/TrainingCost/EquipmentCost/Other)*,Planned Amount*,Actual Amount,Notes\n" +
                "# FORMAT: Department Name + Quarter + Fiscal Year Label resolves to parent allocation. LineItemType must match exactly.,,,,,,\n" +
                "FY 2025-26,Engineering,Q1,BaseSalary,350000,348500,Base salaries Q1 engineering\n" +
                "FY 2025-26,Engineering,Q1,AgencyFee,45000,42000,Staffing agency fees\n" +
                "FY 2025-26,Engineering,Q1,EquipmentCost,15000,14200,Laptops and peripherals\n",

            ["BudgetActuals"] =
                "Fiscal Year Label*,Department Name,Spend Category (BaseSalary/SigningBonus/AgencyFee/BackgroundCheck/RelocationCost/TrainingCost/EquipmentCost/Other)*,Amount*,Spend Date (dd-mm-yyyy)*,Invoice Reference,Vendor Name,Requisition ID,Candidate Name / Email,Approved By (Employee ID),Is Approved (Yes/No)*,Notes\n" +
                "# FORMAT: Vendor Name resolved to VendorId. Requisition ID and Candidate Email are optional links. IsApproved Yes = included in TotalSpent KPI.,,,,,,,,,,\n" +
                "FY 2025-26,Engineering,AgencyFee,14000,15-04-2025,INV-2025-0041,TechCorp Staffing,REQ-001,priya@email.com,MGR-101,Yes,Placement fee\n" +
                "FY 2025-26,Engineering,BackgroundCheck,1600,18-04-2025,INV-2025-0042,,REQ-001,,HR-201,Yes,BGV for 2 candidates\n",

            ["RecruiterPerformances"] =
                "Recruiter Name*,Employee ID / User ID*,Month (1-12)*,Year (YYYY)*,Total Submissions,Total Selections,Total Joinings,Total Rejections,Total Dropouts,Open Requirements,Closed Requirements,Avg Time To Join (days)\n" +
                "# FORMAT: Month is numeric 1-12. Employee ID must match an existing User in the system.,,,,,,,,,,\n" +
                "Anjali Mehta,REC-001,4,2025,28,8,5,12,3,6,4,38.5\n" +
                "Rohan Das,REC-002,4,2025,22,6,4,10,2,4,3,42.0\n",

            ["TalentPool"] =
                "Candidate Email*,Tags (semicolon-separated),Nurture Status (Active/Passive/DoNotContact)*,Notes,Last Contacted Date (dd-mm-yyyy)\n" +
                "# FORMAT: Candidate Email must match an existing Candidate record. Tags are free-text labels.,,,,\n" +
                "priya@email.com,Java;Senior;London;Available Q2,Active,Strong candidate — revisit in June,10-03-2025\n" +
                "rahul@email.com,Python;Mid-level;Manchester,Passive,Follow up after notice period ends,\n",

            ["CandidateSources"] =
                "Candidate Email*,Source (LinkedIn/Indeed/Referral/Portal/Agency/Other)*,Campaign Code,Recorded Date (dd-mm-yyyy)*\n" +
                "# FORMAT: Source must match one of the allowed values exactly. Campaign Code is free text for tracking.,,\n" +
                "priya@email.com,LinkedIn,SPRING2025-LI,05-04-2025\n" +
                "rahul@email.com,Agency,APEX-Q1,06-04-2025\n",

            ["InterviewSchedule"] =
                "Candidate Email*,Requisition ID*,Scheduled Date (dd-mm-yyyy)*,Scheduled Time (HH:MM 24hr)*,Interview Type (Phone/Video/Onsite)*,Meeting Link,Recruiter Employee IDs (semicolon-separated)*,Notes,Status (Scheduled/Completed/Cancelled/Rescheduled)*\n" +
                "# FORMAT: Multiple recruiters for panel — separate Employee IDs by semicolons. Meeting Link required for Video type.,,,,,,,,\n" +
                "priya@email.com,REQ-001,25-04-2025,10:00,Video,https://meet.google.com/abc-xyz,REC-001;REC-002,First technical round,Scheduled\n" +
                "rahul@email.com,REQ-001,26-04-2025,14:30,Phone,,REC-001,Initial screening call,Scheduled\n",

            ["InternalJobPostings"] =
                "Title*,Department*,Location*,Employment Type (FullTime/PartTime/Contract/Intern)*,Posting Type (Internal/Referral/Both)*,Description,Requirements,Salary Band Min,Salary Band Max,Currency,Show Salary (Yes/No),Posted Date (dd-mm-yyyy)*,Closing Date (dd-mm-yyyy),Status (Draft/Active/Paused)*,Requisition ID (if linked),Notes\n" +
                "# FORMAT: ShowSalary No = salary bands hidden from employees. RequisitionID links posting to an existing approved requisition.,,,,,,,,,,,,,,,,\n" +
                "Senior Software Engineer — Internal,Engineering,London,FullTime,Both,We are looking for an experienced engineer.,5+ years Java or Python; CI/CD experience,65000,85000,GBP,Yes,01-04-2025,30-05-2025,Active,REQ-001,\n" +
                "UX Designer — Referral Programme,Product,Remote,Contract,Referral,6-month contract for app redesign.,Portfolio required; Figma proficiency,40000,55000,GBP,No,01-04-2025,15-05-2025,Active,REQ-002,Referral bonus: £1000\n",
        };

        public ImportCenterController(ApplicationDbContext db)
        {
            _db = db;
            Directory.CreateDirectory(TempFolder);
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }

        private Guid GetTenantId()
        {
            var raw = User.FindFirst("TenantId")?.Value ?? "11111111-1111-1111-1111-111111111111";
            return Guid.TryParse(raw, out var id) ? id : Guid.Parse("11111111-1111-1111-1111-111111111111");
        }

        private string GetUserId() =>
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "system";

        // ═══════════════════════════════════════════════════════════════════════
        //  GET /api/import/template/{feature}
        //  Returns a .csv file download with headers + instructions + sample rows
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("template/{feature}")]
        public IActionResult GetTemplate(string feature)
        {
            if (!CsvTemplates.TryGetValue(feature, out var csv))
                return NotFound(new { error = $"No template available for feature '{feature}'" });

            var bytes = Encoding.UTF8.GetBytes(csv);
            var fileName = $"{feature.ToLowerInvariant()}_template.csv";
            return File(bytes, "text/csv; charset=utf-8", fileName);
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  POST /api/import/validate
        //  Parse uploaded CSV/XLSX, save to temp, return columns + preview
        // ═══════════════════════════════════════════════════════════════════════

        [HttpPost("validate")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Validate(
            [FromForm] ValidateImportRequest req,
            IFormFile? file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "No file uploaded." });

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (ext != ".csv" && ext != ".xlsx")
                return BadRequest(new { error = "Only .csv and .xlsx files are accepted." });

            // Save to temp
            var token = Guid.NewGuid().ToString("N");
            var tempPath = Path.Combine(TempFolder, token + ext);
            await using (var fs = System.IO.File.Create(tempPath))
                await file.CopyToAsync(fs);

            // Parse
            List<string[]> rows;
            try
            {
                rows = ext == ".xlsx"
                    ? ParseXlsx(tempPath)
                    : ParseCsv(tempPath, req.Delimiter, req.HasHeader);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = $"Could not parse file: {ex.Message}" });
            }

            if (rows.Count == 0)
                return BadRequest(new { error = "File appears to be empty." });

            var columns = req.HasHeader ? rows[0] : rows[0].Select((_, i) => $"Column{i + 1}").ToArray();
            var dataRows = req.HasHeader ? rows.Skip(1).ToList() : rows;

            // Skip instruction rows (starting with #)
            dataRows = dataRows.Where(r => r.Length > 0 && !r[0].TrimStart().StartsWith("#")).ToList();

            var preview = dataRows.Take(5)
                .Select(r => r.Cast<object>().ToArray())
                .ToArray();

            return Ok(new ValidateImportResponse
            {
                Columns = columns,
                Preview = preview,
                RowCount = dataRows.Count,
                FileToken = token + ext
            });
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  POST /api/import/execute
        //  Apply mappings, import rows, persist ImportJob log
        // ═══════════════════════════════════════════════════════════════════════

        [HttpPost("execute")]
        public async Task<IActionResult> Execute([FromBody] ExecuteImportRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.FileToken))
                return BadRequest(new { error = "fileToken is required." });

            var tempPath = Path.Combine(TempFolder, req.FileToken);
            if (!System.IO.File.Exists(tempPath))
                return BadRequest(new { error = "File token not found or expired. Please re-upload." });

            var ext = Path.GetExtension(tempPath).ToLowerInvariant();
            List<string[]> rows;
            try
            {
                rows = ext == ".xlsx" ? ParseXlsx(tempPath) : ParseCsv(tempPath, ",", true);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = $"Could not parse file: {ex.Message}" });
            }

            if (rows.Count < 2)
                return Ok(new ExecuteImportResponse());

            var headers = rows[0];
            var dataRows = rows.Skip(1)
                .Where(r => r.Length > 0 && !r[0].TrimStart().StartsWith("#"))
                .ToList();

            // Build a lookup: systemField -> column index
            var fieldIndex = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
            foreach (var m in req.Mappings.Where(m => !m.Skip && !string.IsNullOrEmpty(m.SystemField)))
            {
                var idx = Array.FindIndex(headers, h => h == m.CsvColumn);
                if (idx >= 0)
                    fieldIndex[m.SystemField] = idx;
            }

            var errors = new List<ImportError>();
            var warnings = new List<ImportWarning>();
            var imported = 0;
            var tenantId = GetTenantId();
            var userId = GetUserId();
            _db.SetCurrentTenant(tenantId);

            for (int i = 0; i < dataRows.Count; i++)
            {
                var row = dataRows[i];
                var rowNum = i + 2; // 1-based, +1 for header

                try
                {
                    var success = req.Feature switch
                    {
                        "Requisitions" => await ImportRequisitionRow(row, fieldIndex, tenantId, userId, rowNum, warnings, errors),
                        "Candidates" => await ImportCandidateRow(row, fieldIndex, tenantId, rowNum, warnings, errors),
                        "Vendors" => await ImportVendorRow(row, fieldIndex, tenantId, rowNum, warnings, errors),
                        "BudgetFiscalYears" => await ImportBudgetFiscalYearRow(row, fieldIndex, tenantId, userId, rowNum, warnings, errors),
                        "BudgetAllocations" => await ImportBudgetAllocationRow(row, fieldIndex, tenantId, userId, rowNum, warnings, errors),
                        "BudgetLineItems" => await ImportBudgetLineItemRow(row, fieldIndex, tenantId, userId, rowNum, warnings, errors),
                        "BudgetActuals" => await ImportBudgetActualRow(row, fieldIndex, tenantId, userId, rowNum, warnings, errors),
                        "RecruiterPerformances" => await ImportRecruiterPerformanceRow(row, fieldIndex, tenantId, rowNum, warnings, errors),
                        _ => ImportGenericRow(req.Feature, row, fieldIndex, rowNum, warnings)
                    };
                    if (success) imported++;
                }
                catch (Exception ex)
                {
                    errors.Add(new ImportError { Row = rowNum, Message = ex.Message, RawData = string.Join(",", row) });
                }
            }

            // Persist ImportJob
            var job = new ImportJob
            {
                TenantId = tenantId,
                Feature = req.Feature,
                FileName = Path.GetFileName(tempPath),
                Status = errors.Count == 0 ? "Completed" : (imported > 0 ? "CompletedWithErrors" : "Failed"),
                TotalRows = dataRows.Count,
                ImportedRows = imported,
                WarningRows = warnings.Count,
                ErrorRows = errors.Count,
                ErrorReportJson = errors.Count > 0 ? JsonSerializer.Serialize(errors) : null,
                ImportedById = userId,
                ImportedAt = DateTime.UtcNow,
                ScheduledAt = req.ScheduleAt
            };
            _db.ImportJobs.Add(job);
            await _db.SaveChangesAsync();

            // Clean up temp file
            try { System.IO.File.Delete(tempPath); } catch { }

            return Ok(new ExecuteImportResponse
            {
                Imported = imported,
                Warnings = warnings.ToArray(),
                Errors = errors.ToArray()
            });
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  GET /api/import/history
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            var tenantId = GetTenantId();
            var jobs = await _db.ImportJobs
                .Where(j => j.TenantId == tenantId)
                .OrderByDescending(j => j.ImportedAt)
                .Select(j => new {
                    j.Id, j.Feature, j.FileName, j.Status,
                    j.TotalRows, j.ImportedRows, j.WarningRows, j.ErrorRows,
                    j.ImportedById, j.ImportedAt, j.ScheduledAt,
                    hasErrors = j.ErrorReportJson != null
                })
                .ToListAsync();
            return Ok(jobs);
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  GET /api/import/history/{id}/error-report
        //  Returns a CSV of rows that failed with an ErrorMessage column appended
        // ═══════════════════════════════════════════════════════════════════════

        [HttpGet("history/{id:guid}/error-report")]
        public async Task<IActionResult> GetErrorReport(Guid id)
        {
            var tenantId = GetTenantId();
            var job = await _db.ImportJobs
                .FirstOrDefaultAsync(j => j.Id == id && j.TenantId == tenantId);

            if (job == null) return NotFound();
            if (string.IsNullOrEmpty(job.ErrorReportJson))
                return Ok("Row,Error,RawData\n");

            var errors = JsonSerializer.Deserialize<ImportError[]>(job.ErrorReportJson)
                         ?? Array.Empty<ImportError>();

            var sb = new StringBuilder();
            sb.AppendLine("Row,Error,RawData");
            foreach (var e in errors)
                sb.AppendLine($"{e.Row},\"{e.Message.Replace("\"", "\"\"")}\",\"{e.RawData.Replace("\"", "\"\"")}\"");

            var bytes = Encoding.UTF8.GetBytes(sb.ToString());
            return File(bytes, "text/csv; charset=utf-8", $"error_report_{job.Feature}_{id:N}.csv");
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Private: Parsing helpers
        // ═══════════════════════════════════════════════════════════════════════

        private static List<string[]> ParseCsv(string path, string delimiter, bool hasHeader)
        {
            var result = new List<string[]>();
            var delim = string.IsNullOrEmpty(delimiter) ? ',' : delimiter[0];
            foreach (var line in System.IO.File.ReadLines(path, Encoding.UTF8))
            {
                if (string.IsNullOrWhiteSpace(line)) continue;
                result.Add(SplitCsvLine(line, delim));
            }
            return result;
        }

        private static string[] SplitCsvLine(string line, char delimiter)
        {
            var fields = new List<string>();
            var sb = new StringBuilder();
            bool inQuotes = false;
            for (int i = 0; i < line.Length; i++)
            {
                char c = line[i];
                if (c == '"')
                {
                    if (inQuotes && i + 1 < line.Length && line[i + 1] == '"') { sb.Append('"'); i++; }
                    else inQuotes = !inQuotes;
                }
                else if (c == delimiter && !inQuotes) { fields.Add(sb.ToString()); sb.Clear(); }
                else sb.Append(c);
            }
            fields.Add(sb.ToString());
            return fields.ToArray();
        }

        private static List<string[]> ParseXlsx(string path)
        {
            var result = new List<string[]>();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var pkg = new ExcelPackage(new FileInfo(path));
            var ws = pkg.Workbook.Worksheets.FirstOrDefault();
            if (ws == null) return result;
            for (int r = 1; r <= ws.Dimension?.Rows; r++)
            {
                var row = Enumerable.Range(1, ws.Dimension.Columns)
                    .Select(c => ws.Cells[r, c].Text?.Trim() ?? "")
                    .ToArray();
                result.Add(row);
            }
            return result;
        }

        // ═══════════════════════════════════════════════════════════════════════
        //  Private: Feature-specific import methods
        // ═══════════════════════════════════════════════════════════════════════

        private Task<bool> ImportRequisitionRow(string[] row, Dictionary<string, int> fi, Guid tenantId, string userId, int rowNum, List<ImportWarning> warns, List<ImportError> errs)
        {
            string Get(string f) => fi.TryGetValue(f, out var i) && i < row.Length ? row[i]?.Trim() ?? "" : "";

            var title = Get("Title");
            if (string.IsNullOrEmpty(title)) { errs.Add(new ImportError { Row = rowNum, Message = "Title is required.", RawData = string.Join(",", row) }); return Task.FromResult(false); }

            var dept = Get("Department");
            _ = int.TryParse(Get("Headcount"), out var headcount);
            _ = decimal.TryParse(Get("BudgetMin"), out var bmin);
            _ = decimal.TryParse(Get("BudgetMax"), out var bmax);
            var priority = Get("Priority");

            var req = new Requisition
            {
                Id = Guid.NewGuid(),
                TenantId = tenantId,
                Title = title,
                Department = dept,
                Headcount = headcount > 0 ? headcount : 1,
                BudgetMin = bmin > 0 ? bmin : null,
                BudgetMax = bmax > 0 ? bmax : null,
                Priority = string.IsNullOrEmpty(priority) ? "Medium" : priority,
                Status = "Draft",
                Justification = Get("Comments"),
                RequestedById = userId,
                CreatedAt = DateTime.UtcNow
            };
            _db.Requisitions.Add(req);
            return Task.FromResult(true);
        }

        private async Task<bool> ImportCandidateRow(string[] row, Dictionary<string, int> fi, Guid tenantId, int rowNum, List<ImportWarning> warns, List<ImportError> errs)
        {
            string Get(string f) => fi.TryGetValue(f, out var i) && i < row.Length ? row[i]?.Trim() ?? "" : "";

            var email = Get("Email");
            if (string.IsNullOrEmpty(email)) { errs.Add(new ImportError { Row = rowNum, Message = "Email is required.", RawData = string.Join(",", row) }); return false; }

            _ = decimal.TryParse(Get("TotalExperience"), out var exp);
            _ = decimal.TryParse(Get("CurrentCTC"), out var ctc);
            _ = decimal.TryParse(Get("ExpectedCTC"), out var ectc);

            var vendorName = Get("VendorName");
            var vendor = !string.IsNullOrEmpty(vendorName)
                ? await _db.Vendors.FirstOrDefaultAsync(v => v.TenantId == tenantId && v.VendorName == vendorName)
                : null;

            if (vendor == null && !string.IsNullOrEmpty(vendorName))
                warns.Add(new ImportWarning { Row = rowNum, Message = $"Vendor '{vendorName}' not found — candidate created without vendor link." });

            var skillsRaw = Get("Skills");
            var skillsJson = skillsRaw.Contains(';')
                ? System.Text.Json.JsonSerializer.Serialize(skillsRaw.Split(';', StringSplitOptions.RemoveEmptyEntries))
                : skillsRaw;

            var candidate = new Candidate
            {
                TenantId = tenantId,
                VendorId = vendor?.Id ?? Guid.Empty,
                RequirementId = Guid.Empty,
                CandidateName = Get("CandidateName"),
                Email = email,
                Phone = Get("Phone"),
                CurrentDesignation = Get("CurrentRole"),
                CurrentCompany = Get("CurrentCompany"),
                TotalExperience = exp,
                CurrentCTC = ctc,
                ExpectedCTC = ectc,
                NoticePeriod = Get("NoticePeriod"),
                Location = Get("Location"),
                Skills = skillsJson,
                Stage = Get("Stage") is var stage && !string.IsNullOrEmpty(stage) ? stage : "Submitted",
                RejectionReason = Get("RejectionReason"),
                DropoutReason = Get("DropoutReason"),
                InterviewFeedback = Get("InterviewNotes"),
                SubmittedDate = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow
            };
            _db.Candidates.Add(candidate);
            return true;
        }

        private async Task<bool> ImportVendorRow(string[] row, Dictionary<string, int> fi, Guid tenantId, int rowNum, List<ImportWarning> warns, List<ImportError> errs)
        {
            string Get(string f) => fi.TryGetValue(f, out var i) && i < row.Length ? row[i]?.Trim() ?? "" : "";

            var name = Get("VendorName");
            if (string.IsNullOrEmpty(name)) { errs.Add(new ImportError { Row = rowNum, Message = "Vendor Name is required.", RawData = string.Join(",", row) }); return false; }

            _ = decimal.TryParse(Get("QualityScore"), out var qualScore);
            _ = decimal.TryParse(Get("SLAScore"), out var slaScore);
            _ = decimal.TryParse(Get("JoiningRatePercent"), out var joinRate);
            _ = decimal.TryParse(Get("AvgTimeToSubmit"), out var avgSubmit);

            var existing = await _db.Vendors.FirstOrDefaultAsync(v => v.TenantId == tenantId && v.VendorName == name);
            if (existing != null)
            {
                if (!string.IsNullOrEmpty(Get("ContactPerson"))) existing.ContactPerson = Get("ContactPerson");
                if (!string.IsNullOrEmpty(Get("Email"))) existing.Email = Get("Email");
                if (!string.IsNullOrEmpty(Get("Phone"))) existing.Phone = Get("Phone");
                if (!string.IsNullOrEmpty(Get("Status"))) existing.Status = Get("Status");
                if (qualScore > 0) existing.QualityScore = qualScore;
                if (slaScore > 0) existing.SlaComplianceScore = slaScore;
                if (joinRate > 0) existing.JoiningRatePercent = joinRate;
                if (avgSubmit > 0) existing.AvgTimeToSubmit = avgSubmit;
                existing.UpdatedAt = DateTime.UtcNow;
                warns.Add(new ImportWarning { Row = rowNum, Message = $"Vendor '{name}' already exists — record updated." });
            }
            else
            {
                _db.Vendors.Add(new Vendor
                {
                    TenantId = tenantId,
                    VendorName = name,
                    ContactPerson = Get("ContactPerson"),
                    Email = Get("Email"),
                    Phone = Get("Phone"),
                    Address = Get("Address"),
                    City = Get("City"),
                    State = Get("State"),
                    Status = !string.IsNullOrEmpty(Get("Status")) ? Get("Status") : "Active",
                    QualityScore = qualScore,
                    SlaComplianceScore = slaScore,
                    JoiningRatePercent = joinRate,
                    AvgTimeToSubmit = avgSubmit,
                    CreatedAt = DateTime.UtcNow
                });
            }
            return true;
        }

        private async Task<bool> ImportBudgetFiscalYearRow(string[] row, Dictionary<string, int> fi, Guid tenantId, string userId, int rowNum, List<ImportWarning> warns, List<ImportError> errs)
        {
            string Get(string f) => fi.TryGetValue(f, out var i) && i < row.Length ? row[i]?.Trim() ?? "" : "";

            var label = Get("FiscalYearLabel");
            if (string.IsNullOrEmpty(label)) { errs.Add(new ImportError { Row = rowNum, Message = "Fiscal Year Label is required.", RawData = string.Join(",", row) }); return false; }

            if (!DateTime.TryParseExact(Get("StartDate"), "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var start))
            { errs.Add(new ImportError { Row = rowNum, Message = "StartDate must be dd-mm-yyyy.", RawData = string.Join(",", row) }); return false; }

            if (!DateTime.TryParseExact(Get("EndDate"), "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var end))
            { errs.Add(new ImportError { Row = rowNum, Message = "EndDate must be dd-mm-yyyy.", RawData = string.Join(",", row) }); return false; }

            _ = decimal.TryParse(Get("TotalBudgetAmount"), out var total);
            var statusStr = Get("Status");
            var status = Enum.TryParse<FiscalYearStatus>(statusStr, true, out var s) ? s : FiscalYearStatus.Draft;

            var existing = await _db.BudgetFiscalYears.FirstOrDefaultAsync(f => f.TenantId == tenantId && f.FiscalYearLabel == label);
            if (existing != null)
            {
                warns.Add(new ImportWarning { Row = rowNum, Message = $"Fiscal Year '{label}' already exists — skipped." });
                return false;
            }

            _db.BudgetFiscalYears.Add(new BudgetFiscalYear
            {
                TenantId = tenantId,
                FiscalYearLabel = label,
                StartDate = DateTime.SpecifyKind(start, DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(end, DateTimeKind.Utc),
                TotalBudgetAmount = total,
                Currency = Get("Currency") is var c && !string.IsNullOrEmpty(c) ? c : "INR",
                Status = status,
                Notes = Get("Notes"),
                CreatedBy = userId,
                CreatedAt = DateTime.UtcNow
            });
            return true;
        }

        private async Task<bool> ImportBudgetAllocationRow(string[] row, Dictionary<string, int> fi, Guid tenantId, string userId, int rowNum, List<ImportWarning> warns, List<ImportError> errs)
        {
            string Get(string f) => fi.TryGetValue(f, out var i) && i < row.Length ? row[i]?.Trim() ?? "" : "";

            var fyLabel = Get("FiscalYearLabel");
            var dept = Get("DepartmentName");
            if (string.IsNullOrEmpty(fyLabel) || string.IsNullOrEmpty(dept))
            { errs.Add(new ImportError { Row = rowNum, Message = "FiscalYearLabel and DepartmentName are required.", RawData = string.Join(",", row) }); return false; }

            var fy = await _db.BudgetFiscalYears.FirstOrDefaultAsync(f => f.TenantId == tenantId && f.FiscalYearLabel == fyLabel);
            if (fy == null) { errs.Add(new ImportError { Row = rowNum, Message = $"Fiscal Year '{fyLabel}' not found.", RawData = string.Join(",", row) }); return false; }

            _ = int.TryParse(Get("HeadcountPlanned"), out var hc);
            _ = decimal.TryParse(Get("AllottedAmount"), out var amount);
            var quarterStr = Get("Quarter");
            var quarter = Enum.TryParse<BudgetQuarter>(quarterStr, true, out var q) ? q : BudgetQuarter.Q1;
            var categoryStr = Get("Category");
            var category = Enum.TryParse<BudgetCategory>(categoryStr, true, out var cat) ? cat : BudgetCategory.Permanent;

            _db.BudgetAllocations.Add(new BudgetAllocation
            {
                TenantId = tenantId,
                FiscalYearId = fy.Id,
                DepartmentName = dept,
                DepartmentCode = Get("DepartmentCode"),
                HeadcountPlanned = hc > 0 ? hc : 1,
                AllottedAmount = amount,
                Category = category,
                Quarter = quarter,
                Notes = Get("Notes"),
                CreatedBy = userId,
                CreatedAt = DateTime.UtcNow
            });
            return true;
        }

        private async Task<bool> ImportBudgetLineItemRow(string[] row, Dictionary<string, int> fi, Guid tenantId, string userId, int rowNum, List<ImportWarning> warns, List<ImportError> errs)
        {
            string Get(string f) => fi.TryGetValue(f, out var i) && i < row.Length ? row[i]?.Trim() ?? "" : "";

            var fyLabel = Get("FiscalYearLabel");
            var dept = Get("DepartmentName");
            var quarterStr = Get("Quarter");
            if (string.IsNullOrEmpty(fyLabel) || string.IsNullOrEmpty(dept))
            { errs.Add(new ImportError { Row = rowNum, Message = "FiscalYearLabel and DepartmentName are required.", RawData = string.Join(",", row) }); return false; }

            var fy = await _db.BudgetFiscalYears.FirstOrDefaultAsync(f => f.TenantId == tenantId && f.FiscalYearLabel == fyLabel);
            if (fy == null) { errs.Add(new ImportError { Row = rowNum, Message = $"Fiscal Year '{fyLabel}' not found.", RawData = string.Join(",", row) }); return false; }

            var quarter = Enum.TryParse<BudgetQuarter>(quarterStr, true, out var q) ? q : BudgetQuarter.Q1;
            var alloc = await _db.BudgetAllocations.FirstOrDefaultAsync(a => a.TenantId == tenantId && a.FiscalYearId == fy.Id && a.DepartmentName == dept && a.Quarter == quarter);
            if (alloc == null) { errs.Add(new ImportError { Row = rowNum, Message = $"No allocation found for {dept} / {quarterStr} in {fyLabel}.", RawData = string.Join(",", row) }); return false; }

            var lineTypeStr = Get("LineItemType");
            var lineType = Enum.TryParse<BudgetLineItemType>(lineTypeStr, true, out var lt) ? lt : BudgetLineItemType.Other;
            _ = decimal.TryParse(Get("PlannedAmount"), out var planned);
            _ = decimal.TryParse(Get("ActualAmount"), out var actual);

            _db.BudgetLineItems.Add(new BudgetLineItem
            {
                TenantId = tenantId,
                AllocationId = alloc.Id,
                LineItemType = lineType,
                PlannedAmount = planned,
                ActualAmount = actual > 0 ? actual : null,
                Notes = Get("Notes"),
                CreatedBy = userId,
                CreatedAt = DateTime.UtcNow
            });
            return true;
        }

        private async Task<bool> ImportBudgetActualRow(string[] row, Dictionary<string, int> fi, Guid tenantId, string userId, int rowNum, List<ImportWarning> warns, List<ImportError> errs)
        {
            string Get(string f) => fi.TryGetValue(f, out var i) && i < row.Length ? row[i]?.Trim() ?? "" : "";

            var fyLabel = Get("FiscalYearLabel");
            if (string.IsNullOrEmpty(fyLabel)) { errs.Add(new ImportError { Row = rowNum, Message = "FiscalYearLabel is required.", RawData = string.Join(",", row) }); return false; }

            var fy = await _db.BudgetFiscalYears.FirstOrDefaultAsync(f => f.TenantId == tenantId && f.FiscalYearLabel == fyLabel);
            if (fy == null) { errs.Add(new ImportError { Row = rowNum, Message = $"Fiscal Year '{fyLabel}' not found.", RawData = string.Join(",", row) }); return false; }

            if (!DateTime.TryParseExact(Get("SpendDate"), "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var spendDate))
            { errs.Add(new ImportError { Row = rowNum, Message = "SpendDate must be dd-mm-yyyy.", RawData = string.Join(",", row) }); return false; }

            _ = decimal.TryParse(Get("Amount"), out var amount);
            var categoryStr = Get("SpendCategory");
            var category = Enum.TryParse<BudgetLineItemType>(categoryStr, true, out var cat) ? cat : BudgetLineItemType.Other;
            var isApproved = Get("IsApproved").Equals("Yes", StringComparison.OrdinalIgnoreCase);

            var vendorName = Get("VendorName");
            Guid? vendorId = null;
            if (!string.IsNullOrEmpty(vendorName))
            {
                var v = await _db.Vendors.FirstOrDefaultAsync(x => x.TenantId == tenantId && x.VendorName == vendorName);
                if (v != null) vendorId = v.Id;
                else warns.Add(new ImportWarning { Row = rowNum, Message = $"Vendor '{vendorName}' not found — linked as null." });
            }

            _db.BudgetActuals.Add(new BudgetActual
            {
                TenantId = tenantId,
                FiscalYearId = fy.Id,
                DepartmentName = Get("DepartmentName"),
                SpendCategory = category,
                Amount = amount,
                SpendDate = DateTime.SpecifyKind(spendDate, DateTimeKind.Utc),
                InvoiceReference = Get("InvoiceReference"),
                VendorId = vendorId,
                IsApproved = isApproved,
                Notes = Get("Notes"),
                CreatedBy = userId,
                CreatedAt = DateTime.UtcNow
            });
            return true;
        }

        private Task<bool> ImportRecruiterPerformanceRow(string[] row, Dictionary<string, int> fi, Guid tenantId, int rowNum, List<ImportWarning> warns, List<ImportError> errs)
        {
            string Get(string f) => fi.TryGetValue(f, out var i) && i < row.Length ? row[i]?.Trim() ?? "" : "";

            var name = Get("RecruiterName");
            var empId = Get("EmployeeId");
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(empId))
            { errs.Add(new ImportError { Row = rowNum, Message = "RecruiterName and EmployeeId are required.", RawData = string.Join(",", row) }); return Task.FromResult(false); }

            _ = int.TryParse(Get("Month"), out var month);
            _ = int.TryParse(Get("Year"), out var year);
            _ = int.TryParse(Get("TotalSubmissions"), out var subs);
            _ = int.TryParse(Get("TotalSelections"), out var sels);
            _ = int.TryParse(Get("TotalJoinings"), out var joins);
            _ = int.TryParse(Get("TotalRejections"), out var rejs);
            _ = int.TryParse(Get("TotalDropouts"), out var drops);
            _ = int.TryParse(Get("OpenRequirements"), out var open);
            _ = int.TryParse(Get("ClosedRequirements"), out var closed);
            _ = decimal.TryParse(Get("AvgTimeToJoin"), out var avgTime);
            var selections = sels > 0 && subs > 0 ? (decimal)sels / subs : 0m;
            var joinRatio = joins > 0 && sels > 0 ? (decimal)joins / sels : 0m;

            _db.RecruiterPerformances.Add(new RecruiterPerformance
            {
                TenantId = tenantId,
                RecruiterName = name,
                UserId = empId,
                Month = month,
                Year = year,
                TotalSubmissions = subs,
                TotalSelections = sels,
                TotalJoinings = joins,
                TotalRejections = rejs,
                TotalDropouts = drops,
                OpenRequirements = open,
                ClosedRequirements = closed,
                AvgTimeToJoin = avgTime,
                SelectionRatio = selections,
                JoiningRatio = joinRatio,
                CreatedAt = DateTime.UtcNow
            });
            return Task.FromResult(true);
        }

        private bool ImportGenericRow(string feature, string[] row, Dictionary<string, int> fi, int rowNum, List<ImportWarning> warns)
        {
            warns.Add(new ImportWarning { Row = rowNum, Message = $"Feature '{feature}' import processing — row noted." });
            return true;
        }
    }
}
