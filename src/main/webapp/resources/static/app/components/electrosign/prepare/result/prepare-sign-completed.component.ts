import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';

import { PreparePackageFormDataService } from '../../../../services/electrosign/preparePackageFormData.service';
import { SignService } from '../../../../services/electrosign/sign.service';
import { DocumentViewerComponent } from '.././viewer/document-viewer.component';

import { Package } from '../../../../model/electrosign/package';
import { Recipient } from '../../../../model/electrosign/recipient';
import { Signer } from '../../../../model/electrosign/signer';
import { Tabs } from '../../../../model/electrosign/tabs';

@Component({
    selector: 'sign-completed',
    templateUrl: './prepare-sign-completed.component.html'
})
export class PrepareSignCompletedComponent implements OnInit {
   
   activeStep = "completed";
    
   package:Package;

   submissionMessage: any;
   errorMessage: any;

   constructor(private router: Router, private fb: FormBuilder, private formDataService: PreparePackageFormDataService, private signService:SignService ) {
   }
    
    ngOnInit(): void {
       this.package =  this.formDataService.getPackage();
    }   
    
    clickDone():void {
        this.formDataService.resetPrepareFormData();
    }
}
