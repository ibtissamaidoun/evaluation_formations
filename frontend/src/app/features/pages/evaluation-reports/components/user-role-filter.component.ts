import { Component, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DropdownModule } from "primeng/dropdown"
import { FormsModule } from "@angular/forms"

interface UserRole {
  label: string
  value: string
}

@Component({
  selector: "app-user-role-filter",
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  template: `
    <div class="filter-section">
      <label>Select User Role</label>
      <p-dropdown
        [options]="userRoles"
        [(ngModel)]="selectedRole"
        optionLabel="label"
        optionValue="value"
        placeholder="Select User Role"
        (onChange)="onRoleChange()"
        styleClass="w-full"
      ></p-dropdown>
    </div>
  `,
  styles: [
    `
    .filter-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-size: 0.9rem;
      font-weight: 500;
      color: #333;
    }

    ::ng-deep .p-dropdown {
      width: 100%;
    }
    `,
  ],
})
export class UserRoleFilterComponent {
  @Output() roleChanged = new EventEmitter<string>()

  selectedRole = ""

  userRoles: UserRole[] = [
    { label: "All Users", value: "all" },
    { label: "Students", value: "students" },
    { label: "Teachers", value: "teachers" },
    { label: "Administrators", value: "admins" },
  ]

  onRoleChange() {
    this.roleChanged.emit(this.selectedRole)
  }
}
