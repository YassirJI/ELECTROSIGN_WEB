import { Component, OnInit } from '@angular/core';

import { Dashboard } from './dashboard.js';
import { DashboardService } from './dashboard.service.js';


import { Dashlet } from './dashlet.js';
import { DashletService } from './dashlet.service.js';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    errorMessage: string;

    dashboards: Dashboard[];
    selectedDashlets: Dashlet[];
    selectedDashboard:Dashboard;

    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData:number[] = [350, 450, 100];
    public doughnutChartType:string = 'doughnut';
     
    constructor(private _dashboardService: DashboardService, private _dashletService: DashletService) {

    }

    ngOnInit(): void {
        this._dashboardService.getDashboards()
                .subscribe(dashboards => this.dashboards = dashboards,
                           error => this.errorMessage = <any>error);
               
        this.findDashlets(1);
        
    }

    onChangeDashboard(dashboard:Dashboard) {
        this.selectedDashboard = dashboard;
        this.findDashlets(dashboard.id);
  }

  findDashlets(dashboardId:number): void {
    this._dashletService.getDashlets(dashboardId)
                    .subscribe(dashlets => this.selectedDashlets = dashlets,
                            error => this.errorMessage = <any>error);
 }
}
