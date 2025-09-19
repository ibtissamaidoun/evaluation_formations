using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EvaluationService.Migrations
{
    /// <inheritdoc />
    public partial class AddCibleIdToEvaluation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Evaluations",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Commentaire",
                table: "Evaluations",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "CibleId",
                table: "Evaluations",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CibleId",
                table: "Evaluations");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Evaluations",
                newName: "ID");

            migrationBuilder.AlterColumn<string>(
                name: "Commentaire",
                table: "Evaluations",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
