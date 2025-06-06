namespace EvaluationService.Dtos
{
    public class CreateHoraireEvaluationDto
    {
        public int EvaluationTypeId { get; set; } // Devrait être 3 pour "Horaires"
        //public int HoraireId { get; set; }        // Identifiant de l'horaire (ex: planning S1)
        public int UserId { get; set; }
        public string? Commentaire { get; set; }
        public float NoteGlobale { get; set; }

        public List<ReponseDto> Reponses { get; set; }
    }
}
