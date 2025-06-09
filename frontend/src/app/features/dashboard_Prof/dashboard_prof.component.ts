import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { TabViewModule } from "primeng/tabview"

// Import all the individual components
import { ModulesStatComponent } from "./components/modules-stat.component"
import { StudentsStatComponent } from "./components/students-stat.component"
import { EvaluationsStatComponent } from "./components/evaluations-stat.component"
import { CompletedEvaluationsChartComponent } from "./components/completed-ev-chart.component"
import { StudentSatisfactionChartComponent } from "./components/student-satisfaction-chart.component"
import { CalendarComponent } from "./components/calendar.component"

@Component({
  selector: "app-dashboard-prof",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabViewModule,
    ModulesStatComponent,
    StudentsStatComponent,
    EvaluationsStatComponent,
    CompletedEvaluationsChartComponent,
    StudentSatisfactionChartComponent,
    CalendarComponent,
  ],
  template: `
 

    <div class="dashboard-container">
      <!-- Main Content -->
      <main class="main-content">
        <!-- Stats Cards -->
        <div class="stats-cards">
          <app-modules-stat [moduleCount]="4"></app-modules-stat>
          <app-students-stat [evaluatedCount]="32" [totalCount]="80"></app-students-stat>
          <app-evaluations-stat [pendingCount]="3"></app-evaluations-stat>
        </div>

        <!-- Dashboard Content with Tabs -->
        <div class="dashboard-tabs">
          <p-tabView>
            <p-tabPanel header="Vue d'ensemble">
              <div class="dashboard-overview">
                <div class="overview-chart">
                  <app-completed-evaluations-chart></app-completed-evaluations-chart>
                </div>
                <div class="overview-chart">
                  <app-student-satisfaction-chart></app-student-satisfaction-chart>
                </div>
              </div>
            </p-tabPanel>
            <p-tabPanel header="Évaluations complétées">
              <div class="full-chart">
                <app-completed-evaluations-chart></app-completed-evaluations-chart>
              </div>
            </p-tabPanel>
            <p-tabPanel header="Satisfaction">
              <div class="full-chart">
                <app-student-satisfaction-chart></app-student-satisfaction-chart>
              </div>
            </p-tabPanel>
            <p-tabPanel header="Calendrier">
              <div class="full-chart">
                <app-calendar></app-calendar>
              </div>
            </p-tabPanel>
          </p-tabView>
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
      padding: 1.5rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .dashboard-tabs {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .dashboard-tabs ::ng-deep .p-tabview {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .dashboard-tabs ::ng-deep .p-tabview-panels {
      flex: 1;
      padding: 1.5rem;
      background-color: white;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .dashboard-tabs ::ng-deep .p-tabview-nav {
      background-color: white;
      border-radius: 8px 8px 0 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: none;
    }

    .dashboard-tabs ::ng-deep .p-tabview-nav li .p-tabview-nav-link {
      color: var(--text-color);
      padding: 1rem 1.5rem;
      font-weight: 500;
    }

    .dashboard-tabs ::ng-deep .p-tabview-nav li.p-highlight .p-tabview-nav-link {
      color: var(--primary-color);
      border-color: var(--primary-color);
    }

    .dashboard-overview {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      height: 100%;
    }

    .overview-chart {
      height: 400px;
    }

    .full-chart {
      height: 500px;
    }

    @media (max-width: 992px) {
      .stats-cards {
        grid-template-columns: repeat(3, 1fr);
      }
      
      .dashboard-overview {
        grid-template-columns: 1fr;
      }
      
      .overview-chart {
        height: 300px;
      }
    }

    @media (max-width: 768px) {
      .stats-cards {
        grid-template-columns: repeat(1, 1fr);
      }
    }
    `,
  ],
})
export class DashboardProfComponent {}
