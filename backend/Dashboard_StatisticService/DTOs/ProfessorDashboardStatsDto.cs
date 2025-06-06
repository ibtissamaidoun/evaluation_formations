public class ProfessorDashboardStatsDto
{
    public int AssignedModules { get; set; }
    public int EvaluatedStudents { get; set; }
    public int PendingEvaluations { get; set; }
    public List<ModuleCompletionStatsDto> ModuleCompletionStats { get; set; }
    public SatisfactionStatsDto SatisfactionStats { get; set; }
    public List<CalendarEventDto> CalendarEvents { get; set; }
}
