import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

interface ActivityItem {
  title: string
  time: string
  type: "form" | "evaluation" | "log"
}

@Component({
  selector: "app-recent-activity",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activity-section">
      <h2>Activité récente</h2>
      <div class="activity-columns">
        <div class="activity-column">
          <h3>Derniers formulaires créés</h3>
          <div class="activity-list">
            <div *ngFor="let item of recentForms" class="activity-item">
              <div class="activity-content">
                <span class="activity-title">{{ item.title }}</span>
                <span class="activity-time">{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="activity-column">
          <h3>Dernières évaluations reçues</h3>
          <div class="activity-list">
            <div *ngFor="let item of recentEvaluations" class="activity-item">
              <div class="activity-content">
                <span class="activity-title">{{ item.title }}</span>
                <span class="activity-time">{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="activity-column">
          <h3>Logs système</h3>
          <div class="activity-list">
            <div *ngFor="let item of systemLogs" class="activity-item">
              <div class="activity-content">
                <span class="activity-title">{{ item.title }}</span>
                <span class="activity-time">{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .activity-section {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .activity-section h2 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1.5rem;
    }

    .activity-columns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .activity-column h3 {
      font-size: 1rem;
      font-weight: 500;
      color: #333;
      margin-bottom: 1rem;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .activity-item {
      padding: 0.75rem;
      background-color: #f8f9fa;
      border-radius: 6px;
      border-left: 3px solid #00695c;
    }

    .activity-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .activity-title {
      font-size: 0.9rem;
      color: #333;
      font-weight: 500;
    }

    .activity-time {
      font-size: 0.8rem;
      color: #666;
    }

    @media (max-width: 992px) {
      .activity-columns {
        grid-template-columns: 1fr;
      }
    }
    `,
  ],
})
export class RecentActivityComponent {
  recentForms: ActivityItem[] = [
    { title: "Formulaire d'évaluation Java", time: "Il y a 2 heures", type: "form" },
    { title: "Formulaire satisfaction TD", time: "Il y a 4 heures", type: "form" },
    { title: "Formulaire infrastructure", time: "Il y a 1 jour", type: "form" },
  ]

  recentEvaluations: ActivityItem[] = [
    { title: "Évaluation module Réseaux", time: "Il y a 1 heure", type: "evaluation" },
    { title: "Évaluation espace classe", time: "Il y a 3 heures", type: "evaluation" },
    { title: "Évaluation horaires", time: "Il y a 5 heures", type: "evaluation" },
  ]

  systemLogs: ActivityItem[] = [
    { title: "Connexion utilisateur admin", time: "Il y a 30 min", type: "log" },
    { title: "Sauvegarde automatique", time: "Il y a 2 heures", type: "log" },
    { title: "Mise à jour système", time: "Il y a 6 heures", type: "log" },
  ]
}
