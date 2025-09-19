import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

// Import components
import { TeacherStatsCardComponent } from "./components/teacher-stats-card.component"
import { EvaluationsChartComponent } from "./components/evaluations-chart.component"
import { SatisfactionChartComponent } from "./components/satisfaction-chart.component"
import { TeacherCalendarComponent } from "./components/teacher-calendar.component"

@Component({
  selector: "app-teacher-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TeacherStatsCardComponent,
    EvaluationsChartComponent,
    SatisfactionChartComponent,
    TeacherCalendarComponent,
  ],
  template: `

      <!-- Main Content -->
      <main class="main-content">
        <!-- Stats Cards -->
        <div class="stats-cards">
          <app-teacher-stats-card
            value="4"
            label="Modules Attribués"
            iconName="pi pi-list"
            iconClass="modules"
          ></app-teacher-stats-card>
          
          <app-teacher-stats-card
            value="32/80"
            label="Étudiants Évalués"
            iconName="pi pi-users"
            iconClass="students"
          ></app-teacher-stats-card>
          
          <app-teacher-stats-card
            value="3"
            label="Évaluations en Attente"
            iconName="pi pi-clock"
            iconClass="evaluations"
          ></app-teacher-stats-card>
        </div>

        <!-- Dashboard Widgets -->
        <div class="dashboard-widgets">
          <app-evaluations-chart></app-evaluations-chart>
          <app-satisfaction-chart></app-satisfaction-chart>
          <app-teacher-calendar></app-teacher-calendar>
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

    .sakai-header {
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

    .notification {
      position: relative;
    }

    .notification::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background-color: var(--accent-color);
      border-radius: 50%;
    }

    .dashboard-container {
      display: flex;
      height: calc(100vh - 60px);
    }

    .sidebar {
      width: 250px;
      background-color: white;
      border-right: 1px solid var(--border-color);
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow-y: auto;
    }

    .nav-section {
      margin-bottom: 1rem;
    }

    .nav-header {
      padding: 0.5rem 1.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #666;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: var(--text-color);
      text-decoration: none;
      transition: background-color 0.2s;
      cursor: pointer;
    }

    .nav-item i {
      margin-right: 0.75rem;
      font-size: 1.2rem;
    }

    .nav-item:hover {
      background-color: var(--light-gray);
    }

    .nav-item.active {
      background-color: #e6f7f5;
      color: var(--primary-color);
      border-left: 4px solid var(--primary-color);
      padding-left: calc(1.5rem - 4px);
    }

    .sidebar-footer {
      border-top: 1px solid var(--border-color);
      padding-top: 1rem;
    }

    .settings {
      color: #666;
    }

    .main-content {
      flex: 1;
      padding: 1.5rem;
      background-color: var(--light-gray);
      overflow-y: auto;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .dashboard-widgets {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 1200px) {
      .dashboard-widgets {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .stats-cards {
        grid-template-columns: 1fr;
      }
      
      .dashboard-widgets {
        grid-template-columns: 1fr;
      }
      
      .sidebar {
        width: 70px;
      }
      
      .nav-item span,
      .nav-header {
        display: none;
      }
      
      .nav-item {
        justify-content: center;
        padding: 0.75rem;
      }
      
      .nav-item i {
        margin-right: 0;
      }
      
      .nav-item.active {
        padding-left: calc(0.75rem - 4px);
      }
    }
    `,
  ],
})
export class TeacherDashboardComponent {}
