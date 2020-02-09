using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace simple_feedback_service.Migrations
{
    public partial class FeedbackTypeSettings2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClientFeedbackTypeSettings",
                columns: table => new
                {
                    ClientFeedbackTypeSettingId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ResendUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientFeedbackTypeSettings", x => x.ClientFeedbackTypeSettingId);
                });

            migrationBuilder.CreateTable(
                name: "KeyValues",
                columns: table => new
                {
                    KeyValueId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Key = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    ClientFeedbackTypeSettingId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeyValues", x => x.KeyValueId);
                    table.ForeignKey(
                        name: "FK_KeyValues_ClientFeedbackTypeSettings_ClientFeedbackTypeSettingId",
                        column: x => x.ClientFeedbackTypeSettingId,
                        principalTable: "ClientFeedbackTypeSettings",
                        principalColumn: "ClientFeedbackTypeSettingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KeyValues_ClientFeedbackTypeSettingId",
                table: "KeyValues",
                column: "ClientFeedbackTypeSettingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KeyValues");

            migrationBuilder.DropTable(
                name: "ClientFeedbackTypeSettings");
        }
    }
}
