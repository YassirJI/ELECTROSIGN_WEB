import { Component } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/components/dashboard/dashboard2.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css']
})
export class DashboardComponent {
    servers:any[];
    users:any[];

}
