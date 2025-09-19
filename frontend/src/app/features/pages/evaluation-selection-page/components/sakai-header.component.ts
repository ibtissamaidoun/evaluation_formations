import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-sakai-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  
      <div class="header-right">
        <button class="icon-button">
          <i class="pi pi-search"></i>
        </button>
        <button class="icon-button">
          <i class="pi pi-cog"></i>
        </button>
        <button class="icon-button">
          <i class="pi pi-bell"></i>
        </button>
        <button class="icon-button">
          <i class="pi pi-user"></i>
        </button>
      </div>

  `,
  styles: [
    `
    
    .header-left {
      display: flex;
      align-items: center;
    }

    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .logo-image {
      height: 30px;
      margin-right: 0.5rem;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 600;
      color: #00695c;
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
      color: #333;
      transition: background-color 0.2s;
    }

    .icon-button:hover {
      background-color: #f8f9fa;
    }
    `,
  ],
})
export class SakaiHeaderComponent {}
