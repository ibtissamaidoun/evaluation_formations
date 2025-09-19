public class StudentDashboardStatsDto
{
    public double AverageModuleScore { get; set; }
    public double AverageSpaceEvaluation { get; set; }
    public double AverageScheduleEvaluation { get; set; }
    public int RemainingModuleEvaluations { get; set; }
    public int RemainingSpaceEvaluations { get; set; }
    public int RemainingScheduleEvaluations { get; set; }
    public List<NotificationDto> Notifications { get; set; }
}
