import { Component } from '@angular/core';
// import { NotificationsWidget } from './components/notificationswidget';
// import { StatsWidget } from './components/statswidget';
// import { RecentSalesWidget } from './components/recentsaleswidget';
// // import { BestSellingWidget } from './components/bestsellingwidget';
// import { RevenueStreamWidget } from './components/revenuestreamwidget';

@Component({
    selector: 'app-dashboard',
    // imports: [StatsWidget, RecentSalesWidget,  RevenueStreamWidget, NotificationsWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
           
            <div class="col-span-12 xl:col-span-6">
            
     
            </div>
            <div class="col-span-12 xl:col-span-6">
                
            </div>
        </div>
    `
})
export class Dashboard {}
