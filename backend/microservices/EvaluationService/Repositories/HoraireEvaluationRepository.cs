using EvaluationService.Data;
using EvaluationService.Dtos;
using EvaluationService.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace EvaluationService.Repositories
{
    public class HoraireEvaluationRepository : IHoraireEvaluationRepository
    {
        private readonly ApplicationDbContext _context;

        public HoraireEvaluationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SoumettreEvaluationHoraireAsync(CreateHoraireEvaluationDto dto)
        {
            var evaluation = new Evaluation
            {
                EvaluationTypeId = dto.EvaluationTypeId,
                UserId = dto.UserId,
                Commentaire = dto.Commentaire,
                NoteGlobale = dto.NoteGlobale,
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


        public async Task<List<Evaluation>> GetEvaluationsHoraireByUserIdAsync(int userId)
        {
            return await _context.Evaluations
            .Where(e => e.UserId == userId && e.EvaluationTypeId == 3)
            .Include(e => e.Reponses)
            .ThenInclude(r => r.Question) // ✅ pour que Question soit chargé
            .ToListAsync();

        }

    }


}
