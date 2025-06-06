using EvaluationService.Dtos;
using System.Threading.Tasks;
using EvaluationService.Models;

namespace EvaluationService.Repositories
{
    public interface IEspaceEvaluationRepository
    {
        Task<bool> SoumettreEvaluationEspaceAsync(CreateEspaceEvaluationDto dto);
        Task<List<Evaluation>> GetEvaluationsEspaceByUserIdAsync(int userId);
    }
}
