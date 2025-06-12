import { Component, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DropdownModule } from "primeng/dropdown"
import { ButtonModule } from "primeng/button"
import { FormsModule } from "@angular/forms"

interface EvaluationType {
  label: string
  value: string
}

@Component({
  selector: "app-generate-report",
  standalone: true,
  imports: [CommonModule, DropdownModule, ButtonModule, FormsModule],
  template: `
    <div class="generate-report">
      <h3>Generate New Report</h3>
      <div class="form-section">
        <label>Select Evaluation Type</label>
        <p-dropdown
          [options]="evaluationTypes"
          [(ngModel)]="selectedType"
          optionLabel="label"
          optionValue="value"
          placeholder="Select Evaluation Type"
          styleClass="w-full"
        ></p-dropdown>
      </div>
      <div class="action-buttons">
        <button
          pButton
          pRipple
          label="Generate Report"
          class="p-button-warning"
          [disabled]="!selectedType"
          (click)="generateReport()"
        ></button>
        <button
          pButton
          pRipple
          label="PDF"
          class="p-button-outlined"
          [disabled]="!selectedType"
          (click)="generatePDF()"
        ></button>
      </div>
    </div>
  `,
  styles: [
    `
    .generate-report {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .generate-report h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-size: 0.9rem;
      font-weight: 500;
      color: #333;
    }

    .action-buttons {
      display: flex;
      gap: 0.75rem;
    }

    .action-buttons button {
      flex: 1;
    }

    ::ng-deep .p-dropdown {
      width: 100%;
    }
    `,
  ],
})
export class GenerateReportComponent {
  @Output() reportGenerated = new EventEmitter<string>()

  selectedType = ""

  evaluationTypes: EvaluationType[] = [
    { label: "Module Evaluation", value: "module" },
    { label: "Schedule Feedback", value: "schedule" },
    { label: "School Space", value: "space" },
    { label: "Student Evaluation", value: "student" },
    { label: "All Evaluations", value: "all" },
  ]

  generateReport() {
    if (this.selectedType) {
      console.log("Generating report for:", this.selectedType)
      this.reportGenerated.emit(this.selectedType)
    }
  }

  generatePDF() {
    if (this.selectedType) {
      console.log("Generating PDF for:", this.selectedType)
      this.reportGenerated.emit(this.selectedType)
    }
  }
}
