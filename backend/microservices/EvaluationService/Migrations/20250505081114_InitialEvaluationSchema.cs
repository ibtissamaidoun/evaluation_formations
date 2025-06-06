using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EvaluationService.Migrations
{
    /// <inheritdoc />
    public partial class InitialEvaluationSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EvaluationTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nom = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EvaluationTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Evaluations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Note = table.Column<float>(type: "real", nullable: false),
                    Commentaire = table.Column<string>(type: "text", nullable: true),
                    DateSoumission = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EvaluationTypeId = table.Column<int>(type: "integer", nullable: false),
                    AuteurId = table.Column<int>(type: "integer", nullable: false),
                    AuteurRole = table.Column<string>(type: "text", nullable: true),
                    CibleId = table.Column<int>(type: "integer", nullable: false),
                    CibleType = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evaluations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Evaluations_EvaluationTypes_EvaluationTypeId",
                        column: x => x.EvaluationTypeId,
                        principalTable: "EvaluationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_EvaluationTypeId",
                table: "Evaluations",
                column: "EvaluationTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Evaluations");

            migrationBuilder.DropTable(
                name: "EvaluationTypes");
        }
    }
}
