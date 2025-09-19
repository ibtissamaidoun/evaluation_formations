namespace Dashboard_StatisticService.Models
{
    public class Etudiant : User  // Héritage de User
    {
       // public string  User_ID { get; set; }  // Clé étrangère vers User (si nécessaire)
        public string Specialite { get; set; }  // Attribut spécifique à Etudiant (par exemple, spécialité)

          // Navigation property vers User
    }
}
