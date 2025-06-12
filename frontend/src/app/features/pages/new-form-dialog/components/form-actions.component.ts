import { Component, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ButtonModule } from "primeng/button"

@Component({
  selector: "app-form-actions",
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="actions-container">
      <button 
        pButton 
        pRipple 
        label="+ New Form" 
        class="p-button-warning"
        (click)="onNewForm()"
      ></button>
      
      <button 
        pButton 
        pRipple 
        label="Archived Forms" 
        class="p-button-text"
        (click)="onViewArchived()"
      ></button>
    </div>
  `,
  styles: [
    `
    .actions-container {
      display: flex;
      gap: 1rem;
      align-items: center;
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
    
    :host ::ng-deep .p-button.p-button-text {
      color: #495057;
    }
    `,
  ],
})
export class FormActionsComponent {
  @Output() newForm = new EventEmitter<void>()
  @Output() viewArchived = new EventEmitter<void>()

  onNewForm() {
    this.newForm.emit()
  }

  onViewArchived() {
    this.viewArchived.emit()
  }
}
