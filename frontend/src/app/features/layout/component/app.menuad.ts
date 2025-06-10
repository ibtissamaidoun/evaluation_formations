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
                label: 'Home',
                items: [{ label: 'DashboardAdmin', icon: 'pi pi-fw pi-home', routerLink: ['/dashboardAdmin'] }]
            },
            {
                label: 'Reports',
                items: [
                    { label: 'Evaluation Reports', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/EvaluationReports'] },
                    { label: 'Student Reports', icon: 'pi pi-fw pi-users', routerLink: ['/admin/reports/students'] },
                    { label: 'Teacher Reports', icon: 'pi pi-fw pi-user', routerLink: ['/admin/reports/teachers'] }
                ]
            },
            {
                label: 'Form Management',
                items: [
                    { label: 'Create Form', icon: 'pi pi-fw pi-plus', routerLink: ['/admin/forms/create'] },
                    { label: 'Manage Forms', icon: 'pi pi-fw pi-list', routerLink: ['/admin/forms/manage'] },
                    { label: 'Form Templates', icon: 'pi pi-fw pi-file', routerLink: ['/admin/forms/templates'] }
                ]
            },
            {
                label: 'User Management',
                items: [
                    { label: 'Students', icon: 'pi pi-fw pi-users', routerLink: ['/admin/users/students'] },
                    { label: 'Teachers', icon: 'pi pi-fw pi-user', routerLink: ['/admin/users/teachers'] },
                    { label: 'Administrators', icon: 'pi pi-fw pi-shield', routerLink: ['/admin/users/admins'] }
                ]
            },
            {
                label: 'Settings',
                items: [
                    { label: 'General Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/admin/settings/general'] },
                    { label: 'Email Settings', icon: 'pi pi-fw pi-envelope', routerLink: ['/admin/settings/email'] },
                    { label: 'Security Settings', icon: 'pi pi-fw pi-lock', routerLink: ['/admin/settings/security'] }
                ]
            }
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     routerLink: ['/pages'],
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/pages/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         }
            //     ]
            // }
        ];
    }
}
