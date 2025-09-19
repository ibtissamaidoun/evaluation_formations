public class Module
{
    public int ModuleId { get; set; } // Clé primaire (automatiquement générée par la base de données)
    public string Nom  { get; set; } // Nom du module (ex. : Mathématiques, Machine Learning, etc.)
    public string Description { get; set; } // Description du module
    public int  ProfId { get; set; }
}
