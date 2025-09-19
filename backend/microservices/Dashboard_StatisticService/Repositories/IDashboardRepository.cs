public interface IDashboardRepository
{
    Task<AdminDashboardStatsDto> GetAdminDashboardStatsAsync();
    Task<AverageScoresDto> GetAverageScoresAsync();
    Task<ModuleEvaluationStatsDto> GetModuleEvaluationStatsAsync();
    Task<ScheduleEvaluationStatsDto> GetScheduleEvaluationStatsAsync();
    Task<StudentEvaluationStatsDto> GetStudentEvaluationStatsAsync(int studentId);
    Task<SchoolSpaceEvaluationStatsDto> GetSchoolSpaceEvaluationStatsAsync();
    Task<InsightsDto> GetInsightsAsync();
    Task<StudentEvaluationStatsDto> GetAllStudentEvaluationStatsAsync();
}
