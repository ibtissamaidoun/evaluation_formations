namespace UserService.Kafka
{
    public class KafkaSettings
    {
        public string BootstrapServers { get; set; } = "localhost:9092";
        public string UserTopic { get; set; } = "user-events";
        public string GroupId { get; set; } = "user-service";
    }
}