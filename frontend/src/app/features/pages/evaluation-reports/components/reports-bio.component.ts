import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

interface ReportBio {
  title: string
  format: string
  date: string
}

@Component({
  selector: "app-reports-bio",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports-bio">
      <h3>Reports Bio</h3>
      <div class="bio-items">
        <div *ngFor="let bio of reportsBio" class="bio-item">
          <div class="bio-info">
            <span class="bio-title">{{ bio.title }}</span>
            <span class="bio-format">Format</span>
          </div>
          <div class="bio-meta">
            <span class="bio-format-value">{{ bio.format }}</span>
            <span class="bio-date">{{ bio.date }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .reports-bio {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .reports-bio h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1rem;
    }

    .bio-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .bio-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
    }

    .bio-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .bio-title {
      font-size: 0.9rem;
      font-weight: 500;
      color: #333;
    }

    .bio-format {
      font-size: 0.8rem;
      color: #666;
    }

    .bio-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
    }

    .bio-format-value {
      font-size: 0.85rem;
      font-weight: 500;
      color: #00695c;
      background-color: #e6f7f5;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }

    .bio-date {
      font-size: 0.8rem;
      color: #666;
    }
    `,
  ],
})
export class ReportsBioComponent {
  reportsBio: ReportBio[] = [
    {
      title: "Module Evaluation",
      format: "PDF",
      date: "15/04/2025",
    },
  ]
}
