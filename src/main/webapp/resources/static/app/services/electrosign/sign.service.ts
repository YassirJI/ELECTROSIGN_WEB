import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Package } from '../../model/electrosign/package';

@Injectable()
export class SignService {
    private _signUrl = 'api/packages.json';
    private sendPreparedPackageUrl = 'api/sendPreparedPackage'; // URL to web api
  
    constructor(private _http: Http) { }

    getPackages(): Observable<Package[]> {
        return this._http.get(this._signUrl)
            .map((response: Response) => <Package[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPackage(packageId: number): Observable<Package> {
        return this.getPackages()
            .map((packages: Package[]) => packages.find(d => d.guid === packageId));
    }

    sendPreparedPackage(packageSign: Package): Observable<Object> {
        debugger;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.sendPreparedPackageUrl, JSON.stringify(packageSign), { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        let body = res.json();
        return body.message || {};
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
