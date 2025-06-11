import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

// Import components
import { FormTableComponent, type EvaluationForm } from "./components/form-table.component"
import { FormSearchComponent } from "./components/form-search.component"
import { FormActionsComponent } from "./components/form-actions.component"

@Component({
  selector: "app-form-management",
  standalone: true,
  imports: [CommonModule, RouterModule, FormTableComponent, FormSearchComponent, FormActionsComponent],
  template: `
   
      <!-- Main Content -->
      <main class="main-content">
        <div class="page-header">
          <h1>Manage Evaluation Forms</h1>
          <p>Create, edit, archive, or delete evaluation forms for students and teachers.</p>
        </div>

        <div class="content-container">
          <div class="actions-row">
            <app-form-actions
              (newForm)="handleNewForm()"
              (viewArchived)="handleViewArchived()"
            ></app-form-actions>
            
            <app-form-search
              (search)="handleSearch($event)"
            ></app-form-search>
          </div>
          
          <app-form-table
            [forms]="filteredForms"
          ></app-form-table>
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

    .content-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .actions-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
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
      
      .actions-row {
        flex-direction: column;
        align-items: stretch;
      }
    }
    `,
  ],
})
export class FormManagementComponent {
  forms: EvaluationForm[] = [
    {
      id: "1",
      name: "Module Feedback - Students",
      targetAudience: "TD students",
      createdOn: "24/04/2025",
      status: "Active",
    },
    {
      id: "2",
      name: "Class Schedule - ENG All",
      targetAudience: "Teachers",
      createdOn: "20/04/2025",
      status: "Closed",
    },
    {
      id: "3",
      name: "School Space Survey",
      targetAudience: "All",
      createdOn: "15/04/2025",
      status: "Active",
    },
  ]

  filteredForms: EvaluationForm[] = [...this.forms]

  handleNewForm() {
    console.log("Creating new form")
    // Navigate to form creation page or open modal
  }

  handleViewArchived() {
    console.log("Viewing archived forms")
    // Navigate to archived forms page or update current view
  }

  handleSearch(term: string) {
    if (!term) {
      this.filteredForms = [...this.forms]
      return
    }

    const lowerTerm = term.toLowerCase()
    this.filteredForms = this.forms.filter(
      (form) => form.name.toLowerCase().includes(lowerTerm) || form.targetAudience.toLowerCase().includes(lowerTerm),
    )
  }
}
