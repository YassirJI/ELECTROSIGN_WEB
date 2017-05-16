import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { SignDocument } from '../../model/sign/sign-document';

@Injectable()
export class SignService {
    private _signUrl = 'api/sign-documents.json';

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

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
