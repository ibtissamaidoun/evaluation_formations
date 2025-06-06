using EvaluationService.Dtos;
using EvaluationService.Models;
using EvaluationService.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvaluationService.Services
{
    public class EvaluationHoraireService
    {
        private readonly IHoraireEvaluationRepository _horaireRepository;

        public EvaluationHoraireService(IHoraireEvaluationRepository horaireRepository)
        {
            _horaireRepository = horaireRepository;
        }

        public async Task<bool> SoumettreEvaluationAsync(CreateHoraireEvaluationDto dto)
        {
            // Calcul de la note globale
            dto.NoteGlobale = CalculerNoteGlobale(dto.Reponses);
            return await _horaireRepository.SoumettreEvaluationHoraireAsync(dto);
        }

        // 🔢 Convertit chaque réponse texte en une note (1 à 5)
        private int ConvertirTexteEnNote(string reponse)
        {
            if (string.IsNullOrWhiteSpace(reponse))
                return 3; // Neutre par défaut

            return reponse.ToLower().Trim() switch
            {
                // Réponses classiques
                "5" or "excellente" or "excellent" or "tout à fait" or "toujours" or "oui" => 5,
                "4" => 4,
                "3" or "moyenne" or "moyennement" or "parfois" or "satisfaisante" => 3,
                "2" => 2,
                "1" or "rarement" or "faible" or "pas du tout" or "non" or "insuffisante" => 1,

                // Mood cards
                "je dors pas assez" => 1,
                "c’est équilibré" => 3,
                "ça nuit à mes résultats" => 2,

                // Smileys
                "😡" => 1,
                "😕" => 2,
                "🙂" => 3,
                "😄" => 4,
                "🤩" => 5,

                // Étoiles : ex. "⭐⭐⭐"
                var r when r.All(c => c == '⭐') => r.Length,

                _ => 3 // Valeur par défaut
            };
        }

        
        private float CalculerNoteGlobale(List<ReponseDto> reponses)
        {
            var notes = reponses.Select(r => ConvertirTexteEnNote(r.ReponseText)).ToList();
            return notes.Count > 0 ? (float)notes.Average() : 0f;

        }
        public async Task<List<Evaluation>> GetEvaluationsHoraireByUserAsync(int userId)
        {
            return await _horaireRepository.GetEvaluationsHoraireByUserIdAsync(userId);
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
                    ReponseText = r.ReponseText,
                    TexteQuestion = r.Question?.TexteQuestion // ✅ attention au null
                }).ToList()
            };
        }



    }
}
