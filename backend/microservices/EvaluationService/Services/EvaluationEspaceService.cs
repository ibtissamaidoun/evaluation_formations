using EvaluationService.Repositories;
using EvaluationService.Dtos;
using EvaluationService.Models;

namespace EvaluationService.Services
{
    public class EspaceEvaluationService
    {
        private readonly IEspaceEvaluationRepository _espaceRepository;

        public EspaceEvaluationService(IEspaceEvaluationRepository espaceRepository)
        {
            _espaceRepository = espaceRepository;
        }

        public async Task<bool> SoumettreEvaluationAsync(CreateEspaceEvaluationDto dto)
        {
            // Calcul de la note globale
            dto.NoteGlobale = CalculerNoteGlobale(dto.Reponses);

            return await _espaceRepository.SoumettreEvaluationEspaceAsync(dto);
        }

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

        private float CalculerNoteGlobale(List<ReponseDto> reponses)
        {
            var notes = reponses.Select(r => ConvertirTexteEnNote(r.ReponseText)).ToList();
            return notes.Count > 0 ? (float)notes.Average() : 0f;
        }
         public async Task<List<Evaluation>> GetEvaluationsEspaceByUserAsync(int userId)
        {
            return await _espaceRepository.GetEvaluationsEspaceByUserIdAsync(userId);
        }

        public EvaluationResponseDto MapToDto(Evaluation evaluation)
        {
            return new EvaluationResponseDto
            {
                Id = evaluation.Id,
                EvaluationTypeId = evaluation.EvaluationTypeId,
                NoteGlobale = (float)evaluation.NoteGlobale,
                Commentaire = evaluation.Commentaire,
                UserId = evaluation.UserId,
                Reponses = evaluation.Reponses.Select(r => new ReponseDto
                {
                    QuestionId = r.QuestionId,
                    ReponseText = r.ReponseText
                }).ToList()
            };
        }

    }
}
