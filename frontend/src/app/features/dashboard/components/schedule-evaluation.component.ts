import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-schedule-evaluation",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="evaluation-container">
      <h2 class="evaluation-title">Schedule Evaluation</h2>
      <div class="score-container">
        <div class="score-label">Remaining</div>
        <div class="time-container">
          <div class="clock-icon"></div>
          <div class="score-value">3,9</div>
        </div>
      </div>
      
      <div class="lighting-options">
        <div class="option">
          <span>Lighting</span>
          <div class="lighting-progress">
            <div class="progress" style="width: 70%"></div>
          </div>
        </div>
        <div class="option">
          <span>Dark</span>
          <div class="dark-progress">
            <div class="progress" style="width: 30%"></div>
          </div>
        </div>
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
    
    .time-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .clock-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #009688;
      position: relative;
    }
    
    .clock-icon::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 20px;
      background-color: white;
      transform: translate(-50%, -50%) rotate(45deg);
      transform-origin: bottom center;
    }
    
    .clock-icon::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 15px;
      background-color: white;
      transform: translate(-50%, -50%) rotate(90deg);
      transform-origin: bottom center;
    }
    
    .score-value {
      font-size: 2.5rem;
      font-weight: 600;
      color: #009688;
    }
    
    .lighting-options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    
    .option {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .option span {
      font-size: 0.875rem;
      color: #666;
    }
    
    .lighting-progress, .dark-progress {
      width: 100px;
      height: 8px;
      background-color: #f5f5f5;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .lighting-progress .progress {
      height: 100%;
      background-color: #009688;
    }
    
    .dark-progress .progress {
      height: 100%;
      background-color: #80CBC4;
    }
  `,
  ],
})
export class ScheduleEvaluationComponent {}
