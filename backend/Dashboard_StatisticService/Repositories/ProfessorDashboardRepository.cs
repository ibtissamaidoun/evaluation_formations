using Microsoft.EntityFrameworkCore;

public class ProfessorDashboardRepository : IProfessorDashboardRepository
{
    private readonly ApplicationDbContext _context;

    public ProfessorDashboardRepository(ApplicationDbContext context)
    {
        _context = context;
    }

  public async Task<ProfessorDashboardStatsDto> GetProfessorDashboardStatsAsync(int  professorId)
{
    // Récupérer les modules attribués au professeur
    var assignedModules = await _context.Module
        .Where(m => m.ProfId == professorId)
        .CountAsync();

    // Récupérer le nombre d'étudiants évalués
    var evaluatedStudents = await _context.Evaluation
        .Where(e => e.ProfId == professorId && e.NoteGlobale != 0)
        .Select(e => e.EtudiantId)
        .Distinct()
        .CountAsync();

    // Récupérer les évaluations en attente
    var pendingEvaluations = await _context.Evaluation
        .Where(e => e.ProfId == professorId && e.NoteGlobale == 0)
        .CountAsync();

    // Récupérer les statistiques de satisfaction des étudiants
    var satisfactionStats = await _context.Evaluation
        .Where(e => e.ProfId == professorId)
        .GroupBy(e => e.NoteGlobale >= 3)
        .Select(g => new
        {
            Positive = g.Count(e => e.NoteGlobale >= 4),
            Neutral = g.Count(e => e.NoteGlobale == 3),
            Negative = g.Count(e => e.NoteGlobale < 3)
        })
        .FirstOrDefaultAsync() ?? new { Positive = 0, Neutral = 0, Negative = 0 };

    // Récupérer les événements du calendrier
    var calendarEvents = await _context.CalendarEvents
        .Where(c => c.ProfId == professorId)
        .Select(c => new CalendarEventDto
        {
            EventName = c.EventName,
            EventDate = c.EventDate
        })
        .ToListAsync();

    // Calcul des pourcentages de satisfaction
    var totalEvaluations = satisfactionStats.Positive + satisfactionStats.Neutral + satisfactionStats.Negative;
    var satisfaction = new SatisfactionStatsDto
    {
        Positive = totalEvaluations == 0 ? 0 : (double)satisfactionStats.Positive / totalEvaluations * 100,
        Neutral = totalEvaluations == 0 ? 0 : (double)satisfactionStats.Neutral / totalEvaluations * 100,
        Negative = totalEvaluations == 0 ? 0 : (double)satisfactionStats.Negative / totalEvaluations * 100
    };

    // Compléter les statistiques des modules
    var totalStudents = await _context.Etudiants.CountAsync();

    var moduleCompletionStats = await _context.Module
        .Where(m => m.ProfId == professorId)
        .Select(m => new ModuleCompletionStatsDto
        {
            ModuleName = m.Nom,
            CompletionPercentage = totalStudents == 0 ? 0 :
                ((double)_context.Evaluation
                    .Where(e => e.ModuleId == m.ModuleId)
                    .Count() / totalStudents) * 100
        })
        .ToListAsync();

    return new ProfessorDashboardStatsDto
    {
        AssignedModules = assignedModules,
        EvaluatedStudents = evaluatedStudents,
        PendingEvaluations = pendingEvaluations,
        SatisfactionStats = satisfaction,
        CalendarEvents = calendarEvents,
        ModuleCompletionStats = moduleCompletionStats
    };
}
}