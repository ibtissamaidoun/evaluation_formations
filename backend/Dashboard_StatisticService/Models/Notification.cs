using Dashboard_StatisticService.Models;  // Ajoute cette ligne pour inclure les modèles

    public class Notification
    {
        public int ID { get; set; }
        public int  UserId { get; set; } // Clé étrangère vers User
        public string Message { get; set; } // Contenu de la notification
       public bool IsRead { get; set; }
        public DateTime Date_creation { get; set; }

        public User User { get; set; } // Relation 1-à-1 avec User
    }

