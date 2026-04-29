using System;
using System.ComponentModel.DataAnnotations;

namespace Decypher.Web.Models
{
    public class ImportJob
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public string Feature { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string Status { get; set; } = "Processing"; // Processing, Completed, CompletedWithErrors, Failed
        public int TotalRows { get; set; }
        public int ImportedRows { get; set; }
        public int WarningRows { get; set; }
        public int ErrorRows { get; set; }
        public string? ErrorReportJson { get; set; } // JSON of ImportError[]
        public string? ImportedById { get; set; }
        public DateTime ImportedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ScheduledAt { get; set; }
    }

    public class ColumnMapping
    {
        public string CsvColumn { get; set; } = string.Empty;
        public string SystemField { get; set; } = string.Empty;
        public bool IsRequired { get; set; }
        public bool Skip { get; set; }
    }

    public class ImportWarning
    {
        public int Row { get; set; }
        public string Message { get; set; } = string.Empty;
    }

    public class ImportError
    {
        public int Row { get; set; }
        public string Message { get; set; } = string.Empty;
        public string RawData { get; set; } = string.Empty;
    }

    public class ValidateImportRequest
    {
        public string Feature { get; set; } = string.Empty;
        public bool HasHeader { get; set; } = true;
        public string Delimiter { get; set; } = ",";
    }

    public class ExecuteImportRequest
    {
        public string Feature { get; set; } = string.Empty;
        public ColumnMapping[] Mappings { get; set; } = Array.Empty<ColumnMapping>();
        public string FileToken { get; set; } = string.Empty;
        public DateTime? ScheduleAt { get; set; }
    }

    public class ValidateImportResponse
    {
        public string[] Columns { get; set; } = Array.Empty<string>();
        public object[][] Preview { get; set; } = Array.Empty<object[]>();
        public int RowCount { get; set; }
        public string FileToken { get; set; } = string.Empty;
    }

    public class ExecuteImportResponse
    {
        public int Imported { get; set; }
        public ImportWarning[] Warnings { get; set; } = Array.Empty<ImportWarning>();
        public ImportError[] Errors { get; set; } = Array.Empty<ImportError>();
    }

    public class ImportBudgetResult
    {
        public ImportEntityResult FiscalYears { get; set; } = new();
        public ImportEntityResult Allocations { get; set; } = new();
        public ImportEntityResult LineItems { get; set; } = new();
        public ImportEntityResult Actuals { get; set; } = new();
        public int TotalErrors { get; set; }
    }

    public class ImportEntityResult
    {
        public int Imported { get; set; }
        public ImportError[] Errors { get; set; } = Array.Empty<ImportError>();
    }
}
