using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EvaluationService.Data;
using EvaluationService.Models;
using System.Threading.Tasks;
using EvaluationService.Dtos;
using EvaluationService.Services;
using Confluent.Kafka;

namespace EvaluationService.Controllers
{
    [ApiController]
    [Route("api/evaluations/module")]
    public class ModuleEvaluationController : ControllerBase
    {
        private readonly ModuleEvaluationService _service;
        private readonly KafkaEventPublisher _kafkaPublisher; 
        private readonly ILogger<ModuleEvaluationController> _logger;
        public ModuleEvaluationController(ModuleEvaluationService service, KafkaEventPublisher kafkaPublisher,
            ILogger<ModuleEvaluationController> logger)
        {
            _service = service;
            _kafkaPublisher = kafkaPublisher;
            _logger = logger;
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

                await _kafkaPublisher.PublishAsync("evaluations-module", new 
                {
                    EventType = "EvaluationModuleSubmitted",
                    UserId = dto.UserId,
                    ModuleId = dto.ModuleId,
                    EvaluationDate = DateTime.UtcNow,
                    Details = new 
                    {
                        NombreReponses = dto.Reponses.Count,
                        PresenceCommentaire = !string.IsNullOrEmpty(dto.Commentaire)
                    }
                });

                return Ok("Évaluation du module soumise avec succès.");
            }
             catch (ProduceException<Null, string> kafkaEx) // Nouveau
            {
                _logger.LogError($"Erreur Kafka: {kafkaEx.Error.Reason}");
                // Fallback optionnel : stocker en base pour rejouer plus tard
                return Ok("Évaluation enregistrée (notification échouée)");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur interne");
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

