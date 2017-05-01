import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Dashlet } from './dashlet.js';
import { DashletCategory } from './dashletCategory.js';

@Injectable()
export class DashletService {
    private _dashletUrl = 'api/dashlets.json';
    private _dashletCategoriesUrl = 'api/dashlet_categories.json';

    constructor(private _http: Http) { }

    getDashlets(dashboardId: number): Observable<Dashlet[]> {
        return this._http.get(this._dashletUrl)
            .map((response: Response) => <Dashlet[]> response.json())
            .map((dashlets: Dashlet[]) => dashlets.filter(d => d.dashboardId === dashboardId))
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getDashletCategories(): Observable<DashletCategory[]> {
        return this._http.get(this._dashletCategoriesUrl)
            .map((response: Response) => <DashletCategory[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
