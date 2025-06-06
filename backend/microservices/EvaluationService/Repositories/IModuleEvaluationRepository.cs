using EvaluationService.Dtos;
using EvaluationService.Models;
using System.Threading.Tasks;

namespace EvaluationService.Repositories
{
    public interface IModuleEvaluationRepository
    {
        Task<bool> SoumettreEvaluationModuleAsync(CreateModuleEvaluationDto dto);
        Task<List<Evaluation>> GetEvaluationsModuleByUserIdAsync(int userId);
    }
}
