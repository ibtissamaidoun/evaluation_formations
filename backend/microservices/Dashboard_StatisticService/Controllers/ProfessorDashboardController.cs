// Controllers/ProfessorDashboardController.cs
using Microsoft.AspNetCore.Mvc;

[Route("api/professor-dashboard")]
[ApiController]
public class ProfessorDashboardController : ControllerBase
{
    private readonly ProfessorDashboardService _professorDashboardService;

    public ProfessorDashboardController(ProfessorDashboardService professorDashboardService)
    {
        _professorDashboardService = professorDashboardService;
    }

    // Récupérer les statistiques du dashboard du professeur
    [HttpGet("{professorId}")]
    public async Task<IActionResult> GetProfessorDashboardStats(int professorId)
    {
        var result = await _professorDashboardService.GetProfessorDashboardStatsAsync(professorId);
        if (result == null)
            return NotFound($"No data found for professor with ID {professorId}.");
        return Ok(result);
    }
}
