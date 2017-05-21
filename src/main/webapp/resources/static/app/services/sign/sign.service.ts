import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { SignDocument } from '../../model/sign/sign-document';

@Injectable()
export class SignService {
    private _signUrl = 'api/sign-documents.json';
    private sendPrepareSignDocumentsUrl = 'api/sendPrepareSignDocuments'; // URL to web api
  
    constructor(private _http: Http) { }

    getsignDocuments(): Observable<SignDocument[]> {
        return this._http.get(this._signUrl)
            .map((response: Response) => <SignDocument[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getsignDocument(id: number): Observable<SignDocument> {
        return this.getsignDocuments()
            .map((signDocuments: SignDocument[]) => signDocuments.find(d => d.id === id));
    }

    sendPrepareSignDocuments(signDocument: SignDocument): Observable<Object> {
        debugger;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.sendPrepareSignDocumentsUrl, JSON.stringify(signDocument), { headers: headers })
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
