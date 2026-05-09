using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Decypher.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddBudgetForecastingV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ── BudgetPlans ────────────────────────────────────────────────────
            migrationBuilder.CreateTable(
                name: "BudgetPlans",
                columns: table => new
                {
                    Id            = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId      = table.Column<Guid>(type: "uuid", nullable: false),
                    Name          = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    FiscalYear    = table.Column<string>(type: "character varying(20)",  maxLength: 20,  nullable: false),
                    Department    = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: ""),
                    PlanType      = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    Currency      = table.Column<string>(type: "character varying(10)",  maxLength: 10,  nullable: false, defaultValue: "INR"),
                    TotalBudget   = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Status        = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    CreatedAt     = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt     = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy     = table.Column<string>(type: "character varying(450)", maxLength: 450, nullable: true),
                    UpdatedBy     = table.Column<string>(type: "character varying(450)", maxLength: 450, nullable: true),
                    IsDeleted     = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetPlans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetPlans_TenantId",
                table: "BudgetPlans",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_BudgetPlans_TenantId_FiscalYear",
                table: "BudgetPlans",
                columns: new[] { "TenantId", "FiscalYear" });

            // ── BudgetPlanItems ────────────────────────────────────────────────
            migrationBuilder.CreateTable(
                name: "BudgetPlanItems",
                columns: table => new
                {
                    Id           = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId     = table.Column<Guid>(type: "uuid", nullable: false),
                    BudgetPlanId = table.Column<Guid>(type: "uuid", nullable: false),
                    Category     = table.Column<int>(type: "integer", nullable: false, defaultValue: 8),
                    SubCategory  = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: ""),
                    Description  = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, defaultValue: ""),
                    Q1Budget     = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q2Budget     = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q3Budget     = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q4Budget     = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q1Actual     = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q2Actual     = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q3Actual     = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q4Actual     = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q1Forecast   = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q2Forecast   = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q3Forecast   = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Q4Forecast   = table.Column<decimal>(type: "numeric(18,2)", nullable: false, defaultValue: 0m),
                    Unit         = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    Notes        = table.Column<string>(type: "text", nullable: true),
                    CreatedAt    = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt    = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy    = table.Column<string>(type: "character varying(450)", maxLength: 450, nullable: true),
                    UpdatedBy    = table.Column<string>(type: "character varying(450)", maxLength: 450, nullable: true),
                    IsDeleted    = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetPlanItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BudgetPlanItems_BudgetPlans_BudgetPlanId",
                        column: x => x.BudgetPlanId,
                        principalTable: "BudgetPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetPlanItems_BudgetPlanId",
                table: "BudgetPlanItems",
                column: "BudgetPlanId");

            // ── BudgetVersions ─────────────────────────────────────────────────
            migrationBuilder.CreateTable(
                name: "BudgetVersions",
                columns: table => new
                {
                    Id                = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId          = table.Column<Guid>(type: "uuid", nullable: false),
                    BudgetPlanId      = table.Column<Guid>(type: "uuid", nullable: false),
                    VersionNumber     = table.Column<int>(type: "integer", nullable: false),
                    Label             = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    SnapshotJson      = table.Column<string>(type: "text", nullable: false, defaultValue: "{}"),
                    CreatedByUserId   = table.Column<string>(type: "character varying(450)", maxLength: 450, nullable: true),
                    CreatedAt         = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt         = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted         = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetVersions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BudgetVersions_BudgetPlans_BudgetPlanId",
                        column: x => x.BudgetPlanId,
                        principalTable: "BudgetPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetVersions_BudgetPlanId",
                table: "BudgetVersions",
                column: "BudgetPlanId");

            // ── BudgetAlerts ───────────────────────────────────────────────────
            migrationBuilder.CreateTable(
                name: "BudgetAlerts",
                columns: table => new
                {
                    Id                = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId          = table.Column<Guid>(type: "uuid", nullable: false),
                    BudgetPlanItemId  = table.Column<Guid>(type: "uuid", nullable: false),
                    AlertType         = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    Threshold         = table.Column<decimal>(type: "numeric(5,2)", nullable: false, defaultValue: 80m),
                    IsActive          = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedAt         = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt         = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsDeleted         = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetAlerts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BudgetAlerts_BudgetPlanItems_BudgetPlanItemId",
                        column: x => x.BudgetPlanItemId,
                        principalTable: "BudgetPlanItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetAlerts_BudgetPlanItemId",
                table: "BudgetAlerts",
                column: "BudgetPlanItemId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "BudgetAlerts");
            migrationBuilder.DropTable(name: "BudgetVersions");
            migrationBuilder.DropTable(name: "BudgetPlanItems");
            migrationBuilder.DropTable(name: "BudgetPlans");
        }
    }
}
