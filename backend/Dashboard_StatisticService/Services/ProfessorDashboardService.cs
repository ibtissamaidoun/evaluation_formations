// Services/ProfessorDashboardService.cs
using Dashboard_StatisticService.Models;

public class ProfessorDashboardService
{
    private readonly IProfessorDashboardRepository _professorDashboardRepository;

    public ProfessorDashboardService(IProfessorDashboardRepository professorDashboardRepository)
    {
        _professorDashboardRepository = professorDashboardRepository;
    }

    // Récupérer les statistiques du dashboard du professeur
    public async Task<ProfessorDashboardStatsDto> GetProfessorDashboardStatsAsync(int professorId)
    {
        return await _professorDashboardRepository.GetProfessorDashboardStatsAsync(professorId);
    }
}
