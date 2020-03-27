using Microsoft.EntityFrameworkCore.Migrations;

namespace MVC_Tasker.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Spellen",
                columns: table => new
                {
                    SpelId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Omschrijving = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    BordJson = table.Column<string>(nullable: true),
                    AandeBeurt = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spellen", x => x.SpelId);
                });

            migrationBuilder.CreateTable(
                name: "Spelers",
                columns: table => new
                {
                    SpelerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naam = table.Column<string>(nullable: true),
                    Wachtwoord = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    Kleur = table.Column<int>(nullable: false),
                    SpelId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spelers", x => x.SpelerId);
                    table.ForeignKey(
                        name: "FK_Spelers_Spellen_SpelId",
                        column: x => x.SpelId,
                        principalTable: "Spellen",
                        principalColumn: "SpelId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Spelers_SpelId",
                table: "Spelers",
                column: "SpelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Spelers");

            migrationBuilder.DropTable(
                name: "Spellen");
        }
    }
}
