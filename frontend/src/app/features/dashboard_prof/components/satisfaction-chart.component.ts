import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ChartModule } from "primeng/chart"

@Component({
  selector: "app-satisfaction-chart",
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="chart-widget">
      <h3>Satisfaction des étudiants</h3>
      <div class="chart-container">
        <p-chart type="pie" [data]="chartData" [options]="chartOptions"></p-chart>
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
      min-height: 180px;
      max-height: 220px;
    }

    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 0.75rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
    }

    .legend-color {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .legend-color.positifs {
      background-color: #00695c;
    }

    .legend-color.negatifs {
      background-color: #1a3c40;
    }
    `,
  ],
})
export class SatisfactionChartComponent implements OnInit {
  chartData: any
  chartOptions: any

  ngOnInit() {
    this.initChart()
  }

  private initChart() {
    this.chartData = {
      labels: ["Positifs", "Neutres", "Négatifs"],
      datasets: [
        {
          data: [10, 25, 65],
          backgroundColor: ["#00695c", "#FFC107", "#1a3c40"],
          hoverBackgroundColor: ["#004d40", "#ffb300", "#0d2e30"],
        },
      ],
    }

    this.chartOptions = {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              return context.label + ": " + context.raw + "%"
            },
          },
          titleFont: {
            size: 12,
          },
          bodyFont: {
            size: 11,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  }
}
