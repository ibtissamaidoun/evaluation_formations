using Dashboard_StatisticService.Models;

public class CalendarEvent
{
    public int Id { get; set; }
    public string EventName { get; set; }
    public DateTime EventDate { get; set; }
    public int ProfId { get; set; }

    public Professeur Professeur { get; set; }  // Relation avec Professeur
}
