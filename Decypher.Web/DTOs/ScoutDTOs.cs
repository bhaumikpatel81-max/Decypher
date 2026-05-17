using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Decypher.Web.Models;

namespace Decypher.Web.DTOs
{
    public class CaptureCandidateRequest
    {
        public Guid? VendorId { get; set; }
        public Guid? RequisitionId { get; set; }
        public string Source { get; set; } = "Portal";
        public string SourceUrl { get; set; } = string.Empty;
        public string ResumeText { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string CurrentRole { get; set; } = string.Empty;
        public string CurrentCompany { get; set; } = string.Empty;
        public int YearsOfExperience { get; set; }
        public decimal CurrentSalary { get; set; }
        public string[] Skills { get; set; } = Array.Empty<string>();
        public string VendorName { get; set; } = string.Empty;
        public string ProfileUrl { get; set; } = string.Empty;
        public Dictionary<string, object>? RawExtractedData { get; set; }
    }

    public class CaptureCandidateResponse
    {
        public CandidateDTO Candidate { get; set; } = new CandidateDTO();
        public ResumeParserResponse? ParsedResume { get; set; }
    }

    public class ResumeUploadResult
    {
        public string FileName { get; set; } = string.Empty;
        public string ExtractedText { get; set; } = string.Empty;
        public ResumeParserResponse? ParsedResume { get; set; }
    }

    public class GenericExtractionRequest
    {
        public string? Content { get; set; }
        public string? PageText { get; set; }
        public string? PageUrl { get; set; }
    }

    public class GenericExtractionResponse
    {
        public string ExtractedText { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string[] Keywords { get; set; } = Array.Empty<string>();
    }

    public class ScoutStatsResponse
    {
        public int TotalRequisitions { get; set; }
        public int OpenRequisitions { get; set; }
        public int TotalCandidates { get; set; }
        public int CapturesLast30Days { get; set; }
        public SourceSummary[] TopSources { get; set; } = Array.Empty<SourceSummary>();
    }

    public class SourceSummary
    {
        public string Source { get; set; } = string.Empty;
        public int Count { get; set; }
    }

    public class RequisitionSummary
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
