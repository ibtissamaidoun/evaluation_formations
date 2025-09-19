using EvaluationService.Models;
using EvaluationService.Data;
using EvaluationService.Dtos;
using Microsoft.EntityFrameworkCore;
namespace EvaluationService.Repositories
{
    public class EvaluationEtudiantRepository : IEvaluationEtudiantRepository
    {
        private readonly ApplicationDbContext _context;

        public EvaluationEtudiantRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Soumettre l'évaluation d'un étudiant
        public async Task<bool> SoumettreEvaluationEtudiantAsync(CreateStudentEvaluationDto dto)
        {
            var evaluation = new Evaluation
            {
                EvaluationTypeId = dto.EvaluationTypeId,  // L'ID spécifique pour l'évaluation des étudiants
                UserId = dto.UserId,  // Professeur qui évalue
                Commentaire = dto.Commentaire,
                NoteGlobale = dto.NoteGlobale,
                ModuleId = dto.ModuleId,  // Lien avec le module évalué
                EtudiantId = dto.StudentId,  // Lien avec l'étudiant évalué
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

        // Récupérer les évaluations d'un étudiant pour un module
        public async Task<List<Evaluation>> GetEvaluationsEtudiantByModuleAsync(int moduleId, int etudiantId)
        {
            return await _context.Evaluations
                .Where(e => e.ModuleId == moduleId && e.EtudiantId == etudiantId)
                .Include(e => e.Reponses)
                .ThenInclude(r => r.Question)  // Inclure les réponses de l'évaluation
                .ToListAsync();
        }
    }
}
