import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-module-evaluation",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="evaluation-container">
      <h2 class="evaluation-title">Module Evaluation</h2>
      <div class="score-container">
        <div class="score-label">Average Module Score</div>
        <div class="score-value">4.2</div>
      </div>
      
      <div class="rating-stars">
        <span class="star filled" *ngFor="let star of [1, 2, 3, 4]"></span>
        <span class="star" *ngFor="let star of [1]"></span>
      </div>
      
      <div class="remaining-info">
        2 Remaining
      </div>
      
      <div class="color-indicators">
        <span class="indicator orange"></span>
        <span class="indicator teal"></span>
        <span class="indicator red"></span>
        <span class="indicator light-teal"></span>
      </div>
    </div>
  `,
  styles: [
    `
    .evaluation-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .evaluation-title {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .score-container {
      display: flex;
      flex-direction: column;
    }
    
    .score-label {
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.5rem;
    }
    
    .score-value {
      font-size: 2.5rem;
      font-weight: 600;
      color: #009688;
    }
    
    .rating-stars {
      display: flex;
      gap: 0.25rem;
    }
    
    .star {
      width: 24px;
      height: 24px;
      background-color: #e0e0e0;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }
    
    .star.filled {
      background-color: #FFA726;
    }
    
    .remaining-info {
      font-size: 0.875rem;
      color: #666;
    }
    
    .color-indicators {
      display: flex;
      gap: 0.5rem;
    }
    
    .indicator {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    
    .orange { background-color: #FFA726; }
    .teal { background-color: #009688; }
    .red { background-color: #EF5350; }
    .light-teal { background-color: #80CBC4; }
  `,
  ],
})
export class ModuleEvaluationComponent {}
