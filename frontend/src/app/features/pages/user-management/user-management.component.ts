import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

// Import components
import { UserTableComponent, type User } from "./components/user-table.component"
import { UserFiltersComponent } from "./components/user-filters.component"
import { CreateUserFormComponent } from "./components/create-user-form.component"

@Component({
  selector: "app-user-management",
  standalone: true,
  imports: [CommonModule, RouterModule, UserTableComponent, UserFiltersComponent, CreateUserFormComponent],
  template: `
   
      <!-- Main Content -->
      <main class="main-content">
        <div class="page-header">
          <h1>Manage User Accounts</h1>
          <p>View and manage student, teacher, ad admin profiles securely.</p>
        </div>

        <div class="content-layout">
          <!-- Left Content -->
          <div class="left-content">
            <app-user-filters
              (filtersChanged)="handleFiltersChanged($event)"
            ></app-user-filters>
            
            <app-user-table
              [users]="filteredUsers"
            ></app-user-table>
          </div>

          <!-- Right Content -->
          <div class="right-content">
            <app-create-user-form
              (createUser)="handleCreateUser($event)"
            ></app-create-user-form>
          </div>
        </div>
  `,
  styles: [
    `
    :host {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      --primary-color: #00695c;
      --secondary-color: #00BCD4;
      --accent-color: #FFC107;
      --text-color: #333;
      --light-gray: #f8f9fa;
      --border-color: #e0e0e0;
      display: block;
      height: 100vh;
    }

    .sakai-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      height: 60px;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-color);
    }

    .logo img {
      height: 30px;
      margin-right: 0.5rem;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon-button {
      background: none;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-color);
      transition: background-color 0.2s;
    }

    .icon-button:hover {
      background-color: var(--light-gray);
    }

    .layout-container {
      display: flex;
      height: calc(100vh - 60px);
    }

    .sidebar {
      width: 250px;
      background-color: white;
      border-right: 1px solid var(--border-color);
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow-y: auto;
    }

    .nav-section {
      margin-bottom: 1rem;
    }

    .nav-header {
      padding: 0.5rem 1.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #6c757d;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: var(--text-color);
      text-decoration: none;
      transition: background-color 0.2s;
      cursor: pointer;
    }

    .nav-item i {
      margin-right: 0.75rem;
      font-size: 1.2rem;
    }

    .nav-item:hover {
      background-color: var(--light-gray);
    }

    .nav-item.active {
      background-color: #e6f7f5;
      color: var(--primary-color);
      border-left: 4px solid var(--primary-color);
      padding-left: calc(1.5rem - 4px);
    }

    .menu-toggle {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .menu-toggle .menu-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      color: var(--text-color);
      cursor: pointer;
      font-size: 0.9rem;
    }

    .main-content {
      flex: 1;
      padding: 1.5rem;
      background-color: var(--light-gray);
      overflow-y: auto;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-header h1 {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
      margin-top: 0;
    }

    .page-header p {
      font-size: 1rem;
      color: #6c757d;
      margin: 0;
    }

    .content-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }

    .left-content {
      display: flex;
      flex-direction: column;
    }

    @media (max-width: 1024px) {
      .content-layout {
        grid-template-columns: 1fr;
      }
      
      .right-content {
        order: -1;
        margin-bottom: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 70px;
      }
      
      .nav-item span,
      .nav-header,
      .menu-toggle span {
        display: none;
      }
      
      .nav-item {
        justify-content: center;
        padding: 0.75rem;
      }
      
      .nav-item i {
        margin-right: 0;
      }
      
      .nav-item.active {
        padding-left: calc(0.75rem - 4px);
      }
    }
    `,
  ],
})
export class UserManagementComponent {
  users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Student",
      lastLogin: "01 May 2025",
    },
    {
      id: "2",
      name: "Lisa Ray",
      email: "lisa@university.edu",
      role: "Teacher",
      lastLogin: "30 Apr 2025",
    },
    {
      id: "3",
      name: "Admin One",
      email: "admin@example.com",
      role: "Admin",
      lastLogin: "01 May 2025",
    },
  ]

  filteredUsers: User[] = [...this.users]

  handleFiltersChanged(filters: { search: string; role: string; status: string }) {
    this.filteredUsers = this.users.filter((user) => {
      // Filter by search term
      if (
        filters.search &&
        !user.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !user.email.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      // Filter by role
      if (filters.role && user.role.toLowerCase() !== filters.role) {
        return false
      }

      // We don't have status in our data model yet, so we skip that filter
      // In a real app, you would add this filter as well

      return true
    })
  }

  handleCreateUser(userData: { fullName: string; email: string; role: string; password: string }) {
    // In a real app, you would call an API to create the user
    console.log("Creating user:", userData)

    // For demo purposes, we'll add the user to our local array
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      name: userData.fullName,
      email: userData.email,
      role: this.capitalizeFirstLetter(userData.role) as "Student" | "Teacher" | "Admin",
      lastLogin: "Never",
    }

    this.users = [...this.users, newUser]
    this.filteredUsers = [...this.users]

    // Show success message
    alert(`User ${userData.fullName} created successfully!`)
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
