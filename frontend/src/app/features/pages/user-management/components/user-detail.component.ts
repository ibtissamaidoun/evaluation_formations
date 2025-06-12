import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { type ActivatedRoute, RouterModule } from "@angular/router"
import { InputTextModule } from "primeng/inputtext"
import { DropdownModule } from "primeng/dropdown"
import { ButtonModule } from "primeng/button"
import { PasswordModule } from "primeng/password"
import { TabViewModule } from "primeng/tabview"

interface RoleOption {
  name: string
  value: string
}

@Component({
  selector: "app-user-detail",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    PasswordModule,
    TabViewModule,
  ],
  template: `
    <div class="user-detail">
      <div class="detail-header">
        <div class="back-button">
          <button pButton pRipple icon="pi pi-arrow-left" class="p-button-text" routerLink="/users"></button>
        </div>
        <h1>{{ user.name }}</h1>
        <div class="user-role">{{ user.role }}</div>
      </div>

      <p-tabView>
        <p-tabPanel header="Profile">
          <div class="profile-section">
            <div class="form-field">
              <label for="fullName">Full Name</label>
              <input id="fullName" type="text" pInputText [(ngModel)]="user.name" />
            </div>

            <div class="form-field">
              <label for="email">Email Address</label>
              <input id="email" type="email" pInputText [(ngModel)]="user.email" />
            </div>

            <div class="form-field">
              <label for="role">Role</label>
              <p-dropdown
                id="role"
                [options]="roleOptions"
                [(ngModel)]="selectedRole"
                optionLabel="name"
                optionValue="value"
              ></p-dropdown>
            </div>

            <div class="form-actions">
              <button pButton pRipple label="Save Changes" class="p-button-warning"></button>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Security">
          <div class="security-section">
            <h2>Reset Password</h2>
            <div class="form-field">
              <label for="newPassword">New Password</label>
              <p-password id="newPassword" [(ngModel)]="newPassword" [toggleMask]="true"></p-password>
            </div>

            <div class="form-field">
              <label for="confirmPassword">Confirm Password</label>
              <p-password id="confirmPassword" [(ngModel)]="confirmPassword" [toggleMask]="true"></p-password>
            </div>

            <div class="form-actions">
              <button
                pButton
                pRipple
                label="Reset Password"
                class="p-button-warning"
                [disabled]="!canResetPassword()"
              ></button>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Activity">
          <div class="activity-section">
            <h2>Login History</h2>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-date">{{ user.lastLogin }}</div>
                <div class="activity-details">
                  <div class="activity-title">Last Login</div>
                  <div class="activity-device">Chrome on Windows</div>
                </div>
              </div>
            </div>
          </div>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styles: [
    `
    .user-detail {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      padding: 1.5rem;
    }
    
    .detail-header {
      margin-bottom: 1.5rem;
      position: relative;
    }
    
    .back-button {
      position: absolute;
      left: 0;
      top: 0;
    }
    
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #495057;
      margin: 0;
      text-align: center;
    }
    
    .user-role {
      text-align: center;
      color: #6c757d;
      margin-top: 0.5rem;
    }
    
    .form-field {
      margin-bottom: 1.25rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: #6c757d;
    }
    
    :host ::ng-deep input,
    :host ::ng-deep .p-dropdown,
    :host ::ng-deep .p-password {
      width: 100%;
    }
    
    .form-actions {
      margin-top: 1.5rem;
    }
    
    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #495057;
      margin-top: 0;
      margin-bottom: 1.5rem;
    }
    
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .activity-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #e9ecef;
      border-radius: 6px;
    }
    
    .activity-date {
      font-weight: 500;
      color: #00695c;
      min-width: 100px;
    }
    
    .activity-title {
      font-weight: 500;
    }
    
    .activity-device {
      font-size: 0.9rem;
      color: #6c757d;
      margin-top: 0.25rem;
    }
    `,
  ],
})
export class UserDetailComponent implements OnInit {
  user = {
    id: "",
    name: "",
    email: "",
    role: "Student",
    lastLogin: "",
  }

  selectedRole = "student"
  newPassword = ""
  confirmPassword = ""

  roleOptions: RoleOption[] = [
    { name: "Student", value: "student" },
    { name: "Teacher", value: "teacher" },
    { name: "Admin", value: "admin" },
  ]

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // In a real app, you would fetch the user data from an API
    // For demo purposes, we'll use mock data
    const userId = this.route.snapshot.paramMap.get("id")

    // Mock user data
    this.user = {
      id: userId || "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Student",
      lastLogin: "01 May 2025",
    }

    // Set the selected role based on the user's role
    this.selectedRole = this.user.role.toLowerCase()
  }

  canResetPassword(): boolean {
    return this.newPassword !== "" && this.newPassword === this.confirmPassword
  }
}
