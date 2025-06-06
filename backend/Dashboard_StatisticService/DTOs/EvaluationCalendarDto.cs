// DTO pour le calendrier des évaluations
public class EvaluationCalendarDto
{
    public List<EvaluationEventDto> UpcomingEvaluations { get; set; }
}

public class EvaluationEventDto
{
    public string Module { get; set; }
    public DateTime EvaluationDate { get; set; }
}
