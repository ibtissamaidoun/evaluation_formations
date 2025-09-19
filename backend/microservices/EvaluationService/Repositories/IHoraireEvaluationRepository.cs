using EvaluationService.Models;
using EvaluationService.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using EvaluationService.Repositories;

namespace EvaluationService.Repositories
{
    public interface IHoraireEvaluationRepository
    {
        Task<bool> SoumettreEvaluationHoraireAsync(CreateHoraireEvaluationDto dto);
        Task<List<Evaluation>> GetEvaluationsHoraireByUserIdAsync(int userId);

        // Task<List<Evaluation>> GetEvaluationsByUserIdAsync(int userId);
        // Task<List<Evaluation>> GetEvaluationsByEvaluationTypeAsync(int evaluationTypeId);
    }
}
