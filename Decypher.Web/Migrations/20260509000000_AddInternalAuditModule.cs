using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Decypher.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddInternalAuditModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditReports",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    DepartmentType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false, defaultValue: "Draft"),
                    FinancialYear = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    AuditDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AuditedBy = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ReviewedBy = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ApprovedBy = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ExecutiveSummary = table.Column<string>(type: "text", nullable: true),
                    TotalObservations = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    HighRiskCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    MediumRiskCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    LowRiskCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    ClosedCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditReports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditScopeAreas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ReportId = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditScopeAreas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditScopeAreas_AuditReports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "AuditReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AuditOverviewStats",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ReportId = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    Category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Label = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Value = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Unit = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditOverviewStats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditOverviewStats_AuditReports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "AuditReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AuditObservations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ReportId = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    ObservationNumber = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    Title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    RiskLevel = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "Medium"),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false, defaultValue: "Open"),
                    ProcessArea = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Background = table.Column<string>(type: "text", nullable: true),
                    DetailedObservation = table.Column<string>(type: "text", nullable: true),
                    Risks = table.Column<string>(type: "text", nullable: true),
                    Recommendations = table.Column<string>(type: "text", nullable: true),
                    MgmtCause = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    MgmtCorrectiveAction = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    MgmtPreventiveAction = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    MgmtTargetDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MgmtResponsiblePerson = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    MgmtResponsibleDesignation = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    IsAlreadyImplemented = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsProcessImprovement = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    FinancialImpact = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditObservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditObservations_AuditReports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "AuditReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuditReports_TenantId_DepartmentType",
                table: "AuditReports",
                columns: new[] { "TenantId", "DepartmentType" });

            migrationBuilder.CreateIndex(
                name: "IX_AuditReports_TenantId_FinancialYear",
                table: "AuditReports",
                columns: new[] { "TenantId", "FinancialYear" });

            migrationBuilder.CreateIndex(
                name: "IX_AuditScopeAreas_ReportId_SortOrder",
                table: "AuditScopeAreas",
                columns: new[] { "ReportId", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_AuditOverviewStats_ReportId",
                table: "AuditOverviewStats",
                column: "ReportId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditObservations_ReportId_ObservationNumber",
                table: "AuditObservations",
                columns: new[] { "ReportId", "ObservationNumber" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "AuditObservations");
            migrationBuilder.DropTable(name: "AuditOverviewStats");
            migrationBuilder.DropTable(name: "AuditScopeAreas");
            migrationBuilder.DropTable(name: "AuditReports");
        }
    }
}
