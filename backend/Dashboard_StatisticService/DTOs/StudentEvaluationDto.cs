/*
public class StudentEvaluationDto
{
    public string ModuleName { get; set; }
    public decimal Score { get; set; }
    public DateTimeOffset Date { get; set; }
}*/
public class StudentEvaluationStatsDto
{
    public double AverageBehaviourScore { get; set; }
    public Dictionary<string, double> EvaluationByArea { get; set; } // Par exemple, Classes, Campus
    public List<EvaluationByDateDto> EvaluationByDate { get; set; }
}

public class EvaluationByDateDto
{
    public string Date { get; set; }
    public double Score { get; set; }
}
