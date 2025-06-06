using EvaluationService.Data;
using EvaluationService.Models;
using EvaluationService.Dtos;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EvaluationService.Repositories
{
    public class ModuleEvaluationRepository : IModuleEvaluationRepository
    {
        private readonly ApplicationDbContext _context;

        public ModuleEvaluationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Implémentation de la méthode pour soumettre l'évaluation du module
        public async Task<bool> SoumettreEvaluationModuleAsync(CreateModuleEvaluationDto dto)
        {
            var evaluation = new Evaluation
            {
                EvaluationTypeId = dto.EvaluationTypeId, // L'ID spécifique pour l'évaluation de module
                UserId = dto.UserId,
                Commentaire = dto.Commentaire,
                NoteGlobale = dto.NoteGlobale,  // Calculée par le service
                ProfId = dto.ProfId,
                ModuleType = dto.ModuleType,
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

        public async Task<List<Evaluation>> GetEvaluationsModuleByUserIdAsync(int userId)
        {
            return await _context.Evaluations
                .Where(e => e.UserId == userId && e.EvaluationTypeId == 1)  // 1 pour "Module"
                .Include(e => e.Reponses)
                .ThenInclude(r => r.Question)  // Inclure la question avec la réponse
                .ToListAsync();
        }

    }
}
