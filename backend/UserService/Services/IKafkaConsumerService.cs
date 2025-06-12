// Services/IKafkaConsumerService.cs
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IKafkaConsumerService
    {
        Task StartConsumingAsync(string topic, string groupId, Action<string, string> messageHandler, CancellationToken cancellationToken);
    }
}