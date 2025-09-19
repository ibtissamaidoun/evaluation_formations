using Microsoft.AspNetCore.Mvc;
using EvaluationService.Dtos;
using EvaluationService.Services;
using Confluent.Kafka;

namespace EvaluationService.Controllers
{
    [ApiController]
    [Route("api/evaluations/espace")]
    public class EvaluationEspaceController : ControllerBase
    {
        private readonly EspaceEvaluationService _service;
        private readonly KafkaEventPublisher _kafkaPublisher;

        public EvaluationEspaceController(EspaceEvaluationService service, KafkaEventPublisher kafkaPublisher)
        {
            _service = service;
            _kafkaPublisher = kafkaPublisher;
        }

        [HttpPost("soumettre")]
        public async Task<IActionResult> SoumettreEvaluation([FromBody] CreateEspaceEvaluationDto dto)
        {
            // Validation du modèle avec un contrôle strict des champs nécessaires
            if (dto == null || dto.UserId == 0 || dto.Reponses == null || !dto.Reponses.Any())
            {
                return BadRequest("Les données d'évaluation sont invalides ou incomplètes. Veuillez vérifier que tous les champs requis sont remplis.");
            }

            try
            {
                var result = await _service.SoumettreEvaluationAsync(dto);

                if (!result)
                    return BadRequest("Échec de l'enregistrement de l'évaluation.");
                //publication  de l'evenementt Kafka
                await _kafkaPublisher.PublishAsync("evaluations-espace", new
                {
                    EventType = "EvaluationEspaceSubmitted",
                    UserId = dto.UserId,
                    EspaceId = dto.EspaceId
                });
                return Ok("Évaluation de l'espace scolaire soumise avec succès.");
            }
             catch (ProduceException<Null, string> kafkaEx)
            {
                // Gestion spécifique des erreurs Kafka
                return StatusCode(500, $"Erreur Kafka: {kafkaEx.Error.Reason}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur : {ex.Message}");
            }
        }
         // Nouvelle méthode GET pour récupérer les évaluations de l'espace scolaire par userId
        [HttpGet("by-user/{userId}")]
        public async Task<IActionResult> GetEvaluationsByUser(int userId)
        {
            try
            {
                var evaluations = await _service.GetEvaluationsEspaceByUserAsync(userId);

                if (evaluations == null || !evaluations.Any())
                    return NotFound("Aucune évaluation espace trouvée pour cet utilisateur.");

                var result = evaluations.Select(e => _service.MapToDto(e)).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur : {ex.Message}");
            }
        }
    }
}


