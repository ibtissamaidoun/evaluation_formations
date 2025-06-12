import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-teacher-stats-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-card">
      <div class="stats-icon" [ngClass]="iconClass">
        <i [class]="iconName"></i>
      </div>
      <div class="stats-content">
        <div class="stats-value">{{ value }}</div>
        <div class="stats-label">{{ label }}</div>
      </div>
    </div>
  `,
  styles: [
    `
    .stats-card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      gap: 1rem;
    }

    .stats-icon {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .stats-icon.modules {
      background-color: #00695c;
    }

    .stats-icon.students {
      background-color: #00BCD4;
    }

    .stats-icon.evaluations {
      background-color: #FFC107;
    }

    .stats-content {
      flex: 1;
    }

    .stats-value {
      font-size: 1.8rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.25rem;
    }

    .stats-label {
      font-size: 0.9rem;
      color: #666;
      line-height: 1.2;
    }
    `,
  ],
})
export class TeacherStatsCardComponent {
  @Input() value = ""
  @Input() label = ""
  @Input() iconName = ""
  @Input() iconClass = ""
}
