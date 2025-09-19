namespace Dashboard_StatisticService.Models
{
    public class Professeur : User  // Héritage de User
    {
        public string DomaineExpertise { get; set; } // Propriété spécifique à Professeur
    }
}
