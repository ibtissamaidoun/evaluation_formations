using System.ComponentModel.DataAnnotations;

namespace EvaluationService.Dtos
{
    public class CreateEspaceEvaluationDto
    {
        [Required(ErrorMessage = "Le type d'évaluation est requis.")]
        public int EvaluationTypeId { get; set; } // Type d'évaluation : espace scolaire

        [Required(ErrorMessage = "L'ID de l'utilisateur est requis.")]
        public int UserId { get; set; }  // ID de l'utilisateur qui soumet l'évaluation

        [Required(ErrorMessage = "La note globale est requise.")]
        public float NoteGlobale { get; set; }  // Note globale calculée après les réponses

        public string? Commentaire { get; set; }  // Commentaire optionnel

        [Required(ErrorMessage = "Les réponses sont requises.")]
        public List<ReponseDto> Reponses { get; set; } // Liste des réponses

        public int EspaceId { get; set; }

    }
}
