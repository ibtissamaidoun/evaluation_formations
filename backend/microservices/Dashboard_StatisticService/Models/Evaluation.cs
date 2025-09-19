using Dashboard_StatisticService.Models;  // Ajoute cette ligne pour inclure les modèles
public class Evaluation
{
    public int Id { get; set; }                      // Clé primaire
    public int EvaluationTypeId { get; set; }        // Ex: Module, Espace, Horaire...
    public double NoteGlobale { get; set; }
    public string? Commentaire { get; set; }
    public int UserId { get; set; }                  // Utilisateur évaluant
    public int ProfId { get; set; }                 // Professeur (pour évaluation de module)
    public string ModuleType { get; set; }          // Type de module (Cours, TD, TP, CC)
    public int ModuleId { get; set; }               // Module spécifique (pour évaluation de module)
    public int EtudiantId { get; set; }             // Étudiant spécifique (pour évaluation de l'étudiant)
    //public ICollection<Reponse> Reponses { get; set; }
public DateTime DateCreation { get; set; } 
    public EvaluationType EvaluationType { get; set; }
}
