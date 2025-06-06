using EvaluationService.Repositories;
using EvaluationService.Data;
using EvaluationService.Dtos;
using EvaluationService.Models;
namespace EvaluationService.Services
{
    public class EvaluationEtudiantService
    {
        private readonly IEvaluationEtudiantRepository _repository;

        public EvaluationEtudiantService(IEvaluationEtudiantRepository repository)
        {
            _repository = repository;
        }

        // Soumettre l'évaluation d'un étudiant
        public async Task<bool> SoumettreEvaluationAsync(CreateStudentEvaluationDto dto)
        {
            // Calcul de la note globale
            dto.NoteGlobale = CalculerNoteGlobale(dto.Reponses);
            return await _repository.SoumettreEvaluationEtudiantAsync(dto);
        }

        // Récupérer les évaluations de l'étudiant pour un module
        public async Task<List<EvaluationResponseDto>> GetEvaluationsByModuleAsync(int moduleId, int etudiantId)
        {
            // Récupérer les évaluations pour l'étudiant et le module spécifiés
            var evaluations = await _repository.GetEvaluationsEtudiantByModuleAsync(moduleId, etudiantId);

            // Mapper les évaluations en DTO pour éviter les boucles infinies
            return evaluations.Select(e => MapToDto(e)).ToList();
        }

        // Méthode de mappage de l'entité Evaluation en EvaluationResponseDto
        private EvaluationResponseDto MapToDto(Evaluation evaluation)
        {
            return new EvaluationResponseDto
            {
                Id = evaluation.Id,
                EvaluationTypeId = evaluation.EvaluationTypeId,
                NoteGlobale = (float)evaluation.NoteGlobale,
                Commentaire = evaluation.Commentaire,
                UserId = evaluation.UserId,
                ProfId = evaluation.ProfId,
                ModuleType = evaluation.ModuleType,
                ModuleId = evaluation.ModuleId,
                EtudiantId = evaluation.EtudiantId,
                Reponses = evaluation.Reponses.Select(r => new ReponseDto
                {
                    QuestionId = r.QuestionId,
                    ReponseText = r.ReponseText,
                    TexteQuestion = r.Question?.TexteQuestion
                }).ToList()  // Mapper les réponses
            };
        }

        // Méthode pour calculer la note globale
        private float CalculerNoteGlobale(List<ReponseDto> reponses)
        {
            var notes = reponses.Select(r => ConvertirTexteEnNote(r.ReponseText)).ToList();
            return notes.Count > 0 ? (float)notes.Average() : 0f;
        }

        // Convertir les réponses en note
        private int ConvertirTexteEnNote(string reponse)
        {
            if (string.IsNullOrWhiteSpace(reponse))
                return 3; // Valeur par défaut

            return reponse.ToLower().Trim() switch
            {
                "5" or "excellente" or "tout à fait" or "toujours" or "oui" => 5,
                "4" => 4,
                "3" or "moyenne" or "satisfaisante" => 3,
                "2" => 2,
                "1" or "insuffisante" or "non" => 1,
                _ => 3 // Valeur par défaut
            };
        }
    }
}
