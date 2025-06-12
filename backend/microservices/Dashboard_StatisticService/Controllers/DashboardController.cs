using Microsoft.AspNetCore.Mvc;
using Dashboard_StatisticService.Models;
using System.Text;
[Route("api/dashboard")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly DashboardService2 _dashboardService;

    public DashboardController(DashboardService2 dashboardService)
    {
        _dashboardService = dashboardService;
    }

    

    [HttpGet("admin-dashboard-stats")]
    public async Task<IActionResult> GetAdminDashboardStats()
    {
        var result = await _dashboardService.GetAdminDashboardStatsAsync();
        if (result == null)
            return NotFound("No data found for admin dashboard stats.");
        return Ok(result);
    }

   

    [HttpGet("average-scores")]
    public async Task<IActionResult> GetAverageScores()
    {
        var result = await _dashboardService.GetAverageScoresAsync();
        if (result == null)
            return NotFound("No average scores found.");
        return Ok(result);
    }

   

    /*

    [HttpGet("module-evaluation-stats")]
    public async Task<IActionResult> GetModuleEvaluationStats()
    {
        var result = await _dashboardService.GetModuleEvaluationStatsAsync();
        if (result == null)
            return NotFound("No module evaluation stats found.");
        return Ok(result);
    }*/

   
  // Récupérer les statistiques des évaluations des étudiants
    [HttpGet("student-evaluation-stats")]
    public async Task<IActionResult> GetStudentEvaluationStats()
    {
        var result = await _dashboardService.GetAllStudentEvaluationStatsAsync();
        if (result == null)
            return NotFound("No student evaluation stats found.");
        return Ok(result);
    }
 

    [HttpGet("schedule-evaluation-stats")]
    public async Task<IActionResult> GetScheduleEvaluationStats()
    {
        var result = await _dashboardService.GetScheduleEvaluationStatsAsync();
        if (result == null)
            return NotFound("No schedule evaluation stats found.");
        return Ok(result);
    }

 
/*

    [HttpGet("student-evaluation-stats/{studentId}")]
    public async Task<IActionResult> GetStudentEvaluationStats(int studentId)
    {
        var result = await _dashboardService.GetStudentEvaluationStatsAsync(studentId);
        if (result == null)
            return NotFound($"No evaluation stats found for student with ID {studentId}.");
        return Ok(result);
    }
*/

    

    [HttpGet("school-space-evaluation-stats")]
    public async Task<IActionResult> GetSchoolSpaceEvaluationStats()
    {
        var result = await _dashboardService.GetSchoolSpaceEvaluationStatsAsync();
        if (result == null)
            return NotFound("No school space evaluation stats found.");
        return Ok(result);
    }

    

    
    [HttpGet("insights")]
    public async Task<IActionResult> GetInsights()
    {
        var result = await _dashboardService.GetInsightsAsync();
        if (result == null)
            return NotFound("No insights available.");
        return Ok(result);
    }

  
}
