import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ChartModule } from "primeng/chart"

interface CourseCompletion {
  name: string
  percentage: number
}

@Component({
  selector: "app-completed-evaluations-chart",
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="widget">
      <h2>Évaluations complétées</h2>
      <div class="chart-container">
        <p-chart type="bar" [data]="chartData" [options]="chartOptions"></p-chart>
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
    `,
  ],
})
export class CompletedEvaluationsChartComponent implements OnInit {
  courseCompletions: CourseCompletion[] = [
    { name: "Java", percentage: 85 },
    { name: "Réseaux", percentage: 75 },
    { name: "C++", percentage: 78 },
    { name: "SIGL", percentage: 88 },
  ]

  chartData: any
  chartOptions: any

  ngOnInit() {
    this.initChartData()
    this.initChartOptions()
  }

  private initChartData() {
    this.chartData = {
      labels: this.courseCompletions.map((course) => course.name),
      datasets: [
        {
          label: "Pourcentage",
          data: this.courseCompletions.map((course) => course.percentage),
          backgroundColor: "#00BCD4",
        },
      ],
    }
  }

  private initChartOptions() {
    this.chartOptions = {
      indexAxis: "x",
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
  }
}
