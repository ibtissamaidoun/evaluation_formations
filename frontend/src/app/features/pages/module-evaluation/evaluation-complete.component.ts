import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ButtonModule } from "primeng/button"

@Component({
  selector: "app-evaluation-complete",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <div class="evaluation-complete-container">
      <div class="complete-card">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke=" #2a9d8f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1 class="complete-title">Thank You!</h1>
        <p class="complete-message">
          Your course evaluation has been successfully submitted. Your feedback is valuable and will help improve the course for future students.
        </p>
        
        <div class="action-buttons">
          <button 
            pButton 
            label="Return to Dashboard" 
            class="p-button-primary" 
            routerLink=""
          ></button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .evaluation-complete-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: calc(100vh - 60px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .complete-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 3rem;
      max-width: 600px;
      width: 100%;
      text-align: center;
    }
    
    .success-icon {
      margin-bottom: 2rem;
    }
    
    .complete-title {
      font-size: 2.5rem;
      font-weight: 600;
      color:#2a9d8f;
      margin-bottom: 1rem;
    }
    
    .complete-message {
      font-size: 1.1rem;
      color: #555;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    
    .action-buttons {
      display: flex;
      justify-content: center;
    }
    
    :host ::ng-deep .p-button.p-button-primary {
      background-color:  #2a9d8f;
      border-color:  #2a9d8f;
    }
    
    :host ::ng-deep .p-button.p-button-primary:hover {
      background-color: #ffb300;
      border-color:#ffb300;
    }
    `,
  ],
})
export class EvaluationCompleteComponent {
  constructor() {}
}
