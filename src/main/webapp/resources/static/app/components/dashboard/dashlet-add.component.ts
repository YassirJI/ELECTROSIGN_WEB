import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DashletCategory } from './dashletCategory.js';
import { DashletService } from './dashlet.service.js';
import { Dashboard } from './dashboard.js';
import { DashboardService } from './dashboard.service.js';

@Component({
    templateUrl: './app/components/dashboard/dashlet-add.component.html'
})
export class AddDashletComponent {
    
    errorMessage: string;
    categories: DashletCategory[];
    
    key:string;
	display:string;

	private sourceDashboards:Array<Dashboard>;
	private confirmedDashboards:Array<Dashboard>;

    constructor(private _router: Router, private _dashletService: DashletService, private _dashboardService: DashboardService) {
        
    }

    ngOnInit(): void {
        this._dashletService.getDashletCategories()
                .subscribe(categories => this.categories = categories,
                           error => this.errorMessage = <any>error);
        this.initDualLists();
    }

    initDualLists():void {
        this.key = 'id';
		this.display = 'name';

		this._dashboardService.getDashboards()
                .subscribe(dashboards => this.sourceDashboards = dashboards,
                           error => this.errorMessage = <any>error);
                           
        this.confirmedDashboards = new Array<Dashboard>();

	}

    public addNewDashlet(event:any): void {
        console.log("new dashlet function called");
    }
}
