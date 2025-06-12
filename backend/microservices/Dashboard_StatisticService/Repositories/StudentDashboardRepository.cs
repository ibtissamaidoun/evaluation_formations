using Dashboard_StatisticService.Models;
using Microsoft.EntityFrameworkCore;

//public class StudentDashboardRepository //: IStudentDashboardRepository

   /* private readonly ApplicationDbContext _context;

    public StudentDashboardRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<StudentDashboardStatsDto> GetStudentDashboardStatsAsync(string studentId)
    {
        var completedEvaluations = await _context.Evaluation
            .Where(e => e.EtudiantId == studentId && e.Score != null)
            .ToListAsync();

        var averageScore = completedEvaluations.Any()
            ? completedEvaluations.Average(e => (double)e.Score!)
            : 0;

        var pendingCount = await _context.Evaluation
            .CountAsync(e => e.EtudiantId == studentId && e.Score == null);

        // 🔹 Ici, User_ID est de type string, donc on récupère directement
        var userId = await _context.Users
            .Where(u => u.Id == studentId)
            .Select(u => u.User_ID)
            .FirstOrDefaultAsync();

        var unreadNotifications = await _context.Notifications
            .CountAsync(n => n.UserId == userId && !n.Statut);

        return new StudentDashboardStatsDto
        {
            AverageScore = averageScore,
            PendingEvaluations = pendingCount,
            UnreadNotifications = unreadNotifications
        };
    }

    public async Task<List<Notification>> GetUnreadNotificationsAsync(string studentId)
    {
        var userId = await _context.Users
            .Where(u => u.Id == studentId)
            .Select(u => u.User_ID)
            .FirstOrDefaultAsync();

        return await _context.Notifications
        .Where(n => n.UserId == userId && !n.Statut)
        .ToListAsync();
    }

    public async Task<List<StudentEvaluationDto>> GetCompletedEvaluationsAsync(string studentId)
    {
        return await _context.Evaluation
            .Where(e => e.EtudiantId == studentId && e.Score != null)
            .Join(_context.Module,
                e => e.ModuleId,
                m => m.ModuleId,
                (e, m) => new StudentEvaluationDto
                {
                    ModuleName = m.Nom,
                    Score = e.Score,  // Pas besoin de .Value si Score est non nullable

                    Date = e.DateEvaluation
                })
            .ToListAsync();
    }
    */
public class StudentDashboardRepository : IStudentDashboardRepository
{
    private readonly ApplicationDbContext _context;

    public StudentDashboardRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    // Récupérer les statistiques du dashboard étudiant
    public async Task<StudentDashboardStatsDto> GetStudentDashboardStatsAsync(int studentId)
    {
        var moduleAverage = await _context.Evaluation
            .Where(e => e.EtudiantId == studentId && e.EvaluationTypeId == 1) // Module
            .AverageAsync(e => e.NoteGlobale);

        var spaceAverage = await _context.Evaluation
            .Where(e => e.EtudiantId == studentId && e.EvaluationTypeId == 2) // Espace scolaire
            .AverageAsync(e => e.NoteGlobale);

        var scheduleAverage = await _context.Evaluation
            .Where(e => e.EtudiantId == studentId && e.EvaluationTypeId == 3) // Horaires
            .AverageAsync(e => e.NoteGlobale);

        var remainingModuleEvaluations = await _context.Evaluation
            .Where(e => e.EtudiantId == studentId && e.EvaluationTypeId == 1 && e.NoteGlobale == 0) // Evaluations non soumises
            .CountAsync();

        var remainingSpaceEvaluations = await _context.Evaluation
            .Where(e => e.EtudiantId == studentId && e.EvaluationTypeId == 2 && e.NoteGlobale == 0)
            .CountAsync();

        var remainingScheduleEvaluations = await _context.Evaluation
            .Where(e => e.EtudiantId == studentId && e.EvaluationTypeId == 3 && e.NoteGlobale == 0)
            .CountAsync();

        // Récupérer les notifications non lues
        var notifications = await GetUnreadNotificationsAsync(studentId);

        return new StudentDashboardStatsDto
        {
            AverageModuleScore = moduleAverage,
            AverageSpaceEvaluation = spaceAverage,
            AverageScheduleEvaluation = scheduleAverage,
            RemainingModuleEvaluations = remainingModuleEvaluations,
            RemainingSpaceEvaluations = remainingSpaceEvaluations,
            RemainingScheduleEvaluations = remainingScheduleEvaluations,
            Notifications = notifications
        };
    }

    // Récupérer les notifications non lues
   public async Task<List<NotificationDto>> GetUnreadNotificationsAsync(int studentId)
{
    return await _context.Notifications
        .Where(n => n.UserId == studentId && !n.IsRead) // Comparer int avec int
        .Select(n => new NotificationDto
        {
            Message = n.Message,
            IsRead = n.IsRead
        })
        .ToListAsync();
}

}
