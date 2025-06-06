namespace EvaluationService.Models
{
    public class Evaluation
    {
        public int Id { get; set; }                      // Clé primaire
        public int EvaluationTypeId { get; set; }        // Ex: Module, Espace, Horaire...
        //public int CibleId { get; set; }                 // Id du module OU de l'espace OU de l'horaire
        public double NoteGlobale { get; set; }
        public string? Commentaire { get; set; }
        public int UserId { get; set; }
        public int? ProfId { get; set; }         // Professeur dans le cas de l'évaluation des modules
        public string? ModuleType { get; set; }  // Type de module : Cours, TD, TP, CC
        public int? ModuleId { get; set; }       // Module spécifique (en cas d'évaluation de module)
        public int? EtudiantId { get; set; }     // Étudiant spécifique (en cas d'évaluation de l'étudiant)
        public ICollection<Reponse> Reponses { get; set; }

        public EvaluationType EvaluationType { get; set; }

    }

}