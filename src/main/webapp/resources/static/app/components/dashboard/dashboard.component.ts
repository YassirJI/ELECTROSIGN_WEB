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
    public columnCounter : number = 0;
    errorMessage: string;

    dashboards: Dashboard[];
    selectedDashlets: Dashlet[];
    selectedDashboard:Dashboard;

    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData:number[] = [350, 450, 100];
    public doughnutChartType:string = 'doughnut';
     
    public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
    
    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];
    
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
