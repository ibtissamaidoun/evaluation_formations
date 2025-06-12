using Microsoft.AspNetCore.Mvc;
using Dashboard_StatisticService.Models;

[Route("api/notifications")]
[ApiController]
public class NotificationController : ControllerBase
{
    private readonly NotificationService _notificationService;

    public NotificationController(NotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    // Récupérer les notifications non lues pour un utilisateur
    [HttpGet("unread/{userId}")]
    public async Task<IActionResult> GetUnreadNotifications(int userId)
    {
        var result = await _notificationService.GetUnreadNotificationsAsync(userId);
        if (result == null || result.Count == 0)
            return NotFound($"No unread notifications found for user with ID {userId}.");
        return Ok(result);
    }

    // Récupérer toutes les notifications pour un utilisateur
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetNotificationsByUser(int userId)
    {
        var result = await _notificationService.GetNotificationsByUserAsync(userId);
        if (result == null || result.Count == 0)
            return NotFound($"No notifications found for user with ID {userId}.");
        return Ok(result);
    }

    // Créer une nouvelle notification
    [HttpPost]
    public async Task<IActionResult> CreateNotification([FromBody] NotificationDto notificationDto)
    {
        var result = await _notificationService.CreateNotificationAsync(notificationDto);
        return CreatedAtAction(nameof(GetNotificationsByUser), new { userId = notificationDto.UserId }, result);
    }
}
