import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-students-stat",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card students">
      <div class="stat-icon">
        <i class="pi pi-users"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">{{ evaluatedCount }}/{{ totalCount }}</div>
        <div class="stat-label">
          Étudiants<br />
          Évalués
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .stat-card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      color: white;
      font-size: 1.5rem;
    }

    .stat-icon {
      background-color: #00BCD4;
    }

    .stat-content {
      flex: 1;
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
      line-height: 1.2;
    }
    `,
  ],
})
export class StudentsStatComponent {
  @Input() evaluatedCount = 32
  @Input() totalCount = 80
}
