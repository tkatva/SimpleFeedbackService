using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace simple_feedback_service.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClientApps",
                columns: table => new
                {
                    ClientAppId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientName = table.Column<string>(nullable: true),
                    ClientToken = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientApps", x => x.ClientAppId);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    FeedbackId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FeedbackStr = table.Column<string>(nullable: true),
                    FeedbackSource = table.Column<string>(nullable: true),
                    FeedbackGiverEmail = table.Column<string>(nullable: true),
                    FeedbackGiver = table.Column<string>(nullable: true),
                    FeedbackType = table.Column<string>(nullable: true),
                    FeedbackDate = table.Column<DateTime>(nullable: false),
                    FeedbackProcessed = table.Column<bool>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    Response = table.Column<string>(nullable: true),
                    ClientAppId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.FeedbackId);
                    table.ForeignKey(
                        name: "FK_Feedbacks_ClientApps_ClientAppId",
                        column: x => x.ClientAppId,
                        principalTable: "ClientApps",
                        principalColumn: "ClientAppId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_ClientAppId",
                table: "Feedbacks",
                column: "ClientAppId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "ClientApps");
        }
    }
}
