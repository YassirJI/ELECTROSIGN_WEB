import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Dashboard } from './dashboard.js';

@Injectable()
export class DashboardService {
    private _dashboardUrl = 'api/dashboards.json';

    constructor(private _http: Http) { }

    getDashboards(): Observable<Dashboard[]> {
        return this._http.get(this._dashboardUrl)
            .map((response: Response) => <Dashboard[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getDashboard(id: number): Observable<Dashboard> {
        return this.getDashboards()
            .map((dashboards: Dashboard[]) => dashboards.find(d => d.id === id));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
