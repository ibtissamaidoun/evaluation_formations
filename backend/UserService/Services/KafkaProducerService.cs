// // Services/KafkaProducerService.cs
// using Confluent.Kafka;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.Logging;
// using System;
// using System.Text.Json;
// using System.Threading.Tasks;

// namespace Backend.Services
// {
//     public class KafkaProducerService : IKafkaProducerService, IDisposable
//     {
//         private readonly IProducer<string, string> _producer;
//         private readonly ILogger<KafkaProducerService> _logger;

//         public KafkaProducerService(IConfiguration configuration, ILogger<KafkaProducerService> logger)
//         {
//             _logger = logger;
            
//             var config = new ProducerConfig
//             {
//                 BootstrapServers = configuration["KAFKA_BOOTSTRAP_SERVERS"] ?? "localhost:9092",
//                 ClientId = "backend-producer"
//             };

//             _producer = new ProducerBuilder<string, string>(config).Build();
//         }

//         public async Task PublishAsync<T>(string topic, T message, string key = null)
//         {
//             try
//             {
//                 var serializedMessage = JsonSerializer.Serialize(message);
                
//                 var kafkaMessage = new Message<string, string>
//                 {
//                     Key = key ?? Guid.NewGuid().ToString(),
//                     Value = serializedMessage,
//                     Headers = new Headers
//                     {
//                         { "MessageType", System.Text.Encoding.UTF8.GetBytes(typeof(T).Name) },
//                         { "Timestamp", System.Text.Encoding.UTF8.GetBytes(DateTimeOffset.UtcNow.ToString()) }
//                     }
//                 };

//                 var result = await _producer.ProduceAsync(topic, kafkaMessage);
                
//                 _logger.LogInformation($"Message published to topic {topic}, partition {result.Partition}, offset {result.Offset}");
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, $"Error publishing message to topic {topic}");
//                 throw;
//             }
//         }

//         public void Dispose()
//         {
//             _producer?.Dispose();
//         }
//     }
// }
using Confluent.Kafka;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace UserService.Services
{
    public class KafkaProducerService : IKafkaProducerService, IDisposable
    {
        private readonly IProducer<string, string> _producer;
        private readonly ILogger<KafkaProducerService> _logger;

        public KafkaProducerService(IConfiguration configuration, ILogger<KafkaProducerService> logger)
        {
            _logger = logger;
            
            var config = new ProducerConfig
            {
                BootstrapServers = configuration.GetConnectionString("Kafka") ?? "localhost:9092",
                ClientId = "user-service-producer"
            };

            _producer = new ProducerBuilder<string, string>(config).Build();
        }

        public async Task PublishAsync<T>(string topic, T message, string? key = null)
        {
            try
            {
                var serializedMessage = JsonSerializer.Serialize(message);
                
                var kafkaMessage = new Message<string, string>
                {
                    Key = key ?? Guid.NewGuid().ToString(),
                    Value = serializedMessage,
                    Headers = new Headers
                    {
                        { "MessageType", System.Text.Encoding.UTF8.GetBytes(typeof(T).Name) },
                        { "Timestamp", System.Text.Encoding.UTF8.GetBytes(DateTimeOffset.UtcNow.ToString()) }
                    }
                };

                var result = await _producer.ProduceAsync(topic, kafkaMessage);
                
                _logger.LogInformation($"Message published to topic {topic}, partition {result.Partition}, offset {result.Offset}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error publishing message to topic {topic}");
                throw;
            }
        }

        public void Dispose()
        {
            _producer?.Dispose();
        }
    }
}