import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { ButtonModule } from "primeng/button"
import { TagModule } from "primeng/tag"

export interface EvaluationForm {
  id: string
  name: string
  targetAudience: string
  createdOn: string
  status: "Active" | "Closed" | "Draft"
}

@Component({
  selector: "app-form-table",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TagModule],
  template: `
    <div class="form-table">
      <div class="table-header">
        <div class="header-cell name-cell">Form Name</div>
        <div class="header-cell audience-cell">Target Audience</div>
        <div class="header-cell date-cell">Created On</div>
        <div class="header-cell status-cell">Status</div>
        <div class="header-cell actions-cell">Actions</div>
      </div>
      
      <div *ngFor="let form of forms" class="table-row">
        <div class="cell name-cell">
          <a [routerLink]="['/forms', form.id]" class="form-name">{{ form.name }}</a>
        </div>
        <div class="cell audience-cell">{{ form.targetAudience }}</div>
        <div class="cell date-cell">{{ form.createdOn }}</div>
        <div class="cell status-cell">
          <p-tag 
            [value]="form.status" 
            [severity]="getStatusSeverity(form.status)"
          ></p-tag>
        </div>
        <div class="cell actions-cell">
          <div class="action-buttons">
            <button 
              pButton 
              pRipple 
              icon="pi pi-pencil" 
              class="p-button-rounded p-button-text"
              (click)="onEditForm(form)"
            ></button>
            <button 
              pButton 
              pRipple 
              icon="pi pi-copy" 
              class="p-button-rounded p-button-text"
              (click)="onDuplicateForm(form)"
            ></button>
            <button 
              pButton 
              pRipple 
              icon="pi pi-archive" 
              class="p-button-rounded p-button-text"
              (click)="onArchiveForm(form)"
            ></button>
            <button 
              pButton 
              pRipple 
              icon="pi pi-trash" 
              class="p-button-rounded p-button-text p-button-danger"
              (click)="onDeleteForm(form)"
            ></button>
          </div>
        </div>
      </div>
      
      <div *ngIf="forms.length === 0" class="empty-state">
        <p>No evaluation forms found.</p>
      </div>
    </div>
  `,
  styles: [
    `
    .form-table {
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
      flex: 3;
    }
    
    .audience-cell {
      flex: 2;
    }
    
    .date-cell {
      flex: 2;
    }
    
    .status-cell {
      flex: 1;
    }
    
    .actions-cell {
      flex: 2;
      justify-content: flex-end;
    }
    
    .form-name {
      color: #00695c;
      text-decoration: none;
      font-weight: 500;
    }
    
    .form-name:hover {
      text-decoration: underline;
    }
    
    .action-buttons {
      display: flex;
      gap: 0.25rem;
    }
    
    .empty-state {
      padding: 2rem;
      text-align: center;
      color: #6c757d;
    }
    `,
  ],
})
export class FormTableComponent {
  @Input() forms: EvaluationForm[] = []

  getStatusSeverity(status: string): string {
    switch (status) {
      case "Active":
        return "warning"
      case "Closed":
        return "success"
      case "Draft":
        return "info"
      default:
        return "secondary"
    }
  }

  onEditForm(form: EvaluationForm) {
    console.log("Edit form:", form)
  }

  onDuplicateForm(form: EvaluationForm) {
    console.log("Duplicate form:", form)
  }

  onArchiveForm(form: EvaluationForm) {
    console.log("Archive form:", form)
  }

  onDeleteForm(form: EvaluationForm) {
    console.log("Delete form:", form)
  }
}
