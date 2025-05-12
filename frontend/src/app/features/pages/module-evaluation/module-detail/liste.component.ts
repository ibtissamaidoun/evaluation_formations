import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { TableModule } from "primeng/table"
import { ButtonModule } from "primeng/button"
import { RippleModule } from "primeng/ripple"

interface Student {
  id: number
  name: string
  cin: string
}

@Component({
  selector: "app-evaluations",
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, RippleModule],
  template: `
    <div class="evaluations-container">
      <h1 class="page-title">Choisir le prof</h1>
      
      <div class="card">
        <p-table [value]="students" styleClass="p-datatable-sm" [tableStyle]="{'min-width': '50rem'}">
          <ng-template pTemplate="header">
            <tr>
              <th>Nom</th>
              <th>CIN</th>
              <th>Évaluer</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-student>
            <tr>
              <td>{{ student.name }}</td>
              <td>{{ student.cin }}</td>
              <td>
                <button 
                  pButton 
                  pRipple 
                  label="Évaluer" 
                  class="p-button-success" 
                  (click)="evaluateStudent(student)"
                  routerLink="/module-evaluation"
                ></button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  styles: [
    `
    .evaluations-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: calc(100vh - 60px);
    }
    
    .page-title {
      font-size: 2.5rem;
      font-weight: 600;
      color:#2a9d8f;
      margin-bottom: 2rem;
    }
    
    .card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 0;
      overflow: hidden;
    }
    
    :host ::ng-deep .p-datatable .p-datatable-header {
      background-color: #2a9d8f;
      color: white;
      font-weight: 600;
      padding: 1rem;
    }
    
    :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
      background-color: #2a9d8f;
      color: white;
      font-weight: 600;
      padding: 1rem;
      text-align: left;
    }
    
    :host ::ng-deep .p-datatable .p-datatable-tbody > tr > td {
      padding: 1rem;
      border-bottom: 1px solid #f0f0f0;
    }
    
    :host ::ng-deep .p-button.p-button-success {
      background-color: #ffb300;
      border-color: #ffb300;
    }
    
    :host ::ng-deep .p-button.p-button-success:hover {
      background-color: #008f72;
      border-color: #008f72;
    }
    `,
  ],
})
export class ListeComponent implements OnInit {
  students: Student[] = []

  constructor() {}

  ngOnInit() {
    // Simuler le chargement des données depuis une API
    this.loadStudents()
  }

  loadStudents() {
    // Données fictives pour l'exemple
    this.students = [
      { id: 1, name: "Jean Dupont", cin: "012345678" },
      { id: 2, name: "Laura Nguyen", cin: "987654321" },
      { id: 3, name: "John Garnert", cin: "135792468" },
      { id: 4, name: "David Kim", cin: "234567890" },
    ]
  }

  evaluateStudent(student: Student) {
    console.log(`Évaluation de l'étudiant: ${student.name}`)
    // Naviguer vers la page d'évaluation de l'étudiant
    // this.router.navigate(['/student-evaluation', student.id]);
  }
}
