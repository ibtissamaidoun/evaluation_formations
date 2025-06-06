public interface INotificationRepository
{
    Task<List<NotificationDto>> GetUnreadNotificationsAsync(int userId);
    Task<List<NotificationDto>> GetNotificationsByUserAsync(int userId);
    Task<NotificationDto> CreateNotificationAsync(NotificationDto notification);
}
