using EvaluationService.Repositories;
using EvaluationService.Data;
using EvaluationService.Dtos;
using EvaluationService.Models;
using Microsoft.EntityFrameworkCore;

namespace EvaluationService.Repositories
{
    public class EspaceEvaluationRepository : IEspaceEvaluationRepository
    {
        private readonly ApplicationDbContext _context;

        public EspaceEvaluationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SoumettreEvaluationEspaceAsync(CreateEspaceEvaluationDto dto)
        {
            var evaluation = new Evaluation
            {
                EvaluationTypeId = dto.EvaluationTypeId,   // ID spécifique pour l’espace scolaire
                UserId = dto.UserId,
                Commentaire = dto.Commentaire,
                NoteGlobale = dto.NoteGlobale,  // Calculée par le service
                Reponses = dto.Reponses.Select(r => new Reponse
                {
                    QuestionId = r.QuestionId,
                    ReponseText = r.ReponseText
                }).ToList()
            };

            _context.Evaluations.Add(evaluation);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Evaluation>> GetEvaluationsEspaceByUserIdAsync(int userId)
        {
            return await _context.Evaluations
                .Where(e => e.UserId == userId && e.EvaluationTypeId == 4)  // 4 = ID pour "Espace Scolaire"
                .Include(e => e.Reponses)
                .ToListAsync();
        }
    }
}
