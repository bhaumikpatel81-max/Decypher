using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Decypher.Web.Migrations
{
    /// <inheritdoc />
    public partial class Add_Onboarding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OnboardingRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CandidateId = table.Column<string>(type: "text", nullable: false),
                    CandidateName = table.Column<string>(type: "text", nullable: false),
                    JobTitle = table.Column<string>(type: "text", nullable: false),
                    OfferId = table.Column<string>(type: "text", nullable: false),
                    OverallStatus = table.Column<string>(type: "text", nullable: false),
                    ExpectedStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnboardingRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OnboardingChecklistItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OnboardingRecordId = table.Column<Guid>(type: "uuid", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    RequiresSignature = table.Column<bool>(type: "boolean", nullable: false),
                    DocumentUrl = table.Column<string>(type: "text", nullable: true),
                    Signed = table.Column<bool>(type: "boolean", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnboardingChecklistItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnboardingChecklistItems_OnboardingRecords_OnboardingRecord~",
                        column: x => x.OnboardingRecordId,
                        principalTable: "OnboardingRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingChecklistItems_OnboardingRecordId",
                table: "OnboardingChecklistItems",
                column: "OnboardingRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingChecklistItems_TenantId",
                table: "OnboardingChecklistItems",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingChecklistItems_TenantId_OnboardingRecordId",
                table: "OnboardingChecklistItems",
                columns: new[] { "TenantId", "OnboardingRecordId" });

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingRecords_TenantId",
                table: "OnboardingRecords",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingRecords_TenantId_CandidateId",
                table: "OnboardingRecords",
                columns: new[] { "TenantId", "CandidateId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OnboardingChecklistItems");

            migrationBuilder.DropTable(
                name: "OnboardingRecords");
        }
    }
}
