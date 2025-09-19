import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

import { SakaiHeaderComponent } from "./components/sakai-header.component"
import { SakaiSidebarComponent } from "./components/sakai-sidebar.component"
import { EvaluationSelectionComponent } from "./components/evaluation-selection.component"

@Component({
  selector: "app-evaluation-selection-page",
  standalone: true,
  imports: [CommonModule, RouterModule, SakaiHeaderComponent, SakaiSidebarComponent, EvaluationSelectionComponent],
  template: `
  
        
        <main class="main-content">
          <app-evaluation-selection></app-evaluation-selection>
        </main>
    
    
  `,
  styles: [
    `
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: #f8f9fa;
    }

    .content-container {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }
    `,
  ],
})
export class EvaluationSelectionPageComponent {}
