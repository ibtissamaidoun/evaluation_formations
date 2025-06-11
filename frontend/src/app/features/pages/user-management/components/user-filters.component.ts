import { Component, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { InputTextModule } from "primeng/inputtext"
import { DropdownModule } from "primeng/dropdown"

interface RoleOption {
  name: string
  value: string
}

interface StatusOption {
  name: string
  value: string
}

@Component({
  selector: "app-user-filters",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, DropdownModule],
  template: `
    <div class="filters-container">
      <div class="search-filter">
        <span class="p-input-icon-left">
          <i class="pi pi-search"></i>
          <input 
            type="text" 
            pInputText 
            [(ngModel)]="searchTerm" 
            (input)="onFiltersChange()"
            placeholder="Search" 
          />
        </span>
      </div>
      
      <div class="role-filter">
        <p-dropdown
          [options]="roleOptions"
          [(ngModel)]="selectedRole"
          optionLabel="name"
          optionValue="value"
          placeholder="Role"
          (onChange)="onFiltersChange()"
        ></p-dropdown>
      </div>
      
      <div class="status-filter">
        <p-dropdown
          [options]="statusOptions"
          [(ngModel)]="selectedStatus"
          optionLabel="name"
          optionValue="value"
          placeholder="Any Status"
          (onChange)="onFiltersChange()"
        ></p-dropdown>
      </div>
    </div>
  `,
  styles: [
    `
    .filters-container {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .search-filter {
      flex: 1;
    }
    
    :host ::ng-deep .p-input-icon-left {
      width: 100%;
    }
    
    :host ::ng-deep .p-input-icon-left > i {
      left: 0.75rem;
      color: #6c757d;
    }
    
    :host ::ng-deep input {
      width: 100%;
      padding-left: 2.5rem;
    }
    
    :host ::ng-deep .p-dropdown {
      min-width: 150px;
    }
    
    @media (max-width: 768px) {
      .filters-container {
        flex-direction: column;
      }
    }
    `,
  ],
})
export class UserFiltersComponent {
  @Output() filtersChanged = new EventEmitter<{
    search: string
    role: string
    status: string
  }>()

  searchTerm = ""
  selectedRole = ""
  selectedStatus = ""

  roleOptions: RoleOption[] = [
    { name: "All Roles", value: "" },
    { name: "Student", value: "student" },
    { name: "Teacher", value: "teacher" },
    { name: "Admin", value: "admin" },
  ]

  statusOptions: StatusOption[] = [
    { name: "Any Status", value: "" },
    { name: "Active", value: "active" },
    { name: "Inactive", value: "inactive" },
    { name: "Pending", value: "pending" },
  ]

  onFiltersChange() {
    this.filtersChanged.emit({
      search: this.searchTerm,
      role: this.selectedRole,
      status: this.selectedStatus,
    })
  }
}
