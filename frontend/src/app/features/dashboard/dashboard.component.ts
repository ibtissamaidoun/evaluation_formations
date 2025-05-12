import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ModuleEvaluationComponent } from "./components/module-evaluation.component"
import { SpaceEvaluationComponent } from "./components/space-evaluation.component"
import { ScheduleEvaluationComponent } from "./components/schedule-evaluation.component"
import { NotificationsComponent } from "./components/notifications.component"
import { RecentActivityComponent } from "./components/recent-activity.component"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    ModuleEvaluationComponent,
    SpaceEvaluationComponent,
    ScheduleEvaluationComponent,
    NotificationsComponent,
    RecentActivityComponent,
  ],
  template: `
    <div class="dashboard-container">
      <h1 class="dashboard-title">Welcome back, {{ studentName }}!</h1>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <app-module-evaluation></app-module-evaluation>
        </div>
        <div class="dashboard-card">
          <app-space-evaluation></app-space-evaluation>
        </div>
        <div class="dashboard-card">
          <app-schedule-evaluation></app-schedule-evaluation>
        </div>
        <div class="dashboard-card wide-card">
          <app-notifications></app-notifications>
        </div>
        <div class="dashboard-card wide-card">
          <app-recent-activity></app-recent-activity>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .dashboard-container {
      padding: 1.5rem;
      background-color: #f8f9fa;
      min-height: 100vh;
    }
    
    .dashboard-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: #37474f;
      margin-bottom: 1.5rem;
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1.5rem;
    }
    
    .dashboard-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 1.5rem;
    }
    
    @media (min-width: 768px) {
      .dashboard-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .wide-card {
        grid-column: span 2;
      }
    }
    
    @media (min-width: 1024px) {
      .dashboard-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      
      .wide-card {
        grid-column: span 3;
      }
    }
    
    @media (min-width: 1280px) {
      .wide-card {
        grid-column: span 3 / span 1;
      }
    }
  `,
  ],
})
export class Dashboard {
  studentName = "Student Name"
}
