using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace simple_feedback_service.Migrations
{
    public partial class ClientFeedbackTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClientFeedbackTypes",
                columns: table => new
                {
                    ClientFeedbackTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientFeedbackTypeStr = table.Column<string>(nullable: true),
                    ClientFeedbackTypeDesc = table.Column<string>(nullable: true),
                    ClientAppId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientFeedbackTypes", x => x.ClientFeedbackTypeId);
                    table.ForeignKey(
                        name: "FK_ClientFeedbackTypes_ClientApps_ClientAppId",
                        column: x => x.ClientAppId,
                        principalTable: "ClientApps",
                        principalColumn: "ClientAppId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientFeedbackTypes_ClientAppId",
                table: "ClientFeedbackTypes",
                column: "ClientAppId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientFeedbackTypes");
        }
    }
}
