import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu-admin',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenuAdmin {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                // label: 'Home',
                items: [{ label: 'DashboardAdmin', icon: 'pi pi-fw pi-home', routerLink: ['/admin/dashboard'] }]
            },
            {
                // label: 'Reports',
                items: [
                    { label: 'Evaluation Reports', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/admin/reports/evaluation'] }
                   
                ]
            },
            {
                // label: 'Form Management',
                items: [
                    { label: 'Form Management', icon: 'pi pi-fw pi-file', routerLink: ['/admin/forms/manage'] }
               
                ]
            },
            {
                // label: 'User Management',
                items: [
                  
                    { label: 'User Management', icon: 'pi pi-fw pi-shield', routerLink: ['/admin/users/manage'] }
                ]
            },
            {
                // label: 'Settings',
                items: [
               
                    { label: ' Settings', icon: 'pi pi-fw pi-lock', routerLink: ['/admin/setting'] }
                ]
            }
        ];
    }
}
