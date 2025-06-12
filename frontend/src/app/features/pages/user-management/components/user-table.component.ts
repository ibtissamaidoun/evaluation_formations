import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

export interface User {
  id: string
  name: string
  email: string
  role: "Student" | "Teacher" | "Admin"
  lastLogin: string
}

@Component({
  selector: "app-user-table",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-table">
      <div class="table-header">
        <div class="header-cell name-cell">Name</div>
        <div class="header-cell email-cell">Email</div>
        <div class="header-cell role-cell">Role</div>
        <div class="header-cell login-cell">Last Login</div>
      </div>
      
      <div *ngFor="let user of users" class="table-row">
        <div class="cell name-cell">
          <a [routerLink]="['/users', user.id]" class="user-name">{{ user.name }}</a>
        </div>
        <div class="cell email-cell">{{ user.email }}</div>
        <div class="cell role-cell">{{ user.role }}</div>
        <div class="cell login-cell">{{ user.lastLogin }}</div>
      </div>
      
      <div *ngIf="users.length === 0" class="empty-state">
        <p>No users found.</p>
      </div>
    </div>
  `,
  styles: [
    `
    .user-table {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
    
    .table-header {
      display: flex;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      font-weight: 600;
      color: #495057;
      font-size: 0.9rem;
    }
    
    .header-cell {
      padding: 1rem;
    }
    
    .table-row {
      display: flex;
      border-bottom: 1px solid #e9ecef;
      transition: background-color 0.2s;
    }
    
    .table-row:last-child {
      border-bottom: none;
    }
    
    .table-row:hover {
      background-color: #f8f9fa;
    }
    
    .cell {
      padding: 1rem;
      display: flex;
      align-items: center;
    }
    
    .name-cell {
      flex: 2;
    }
    
    .email-cell {
      flex: 2;
    }
    
    .role-cell {
      flex: 1;
    }
    
    .login-cell {
      flex: 1;
    }
    
    .user-name {
      color: #00695c;
      text-decoration: none;
      font-weight: 500;
    }
    
    .user-name:hover {
      text-decoration: underline;
    }
    
    .empty-state {
      padding: 2rem;
      text-align: center;
      color: #6c757d;
    }
    `,
  ],
})
export class UserTableComponent {
  @Input() users: User[] = []
}
