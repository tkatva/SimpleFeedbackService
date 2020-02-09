using Microsoft.EntityFrameworkCore.Migrations;

namespace simple_feedback_service.Migrations
{
    public partial class FeedbackTypeSettings3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientFeedbackTypeId",
                table: "ClientFeedbackTypeSettings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ClientFeedbackTypeSettings_ClientFeedbackTypeId",
                table: "ClientFeedbackTypeSettings",
                column: "ClientFeedbackTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientFeedbackTypeSettings_ClientFeedbackTypes_ClientFeedbackTypeId",
                table: "ClientFeedbackTypeSettings",
                column: "ClientFeedbackTypeId",
                principalTable: "ClientFeedbackTypes",
                principalColumn: "ClientFeedbackTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientFeedbackTypeSettings_ClientFeedbackTypes_ClientFeedbackTypeId",
                table: "ClientFeedbackTypeSettings");

            migrationBuilder.DropIndex(
                name: "IX_ClientFeedbackTypeSettings_ClientFeedbackTypeId",
                table: "ClientFeedbackTypeSettings");

            migrationBuilder.DropColumn(
                name: "ClientFeedbackTypeId",
                table: "ClientFeedbackTypeSettings");
        }
    }
}
