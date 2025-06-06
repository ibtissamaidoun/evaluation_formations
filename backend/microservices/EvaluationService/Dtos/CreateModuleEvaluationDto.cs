using System.Collections.Generic;

namespace EvaluationService.Dtos
{
    public class CreateModuleEvaluationDto
    {
        public int EvaluationTypeId { get; set; }  // ID de l'évaluation des modules
        public int UserId { get; set; }            // L'étudiant qui soumet l'évaluation
        public string? Commentaire { get; set; }   // Commentaire libre de l'étudiant
        public float NoteGlobale { get; set; }     // Note globale calculée
        public int ProfId { get; set; }            // Le professeur choisi par l'étudiant
        public string ModuleType { get; set; }     // Type de module : Cours, TD, TP, CC
        public List<ReponseDto> Reponses { get; set; } // Liste des réponses aux questions
    }
}

