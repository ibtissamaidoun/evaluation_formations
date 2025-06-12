import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-compact-admin-stats-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="compact-stats-card">
      <div class="stats-header">
        <span class="stats-title">{{ title }}</span>
        <a *ngIf="hasInsights" class="insights-link">
          Insights <i class="pi pi-chevron-right"></i>
        </a>
      </div>
      <div class="stats-content">
        <div class="stats-icon" [ngClass]="iconClass">
          <i [class]="iconName"></i>
        </div>
        <div class="stats-value">{{ value }}</div>
      </div>
    </div>
  `,
  styles: [
    `
    .compact-stats-card {
      background-color: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .stats-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stats-title {
      font-size: 0.85rem;
      color: #666;
      font-weight: 500;
    }

    .insights-link {
      font-size: 0.75rem;
      color: #00695c;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .insights-link:hover {
      text-decoration: underline;
    }

    .stats-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .stats-icon {
      width: 35px;
      height: 35px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1rem;
    }

    .stats-icon.students {
      background-color: #FFC107;
    }

    .stats-icon.teachers {
      background-color: #00BCD4;
    }

    .stats-icon.modules {
      background-color: #00695c;
    }

    .stats-icon.evaluations {
      background-color: #666;
    }

    .stats-value {
      font-size: 1.6rem;
      font-weight: 600;
      color: #333;
    }
    `,
  ],
})
export class CompactAdminStatsCardComponent {
  @Input() title = ""
  @Input() value = ""
  @Input() iconName = ""
  @Input() iconClass = ""
  @Input() hasInsights = false
}
