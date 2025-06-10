import { Component, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DropdownModule } from "primeng/dropdown"
import { FormsModule } from "@angular/forms"

interface FormType {
  label: string
  value: string
}

@Component({
  selector: "app-form-filter",
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  template: `
    <div class="filter-section">
      <label>Select Form</label>
      <p-dropdown
        [options]="formTypes"
        [(ngModel)]="selectedForm"
        optionLabel="label"
        optionValue="value"
        placeholder="Select Form"
        (onChange)="onFormChange()"
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
export class FormFilterComponent {
  @Output() formChanged = new EventEmitter<string>()

  selectedForm = ""

  formTypes: FormType[] = [
    { label: "All Forms", value: "all" },
    { label: "Module Evaluation", value: "module" },
    { label: "Schedule Feedback", value: "schedule" },
    { label: "School Space", value: "space" },
    { label: "Student Evaluation", value: "student" },
  ]

  onFormChange() {
    this.formChanged.emit(this.selectedForm)
  }
}
