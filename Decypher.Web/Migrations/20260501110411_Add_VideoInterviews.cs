using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Decypher.Web.Migrations
{
    /// <inheritdoc />
    public partial class Add_VideoInterviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VideoInterviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CandidateId = table.Column<Guid>(type: "uuid", nullable: false),
                    CandidateName = table.Column<string>(type: "text", nullable: false),
                    JobTitle = table.Column<string>(type: "text", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Deadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    Questions = table.Column<List<string>>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoInterviews", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VideoResponses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    VideoInterviewId = table.Column<Guid>(type: "uuid", nullable: false),
                    QuestionIndex = table.Column<int>(type: "integer", nullable: false),
                    VideoUrl = table.Column<string>(type: "text", nullable: true),
                    Transcript = table.Column<string>(type: "text", nullable: true),
                    Sentiment = table.Column<string>(type: "text", nullable: true),
                    AiScore = table.Column<int>(type: "integer", nullable: false),
                    Duration = table.Column<string>(type: "text", nullable: false),
                    RecordedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoResponses_VideoInterviews_VideoInterviewId",
                        column: x => x.VideoInterviewId,
                        principalTable: "VideoInterviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VideoInterviews_CandidateId",
                table: "VideoInterviews",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoInterviews_TenantId",
                table: "VideoInterviews",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoResponses_TenantId",
                table: "VideoResponses",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoResponses_VideoInterviewId",
                table: "VideoResponses",
                column: "VideoInterviewId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VideoResponses");

            migrationBuilder.DropTable(
                name: "VideoInterviews");
        }
    }
}
