using Dashboard_StatisticService.Models;
using Microsoft.EntityFrameworkCore;
public interface IStudentDashboardRepository
{
    Task<StudentDashboardStatsDto> GetStudentDashboardStatsAsync(int studentId);
    Task<List<NotificationDto>> GetUnreadNotificationsAsync(int studentId);
}
