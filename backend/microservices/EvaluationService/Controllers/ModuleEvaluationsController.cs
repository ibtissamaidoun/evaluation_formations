using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EvaluationService.Data;
using EvaluationService.Models;
using System.Threading.Tasks;
using EvaluationService.Dtos;
using EvaluationService.Services;
namespace EvaluationService.Controllers
{
    [ApiController]
    [Route("api/evaluations/module")]
    public class ModuleEvaluationController : ControllerBase
    {
        private readonly ModuleEvaluationService _service;

        public ModuleEvaluationController(ModuleEvaluationService service)
        {
            _service = service;
        }

        // Méthode POST pour soumettre l'évaluation du module
        [HttpPost("soumettre")]
        public async Task<IActionResult> SoumettreEvaluation([FromBody] CreateModuleEvaluationDto dto)
        {
            try
            {
                if (dto == null || dto.Reponses == null || !dto.Reponses.Any())
                    return BadRequest("Les données d'évaluation sont invalides ou incomplètes.");

                var result = await _service.SoumettreEvaluationAsync(dto);

                if (!result)
                    return BadRequest("Échec de l'enregistrement de l'évaluation.");

                return Ok("Évaluation du module soumise avec succès.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur : {ex.Message}");
            }
        }
        
        // Méthode GET pour récupérer les évaluations de module par userId
        [HttpGet("by-user/{userId}")]
        public async Task<IActionResult> GetEvaluationsByUser(int userId)
        {
            try
            {
                // Appel au service pour récupérer les évaluations sous forme de DTO
                var evaluations = await _service.GetEvaluationsModuleByUserAsync(userId);

                if (evaluations == null || !evaluations.Any())
                    return NotFound("Aucune évaluation du module trouvée pour cet utilisateur.");

                return Ok(evaluations);  // Retourne les évaluations sous forme de DTO
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur : {ex.Message}");
            }
        }

        // Nouvelle méthode GET pour récupérer les évaluations d'un utilisateur spécifique (par exemple, par UserId)
        // [HttpGet("by-user/{userId}")]
        // public async Task<IActionResult> GetEvaluationsByUser(int userId)
        // {
        //     try
        //     {
        //         // Appel au service pour récupérer les évaluations du module par userId
        //         var evaluations = await _service.GetEvaluationsModuleByUserAsync(userId);

        //         if (evaluations == null || !evaluations.Any())
        //             return NotFound("Aucune évaluation du module trouvée pour cet utilisateur.");

        //         return Ok(evaluations);  // Retourne les évaluations sous forme de DTO
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, $"Erreur interne du serveur : {ex.Message}");
        //     }
        // }
    }
}

