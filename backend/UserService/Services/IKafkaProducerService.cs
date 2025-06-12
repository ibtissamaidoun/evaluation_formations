// // Services/IKafkaProducerService.cs
// using System.Threading.Tasks;

// namespace Backend.Services
// {
//     public interface IKafkaProducerService
//     {
//         Task PublishAsync<T>(string topic, T message, string key = null);
//     }
// }

using System.Threading.Tasks;

namespace UserService.Services
{
    public interface IKafkaProducerService
    {
        Task PublishAsync<T>(string topic, T message, string? key = null);
    }
}