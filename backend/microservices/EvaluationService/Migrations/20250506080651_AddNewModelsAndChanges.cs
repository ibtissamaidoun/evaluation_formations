using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EvaluationService.Migrations
{
    /// <inheritdoc />
    public partial class AddNewModelsAndChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuteurId",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "AuteurRole",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "CibleType",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "DateSoumission",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "Evaluations");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "EvaluationTypes",
                newName: "EvaluationTypeId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Evaluations",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "CibleId",
                table: "Evaluations",
                newName: "UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "EvaluationTypes",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Commentaire",
                table: "Evaluations",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "NoteGlobale",
                table: "Evaluations",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "questions",
                columns: table => new
                {
                    QuestionId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TexteQuestion = table.Column<string>(type: "text", nullable: false),
                    EvaluationTypeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_questions", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_questions_EvaluationTypes_EvaluationTypeId",
                        column: x => x.EvaluationTypeId,
                        principalTable: "EvaluationTypes",
                        principalColumn: "EvaluationTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "reponses",
                columns: table => new
                {
                    ReponseId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuestionId = table.Column<int>(type: "integer", nullable: false),
                    ReponseText = table.Column<string>(type: "text", nullable: false),
                    EvaluationId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reponses", x => x.ReponseId);
                    table.ForeignKey(
                        name: "FK_reponses_Evaluations_EvaluationId",
                        column: x => x.EvaluationId,
                        principalTable: "Evaluations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reponses_questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "questions",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_questions_EvaluationTypeId",
                table: "questions",
                column: "EvaluationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_reponses_EvaluationId",
                table: "reponses",
                column: "EvaluationId");

            migrationBuilder.CreateIndex(
                name: "IX_reponses_QuestionId",
                table: "reponses",
                column: "QuestionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "reponses");

            migrationBuilder.DropTable(
                name: "questions");

            migrationBuilder.DropColumn(
                name: "NoteGlobale",
                table: "Evaluations");

            migrationBuilder.RenameColumn(
                name: "EvaluationTypeId",
                table: "EvaluationTypes",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Evaluations",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Evaluations",
                newName: "CibleId");

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "EvaluationTypes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Commentaire",
                table: "Evaluations",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "AuteurId",
                table: "Evaluations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AuteurRole",
                table: "Evaluations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CibleType",
                table: "Evaluations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateSoumission",
                table: "Evaluations",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<float>(
                name: "Note",
                table: "Evaluations",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
