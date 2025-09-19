namespace EvaluationService.Dtos
{
    public class EvaluationDto
    {
        public int EvaluationId { get; set; }
        public double NoteGlobale { get; set; }
        public string Commentaire { get; set; }
        public List<ReponseDto> Reponses { get; set; }
    }
}
