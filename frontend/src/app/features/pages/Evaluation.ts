import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-evaluation',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, RippleModule],
    template: `
        <div class="evaluation-container">
            <h1 class="evaluation-title">Evaluation</h1>

            <div class="evaluation-cards">
                <div class="evaluation-card">
                    <div class="card-content">
                        <!-- Utilisation d'une image avec la balise img -->
                        <img src="assets/images/module-evaluation.png" alt="Module Evaluation" class="card-img" />
                        <h2 class="card-title">Module Evaluation</h2>
                            <button pButton pRipple icon="pi pi-arrow-right" 
                                    class="navigate-button" 
                                    routerLink="/module-evaluation/module-detail/liste" 
                                    [rounded]="true">
                            </button>
                    </div>
                </div>

                <div class="evaluation-card">
                    <div class="card-content">
                        <!-- Utilisation d'une image avec la balise img -->
                        <img src="assets/images/space-evaluation.png" alt="Space Evaluation" class="card-img" />
                        <h2 class="card-title">Space Evaluation</h2>
                        <button  pButton pRipple icon="pi pi-arrow-right" 
                        class="navigate-button" 
                        routerLink="/espace-evaluation" 
                      [rounded]="true">
                          
                        </button>
                    </div>
                </div>

                <div class="evaluation-card">
                    <div class="card-content">
                        <!-- Utilisation d'une image avec la balise img -->
                        <img src="assets/images/schedule-evaluation.png" alt="Schedule Evaluation" class="card-img" />
                        <h2 class="card-title">Schedule Evaluation</h2>
                        <button class="navigate-button" routerLink="/schedul-evaluation">
                            <i class="pi pi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
        .evaluation-container {
            padding: 2rem;
            background-color: #f8f9fa;
            min-height: calc(100vh - 60px);
        }

        .evaluation-title {
            font-size: 3rem;
            font-weight: 600;
            color:#2a9d8f;
            margin-bottom: 2rem;
        }

        .evaluation-cards {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1.5rem;
        }

        .evaluation-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            padding: 1.5rem;
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
        }

        .evaluation-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .card-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            padding: 1rem;
        }

        .card-img {
            width: 150px;
            height: 150px;
            margin-bottom: 1.5rem;
            object-fit: contain;
        }

        .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2a9d8f;
            margin-bottom: 2rem;
        }

        .navigate-button {
            position: absolute;
            bottom: -20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #ffb300;
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .navigate-button:hover {
            background-color:  #ffb300;
        }

        @media (min-width: 768px) {
            .evaluation-cards {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 1024px) {
            .evaluation-cards {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        `
    ]
})
export class EvaluationComponent {
    constructor(private router: Router) {}
     // Méthode pour naviguer programmatiquement
  navigateTo(route: string): void {
    console.log(`Navigating to: ${route}`);
    this.router.navigate([`/${route}`]);
  }
}
