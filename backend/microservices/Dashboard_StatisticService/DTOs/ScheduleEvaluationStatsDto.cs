public class ScheduleEvaluationStatsDto
{
    public double AverageSatisfactionScore { get; set; }
    public Dictionary<string, int> SatisfactionDistribution { get; set; } // Good, Average, Poor
}
