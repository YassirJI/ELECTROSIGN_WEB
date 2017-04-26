import { Component } from '@angular/core';

import { Dashboard } from './dashboard.js';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css']
})
export class DashboardComponent {
    servers:any[];
    users:any[];

  selectedDashboard:Dashboard = new Dashboard(2, 'Home Dash');
  dashboards = [
     new Dashboard(1, 'Yassir' ),
     new Dashboard(2, 'Home Dash' ),
     new Dashboard(3, 'Australia' ),
     new Dashboard(4, 'Brazil')
  ];

}
