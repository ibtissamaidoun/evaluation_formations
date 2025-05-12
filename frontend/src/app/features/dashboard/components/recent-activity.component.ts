import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-recent-activity",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activity-container">
      <h2 class="activity-title">Recent Activity</h2>
      <div class="activity-item">
        <div class="activity-icon"></div>
        <div class="activity-content">
          <div class="activity-text">Before: Complete your evaluations before May 1</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .activity-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .activity-title {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .activity-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 0;
    }
    
    .activity-icon {
      width: 32px;
      height: 32px;
      background-color: #FFA726;
      border-radius: 4px;
      margin-right: 1rem;
    }
    
    .activity-content {
      flex: 1;
    }
    
    .activity-text {
      font-size: 0.875rem;
      color: #333;
    }
  `,
  ],
})
export class RecentActivityComponent {}
