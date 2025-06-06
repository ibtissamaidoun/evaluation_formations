using Microsoft.AspNetCore.Mvc;
using EvaluationService.Services;
using EvaluationService.Dtos;
using System;
using System.Threading.Tasks;
using System.Linq;
namespace EvaluationService.Controllers
{
    [ApiController]
    [Route("api/evaluations/etudiant")]
    public class EtudiantEvaluationController : ControllerBase
    {
        private readonly EvaluationEtudiantService _service;

        public EtudiantEvaluationController(EvaluationEtudiantService service)
        {
            _service = service;
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

                return Ok("Évaluation de l'étudiant soumise avec succès.");
            }
            catch (Exception ex)
            {
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
