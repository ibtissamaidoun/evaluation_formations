import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-space-evaluation",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="evaluation-container">
      <h2 class="evaluation-title">Space Evaluation</h2>
      <div class="score-container">
        <div class="score-label">Average Evaluation</div>
        <div class="score-value">4.1</div>
      </div>
      
      <div class="rating-buildings">
        <span class="building filled" *ngFor="let building of [1, 2, 3, 4]"></span>
        <span class="building" *ngFor="let building of [1]"></span>
      </div>
      
      <div class="remaining-info">
        1 Remaining
      </div>
      
      <div class="progress-bar">
        <div class="progress" style="width: 75%"></div>
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
    
    .rating-buildings {
      display: flex;
      gap: 0.25rem;
    }
    
    .building {
      width: 24px;
      height: 24px;
      background-color: #e0e0e0;
      clip-path: polygon(0% 100%, 0% 40%, 40% 40%, 40% 20%, 60% 20%, 60% 40%, 100% 40%, 100% 100%);
    }
    
    .building.filled {
      background-color: #FFA726;
    }
    
    .remaining-info {
      font-size: 0.875rem;
      color: #666;
    }
    
    .progress-bar {
      height: 8px;
      background-color: #f5f5f5;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress {
      height: 100%;
      background-color: #009688;
    }
  `,
  ],
})
export class SpaceEvaluationComponent {}
