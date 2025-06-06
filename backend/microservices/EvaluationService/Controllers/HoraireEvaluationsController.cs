using Microsoft.AspNetCore.Mvc;
using EvaluationService.Services;
using EvaluationService.Dtos;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace EvaluationService.Controllers
{
    [ApiController]
    [Route("api/evaluations/horaires")]
    public class EvaluationHoraireController : ControllerBase
    {
        private readonly EvaluationHoraireService _service;

        public EvaluationHoraireController(EvaluationHoraireService service)
        {
            _service = service;
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

                return Ok("Évaluation horaire soumise avec succès.");
            }
            catch (Exception ex)
            {
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
