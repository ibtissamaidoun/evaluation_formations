import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

interface MenuItem {
  label: string
  icon: string
  route: string
  active?: boolean
}

@Component({
  selector: "app-sakai-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sakai-sidebar">
      <div class="sidebar-header">
        <div class="nav-section-title">HOME</div>
      </div>
      
      <nav class="sidebar-nav">
        <a 
          *ngFor="let item of menuItems" 
          [routerLink]="item.route" 
          class="nav-item"
          [class.active]="item.active"
        >
          <i [class]="'pi ' + item.icon"></i>
          <span class="nav-label">{{ item.label }}</span>
        </a>
      </nav>
      
      <div class="sidebar-footer">
      
      </div>
    </aside>
  `,
  styles: [
    `
    .sakai-sidebar {
      width: 250px;
      background-color: white;
      border-right: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .sidebar-header {
      padding: 1rem 0;
    }

    .nav-section-title {
      padding: 0.5rem 1.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #666;
    }

    .sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1.5rem;
      color: #333;
      text-decoration: none;
      transition: background-color 0.2s;
    }

    .nav-item:hover {
      background-color: #f8f9fa;
    }

    .nav-item.active {
      background-color: #e6f7f5;
      color: #00695c;
      border-left: 4px solid #00695c;
      padding-left: calc(1.5rem - 4px);
    }

    .nav-item i {
      margin-right: 0.75rem;
      font-size: 1.2rem;
      width: 1.5rem;
      text-align: center;
    }

    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid #e0e0e0;
    }

    .logout-button {
      width: 100%;
      padding: 0.5rem;
      background-color: #ffc107;
      color: #333;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .logout-button:hover {
      background-color: #ffb300;
    }
    `,
  ],
})
export class SakaiSidebarComponent {
  @Input() activeRoute = "/dashboard"

  menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "pi-th-large",
      route: "/dashboard",
      active: true,
    },
    {
      label: "Evaluations",
      icon: "pi-file-edit",
      route: "/evaluations",
    },
    {
      label: "Reports",
      icon: "pi-chart-bar",
      route: "/reports",
    },
    {
      label: "Notifications",
      icon: "pi-bell",
      route: "/notifications",
    },
  ]

  logout() {
    console.log("Logging out...")
    // In a real app, you would implement actual logout logic here
  }
}
