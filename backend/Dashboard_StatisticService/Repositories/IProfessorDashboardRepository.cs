// Repositories/IProfessorDashboardRepository.cs
using Dashboard_StatisticService.Models;
using Microsoft.EntityFrameworkCore;public interface IProfessorDashboardRepository
{
    Task<ProfessorDashboardStatsDto> GetProfessorDashboardStatsAsync(int professorId);
}
