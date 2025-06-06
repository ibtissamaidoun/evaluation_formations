// DTO pour la moyenne des évaluations
public class AverageScoresDto
{
    public double OverallAverageScore { get; set; }
    public Dictionary<string, double> ModuleAverageScores { get; set; } // Clé : ModuleName, Valeur : Moyenne du module
    
}
