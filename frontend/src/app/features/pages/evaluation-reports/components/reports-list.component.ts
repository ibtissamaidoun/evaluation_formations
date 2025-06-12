import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ButtonModule } from "primeng/button"

interface Report {
  id: string
  title: string
  type: string
  date: string
  format: string
}

@Component({
  selector: "app-reports-list",
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="reports-list">
      <h3>Reports List</h3>
      <div class="reports-items">
        <div *ngFor="let report of filteredReports" class="report-item">
          <div class="report-info">
            <span class="report-title">{{ report.title }}</span>
            <span class="report-date">{{ report.date }}</span>
          </div>
          <div class="report-actions">
            <span class="report-format">{{ report.format }}</span>
            <button
              pButton
              pRipple
              icon="pi pi-download"
              class="p-button-text p-button-sm"
              (click)="downloadReport(report)"
            ></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .reports-list {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .reports-list h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1rem;
    }

    .reports-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .report-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      transition: background-color 0.2s;
    }

    .report-item:hover {
      background-color: #f8f9fa;
    }

    .report-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .report-title {
      font-size: 1rem;
      font-weight: 500;
      color: #333;
    }

    .report-date {
      font-size: 0.85rem;
      color: #666;
    }

    .report-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .report-format {
      font-size: 0.85rem;
      font-weight: 500;
      color: #00695c;
      background-color: #e6f7f5;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }
    `,
  ],
})
export class ReportsListComponent {
  @Input() filters: any = {}

  reports: Report[] = [
    {
      id: "1",
      title: "Module Evaluation - April",
      type: "module",
      date: "01/05/2025",
      format: "PDF",
    },
    {
      id: "2",
      title: "Schedule Feedback - GIF",
      type: "schedule",
      date: "29/04/2025",
      format: "GIF",
    },
    {
      id: "3",
      title: "School Space",
      type: "space",
      date: "15/04/2025",
      format: "PDF",
    },
    {
      id: "4",
      title: "Student Behavior Analysis",
      type: "student",
      date: "12/04/2025",
      format: "PDF",
    },
  ]

  get filteredReports(): Report[] {
    // Apply filters here based on this.filters
    return this.reports
  }

  downloadReport(report: Report) {
    console.log("Downloading report:", report.title)
    // Implement download logic here
  }
}
