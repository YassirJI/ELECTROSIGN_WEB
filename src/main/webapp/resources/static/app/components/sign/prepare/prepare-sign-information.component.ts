import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PrepareFormDataService } from './data/prepareFormData.service';

import { SignDocument } from '../../../model/sign/sign-document';

@Component({
    selector: 'prepare-sign',
    templateUrl: './prepare-sign-information.component.html'
})
export class PrepareSignInformationComponent implements OnInit {

    signDocumentForm: FormGroup;
    signDocument: SignDocument;

    constructor(private fb: FormBuilder, private formDataService: PrepareFormDataService) { }

    ngOnInit() {
        this.signDocument = this.formDataService.getSignDocument();

        this.signDocumentForm = this.fb.group({
            emailForm: this.fb.group({
                emailSubject: new FormControl('', Validators.required),
                emailContent: new FormControl('', Validators.required)
            })
            /**  , recipientForm: this.fb.group({
                 recipients: this.fb.array([
                      this.fb.group({
                          name: new FormControl('', Validators.required),
                          email: new FormControl('', Validators.required)
                      })
                  ])
              })*/
        });
    }


    onSubmit({ value, valid }: { value: SignDocument, valid: boolean }) {
        if (!valid)
            return;

        this.formDataService.setSignDocument(value);
        console.log(value, valid);
    }


}
