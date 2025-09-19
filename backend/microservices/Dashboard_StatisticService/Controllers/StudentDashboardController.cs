
using Microsoft.AspNetCore.Mvc;



  


[Route("api/student-dashboard")]
[ApiController]
public class StudentDashboardController : ControllerBase
{
    private readonly StudentDashboardService _studentDashboardService;

    public StudentDashboardController(StudentDashboardService studentDashboardService)
    {
        _studentDashboardService = studentDashboardService;
    }

    // Récupérer les statistiques du dashboard étudiant
    [HttpGet("{studentId}")]
    public async Task<IActionResult> GetStudentDashboardStats(int studentId)
    {
        var result = await _studentDashboardService.GetStudentDashboardStatsAsync(studentId);
        if (result == null)
            return NotFound($"No data found for student with ID {studentId}.");
        return Ok(result);
    }
}

