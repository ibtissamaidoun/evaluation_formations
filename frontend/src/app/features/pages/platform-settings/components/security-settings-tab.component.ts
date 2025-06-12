import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DropdownModule } from "primeng/dropdown"
import { ButtonModule } from "primeng/button"
import { CheckboxModule } from "primeng/checkbox"
import { SelectButtonModule } from "primeng/selectbutton"

interface LanguageOption {
  name: string
  code: string
}

@Component({
  selector: "app-security-settings-tab",
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, ButtonModule, CheckboxModule, SelectButtonModule],
  template: `
    <div class="security-settings">
      <div class="settings-row">
        <div class="settings-section">
          <div class="form-field">
            <label>Theme</label>
            <p-selectButton 
              [options]="themeOptions" 
              [(ngModel)]="selectedTheme"
              optionLabel="name"
              optionValue="value"
            ></p-selectButton>
          </div>
          
          <div class="form-field">
            <label for="language">Language</label>
            <p-dropdown
              id="language"
              [options]="languageOptions"
              [(ngModel)]="selectedLanguage"
              optionLabel="name"
              optionValue="code"
              placeholder="Select Language"
            ></p-dropdown>
          </div>
        </div>
        
        <div class="settings-section">
          <div class="form-field">
            <label>Notification Preferences</label>
            <div class="checkbox-group">
              <div class="checkbox-item">
                <p-checkbox 
                  [(ngModel)]="emailNotifications" 
                  [binary]="true"
                  inputId="email"
                ></p-checkbox>
                <label for="email" class="checkbox-label">Email</label>
              </div>
              
              <div class="checkbox-item">
                <p-checkbox 
                  [(ngModel)]="inAppNotifications" 
                  [binary]="true"
                  inputId="inapp"
                ></p-checkbox>
                <label for="inapp" class="checkbox-label">In-App</label>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button 
              pButton 
              pRipple 
              label="Save Preferences" 
              class="p-button-success save-button"
              (click)="savePreferences()"
            ></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .security-settings {
      padding: 1.5rem 0;
    }
    
    .settings-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      max-width: 800px;
    }
    
    .settings-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    label {
      font-size: 0.9rem;
      color: #6c757d;
      font-weight: 500;
    }
    
    .checkbox-label {
      margin-left: 0.5rem;
      color: #495057;
      cursor: pointer;
    }
    
    :host ::ng-deep .p-dropdown {
      width: 100%;
    }
    
    :host ::ng-deep .p-selectbutton .p-button {
      background-color: #f8f9fa;
      border-color: #dee2e6;
      color: #495057;
    }
    
    :host ::ng-deep .p-selectbutton .p-button.p-highlight {
      background-color: #00695c;
      border-color: #00695c;
      color: white;
    }
    
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .checkbox-item {
      display: flex;
      align-items: center;
    }
    
    .form-actions {
      margin-top: 1rem;
    }
    
    .save-button {
      background-color: #28a745;
      border-color: #28a745;
      color: white;
      font-weight: 500;
    }
    
    .save-button:hover {
      background-color: #218838;
      border-color: #1e7e34;
    }
    
    @media (max-width: 768px) {
      .settings-row {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
    `,
  ],
})
export class SecuritySettingsTabComponent {
  selectedTheme = "light"
  selectedLanguage = "en"
  emailNotifications = true
  inAppNotifications = true

  themeOptions = [
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
  ]

  languageOptions: LanguageOption[] = [
    { name: "English", code: "en" },
    { name: "French", code: "fr" },
    { name: "Spanish", code: "es" },
    { name: "German", code: "de" },
  ]

  savePreferences() {
    // In a real app, you would call an API to save preferences
    console.log("Saving preferences:", {
      theme: this.selectedTheme,
      language: this.selectedLanguage,
      emailNotifications: this.emailNotifications,
      inAppNotifications: this.inAppNotifications,
    })

    alert("Preferences saved successfully!")
  }
}
