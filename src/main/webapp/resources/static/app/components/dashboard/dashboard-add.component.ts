import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Dashboard } from './dashboard.js';
import { DashboardService } from './dashboard.service.js';

@Component({
    templateUrl: './app/components/dashboard/dashboard-add.component.html'
})
export class AddDashboardComponent {
    errorMessage: string;

    
    constructor(private _router: Router, private _dashboardService: DashboardService) {

    }

    onsubmit(): void { 
        this._router.navigate(['/dashboards']);
    }

    onBack(): void {
        this._router.navigate(['/dashboards']);
    }
}
