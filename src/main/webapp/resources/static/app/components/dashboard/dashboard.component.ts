import { Component, OnInit } from '@angular/core';

import { Dashboard } from './dashboard.js';
import { DashboardService } from './dashboard.service.js';


@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    errorMessage: string;

    selectedDashboard:Dashboard;
    dashboards: Dashboard[];

    constructor(private _dashboardService: DashboardService) {

    }

    ngOnInit(): void {
        this._dashboardService.getDashboards()
                .subscribe(dashboards => this.dashboards = dashboards,
                           error => this.errorMessage = <any>error);
        this._dashboardService.getDashboard(1).subscribe(
            dashboard => this.selectedDashboard = dashboard,
            error => this.errorMessage = <any>error);
    }
}
