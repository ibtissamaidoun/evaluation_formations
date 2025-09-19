public class NotificationService
{
    private readonly INotificationRepository _notificationRepository;

    public NotificationService(INotificationRepository notificationRepository)
    {
        _notificationRepository = notificationRepository;
    }

    // Récupérer les notifications non lues pour un utilisateur
    public async Task<List<NotificationDto>> GetUnreadNotificationsAsync(int userId)
    {
        return await _notificationRepository.GetUnreadNotificationsAsync(userId);
    }

    // Récupérer toutes les notifications pour un utilisateur
    public async Task<List<NotificationDto>> GetNotificationsByUserAsync(int userId)
    {
        return await _notificationRepository.GetNotificationsByUserAsync(userId);
    }

    // Créer une nouvelle notification
    public async Task<NotificationDto> CreateNotificationAsync(NotificationDto notificationDto)
    {
        return await _notificationRepository.CreateNotificationAsync(notificationDto);
    }
}
