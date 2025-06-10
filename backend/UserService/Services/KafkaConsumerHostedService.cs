using Confluent.Kafka;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text.Json;
using UserService.Events;
using UserService.Kafka;

namespace UserService.Services
{
    public class KafkaConsumerHostedService : BackgroundService
    {
        private readonly IConsumer<string, string> _consumer;
        private readonly ILogger<KafkaConsumerHostedService> _logger;
        private readonly KafkaSettings _kafkaSettings;

        public KafkaConsumerHostedService(
            IOptions<KafkaSettings> kafkaSettings,
            ILogger<KafkaConsumerHostedService> logger)
        {
            _kafkaSettings = kafkaSettings.Value;
            _logger = logger;

            var config = new ConsumerConfig
            {
                BootstrapServers = _kafkaSettings.BootstrapServers,
                GroupId = _kafkaSettings.GroupId,
                AutoOffsetReset = AutoOffsetReset.Earliest,
                EnableAutoCommit = false
            };

            _consumer = new ConsumerBuilder<string, string>(config).Build();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _consumer.Subscribe(_kafkaSettings.UserTopic);

            try
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    try
                    {
                        var consumeResult = _consumer.Consume(stoppingToken);
                        
                        if (consumeResult?.Message != null)
                        {
                            await ProcessMessage(consumeResult.Message);
                            _consumer.Commit(consumeResult);
                        }
                    }
                    catch (ConsumeException ex)
                    {
                        _logger.LogError(ex, "Erreur lors de la consommation du message Kafka");
                    }
                }
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("Kafka consumer arrêté");
            }
            finally
            {
                _consumer.Close();
            }
        }

        private async Task ProcessMessage(Message<string, string> message)
        {
            try
            {
                _logger.LogInformation($"Message reçu: {message.Value}");

                // Déterminer le type d'événement et le traiter
                if (message.Value.Contains("UserCreatedEvent"))
                {
                    var userCreatedEvent = JsonSerializer.Deserialize<UserCreatedEvent>(message.Value);
                    _logger.LogInformation($"User created: {userCreatedEvent.FirstName} {userCreatedEvent.LastName}");
                    // Traiter l'événement...
                }
                else if (message.Value.Contains("UserUpdatedEvent"))
                {
                    var userUpdatedEvent = JsonSerializer.Deserialize<UserUpdatedEvent>(message.Value);
                    _logger.LogInformation($"User updated: {userUpdatedEvent.FirstName} {userUpdatedEvent.LastName}");
                    // Traiter l'événement...
                }
                else if (message.Value.Contains("UserDeletedEvent"))
                {
                    var userDeletedEvent = JsonSerializer.Deserialize<UserDeletedEvent>(message.Value);
                    _logger.LogInformation($"User deleted: {userDeletedEvent.Email}");
                    // Traiter l'événement...
                }

                await Task.CompletedTask;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors du traitement du message");
            }
        }

        public override void Dispose()
        {
            _consumer?.Dispose();
            base.Dispose();
        }
    }
}