import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';

import { PrepareFormDataService } from './data/prepareFormData.service';
import { SignService } from '../../../services/sign/sign.service';

import { SignDocument } from '../../../model/sign/sign-document';
import { Recipient } from '../../../model/sign/recipient';

@Component({
    selector: 'prepare-sign',
    templateUrl: './prepare-sign-marker.component.html'
})
export class PrepareSignMarkerComponent implements OnInit {
   
   markDocumentForm: FormGroup;
   recipients : Recipient[];
   selectedRecipient : Recipient;

    submissionMessage: any;
    errorMessage: any;

   constructor(private router: Router, private fb: FormBuilder, private formDataService: PrepareFormDataService, private signService:SignService ) {
   }
    
    ngOnInit(): void {
       this.recipients =  this.formDataService.getSignDocument().recipients;
       this.selectedRecipient = this.recipients[0];

       if (this.recipients == null || this.recipients.length == 0) {
           this.router.navigate(['/prepare']);
        }
    }

    onChangeRecipient(recipient:Recipient) {
        this.selectedRecipient = recipient;
    }

    private onSubmit({ value, valid }: { value: SignDocument, valid: boolean }) {
        this.signService.sendPrepareSignDocuments(this.formDataService.getSignDocument())
            .subscribe(
            message => console.log(this.submissionMessage = message),
            error => this.errorMessage = error);
    }
}
