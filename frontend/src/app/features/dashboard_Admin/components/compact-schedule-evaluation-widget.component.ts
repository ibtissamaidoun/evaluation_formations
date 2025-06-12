import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ChartModule } from "primeng/chart"

@Component({
  selector: "app-compact-schedule-evaluation",
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="compact-widget">
      <h3>Schedule Evaluation</h3>
      <div class="widget-content">
        <div class="score-section">
          <div class="score-info">
            <span class="score-label">Average Satisfaction Score</span>
            <span class="score-value">{{ averageScore }}</span>
          </div>
          <div class="chart-section">
            <div class="chart-container">
              <p-chart type="doughnut" [data]="chartData" [options]="chartOptions"></p-chart>
            </div>
          </div>
        </div>
        <div class="legend-section">
          <div class="legend">
            <div class="legend-item">
              <span class="legend-color good"></span>
              <span>Good</span>
            </div>
            <div class="legend-item">
              <span class="legend-color average"></span>
              <span>Average</span>
            </div>
            <div class="legend-item">
              <span class="legend-color poor"></span>
              <span>Poor</span>
            </div>
          </div>
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
      align-items: center;
      flex: 1;
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
      color: #00BCD4;
    }

    .chart-section {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .chart-container {
      width: 80px;
      height: 80px;
    }

    .legend-section {
      margin-top: auto;
    }

    .legend {
      display: flex;
      justify-content: space-around;
      font-size: 0.75rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .legend-color {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .legend-color.good {
      background-color: #00BCD4;
    }

    .legend-color.average {
      background-color: #FFC107;
    }

    .legend-color.poor {
      background-color: #f44336;
    }
    `,
  ],
})
export class CompactScheduleEvaluationComponent implements OnInit {
  averageScore = "3.8"

  chartData: any
  chartOptions: any

  ngOnInit() {
    this.initChart()
  }

  private initChart() {
    this.chartData = {
      datasets: [
        {
          data: [60, 25, 15],
          backgroundColor: ["#00BCD4", "#FFC107", "#f44336"],
          borderWidth: 0,
        },
      ],
    }

    this.chartOptions = {
      cutout: "70%",
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
