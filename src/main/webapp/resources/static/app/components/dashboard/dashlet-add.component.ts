import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DashletCategory } from './dashletCategory.js';
import { DashletService } from './dashlet.service.js';

@Component({
    templateUrl: './app/components/dashboard/dashlet-add.component.html'
})
export class AddDashletComponent {
    
    errorMessage: string;
    categories: DashletCategory[];
    
    
    constructor(private _router: Router, private _dashletService: DashletService) {

    }

    ngOnInit(): void {
        this._dashletService.getDashletCategories()
                .subscribe(categories => this.categories = categories,
                           error => this.errorMessage = <any>error);
        
    }
}
