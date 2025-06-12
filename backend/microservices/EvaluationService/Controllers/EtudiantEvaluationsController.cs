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
    [Route("api/evaluations/etudiant")]
    public class EtudiantEvaluationController : ControllerBase
    {
        private readonly EvaluationEtudiantService _service;
        private readonly KafkaEventPublisher _kafkaPublisher; // Remplace IProducer
        private readonly ILogger<EtudiantEvaluationController> _logger;

        public EtudiantEvaluationController(EvaluationEtudiantService service, KafkaEventPublisher kafkaPublisher, 
            ILogger<EtudiantEvaluationController> logger)
        {
            _service = service;
            _kafkaPublisher = kafkaPublisher;
            _logger = logger;
        }


 // Soumettre l'évaluation d'un étudiant
        [HttpPost("soumettre")]
        public async Task<IActionResult> SoumettreEvaluation([FromBody] CreateStudentEvaluationDto dto)
        {
            try
            {
                if (dto == null || dto.Reponses == null || !dto.Reponses.Any())
                    return BadRequest("Les données d'évaluation sont invalides ou incomplètes.");

                var result = await _service.SoumettreEvaluationAsync(dto);

                if (!result)
                    return BadRequest("Échec de l'enregistrement de l'évaluation.");

                // --- AJOUT: Publication Kafka ---
                await _kafkaPublisher.PublishAsync("evaluations-etudiant", new
                {
                    EventType = "EvaluationEtudiantCreated",
                    Evaluation = dto,
                    Timestamp = DateTime.UtcNow
                });

                return Ok("Évaluation de l'étudiant soumise avec succès.");
            }
            catch (ProduceException<Null, string> kafkaEx) // Gestion spécifique Kafka
            {
                _logger.LogError($"Erreur Kafka: {kafkaEx.Error.Reason}");
                return StatusCode(500, "Évaluation enregistrée mais erreur de notification");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur interne");
                return StatusCode(500, $"Erreur interne du serveur : {ex.Message}");
            }
        }

        // Récupérer les évaluations de l'étudiant pour un module spécifique
        [HttpGet("by-module/{moduleId}/etudiant/{etudiantId}")]
        public async Task<IActionResult> GetEvaluationsByModule(int moduleId, int etudiantId)
        {
            try
            {
                var evaluations = await _service.GetEvaluationsByModuleAsync(moduleId, etudiantId);

                if (evaluations == null || !evaluations.Any())
                    return NotFound("Aucune évaluation pour cet étudiant dans ce module.");

                return Ok(evaluations);  // Retourner les évaluations sous forme de DTO
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur : {ex.Message}");
            }
        }
    }
}
