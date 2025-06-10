import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

// Import all the compact components
import { CompactAdminStatsCardComponent } from "./components/compact-admin-stats-card.component"
import { CompactModuleEvaluationComponent } from "./components/compact-module-evaluation-widget.component"
import { CompactScheduleEvaluationComponent } from "./components/compact-schedule-evaluation-widget.component"
import { CompactStudentEvaluationComponent } from "./components/compact-student-evaluation-widget.component"
import { CompactSpaceEvaluationComponent } from "./components/compact-space-evaluation-widget.component"

@Component({
  selector: "app-dashboard-admin-compact",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CompactAdminStatsCardComponent,
    CompactModuleEvaluationComponent,
    CompactScheduleEvaluationComponent,
    CompactStudentEvaluationComponent,
    CompactSpaceEvaluationComponent,
  ],
  template: `
   

    <div class="dashboard-container">
      <!-- Main Content -->
      <main class="main-content">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <app-compact-admin-stats-card
            title="Total Students"
            value="412"
            iconName="pi pi-star"
            iconClass="students"
          ></app-compact-admin-stats-card>
          
          <app-compact-admin-stats-card
            title="Total Teachers"
            value="32"
            iconName="pi pi-users"
            iconClass="teachers"
          ></app-compact-admin-stats-card>
          
          <app-compact-admin-stats-card
            title="Total Modules"
            value="16"
            iconName="pi pi-book"
            iconClass="modules"
          ></app-compact-admin-stats-card>
          
          <app-compact-admin-stats-card
            title="Total Evaluations Submitted"
            value="128"
            iconName="pi pi-check-circle"
            iconClass="evaluations"
            [hasInsights]="true"
          ></app-compact-admin-stats-card>
        </div>

        <!-- Evaluation Widgets -->
        <div class="widgets-grid">
          <app-compact-module-evaluation></app-compact-module-evaluation>
          <app-compact-schedule-evaluation></app-compact-schedule-evaluation>
          <app-compact-student-evaluation></app-compact-student-evaluation>
          <app-compact-space-evaluation></app-compact-space-evaluation>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
    :host {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      --primary-color: #00695c;
      --secondary-color: #00BCD4;
      --accent-color: #FFC107;
      --text-color: #333;
      --light-gray: #f8f9fa;
      --border-color: #e0e0e0;
      display: block;
      height: 100vh;
    }

    .evalio-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      height: 60px;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .menu-button {
      background: none;
      border: none;
      font-size: 1.2rem;
      margin-right: 1rem;
      cursor: pointer;
      color: var(--text-color);
    }

    .logo {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-color);
    }

    .logo img {
      height: 30px;
      margin-right: 0.5rem;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon-button {
      background: none;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-color);
      transition: background-color 0.2s;
    }

    .icon-button:hover {
      background-color: var(--light-gray);
    }

    .dashboard-container {
      display: flex;
      height: calc(100vh - 60px);
      background-color: var(--light-gray);
    }

    .main-content {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    .widgets-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      flex: 1;
    }

    @media (max-width: 1400px) {
      .stats-grid,
      .widgets-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .stats-grid,
      .widgets-grid {
        grid-template-columns: 1fr;
      }
    }
    `,
  ],
})
export class DashboardAdminCompactComponent {}
