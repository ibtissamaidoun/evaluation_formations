using EvaluationService.Data;
using EvaluationService.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EvaluationService.Repositories
{
    public class EvaluationRepository : IEvaluationRepository
    {
        private readonly ApplicationDbContext _context;

        public EvaluationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Evaluation>> GetEvaluationsByUserIdAsync(int userId)
        {
            return await _context.Evaluations
                .Where(e => e.UserId == userId)
                .Include(e => e.Reponses)
                .ToListAsync();
        }

        public async Task<List<Evaluation>> GetEvaluationsByEvaluationTypeAsync(int evaluationTypeId)
        {
            return await _context.Evaluations
                .Where(e => e.EvaluationTypeId == evaluationTypeId)
                .Include(e => e.Reponses)
                .ToListAsync();
        }
    }
}
