import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ChartModule } from "primeng/chart"

@Component({
  selector: "app-compact-student-evaluation",
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="compact-widget">
      <h3>Student Evaluation</h3>
      <div class="widget-content">
        <div class="score-section">
          <div class="score-info">
            <span class="score-label">Average Behaviour Score</span>
            <span class="score-value">{{ averageScore }}</span>
          </div>
          <div class="chart-section">
            <div class="chart-container">
              <p-chart type="doughnut" [data]="chartData" [options]="chartOptions"></p-chart>
            </div>
          </div>
        </div>
        <div class="areas-section">
          <h4>By Area</h4>
          <div class="area-scores">
            <div *ngFor="let area of areaScores" class="area-item">
              <span class="area-name">{{ area.name }}</span>
              <div class="area-bar">
                <div class="area-fill" [style.width]="(area.score / 5) * 100 + '%'"></div>
              </div>
              <span class="area-score">{{ area.score }}</span>
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
      display: flex;
      justify-content: center;
    }

    .chart-container {
      width: 60px;
      height: 60px;
    }

    .areas-section {
      flex: 1;
    }

    .areas-section h4 {
      font-size: 0.85rem;
      font-weight: 500;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .area-scores {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .area-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
    }

    .area-name {
      min-width: 50px;
      color: #666;
    }

    .area-bar {
      flex: 1;
      height: 4px;
      background-color: #e0e0e0;
      border-radius: 2px;
      overflow: hidden;
    }

    .area-fill {
      height: 100%;
      background-color: #00695c;
      border-radius: 2px;
    }

    .area-score {
      min-width: 20px;
      text-align: right;
      font-weight: 500;
    }
    `,
  ],
})
export class CompactStudentEvaluationComponent implements OnInit {
  averageScore = "4.5"
  areaScores = [
    { name: "Good", score: 4.5 },
    { name: "Classes", score: 4.6 },
    { name: "Campus", score: 4.2 },
  ]

  chartData: any
  chartOptions: any

  ngOnInit() {
    this.initChart()
  }

  private initChart() {
    this.chartData = {
      datasets: [
        {
          data: [90, 10],
          backgroundColor: ["#00695c", "#e0e0e0"],
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
