using Microsoft.EntityFrameworkCore;

public class DashboardRepository : IDashboardRepository
{
    private readonly ApplicationDbContext _context;

    public DashboardRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<AdminDashboardStatsDto> GetAdminDashboardStatsAsync()
    {
        return new AdminDashboardStatsDto
        {
            ModulesCount = await _context.Module.CountAsync(),
            StudentsCount = await _context.Etudiants.CountAsync(),
            ProfessorsCount = await _context.Professeurs.CountAsync(),
            PendingEvaluationsCount = await _context.Evaluation.CountAsync(e => e.NoteGlobale == 0) ,// Exemple pour les évaluations en attente
            TotalEvaluationsCount = await _context.Evaluation.CountAsync()
        };
    }

    public async Task<AverageScoresDto> GetAverageScoresAsync()
    {
        var overallAverageScore = await _context.Evaluation.AverageAsync(e => e.NoteGlobale);
        var moduleAverageScores = await _context.Module
            .Select(module => new 
            {
                ModuleName = module.Nom,
                AverageScore = _context.Evaluation.Where(e => e.ModuleId == module.ModuleId ).Average(e => e.NoteGlobale)
            })
            .ToDictionaryAsync(x => x.ModuleName, x => x.AverageScore);

        return new AverageScoresDto
        {
            OverallAverageScore = overallAverageScore,
            ModuleAverageScores = moduleAverageScores
        };
    }

    // Implémentations des autres méthodes pour récupérer les évaluations, statistiques, etc.
    public async Task<ModuleEvaluationStatsDto> GetModuleEvaluationStatsAsync()
{
    var moduleEvaluation = await _context.Evaluation
        .Where(e => e.EvaluationTypeId == 1)  // Exemple: 1 pourrait représenter le type "Module"
        .GroupBy(e => e.ModuleId)
        .Select(g => new
        {
            ModuleName = g.Key,
            AverageScore = g.Average(e => e.NoteGlobale),
            RecentComments = g.OrderByDescending(e => e.Id).Take(5).Select(e => e.Commentaire).ToList() // Prendre les 5 derniers commentaires
        })
        .FirstOrDefaultAsync();

    if (moduleEvaluation == null)
        return null;

    return new ModuleEvaluationStatsDto
    {
        AverageModuleScore = moduleEvaluation.AverageScore,
        RecentComments = moduleEvaluation.RecentComments
    };
}
public async Task<ScheduleEvaluationStatsDto> GetScheduleEvaluationStatsAsync()
{
    var scheduleStats = await _context.Evaluation
        .Where(e => e.EvaluationTypeId == 3) // Exemple: 2 pourrait représenter le type "Horaire"
        .GroupBy(e => e.NoteGlobale)
        .Select(g => new
        {
            Score = g.Key,
            Count = g.Count()
        })
        .ToListAsync();

    var satisfactionDistribution = scheduleStats.ToDictionary(x => x.Score.ToString(), x => x.Count);

    var averageSatisfactionScore = scheduleStats.Average(x => x.Score);

    return new ScheduleEvaluationStatsDto
    {
        AverageSatisfactionScore = averageSatisfactionScore,
        SatisfactionDistribution = satisfactionDistribution
    };
}

public async Task<SchoolSpaceEvaluationStatsDto> GetSchoolSpaceEvaluationStatsAsync()
{
    var schoolSpaceStats = await _context.Evaluation
        .Where(e => e.EvaluationTypeId == 2) // Exemple: 3 pourrait représenter le type "Espace scolaire"
        .AverageAsync(e => e.NoteGlobale);

    return new SchoolSpaceEvaluationStatsDto
    {
        AverageInfrastructureRating = schoolSpaceStats
    };
}
public async Task<InsightsDto> GetInsightsAsync()
{
    // Exemple: 50% des étudiants ont du mal avec le module CS101
    var insight = "50% des étudiants ont du mal avec le module CS101, il est recommandé d'organiser une session de révision.";

    return new InsightsDto
    {
        Insight = insight
    };
}
public async Task<StudentEvaluationStatsDto> GetStudentEvaluationStatsAsync(int studentId)
{
    // Récupérer les évaluations de l'étudiant avec EvaluationTypeId = 4
    var studentEvaluation = await _context.Evaluation
        .Where(e => e.EtudiantId == studentId && e.EvaluationTypeId == 4) // Assurez-vous que EvaluationTypeId est bien de type int
        .GroupBy(e => e.EtudiantId)
        .Select(g => new
        {
            AverageBehaviourScore = g.Average(e => e.NoteGlobale), // Moyenne des notes
            EvaluationByArea = g.GroupBy(e => e.ModuleType) // Groupement par type de module (e.g., Cours, TD, TP)
                               .ToDictionary(area => area.Key, area => area.Average(e => e.NoteGlobale)) // Moyenne par zone
        })
        .FirstOrDefaultAsync();

    if (studentEvaluation == null)
        return null;

    // Récupérer les évaluations de l'étudiant avec la date de création et la note pour chaque évaluation
    var evaluationByDate = await _context.Evaluation
        .Where(e => e.EtudiantId == studentId && e.EvaluationTypeId == 4) // Filtrer aussi ici par EvaluationTypeId = 4
        .OrderBy(e => e.DateCreation) // Trier par date de création
        .Select(e => new EvaluationByDateDto
        {
            Date = e.DateCreation.ToString("MMM yyyy"), // Formatage de la date (mois année)
            Score = e.NoteGlobale // Récupérer la note globale
        })
        .ToListAsync();

    // Retourner un DTO avec les résultats récupérés
    return new StudentEvaluationStatsDto
    {
        AverageBehaviourScore = studentEvaluation.AverageBehaviourScore, // Note moyenne de comportement
        EvaluationByArea = studentEvaluation.EvaluationByArea, // Moyenne par zone (par module)
        EvaluationByDate = evaluationByDate // Évaluations par date
    };
}


public async Task<StudentEvaluationStatsDto> GetAllStudentEvaluationStatsAsync()
{
    // Calcul de la moyenne globale des évaluations de tous les étudiants
    var averageBehaviourScore = await _context.Evaluation
        .Where(e => e.EvaluationTypeId == 4) // EvaluationTypeId = 4 pour le comportement
        .AverageAsync(e => e.NoteGlobale);

    // Calcul des scores moyens par zone (ex: "Good", "Classes", "Campus")
    var evaluationByArea = await _context.Evaluation
        .Where(e => e.EvaluationTypeId == 4) // EvaluationTypeId = 4 pour le comportement
        .GroupBy(e => e.ModuleType) // Groupement par type de module (zone)
        .Select(g => new
        {
            Area = g.Key, // Nom de la zone (par exemple, "Good", "Classes", "Campus")
            AverageScore = g.Average(e => e.NoteGlobale) // Moyenne des scores pour cette zone
        })
        .ToListAsync();

    // Préparation des résultats à retourner
    var studentEvaluationStats = new StudentEvaluationStatsDto
    {
        AverageBehaviourScore = averageBehaviourScore,
        EvaluationByArea = evaluationByArea.ToDictionary(area => area.Area, area => area.AverageScore)
    };

    return studentEvaluationStats;
}

}
