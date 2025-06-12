import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { TabViewModule } from "primeng/tabview"

// Import tab components
import { ProfileSettingsTabComponent } from "./components/profile-settings-tab.component"
import { SecuritySettingsTabComponent } from "./components/security-settings-tab.component"
import { AppSettingsTabComponent } from "./components/app-settings-tab.component"

@Component({
  selector: "app-platform-settings",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabViewModule,
    ProfileSettingsTabComponent,
    SecuritySettingsTabComponent,
    AppSettingsTabComponent,
  ],
  template: `

      <!-- Main Content -->
      <main class="main-content">
        <div class="page-header">
          <h1>Platform Settings</h1>
          <p>Customize your profile, manage security, and set global platform preferences.</p>
        </div>

        <div class="settings-container">
          <p-tabView>
            <p-tabPanel header="Profile Settings">
              <app-profile-settings-tab></app-profile-settings-tab>
            </p-tabPanel>
            
            <p-tabPanel header="Security Settings">
              <app-security-settings-tab></app-security-settings-tab>
            </p-tabPanel>
            
            <p-tabPanel header="App">
              <app-app-settings-tab></app-app-settings-tab>
            </p-tabPanel>
          </p-tabView>
        </div>
     
  `,
  styles: [
    `
    :host {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      --primary-color: #00695c;
      --secondary-color: #00BCD4;
      --accent-color: #FFC107;
      --text-color: #333;
      --light-gray: #f8f9fa;
      --border-color: #e0e0e0;
      display: block;
      height: 100vh;
    }

    .sakai-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      height: 60px;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--primary-color);
    }

    .logo img {
      height: 30px;
      margin-right: 0.5rem;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon-button {
      background: none;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-color);
      transition: background-color 0.2s;
    }

    .icon-button:hover {
      background-color: var(--light-gray);
    }

    .layout-container {
      display: flex;
      height: calc(100vh - 60px);
    }

    .sidebar {
      width: 250px;
      background-color: white;
      border-right: 1px solid var(--border-color);
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow-y: auto;
    }

    .nav-section {
      margin-bottom: 1rem;
    }

    .nav-header {
      padding: 0.5rem 1.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #6c757d;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: var(--text-color);
      text-decoration: none;
      transition: background-color 0.2s;
      cursor: pointer;
    }

    .nav-item i {
      margin-right: 0.75rem;
      font-size: 1.2rem;
    }

    .nav-item:hover {
      background-color: var(--light-gray);
    }

    .nav-item.active {
      background-color: #e6f7f5;
      color: var(--primary-color);
      border-left: 4px solid var(--primary-color);
      padding-left: calc(1.5rem - 4px);
    }

    .menu-toggle {
      padding: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .menu-toggle .menu-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      color: var(--text-color);
      cursor: pointer;
      font-size: 0.9rem;
    }

    .main-content {
      flex: 1;
      padding: 1.5rem;
      background-color: var(--light-gray);
      overflow-y: auto;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-header h1 {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
      margin-top: 0;
    }

    .page-header p {
      font-size: 1rem;
      color: #6c757d;
      margin: 0;
    }

    .settings-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    :host ::ng-deep .p-tabview {
      border: none;
    }

    :host ::ng-deep .p-tabview .p-tabview-nav {
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }

    :host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link {
      color: #495057;
      padding: 1rem 1.5rem;
      font-weight: 500;
      border: none;
      background-color: transparent;
    }

    :host ::ng-deep .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
      color: var(--primary-color);
      border-bottom: 2px solid var(--primary-color);
      background-color: white;
    }

    :host ::ng-deep .p-tabview .p-tabview-panels {
      background-color: white;
      border: none;
      padding: 0;
    }

    :host ::ng-deep .p-tabview .p-tabview-panel {
      padding: 1.5rem;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 70px;
      }
      
      .nav-item span,
      .nav-header,
      .menu-toggle span {
        display: none;
      }
      
      .nav-item {
        justify-content: center;
        padding: 0.75rem;
      }
      
      .nav-item i {
        margin-right: 0;
      }
      
      .nav-item.active {
        padding-left: calc(0.75rem - 4px);
      }
    }
    `,
  ],
})
export class PlatformSettingsComponent {}
