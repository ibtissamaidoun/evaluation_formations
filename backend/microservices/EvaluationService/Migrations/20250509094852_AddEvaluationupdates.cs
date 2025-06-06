using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EvaluationService.Migrations
{
    /// <inheritdoc />
    public partial class AddEvaluationupdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_questions_EvaluationTypes_EvaluationTypeId",
                table: "questions");

            migrationBuilder.DropForeignKey(
                name: "FK_reponses_Evaluations_EvaluationId",
                table: "reponses");

            migrationBuilder.DropForeignKey(
                name: "FK_reponses_questions_QuestionId",
                table: "reponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_reponses",
                table: "reponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_questions",
                table: "questions");

            migrationBuilder.DropColumn(
                name: "CibleId",
                table: "Evaluations");

            migrationBuilder.RenameTable(
                name: "reponses",
                newName: "Reponses");

            migrationBuilder.RenameTable(
                name: "questions",
                newName: "Questions");

            migrationBuilder.RenameIndex(
                name: "IX_reponses_QuestionId",
                table: "Reponses",
                newName: "IX_Reponses_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_reponses_EvaluationId",
                table: "Reponses",
                newName: "IX_Reponses_EvaluationId");

            migrationBuilder.RenameIndex(
                name: "IX_questions_EvaluationTypeId",
                table: "Questions",
                newName: "IX_Questions_EvaluationTypeId");

            migrationBuilder.AddColumn<int>(
                name: "EtudiantId",
                table: "Evaluations",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ModuleId",
                table: "Evaluations",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModuleType",
                table: "Evaluations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProfId",
                table: "Evaluations",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reponses",
                table: "Reponses",
                column: "ReponseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Questions",
                table: "Questions",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_EvaluationTypes_EvaluationTypeId",
                table: "Questions",
                column: "EvaluationTypeId",
                principalTable: "EvaluationTypes",
                principalColumn: "EvaluationTypeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reponses_Evaluations_EvaluationId",
                table: "Reponses",
                column: "EvaluationId",
                principalTable: "Evaluations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reponses_Questions_QuestionId",
                table: "Reponses",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_EvaluationTypes_EvaluationTypeId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Reponses_Evaluations_EvaluationId",
                table: "Reponses");

            migrationBuilder.DropForeignKey(
                name: "FK_Reponses_Questions_QuestionId",
                table: "Reponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reponses",
                table: "Reponses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Questions",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "EtudiantId",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "ModuleId",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "ModuleType",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "ProfId",
                table: "Evaluations");

            migrationBuilder.RenameTable(
                name: "Reponses",
                newName: "reponses");

            migrationBuilder.RenameTable(
                name: "Questions",
                newName: "questions");

            migrationBuilder.RenameIndex(
                name: "IX_Reponses_QuestionId",
                table: "reponses",
                newName: "IX_reponses_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_Reponses_EvaluationId",
                table: "reponses",
                newName: "IX_reponses_EvaluationId");

            migrationBuilder.RenameIndex(
                name: "IX_Questions_EvaluationTypeId",
                table: "questions",
                newName: "IX_questions_EvaluationTypeId");

            migrationBuilder.AddColumn<int>(
                name: "CibleId",
                table: "Evaluations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_reponses",
                table: "reponses",
                column: "ReponseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_questions",
                table: "questions",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_questions_EvaluationTypes_EvaluationTypeId",
                table: "questions",
                column: "EvaluationTypeId",
                principalTable: "EvaluationTypes",
                principalColumn: "EvaluationTypeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reponses_Evaluations_EvaluationId",
                table: "reponses",
                column: "EvaluationId",
                principalTable: "Evaluations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reponses_questions_QuestionId",
                table: "reponses",
                column: "QuestionId",
                principalTable: "questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
