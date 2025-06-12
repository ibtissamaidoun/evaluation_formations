import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { CheckboxModule } from "primeng/checkbox"
import { ButtonModule } from "primeng/button"
import { SliderModule } from "primeng/slider"
import { DropdownModule } from "primeng/dropdown"

interface TimezoneOption {
  name: string
  value: string
}

@Component({
  selector: "app-app-settings-tab",
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, ButtonModule, SliderModule, DropdownModule],
  template: `
    <div class="app-settings">
      <div class="settings-row">
        <div class="settings-section">
          <h3>Application Preferences</h3>
          
          <div class="form-field">
            <label for="timezone">Timezone</label>
            <p-dropdown
              id="timezone"
              [options]="timezoneOptions"
              [(ngModel)]="selectedTimezone"
              optionLabel="name"
              optionValue="value"
              placeholder="Select Timezone"
            ></p-dropdown>
          </div>
          
          <div class="form-field">
            <label>Auto-save Interval (minutes)</label>
            <p-slider 
              [(ngModel)]="autoSaveInterval" 
              [min]="1" 
              [max]="30"
              [step]="1"
            ></p-slider>
            <span class="slider-value">{{ autoSaveInterval }} minutes</span>
          </div>
          
          <div class="form-field">
            <div class="checkbox-group">
              <div class="checkbox-item">
                <p-checkbox 
                  [(ngModel)]="enableAutoSave" 
                  [binary]="true"
                  inputId="autosave"
                ></p-checkbox>
                <label for="autosave" class="checkbox-label">Enable Auto-save</label>
              </div>
              
              <div class="checkbox-item">
                <p-checkbox 
                  [(ngModel)]="enableSounds" 
                  [binary]="true"
                  inputId="sounds"
                ></p-checkbox>
                <label for="sounds" class="checkbox-label">Enable Sound Effects</label>
              </div>
              
              <div class="checkbox-item">
                <p-checkbox 
                  [(ngModel)]="enableAnimations" 
                  [binary]="true"
                  inputId="animations"
                ></p-checkbox>
                <label for="animations" class="checkbox-label">Enable Animations</label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="settings-section">
          <h3>Data & Privacy</h3>
          
          <div class="form-field">
            <div class="checkbox-group">
              <div class="checkbox-item">
                <p-checkbox 
                  [(ngModel)]="allowAnalytics" 
                  [binary]="true"
                  inputId="analytics"
                ></p-checkbox>
                <label for="analytics" class="checkbox-label">Allow Analytics</label>
              </div>
              
              <div class="checkbox-item">
                <p-checkbox 
                  [(ngModel)]="allowCookies" 
                  [binary]="true"
                  inputId="cookies"
                ></p-checkbox>
                <label for="cookies" class="checkbox-label">Allow Cookies</label>
              </div>
              
              <div class="checkbox-item">
                <p-checkbox 
                  [(ngModel)]="shareUsageData" 
                  [binary]="true"
                  inputId="usage"
                ></p-checkbox>
                <label for="usage" class="checkbox-label">Share Usage Data</label>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button 
              pButton 
              pRipple 
              label="Save App Settings" 
              class="p-button-success save-button"
              (click)="saveAppSettings()"
            ></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .app-settings {
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
    
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #495057;
      margin: 0;
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
    
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .checkbox-item {
      display: flex;
      align-items: center;
    }
    
    .slider-value {
      font-size: 0.9rem;
      color: #6c757d;
      margin-top: 0.5rem;
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
export class AppSettingsTabComponent {
  selectedTimezone = "UTC"
  autoSaveInterval = 5
  enableAutoSave = true
  enableSounds = true
  enableAnimations = true
  allowAnalytics = false
  allowCookies = true
  shareUsageData = false

  timezoneOptions: TimezoneOption[] = [
    { name: "UTC", value: "UTC" },
    { name: "Eastern Time (ET)", value: "America/New_York" },
    { name: "Central Time (CT)", value: "America/Chicago" },
    { name: "Mountain Time (MT)", value: "America/Denver" },
    { name: "Pacific Time (PT)", value: "America/Los_Angeles" },
    { name: "Central European Time (CET)", value: "Europe/Paris" },
    { name: "Greenwich Mean Time (GMT)", value: "Europe/London" },
  ]

  saveAppSettings() {
    // In a real app, you would call an API to save app settings
    console.log("Saving app settings:", {
      timezone: this.selectedTimezone,
      autoSaveInterval: this.autoSaveInterval,
      enableAutoSave: this.enableAutoSave,
      enableSounds: this.enableSounds,
      enableAnimations: this.enableAnimations,
      allowAnalytics: this.allowAnalytics,
      allowCookies: this.allowCookies,
      shareUsageData: this.shareUsageData,
    })

    alert("App settings saved successfully!")
  }
}
