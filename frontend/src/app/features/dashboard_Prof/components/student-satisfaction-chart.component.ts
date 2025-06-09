import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ChartModule } from "primeng/chart"

interface SatisfactionData {
  label: string
  value: number
  color: string
  hoverColor: string
}

@Component({
  selector: "app-student-satisfaction-chart",
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="widget">
      <h2>Satisfaction des étudiants</h2>
      <div class="chart-container">
        <p-chart type="pie" [data]="chartData" [options]="chartOptions"></p-chart>
      </div>
      <div class="chart-legend">
        <div class="legend-item">
          <span class="legend-color positifs"></span>
          <span>Positifs (10%)</span>
        </div>
        <div class="legend-item">
          <span class="legend-color negatifs"></span>
          <span>Négatifs (65%)</span>
        </div>
        <div class="legend-item">
          <span class="legend-color neutres"></span>
          <span>Neutres (25%)</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .widget {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .widget h2 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1rem;
    }

    .chart-container {
      flex: 1;
      position: relative;
    }

    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
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
      background-color: #00695c;
    }

    .legend-color.negatifs {
      background-color: #1a3c40;
    }

    .legend-color.neutres {
      background-color: #FFC107;
    }
    `,
  ],
})
export class StudentSatisfactionChartComponent implements OnInit {
  satisfactionData: SatisfactionData[] = [
    { label: "Positifs", value: 10, color: "#00695c", hoverColor: "#004d40" },
    { label: "Négatifs", value: 65, color: "#1a3c40", hoverColor: "#0d2e30" },
    { label: "Neutres", value: 25, color: "#FFC107", hoverColor: "#ffb300" },
  ]

  chartData: any
  chartOptions: any

  ngOnInit() {
    this.initChartData()
    this.initChartOptions()
  }

  private initChartData() {
    this.chartData = {
      labels: this.satisfactionData.map((item) => item.label),
      datasets: [
        {
          data: this.satisfactionData.map((item) => item.value),
          backgroundColor: this.satisfactionData.map((item) => item.color),
          hoverBackgroundColor: this.satisfactionData.map((item) => item.hoverColor),
        },
      ],
    }
  }

  private initChartOptions() {
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
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  }
}
