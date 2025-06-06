
namespace EvaluationService.Models{
    public class Question
    {
        public int QuestionId { get; set; }
        public string TexteQuestion { get; set; } 
        public int EvaluationTypeId { get; set; } 
        public EvaluationType EvaluationType { get; set; }
    }
}