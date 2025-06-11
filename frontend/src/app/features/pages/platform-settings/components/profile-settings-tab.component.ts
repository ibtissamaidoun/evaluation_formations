import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { InputTextModule } from "primeng/inputtext"
import { PasswordModule } from "primeng/password"
import { ButtonModule } from "primeng/button"

@Component({
  selector: "app-profile-settings-tab",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, PasswordModule, ButtonModule],
  template: `
    <div class="profile-settings">
      <div class="settings-section">
        <h3>Change Password</h3>
        
        <div class="form-field">
          <label for="newPassword">New Password</label>
          <p-password
            id="newPassword"
            [(ngModel)]="newPassword"
            [toggleMask]="true"
            [feedback]="true"
            placeholder="New Password"
          ></p-password>
        </div>
        
        <div class="form-field">
          <label for="confirmPassword">Confirm Password</label>
          <p-password
            id="confirmPassword"
            [(ngModel)]="confirmPassword"
            [toggleMask]="true"
            [feedback]="false"
            placeholder="Confirm Password"
          ></p-password>
        </div>
        
        <div class="form-actions">
          <h4>Update Security</h4>
          <button 
            pButton 
            pRipple 
            label="Update Security" 
            class="p-button-warning update-button"
            [disabled]="!canUpdatePassword()"
            (click)="updatePassword()"
          ></button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .profile-settings {
      padding: 1.5rem 0;
    }
    
    .settings-section {
      max-width: 400px;
    }
    
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #495057;
      margin-top: 0;
      margin-bottom: 1.5rem;
    }
    
    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #495057;
      margin-bottom: 1rem;
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
    
    :host ::ng-deep .p-password {
      width: 100%;
    }
    
    .form-actions {
      margin-top: 2rem;
    }
    
    .update-button {
      background-color: #ffc107;
      border-color: #ffc107;
      color: #212529;
      font-weight: 500;
    }
    
    .update-button:hover {
      background-color: #ffb300;
      border-color: #ffb300;
    }
    
    .update-button:disabled {
      background-color: #ffc107;
      border-color: #ffc107;
      opacity: 0.6;
    }
    `,
  ],
})
export class ProfileSettingsTabComponent {
  newPassword = ""
  confirmPassword = ""

  canUpdatePassword(): boolean {
    return this.newPassword.length >= 6 && this.confirmPassword.length >= 6 && this.newPassword === this.confirmPassword
  }

  updatePassword() {
    if (this.canUpdatePassword()) {
      // In a real app, you would call an API to update the password
      console.log("Updating password...")
      alert("Password updated successfully!")

      // Reset form
      this.newPassword = ""
      this.confirmPassword = ""
    }
  }
}
