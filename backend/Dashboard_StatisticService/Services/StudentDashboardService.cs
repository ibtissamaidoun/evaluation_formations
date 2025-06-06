

public class StudentDashboardService
{
    private readonly IStudentDashboardRepository _studentDashboardRepository;

    public StudentDashboardService(IStudentDashboardRepository studentDashboardRepository)
    {
        _studentDashboardRepository = studentDashboardRepository;
    }

    // Récupérer les statistiques du dashboard étudiant
    public async Task<StudentDashboardStatsDto> GetStudentDashboardStatsAsync(int studentId)
    {
        return await _studentDashboardRepository.GetStudentDashboardStatsAsync(studentId);
    }
}
