import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-compact-space-evaluation",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="compact-widget">
      <h3>School Space Evaluation</h3>
      <div class="widget-content">
        <div class="rating-section">
          <div class="rating-info">
            <span class="rating-label">Average Infrastructure Rating</span>
            <span class="rating-value">{{ rating }}</span>
          </div>
          <div class="building-icon">
            <i class="pi pi-building"></i>
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
      align-items: center;
    }

    .rating-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .rating-info {
      display: flex;
      flex-direction: column;
    }

    .rating-label {
      font-size: 0.75rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .rating-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: #00695c;
    }

    .building-icon {
      width: 50px;
      height: 50px;
      background-color: #00695c;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
    }
    `,
  ],
})
export class CompactSpaceEvaluationComponent {
  rating = "3.9"
}
