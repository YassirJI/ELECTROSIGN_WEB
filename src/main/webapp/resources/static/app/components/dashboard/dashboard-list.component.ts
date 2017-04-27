import { Component, OnInit }  from '@angular/core';

import { Dashboard } from './dashboard.js';
import { DashboardService } from './dashboard.service.js';

@Component({
    templateUrl: './app/components/dashboard/dashboard-list.component.html'
})
export class DashboardListComponent implements OnInit {
    listFilter: string;
    errorMessage: string;

    dashboards: Dashboard[];

    constructor(private _dashboardService: DashboardService) {

    }

    ngOnInit(): void {
        this._dashboardService.getDashboards()
                .subscribe(dashboards => this.dashboards = dashboards,
                           error => this.errorMessage = <any>error);
    }
}
