import { Component, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { DropdownModule } from "primeng/dropdown"
import { FormsModule } from "@angular/forms"

interface TimePeriod {
  label: string
  value: string
}

@Component({
  selector: "app-time-period-filter",
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  template: `
    <div class="filter-section">
      <label>Select Time Period</label>
      <p-dropdown
        [options]="timePeriods"
        [(ngModel)]="selectedPeriod"
        optionLabel="label"
        optionValue="value"
        placeholder="Select Time Period"
        (onChange)="onPeriodChange()"
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
export class TimePeriodFilterComponent {
  @Output() periodChanged = new EventEmitter<string>()

  selectedPeriod = ""

  timePeriods: TimePeriod[] = [
    { label: "Last 7 days", value: "7days" },
    { label: "Last 30 days", value: "30days" },
    { label: "Last 3 months", value: "3months" },
    { label: "Last 6 months", value: "6months" },
    { label: "Last year", value: "1year" },
    { label: "Custom range", value: "custom" },
  ]

  onPeriodChange() {
    this.periodChanged.emit(this.selectedPeriod)
  }
}
