// Services/KafkaConsumerService.cs
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class KafkaConsumerService : IKafkaConsumerService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<KafkaConsumerService> _logger;

        public KafkaConsumerService(IConfiguration configuration, ILogger<KafkaConsumerService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task StartConsumingAsync(string topic, string groupId, Action<string, string> messageHandler, CancellationToken cancellationToken)
        {
            var config = new ConsumerConfig
            {
                BootstrapServers = _configuration["KAFKA_BOOTSTRAP_SERVERS"] ?? "localhost:9092",
                GroupId = groupId,
                AutoOffsetReset = AutoOffsetReset.Earliest,
                EnableAutoCommit = false
            };

            using var consumer = new ConsumerBuilder<string, string>(config).Build();
            consumer.Subscribe(topic);

            _logger.LogInformation($"Started consuming from topic {topic} with group {groupId}");

            try
            {
                while (!cancellationToken.IsCancellationRequested)
                {
                    try
                    {
                        var consumeResult = consumer.Consume(cancellationToken);
                        
                        if (consumeResult != null)
                        {
                            _logger.LogInformation($"Received message: {consumeResult.Message.Value}");
                            
                            messageHandler(consumeResult.Message.Key, consumeResult.Message.Value);
                            
                            consumer.Commit(consumeResult);
                        }
                    }
                    catch (ConsumeException ex)
                    {
                        _logger.LogError(ex, $"Error consuming message from topic {topic}");
                    }
                }
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation($"Consumer for topic {topic} with group {groupId} stopped");
                consumer.Close();
            }
        }
    }
}