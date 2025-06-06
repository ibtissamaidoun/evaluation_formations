namespace EvaluationService.Dtos
{
    public class EvaluationResponseDto
    {
        public int Id { get; set; }
        public int EvaluationTypeId { get; set; }
        public float NoteGlobale { get; set; }
        public string? Commentaire { get; set; }
        public int UserId { get; set; }
        public int? ProfId { get; set; }  // Ajout de ProfId
        public int? ModuleId {get; set;}
        public int? EtudiantId {get; set;}
        public string? ModuleType { get; set; }  // Ajout de ModuleType
        public List<ReponseDto> Reponses { get; set; }
    }
}
