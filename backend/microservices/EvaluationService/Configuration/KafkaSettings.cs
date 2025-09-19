namespace EvaluationService.Configuration
{
    public class KafkaSettings
    {
        public string BootstrapServers { get; set; } = string.Empty;

        // Ne définis cette propriété qu'une seule fois
        public TopicsConfig Topics { get; set; } = new();

        public class TopicsConfig
        {
            public string EspaceEvaluations { get; set; } = string.Empty;
        }
    }
}
