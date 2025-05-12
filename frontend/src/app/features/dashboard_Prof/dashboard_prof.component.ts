import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ButtonModule } from "primeng/button"
import { RippleModule } from "primeng/ripple"
import { CalendarModule } from "primeng/calendar"
import { ChartModule } from "primeng/chart"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, RippleModule, CalendarModule, ChartModule],
  template: `
    <!-- Header -->
    <header class="sakai-header">
      <div class="header-left">
        
      </div>
    </header>


  
          <div class="stat-card">
            <div class="stat-icon students">
              <i class="pi pi-users"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">32/80</div>
              <div class="stat-label">
                Étudiants<br />
                Évalués
              </div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon evaluations">
              <i class="pi pi-clock"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">3</div>
              <div class="stat-label">
                Évaluations<br />
                en Attente
              </div>
            </div>
          </div>
        

        <!-- Charts and Calendar -->
        <div class="dashboard-widgets">
          <!-- Completed Evaluations Chart -->
          <div class="widget">
            <h2>Évaluations complétées</h2>
            <div class="chart-container bar-chart">
              <p-chart type="bar" [data]="completedEvaluationsData" [options]="barChartOptions"></p-chart>
            </div>
          </div>

          <!-- Student Satisfaction Chart -->
          <div class="widget">
            <h2>Satisfaction des étudiants</h2>
            <div class="chart-container pie-chart">
              <p-chart type="pie" [data]="satisfactionData" [options]="pieChartOptions"></p-chart>
            </div>
            <div class="chart-legend">
              <div class="legend-item">
                <span class="legend-color positifs"></span>
                <span>Positifs</span>
              </div>
              <div class="legend-item">
                <span class="legend-color negatifs"></span>
                <span>Négatifs</span>
              </div>
            </div>
          </div>

          <!-- Calendar -->
          <div class="widget calendar-widget">
            <h2>Calendrier</h2>
            <div class="calendar-navigation">
              <button class="nav-button">
                <i class="pi pi-chevron-left"></i>
              </button>
              <h3>Mai 2024</h3>
              <button class="nav-button">
                <i class="pi pi-chevron-right"></i>
              </button>
            </div>

            <div class="calendar">
              <div class="calendar-header">
                <div>Di</div>
                <div>Lu</div>
                <div>Ma</div>
                <div>Me</div>
                <div>Je</div>
                <div>Ve</div>
                <div>Sa</div>
              </div>
              <div class="calendar-days">
                <div class="calendar-day"></div>
                <div class="calendar-day"></div>
                <div class="calendar-day"></div>
                <div class="calendar-day"></div>
                <div class="calendar-day">1</div>
                <div class="calendar-day">2</div>
                <div class="calendar-day">3</div>
                <div class="calendar-day">4</div>
                <div class="calendar-day">5</div>
                <div class="calendar-day">6</div>
                <div class="calendar-day">7</div>
                <div class="calendar-day">8</div>
                <div class="calendar-day">9</div>
                <div class="calendar-day">10</div>
                <div class="calendar-day">11</div>
                <div class="calendar-day">12</div>
                <div class="calendar-day">13</div>
                <div class="calendar-day current">14</div>
                <div class="calendar-day">15</div>
                <div class="calendar-day">16</div>
                <div class="calendar-day">17</div>
                <div class="calendar-day">18</div>
                <div class="calendar-day">19</div>
                <div class="calendar-day">20</div>
                <div class="calendar-day">21</div>
                <div class="calendar-day">22</div>
                <div class="calendar-day">23</div>
                <div class="calendar-day">24</div>
                <div class="calendar-day">25</div>
                <div class="calendar-day">26</div>
                <div class="calendar-day">27</div>
                <div class="calendar-day">28</div>
                <div class="calendar-day">29</div>
                <div class="calendar-day">30</div>
                <div class="calendar-day">31</div>
              </div>
            </div>

            <div class="upcoming-events">
              <div class="event">
                <div class="event-date">09</div>
                <div class="event-description">Évaluation à terminer</div>
              </div>
              <div class="event">
                <div class="event-date">06</div>
                <div class="event-description">Réunion pédagogique</div>
              </div>
              <div class="event">
                <div class="event-date">10</div>
                <div class="event-description">Date limite pour feedback</div>
              </div>
        
        
  
  `,
  styles: [
    `
    :host {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      --primary-color: #00695c;
      --secondary-color: #00bcd4;
      --accent-color: #ffc107;
      --text-color: #333;
      --light-gray: #f8f9fa;
      --border-color: #e0e0e0;
      --positive-color: #00695c;
      --negative-color: #1a3c40;
      --neutral-color: #ffc107;
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

    .settings {
      margin-top: auto;
    }

    .main-content {
      flex: 1;
      padding: 1.5rem;
      background-color: var(--light-gray);
      overflow-y: auto;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .stat-card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      color: white;
      font-size: 1.5rem;
    }

    .stat-icon.modules {
      background-color: var(--primary-color);
    }

    .stat-icon.students {
      background-color: var(--secondary-color);
    }

    .stat-icon.evaluations {
      background-color: var(--accent-color);
    }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--text-color);
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
      line-height: 1.2;
    }

    .dashboard-widgets {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .widget {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .widget h2 {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-color);
      margin-bottom: 1.5rem;
    }

    .chart-container {
      height: 250px;
    }

    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 1rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    .legend-color.positifs {
      background-color: var(--positive-color);
    }

    .legend-color.negatifs {
      background-color: var(--negative-color);
    }

    .calendar-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .calendar-navigation h3 {
      font-size: 1rem;
      font-weight: 500;
    }

    .nav-button {
      background: none;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-color);
    }

    .nav-button:hover {
      background-color: var(--light-gray);
    }

    .calendar {
      margin-bottom: 1.5rem;
    }

    .calendar-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: 0.8rem;
      font-weight: 500;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.25rem;
    }

    .calendar-day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      border-radius: 50%;
      cursor: pointer;
    }

    .calendar-day:hover {
      background-color: var(--light-gray);
    }

    .calendar-day.current {
      background-color: var(--primary-color);
      color: white;
    }

    .upcoming-events {
      margin-top: 1.5rem;
    }

    .event {
      display: flex;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .event-date {
      width: 30px;
      font-weight: 600;
      color: var(--primary-color);
    }

    .event-description {
      font-size: 0.9rem;
    }
    `,
  ],
})
export class DashboardProfComponent {
  completedEvaluationsData = {
    labels: ["Java", "Réseaux", "C++", "SIGL"],
    datasets: [
      {
        label: "Évaluations complétées",
        data: [85, 75, 78, 88],
        backgroundColor: "#00bcd4",
      },
    ],
  }

  barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: any) => value + "%",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  satisfactionData = {
    labels: ["Positifs", "Négatifs", "Neutres"],
    datasets: [
      {
        data: [10, 65, 25],
        backgroundColor: ["#00695c", "#1a3c40", "#ffc107"],
        hoverBackgroundColor: ["#004d40", "#0d2e30", "#ffb300"],
      },
    ],
  }

  pieChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => context.label + ": " + context.raw + "%",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }
}
