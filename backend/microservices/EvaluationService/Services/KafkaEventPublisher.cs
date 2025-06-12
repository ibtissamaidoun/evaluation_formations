
using Confluent.Kafka;
using System.Text.Json;

namespace EvaluationService.Services
{
    public class KafkaEventPublisher
    {
        private readonly IProducer<Null, string> _producer;
        private readonly ILogger<KafkaEventPublisher> _logger;

        public KafkaEventPublisher(
            IProducer<Null, string> producer,
            ILogger<KafkaEventPublisher> logger)
        {
            _producer = producer;
            _logger = logger;
        }

        public async Task PublishAsync(string topic, object eventData)
        {
            try
            {
                await _producer.ProduceAsync(topic, new Message<Null, string>
                {
                    Value = JsonSerializer.Serialize(eventData)
                });
            }
            catch (ProduceException<Null, string> e)
            {
                _logger.LogError($"Erreur Kafka: {e.Error.Reason}");
                throw;
            }
        }
    }
}