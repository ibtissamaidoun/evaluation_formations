import { Component, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { InputTextModule } from "primeng/inputtext"

@Component({
  selector: "app-form-search",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  template: `
    <div class="search-container">
      <span class="p-input-icon-left">
        <i class="pi pi-search"></i>
        <input 
          type="text" 
          pInputText 
          [(ngModel)]="searchTerm" 
          (input)="onSearch()"
          placeholder="Search forms" 
        />
      </span>
    </div>
  `,
  styles: [
    `
    .search-container {
      width: 100%;
    }
    
    :host ::ng-deep .p-input-icon-left {
      width: 100%;
    }
    
    :host ::ng-deep .p-input-icon-left > i {
      left: 1rem;
      color: #6c757d;
    }
    
    :host ::ng-deep input {
      width: 100%;
      padding-left: 2.5rem;
      border-radius: 20px;
      border: 1px solid #ced4da;
    }
    `,
  ],
})
export class FormSearchComponent {
  @Output() search = new EventEmitter<string>()

  searchTerm = ""

  onSearch() {
    this.search.emit(this.searchTerm)
  }
}
