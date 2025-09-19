import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ChartModule } from "primeng/chart"

@Component({
  selector: "app-evaluations-chart",
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="chart-widget">
      <h3>Évaluations complétées</h3>
      <div class="chart-container">
        <p-chart type="bar" [data]="chartData" [options]="chartOptions"></p-chart>
      </div>
    </div>
  `,
  styles: [
    `
    .chart-widget {
      background-color: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.75rem;
      margin-top: 0;
    }

    .chart-container {
      flex: 1;
      position: relative;
      min-height: 200px;
      max-height: 250px;
    }
    `,
  ],
})
export class EvaluationsChartComponent implements OnInit {
  chartData: any
  chartOptions: any

  ngOnInit() {
    this.initChart()
  }

  private initChart() {
    this.chartData = {
      labels: ["Java", "Réseaux", "C++", "SIGL"],
      datasets: [
        {
          data: [85, 75, 78, 88],
          backgroundColor: "#00BCD4",
          borderRadius: 4,
        },
      ],
    }

    this.chartOptions = {
      indexAxis: "x",
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value: any) => value + "%",
            font: {
              size: 10,
            },
          },
          grid: {
            color: "#f0f0f0",
          },
        },
        x: {
          ticks: {
            font: {
              size: 10,
            },
          },
          grid: {
            display: false,
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
  }
}
