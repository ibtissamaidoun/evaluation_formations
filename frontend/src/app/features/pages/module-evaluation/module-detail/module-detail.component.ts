// src/app/pages/module-evaluation/module-detail/module-detail.component.ts
import { RouterModule } from '@angular/router';
import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute } from "@angular/router"
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: "app-module-detail",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, RippleModule],
  template: `
    <div class="module-detail-container">
      <h1 class="page-title">{{ getTitle() }}</h1>
      
      <div class="module-content">
        <p>Contenu pour {{ moduleType }}</p>
        
        <!-- Ici vous pouvez ajouter le contenu spécifique pour chaque type de module -->
        <div *ngIf="moduleType === 'cours'" class="cours-content">
          <h2>Liste des cours</h2>
          <ul>
            <li>Introduction à l'informatique</li>
            <li>Programmation orientée objet</li>
            <li>Bases de données</li>
            <li>Développement web</li>
          </ul>
        </div>
        
        <div *ngIf="moduleType === 'td'" class="td-content">
          <h2>Travaux dirigés</h2>
          <ul>
            <li>TD 1: Algorithmes de base</li>
            <li>TD 2: Structures de données</li>
            <li>TD 3: Requêtes SQL</li>
            <li>TD 4: Interfaces utilisateur</li>
          </ul>
        </div>
        
        <div *ngIf="moduleType === 'tp'" class="tp-content">
          <h2>Travaux pratiques</h2>
          <ul>
            <li>TP 1: Implémentation d'algorithmes</li>
            <li>TP 2: Création d'une application</li>
            <li>TP 3: Conception d'une base de données</li>
            <li>TP 4: Développement d'un site web</li>
          </ul>
        </div>
        
        <div *ngIf="moduleType === 'cc'" class="cc-content">
          <h2>Contrôles continus</h2>
          <ul>
            <li>CC 1: 15 octobre 2023</li>
            <li>CC 2: 20 novembre 2023</li>
            <li>CC 3: 15 décembre 2023</li>
            <li>Examen final: 15 janvier 2024</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .module-detail-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: calc(100vh - 60px);
    }
    
    .page-title {
      font-size: 2.5rem;
      font-weight: 600;
      color: #ffb300;
      margin-bottom: 2rem;
    }
    
    .module-content {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 2rem;
    }
    
    h2 {
      font-size: 1.5rem;
      color: #00695c;
      margin-bottom: 1rem;
      margin-top: 1.5rem;
    }
    
    ul {
      list-style-type: none;
      padding-left: 0;
    }
    
    li {
      padding: 0.75rem 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    li:last-child {
      border-bottom: none;
    }
    `
  ]
})
export class ModuleDetailComponent implements OnInit {
  moduleType: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.moduleType = params['type'];
    });
  }

  getTitle(): string {
    switch (this.moduleType) {
      case "cours":
        return "Cours";
      case "td":
        return "Travaux Dirigés (TD)";
      case "tp":
        return "Travaux Pratiques (TP)";
      case "cc":
        return "Contrôles Continus (CC)";
      default:
        return "Module Detail";
    }
  }
}