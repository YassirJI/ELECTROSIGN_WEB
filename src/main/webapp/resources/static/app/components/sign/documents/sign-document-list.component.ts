import { Component, OnInit }  from '@angular/core';

import { SignDocument } from '../../../model/sign/sign-document';
import { SignService } from '../../../services/sign/sign.service';

@Component({
    templateUrl: './sign-document-list.component.html'
})
export class SignDocumentsListComponent implements OnInit {
    listFilter: string;
    errorMessage: string;

    signDocuments: SignDocument[];

    constructor(private _signService: SignService) {

    }

    ngOnInit(): void {
        this._signService.getsignDocuments()
                .subscribe(signDocuments => this.signDocuments = signDocuments,
                           error => this.errorMessage = <any>error);
    }
}
