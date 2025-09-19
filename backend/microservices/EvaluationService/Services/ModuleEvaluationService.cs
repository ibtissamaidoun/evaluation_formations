using EvaluationService.Data;
using EvaluationService.Dtos;
using EvaluationService.Models;
using Microsoft.EntityFrameworkCore;
using EvaluationService.Repositories;

namespace EvaluationService.Services
{
    public class ModuleEvaluationService
    {
        private readonly IModuleEvaluationRepository _moduleRepository;

        public ModuleEvaluationService(IModuleEvaluationRepository moduleRepository)
        {
            _moduleRepository = moduleRepository;
        }

        // Méthode pour soumettre l'évaluation du module
        public async Task<bool> SoumettreEvaluationAsync(CreateModuleEvaluationDto dto)
        {
            // Calcul de la note globale
            dto.NoteGlobale = CalculerNoteGlobale(dto.Reponses);
            return await _moduleRepository.SoumettreEvaluationModuleAsync(dto);
        }

        // Convertit chaque réponse texte en une note (1 à 5)
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

        // Calcul de la note globale
        private float CalculerNoteGlobale(List<ReponseDto> reponses)
        {
            var notes = reponses.Select(r => ConvertirTexteEnNote(r.ReponseText)).ToList();
            return notes.Count > 0 ? (float)notes.Average() : 0f;
        }
          public async Task<List<EvaluationResponseDto>> GetEvaluationsModuleByUserAsync(int userId)
        {
            var evaluations = await _moduleRepository.GetEvaluationsModuleByUserIdAsync(userId);

            // Mapper chaque évaluation en DTO
            return evaluations.Select(e => MapToDto(e)).ToList();
        }

        // Mapper l'entité Evaluation en EvaluationResponseDto
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
                Reponses = evaluation.Reponses.Select(r => new ReponseDto
                {
                    QuestionId = r.QuestionId,
                    ReponseText = r.ReponseText,
                    TexteQuestion = r.Question?.TexteQuestion  // Récupérer le texte de la question
                }).ToList()
            };
        }


        

    }
}
