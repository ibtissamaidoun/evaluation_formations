import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-notifications",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      <h2 class="notification-title">Notifications</h2>
      <div class="notification-card">
        <div class="notification-message">
          Reminder: Complete your evaluations before May 15.
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .notification-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .notification-title {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .notification-card {
      background-color: rgba(0, 150, 136, 0.1);
      border-radius: 6px;
      padding: 1rem;
    }
    
    .notification-message {
      color: #333;
    }
  `,
  ],
})
export class NotificationsComponent {}
