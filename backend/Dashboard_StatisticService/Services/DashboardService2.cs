public class DashboardService2
{
    private readonly IDashboardRepository _dashboardRepository;

    public DashboardService2(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    #region Admin Dashboard Stats
    public async Task<AdminDashboardStatsDto> GetAdminDashboardStatsAsync()
    {
        return await _dashboardRepository.GetAdminDashboardStatsAsync();
    }
    
    public async Task<AverageScoresDto> GetAverageScoresAsync()
    {
        return await _dashboardRepository.GetAverageScoresAsync();
    }
    #endregion

   /*
    public async Task<ModuleEvaluationStatsDto> GetModuleEvaluationStatsAsync()
    {
        return await _dashboardRepository.GetModuleEvaluationStatsAsync();
    }
    */

    #region Schedule Evaluation Stats
    public async Task<ScheduleEvaluationStatsDto> GetScheduleEvaluationStatsAsync()
    {
        return await _dashboardRepository.GetScheduleEvaluationStatsAsync();
    }
    #endregion

    #region Student Evaluation Stats
    public async Task<StudentEvaluationStatsDto> GetStudentEvaluationStatsAsync(int studentId)
    {
        return await _dashboardRepository.GetStudentEvaluationStatsAsync(studentId);
    }
    #endregion

    #region School Space Evaluation Stats
    public async Task<SchoolSpaceEvaluationStatsDto> GetSchoolSpaceEvaluationStatsAsync()
    {
        return await _dashboardRepository.GetSchoolSpaceEvaluationStatsAsync();
    }
    #endregion

    #region Insights
    public async Task<InsightsDto> GetInsightsAsync()
    {
        return await _dashboardRepository.GetInsightsAsync();
    }
    #endregion
     // Méthode pour récupérer les statistiques des évaluations de tous les étudiants
    public async Task<StudentEvaluationStatsDto> GetAllStudentEvaluationStatsAsync()
    {
        // Récupérer les statistiques des étudiants via le repository
        var studentEvaluationStats = await _dashboardRepository.GetAllStudentEvaluationStatsAsync();

        // Vous pouvez appliquer des calculs supplémentaires ici si nécessaire, comme calculer la moyenne des scores
        // Exemple: Calculer la moyenne de tous les scores des étudiants ici

        return studentEvaluationStats;
    }
}
