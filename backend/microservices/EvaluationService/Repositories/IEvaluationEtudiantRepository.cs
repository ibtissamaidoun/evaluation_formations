using EvaluationService.Models; 
using EvaluationService.Dtos;
namespace EvaluationService.Repositories
{
    public interface IEvaluationEtudiantRepository
    {
        // Méthode pour soumettre une évaluation d'un étudiant
        Task<bool> SoumettreEvaluationEtudiantAsync(CreateStudentEvaluationDto dto);

        // Méthode pour récupérer les évaluations d'un étudiant pour un module
        Task<List<Evaluation>> GetEvaluationsEtudiantByModuleAsync(int moduleId, int etudiantId);
    }
}
