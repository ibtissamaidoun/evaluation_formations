using EvaluationService.Models;
namespace EvaluationService.Repositories{
    public interface IEvaluationRepository
{
    Task<List<Evaluation>> GetEvaluationsByUserIdAsync(int userId);
    Task<List<Evaluation>> GetEvaluationsByEvaluationTypeAsync(int evaluationTypeId);
}

}