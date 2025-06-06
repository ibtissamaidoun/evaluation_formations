using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

namespace AuthenticationService.Migrations
{
    public partial class CreatePasswordResetTokensTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Création de la table PasswordResetTokens
            migrationBuilder.CreateTable(
                name: "PasswordResetTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordResetTokens", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Suppression de la table PasswordResetTokens
            migrationBuilder.DropTable(
                name: "PasswordResetTokens");
        }
    }
}
