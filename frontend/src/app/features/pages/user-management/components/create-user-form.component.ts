import { Component, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { InputTextModule } from "primeng/inputtext"
import { DropdownModule } from "primeng/dropdown"
import { ButtonModule } from "primeng/button"
import { PasswordModule } from "primeng/password"

interface RoleOption {
  name: string
  value: string
}

@Component({
  selector: "app-create-user-form",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, DropdownModule, ButtonModule, PasswordModule],
  template: `
    <div class="create-user-form">
      <h2>Create New User</h2>
      
      <div class="form-field">
        <label for="fullName">Full Name</label>
        <input 
          id="fullName" 
          type="text" 
          pInputText 
          [(ngModel)]="fullName" 
          placeholder="Full Name"
        />
      </div>
      
      <div class="form-field">
        <label for="email">Email Address</label>
        <input 
          id="email" 
          type="email" 
          pInputText 
          [(ngModel)]="email" 
          placeholder="Email Address"
        />
      </div>
      
      <div class="form-field">
        <label for="role">Role</label>
        <p-dropdown
          id="role"
          [options]="roleOptions"
          [(ngModel)]="selectedRole"
          optionLabel="name"
          optionValue="value"
          placeholder="Role"
          [showClear]="false"
        ></p-dropdown>
      </div>
      
      <div class="form-field">
        <label for="password">Temporary Password</label>
        <p-password
          id="password"
          [(ngModel)]="password"
          [toggleMask]="true"
          [feedback]="false"
          placeholder="Temporary Password"
        ></p-password>
      </div>
      
      <button 
        pButton 
        pRipple 
        label="Create User" 
        class="p-button-warning create-button"
        [disabled]="!isFormValid()"
        (click)="onCreateUser()"
      ></button>
    </div>
  `,
  styles: [
    `
    .create-user-form {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    
    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #495057;
      margin-top: 0;
      margin-bottom: 1.5rem;
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
    
    .create-button {
      width: 100%;
      margin-top: 0.5rem;
    }
    
    :host ::ng-deep .p-button.p-button-warning {
      background-color: #ffc107;
      border-color: #ffc107;
      color: #212529;
    }
    
    :host ::ng-deep .p-button.p-button-warning:hover {
      background-color: #ffb300;
      border-color: #ffb300;
    }
    
    :host ::ng-deep .p-button.p-button-warning:disabled {
      background-color: #ffc107;
      border-color: #ffc107;
      opacity: 0.6;
    }
    `,
  ],
})
export class CreateUserFormComponent {
  @Output() createUser = new EventEmitter<{
    fullName: string
    email: string
    role: string
    password: string
  }>()

  fullName = ""
  email = ""
  selectedRole = "student"
  password = ""

  roleOptions: RoleOption[] = [
    { name: "Student", value: "student" },
    { name: "Teacher", value: "teacher" },
    { name: "Admin", value: "admin" },
  ]

  isFormValid(): boolean {
    return (
      this.fullName.trim() !== "" && this.email.trim() !== "" && this.selectedRole !== "" && this.password.trim() !== ""
    )
  }

  onCreateUser() {
    if (this.isFormValid()) {
      this.createUser.emit({
        fullName: this.fullName,
        email: this.email,
        role: this.selectedRole,
        password: this.password,
      })

      // Reset form
      this.fullName = ""
      this.email = ""
      this.selectedRole = "student"
      this.password = ""
    }
  }
}
