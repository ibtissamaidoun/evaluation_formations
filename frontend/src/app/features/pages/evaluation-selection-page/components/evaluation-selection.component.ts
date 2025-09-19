import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

interface EvaluationType {
  title: string
  image: string
  route: string
}

@Component({
  selector: "app-evaluation-selection",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="evaluation-selection">
      <div class="evaluation-cards">
        <div *ngFor="let evaluation of evaluationTypes" class="evaluation-card">
          <div class="card-content">
            <img [src]="evaluation.image" [alt]="evaluation.title" class="card-image" />
            <h2 class="card-title">{{ evaluation.title }}</h2>
          </div>
          <a [routerLink]="evaluation.route" class="card-action">
            <div class="action-button">
              <i class="pi pi-chevron-right"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .evaluation-selection {
      padding: 1rem;
      width: 100%;
    }

    .evaluation-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
      width: 100%;
      max-width: 1400px;
      height: 100%;
      align-items: center;
    }

    .evaluation-card {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 450px;
      position: relative;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
     .card-content {
      padding: 3rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex: 1;
      justify-content: center;
    }

    .card-image-container {
      width: 100%;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      max-width: 280px;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #00695c;
      margin: 0;
    }

    .card-action {
      position: absolute;
      bottom: 0;
      right: 0;
      text-decoration: none;
    }

    .action-button {
      width: 40px;
      height: 40px;
      background-color: #ffc107;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      margin: 1rem;
      transition: background-color 0.2s;
    }

    .action-button:hover {
      background-color: #ffb300;
    }

    @media (max-width: 992px) {
      .evaluation-cards {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .evaluation-cards {
        grid-template-columns: 1fr;
      }
    }
    `,
  ],
})
export class EvaluationSelectionComponent {
  evaluationTypes: EvaluationType[] = [
    {
      title: "Évaluer les étudiants",
      image: "assets/images/module-evaluation.png",
      route: "/evaluations/students",
    },
    {
      title: "Évaluation de l'espace scolaire",
      image: "assets/images/space-evaluation.png",
      route: "/evaluations/space",
    },
    {
      title: "Évaluation des horaires",
      image: "assets/images/schedule-evaluation.png",
      route: "/evaluations/schedule",
    },
  ]
}
