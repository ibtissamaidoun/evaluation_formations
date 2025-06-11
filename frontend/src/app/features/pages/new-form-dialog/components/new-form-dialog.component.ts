import { Component, EventEmitter, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DialogModule } from "primeng/dialog"
import { ButtonModule } from "primeng/button"
import { InputTextModule } from "primeng/inputtext"
import { DropdownModule } from "primeng/dropdown"

interface FormTemplate {
  id: string
  name: string
}

interface TargetAudience {
  name: string
  code: string
}

@Component({
  selector: "app-new-form-dialog",
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule, DropdownModule],
  template: `
    <p-dialog 
      header="Create New Form" 
      [(visible)]="visible" 
      [style]="{width: '500px'}"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
    >
      <div class="form-container">
        <div class="form-field">
          <label for="formName">Form Name</label>
          <input 
            id="formName" 
            type="text" 
            pInputText 
            [(ngModel)]="formName" 
            placeholder="Enter form name"
          />
        </div>
        
        <div class="form-field">
          <label for="formTemplate">Template</label>
          <p-dropdown
            id="formTemplate"
            [options]="templates"
            [(ngModel)]="selectedTemplate"
            optionLabel="name"
            placeholder="Select a template"
            [showClear]="true"
          ></p-dropdown>
        </div>
        
        <div class="form-field">
          <label for="targetAudience">Target Audience</label>
          <p-dropdown
            id="targetAudience"
            [options]="audiences"
            [(ngModel)]="selectedAudience"
            optionLabel="name"
            placeholder="Select target audience"
          ></p-dropdown>
        </div>
        
        <div class="form-field">
          <label for="description">Description (Optional)</label>
          <textarea 
            id="description" 
            pInputText 
            [(ngModel)]="description" 
            rows="3"
            placeholder="Enter form description"
          ></textarea>
        </div>
      </div>
      
      <ng-template pTemplate="footer">
        <button 
          pButton 
          pRipple 
          label="Cancel" 
          icon="pi pi-times" 
          class="p-button-text"
          (click)="onCancel()"
        ></button>
        <button 
          pButton 
          pRipple 
          label="Create" 
          icon="pi pi-check" 
          class="p-button-warning"
          [disabled]="!isFormValid()"
          (click)="onCreate()"
        ></button>
      </ng-template>
    </p-dialog>
  `,
  styles: [
    `
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    label {
      font-weight: 500;
      font-size: 0.9rem;
      color: #495057;
    }
    
    :host ::ng-deep .p-dropdown {
      width: 100%;
    }
    
    textarea {
      resize: vertical;
    }
    `,
  ],
})
export class NewFormDialogComponent {
  @Output() create = new EventEmitter<any>()
  @Output() cancel = new EventEmitter<void>()

  visible = false
  formName = ""
  description = ""
  selectedTemplate: FormTemplate | null = null
  selectedAudience: TargetAudience | null = null

  templates: FormTemplate[] = [
    { id: "1", name: "Module Evaluation" },
    { id: "2", name: "Schedule Feedback" },
    { id: "3", name: "School Space Survey" },
    { id: "4", name: "Student Behavior" },
    { id: "5", name: "Blank Form" },
  ]

  audiences: TargetAudience[] = [
    { name: "All", code: "all" },
    { name: "Students", code: "students" },
    { name: "Teachers", code: "teachers" },
    { name: "Administrators", code: "admins" },
  ]

  show() {
    this.visible = true
  }

  hide() {
    this.visible = false
    this.resetForm()
  }

  isFormValid(): boolean {
    return !!this.formName && !!this.selectedAudience
  }

  onCancel() {
    this.hide()
    this.cancel.emit()
  }

  onCreate() {
    if (this.isFormValid()) {
      const newForm = {
        name: this.formName,
        description: this.description,
        template: this.selectedTemplate,
        audience: this.selectedAudience,
      }

      this.create.emit(newForm)
      this.hide()
    }
  }

  private resetForm() {
    this.formName = ""
    this.description = ""
    this.selectedTemplate = null
    this.selectedAudience = null
  }
}
