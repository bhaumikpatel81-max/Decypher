using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Decypher.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddModulePermissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ModulePermissions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantId = table.Column<Guid>(type: "uuid", nullable: false),
                    RoleName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModuleKey = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CanRead = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CanWrite = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CanDelete = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModulePermissions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ModulePermissions_TenantId_RoleName",
                table: "ModulePermissions",
                columns: new[] { "TenantId", "RoleName" });

            migrationBuilder.CreateIndex(
                name: "IX_ModulePermissions_TenantId_RoleName_ModuleKey",
                table: "ModulePermissions",
                columns: new[] { "TenantId", "RoleName", "ModuleKey" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "ModulePermissions");
        }
    }
}
