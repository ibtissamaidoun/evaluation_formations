import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ButtonModule } from "primeng/button"

// Import all the components
import { TimePeriodFilterComponent } from "./components/time-period-filter.component"
import { UserRoleFilterComponent } from "./components/user-role-filter.component"
import { FormFilterComponent } from "./components/form-filter.component"
import { ReportsListComponent } from "./components/reports-list.component"
import { GenerateReportComponent } from "./components/generate-report.component"
import { ReportsBioComponent } from "./components/reports-bio.component"

@Component({
  selector: "app-evaluation-reports",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    TimePeriodFilterComponent,
    UserRoleFilterComponent,
    FormFilterComponent,
    ReportsListComponent,
    GenerateReportComponent,
    ReportsBioComponent,
  ],
  template: `
  

      <!-- Main Content -->
      <main class="main-content">
        <div class="page-header">
          <h1>Evaluation Reports</h1>
          <p>Generate and export detailed feedback summaries in PDF format.</p>
        </div>

        <div class="content-layout">
          <!-- Left Content -->
          <div class="left-content">
            <!-- Filters Section -->
            <div class="filters-section">
              <div class="filters-grid">
                <app-time-period-filter (periodChanged)="onPeriodChanged($event)"></app-time-period-filter>
                <app-user-role-filter (roleChanged)="onRoleChanged($event)"></app-user-role-filter>
                <app-form-filter (formChanged)="onFormChanged($event)"></app-form-filter>
              </div>
              <button
                pButton
                pRipple
                label="Apply Filters"
                class="p-button-warning apply-filters-btn"
                (click)="applyFilters()"
              ></button>
            </div>

            <!-- Reports List -->
            <app-reports-list [filters]="currentFilters"></app-reports-list>
          </div>

          <!-- Right Content -->
          <div class="right-content">
            <app-generate-report (reportGenerated)="onReportGenerated($event)"></app-generate-report>
            <app-reports-bio></app-reports-bio>
          </div>
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

    .reports-container {
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

    .menu-toggle {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .menu-toggle .menu-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      color: var(--text-color);
      cursor: pointer;
    }

    .main-content {
      flex: 1;
      padding: 1.5rem;
      background-color: var(--light-gray);
      overflow-y: auto;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-header h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .page-header p {
      font-size: 1rem;
      color: #666;
      margin: 0;
    }

    .content-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }

    .left-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .right-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .filters-section {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .apply-filters-btn {
      width: auto;
      align-self: flex-start;
    }

    @media (max-width: 1200px) {
      .content-layout {
        grid-template-columns: 1fr;
      }
      
      .filters-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .filters-grid {
        grid-template-columns: 1fr;
      }
      
      .sidebar {
        width: 100px;
      }
    }
    `,
  ],
})
export class EvaluationReportsComponent {
  currentFilters: any = {
    timePeriod: "",
    userRole: "",
    form: "",
  }

  onPeriodChanged(period: string) {
    this.currentFilters.timePeriod = period
  }

  onRoleChanged(role: string) {
    this.currentFilters.userRole = role
  }

  onFormChanged(form: string) {
    this.currentFilters.form = form
  }

  applyFilters() {
    console.log("Applying filters:", this.currentFilters)
    // Implement filter logic here
  }

  onReportGenerated(type: string) {
    console.log("Report generated for type:", type)
    // Implement report generation logic here
  }
}
