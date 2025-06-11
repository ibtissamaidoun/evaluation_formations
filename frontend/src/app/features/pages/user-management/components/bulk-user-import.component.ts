import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ButtonModule } from "primeng/button"
import { FileUploadModule } from "primeng/fileupload"
import { DialogModule } from "primeng/dialog"

@Component({
  selector: "app-bulk-user-import",
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, FileUploadModule, DialogModule],
  template: `
    <button 
      pButton 
      pRipple 
      label="Bulk Import" 
      icon="pi pi-upload" 
      class="p-button-outlined"
      (click)="showDialog()"
    ></button>
    
    <p-dialog 
      header="Import Users" 
      [(visible)]="visible" 
      [style]="{width: '500px'}"
      [modal]="true"
    >
      <div class="import-content">
        <p>Upload a CSV file with user data to import multiple users at once.</p>
        
        <p-fileUpload
          mode="basic"
          chooseLabel="Select CSV File"
          [auto]="true"
          accept=".csv"
          [maxFileSize]="1000000"
          (onUpload)="onUpload($event)"
        ></p-fileUpload>
        
        <div class="template-download">
          <a href="#">Download CSV Template</a>
        </div>
        
        <div class="import-instructions">
          <h3>CSV Format</h3>
          <p>Your CSV file should include the following columns:</p>
          <ul>
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Role (Student, Teacher, or Admin)</li>
            <li>Temporary Password (optional)</li>
          </ul>
        </div>
      </div>
      
      <ng-template pTemplate="footer">
        <button 
          pButton 
          pRipple 
          label="Cancel" 
          icon="pi pi-times" 
          class="p-button-text"
          (click)="hideDialog()"
        ></button>
      </ng-template>
    </p-dialog>
  `,
  styles: [
    `
    .import-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .template-download {
      text-align: center;
    }
    
    .template-download a {
      color: #00695c;
      text-decoration: none;
    }
    
    .template-download a:hover {
      text-decoration: underline;
    }
    
    .import-instructions {
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 6px;
    }
    
    .import-instructions h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 0.75rem;
    }
    
    .import-instructions p {
      margin-top: 0;
      margin-bottom: 0.75rem;
    }
    
    .import-instructions ul {
      margin: 0;
      padding-left: 1.5rem;
    }
    `,
  ],
})
export class BulkUserImportComponent {
  visible = false

  showDialog() {
    this.visible = true
  }

  hideDialog() {
    this.visible = false
  }

  onUpload(event: any) {
    // In a real app, you would process the CSV file here
    console.log("File uploaded:", event.files[0])

    // Show success message
    alert("File uploaded successfully! Processing users...")

    this.hideDialog()
  }
}
