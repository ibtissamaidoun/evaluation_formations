using Microsoft.EntityFrameworkCore;

public class NotificationRepository :   INotificationRepository
{
    private readonly ApplicationDbContext _context;

    public NotificationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    // Récupérer les notifications non lues pour un utilisateur
    public async Task<List<NotificationDto>> GetUnreadNotificationsAsync(int userId)
    {
        return await _context.Notifications
            .Where(n => n.UserId == userId && !n.IsRead)
            .Select(n => new NotificationDto
            {
                UserId = n.UserId,
                Message = n.Message,
                IsRead = n.IsRead
            })
            .ToListAsync();
    }

    // Récupérer toutes les notifications pour un utilisateur
    public async Task<List<NotificationDto>> GetNotificationsByUserAsync(int userId)
    {
        return await _context.Notifications
            .Where(n => n.UserId == userId)
            .Select(n => new NotificationDto
            {
                UserId = n.UserId,
                Message = n.Message,
                IsRead = n.IsRead
            })
            .ToListAsync();
    }

    // Créer une nouvelle notification
    public async Task<NotificationDto> CreateNotificationAsync(NotificationDto notificationDto)
    {
        var notification = new Notification
        {
            UserId = notificationDto.UserId,
            Message = notificationDto.Message,
            IsRead = notificationDto.IsRead,
            Date_creation = DateTime.Now
        };

        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();

        return notificationDto;
    }

}
