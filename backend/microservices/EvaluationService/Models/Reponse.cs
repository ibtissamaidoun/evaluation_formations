namespace EvaluationService.Models{
public class Reponse
    {
        public int ReponseId { get; set; }
        public int QuestionId { get; set; }
        public string ReponseText { get; set; }
        public int EvaluationId { get; set; } // Référence à l'évaluation
        public Question Question { get; set; }
        public Evaluation Evaluation { get; set; }
    }
}