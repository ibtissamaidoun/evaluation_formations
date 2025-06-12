import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ChartModule } from "primeng/chart"

@Component({
  selector: "app-compact-module-evaluation",
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="compact-widget">
      <h3>Module Evaluation</h3>
      <div class="widget-content">
        <div class="score-section">
          <div class="score-info">
            <span class="score-label">Average Module Score</span>
            <span class="score-value">{{ averageScore }}</span>
          </div>
          <div class="chart-section">
            <div class="chart-container">
              <p-chart type="bar" [data]="chartData" [options]="chartOptions"></p-chart>
            </div>
          </div>
        </div>
        <div class="comments-section">
          <h4>Recent Comments</h4>
          <ul class="comments-list">
            <li *ngFor="let comment of recentComments">{{ comment }}</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .compact-widget {
      background-color: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      height: 280px;
      display: flex;
      flex-direction: column;
    }

    .compact-widget h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.75rem;
    }

    .widget-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .score-section {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
    }

    .score-info {
      display: flex;
      flex-direction: column;
      min-width: 100px;
    }

    .score-label {
      font-size: 0.75rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .score-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: #00695c;
    }

    .chart-section {
      flex: 1;
    }

    .chart-container {
      height: 60px;
    }

    .comments-section {
      flex: 1;
    }

    .comments-section h4 {
      font-size: 0.85rem;
      font-weight: 500;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .comments-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .comments-list li {
      font-size: 0.75rem;
      color: #666;
      padding-left: 0.5rem;
      border-left: 2px solid #00695c;
      line-height: 1.3;
    }
    `,
  ],
})
export class CompactModuleEvaluationComponent implements OnInit {
  averageScore = "4.2"
  recentComments = [
    "The course was very informative",
    "TD sessions could be improved",
    "I found the TP well-structured",
  ]

  chartData: any
  chartOptions: any

  ngOnInit() {
    this.initChart()
  }

  private initChart() {
    this.chartData = {
      labels: ["Cours", "TD", "TP"],
      datasets: [
        {
          data: [4.5, 3.8, 4.3],
          backgroundColor: "#00695c",
        },
      ],
    }

    this.chartOptions = {
      indexAxis: "x",
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          display: false,
        },
        x: {
          display: false,
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
  }
}
