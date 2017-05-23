import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';

import { PreparePackageFormDataService } from '../../../services/electrosign/preparePackageFormData.service';
import { SignService } from '../../../services/electrosign/sign.service';

import { Package } from '../../../model/electrosign/package';
import { Recipient } from '../../../model/electrosign/recipient';
import { Signer } from '../../../model/electrosign/signer';

@Component({
    selector: 'prepare-sign',
    templateUrl: './prepare-sign-marker.component.html'
})
export class PrepareSignMarkerComponent implements OnInit {
   
   markDocumentForm: FormGroup;
   recipients : Recipient;
   signers : Signer[];
   selectedSigner : Signer;

    submissionMessage: any;
    errorMessage: any;

   constructor(private router: Router, private fb: FormBuilder, private formDataService: PreparePackageFormDataService, private signService:SignService ) {
   }
    
    ngOnInit(): void {
       this.recipients =  this.formDataService.getPackage().recipients;
       this.signers =  this.formDataService.getPackage().recipients.signers;
       this.selectedSigner = this.signers[0];

       if (this.recipients == null || this.recipients.signers == null || this.recipients.signers.length == 0) {
           this.router.navigate(['/prepare']);
        }
    }

    onChangeSigner(signer:Signer) {
        this.selectedSigner = signer;
    }

    private onSubmit({ value, valid }: { value: Package, valid: boolean }) {
        this.signService.sendPreparedPackage(this.formDataService.getPackage())
            .subscribe(
            message => console.log(this.submissionMessage = message),
            error => this.errorMessage = error);
    }
}
