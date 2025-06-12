using Microsoft.AspNetCore.Mvc;
using EvaluationService.Services;
using EvaluationService.Dtos;
using System;
using System.Threading.Tasks;
using System.Linq;
using Confluent.Kafka;


namespace EvaluationService.Controllers
{
    [ApiController]
    [Route("api/evaluations/horaires")]
    public class EvaluationHoraireController : ControllerBase
    {
        private readonly EvaluationHoraireService _service;
        private readonly KafkaEventPublisher _kafkaPublisher; // Nouveau
        private readonly ILogger<EvaluationHoraireController> _logger; // Nouveau
        public EvaluationHoraireController(EvaluationHoraireService service, KafkaEventPublisher kafkaPublisher, // Nouveau
            ILogger<EvaluationHoraireController> logger)
        {
            _service = service;
            _kafkaPublisher = kafkaPublisher;
            _logger = logger;
            
        }

        [HttpPost("soumettre")]
        public async Task<IActionResult> SoumettreEvaluation([FromBody] CreateHoraireEvaluationDto dto)
        {
            try
            {
                if (dto == null || dto.Reponses == null || !dto.Reponses.Any())
                    return BadRequest("Les données d'évaluation sont invalides ou incomplètes.");

                var result = await _service.SoumettreEvaluationAsync(dto);

                if (!result)
                    return BadRequest("Échec de l'enregistrement de l'évaluation.");

                await _kafkaPublisher.PublishAsync("evaluations-horaires", new 
                {
                    EventType = "EvaluationHoraireSubmitted",
                    UserId = dto.UserId,
                    HoraireId = dto.HoraireId,
                    Timestamp = DateTime.UtcNow,
                    Metadata = new 
                    {
                        dto.Reponses.Count,
                        dto.Commentaire?.Length
                    }
                });
                return Ok("Évaluation horaire soumise avec succès.");
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

        [HttpGet("by-user/{userId}")]
        public async Task<IActionResult> GetEvaluationsByUser(int userId)
        {
            try
            {
                var evaluations = await _service.GetEvaluationsHoraireByUserAsync(userId);

                if (evaluations == null || !evaluations.Any())
                    return NotFound("Aucune évaluation horaire trouvée pour cet utilisateur.");

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
