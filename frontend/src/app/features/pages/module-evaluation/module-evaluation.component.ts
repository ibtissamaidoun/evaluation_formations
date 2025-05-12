import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-module-evaluation",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="module-evaluation-container">
      <h1 class="page-title">Module Evaluation</h1>
      
      <div class="evaluation-cards">
        <div class="evaluation-card" routerLink="/module-evaluation/cours">
      <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <div class="card-title">Cours</div>
        </div>
        
        <div class="evaluation-card" routerLink="/module-evaluation/td">
        <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <div class="card-title">TD</div>
        </div>
        
        <div class="evaluation-card" routerLink="/module-evaluation/tp">
         <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
          <div class="card-title">TP</div>
        </div>
        
        <div class="evaluation-card" routerLink="/module-evaluation/cc">
         <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          <div class="card-title">CC</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .module-evaluation-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: calc(100vh - 60px);
    }
    
    .page-title {
      font-size: 2.5rem;
      font-weight: 600;
      color: #2a9d8f;
      margin-bottom: 2rem;
    }
    
    .evaluation-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    
    .evaluation-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      border: 2px solid #ffb300;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
      height: 300px;
    }
    
    .evaluation-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .card-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 200px;
      margin-bottom: 2rem;
      font-size: 3rem;
      color: #ffb300;
    }
    
    .card-title {
      font-size: 2rem;
      font-weight: 600;
      color: #2a9d8f;
    }
    
    @media (min-width: 768px) {
      .evaluation-cards {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `,
  ],
})
export class ModuleEvaluationComponent {
  constructor() {}
}

