import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PrepareFormDataService } from './data/prepareFormData.service';

import { SignDocument } from '../../../model/sign/sign-document';

@Component({
    selector: 'prepare-sign',
    templateUrl: './prepare-sign-information.component.html'
})
export class PrepareSignInformationComponent implements OnInit {

    private signDocumentForm: FormGroup;
    
    constructor(private fb: FormBuilder, private formDataService: PrepareFormDataService) { }

    ngOnInit() {
        
        this.signDocumentForm = this.fb.group({
            emailForm: new FormGroup({
                emailSubject: new FormControl(this.formDataService.getSignDocument().emailSubject, Validators.required),
                emailContent: new FormControl(this.formDataService.getSignDocument().emailContent, Validators.required)
            })
            , recipientForm: this.fb.group({
                 recipients: this.fb.array(this.initRecipientsForm())
              })
        });
    }


    initRecipientsForm() {
        var recipientsData:any[] = [];
        if(this.formDataService.getSignDocument().recipients.length == 0) {
             recipientsData.push(
                this.fb.group({
                          name: new FormControl('', Validators.required),
                          email: new FormControl('', Validators.required)
                      })
            )
        } else {
            this.formDataService.getSignDocument().recipients.forEach(recipient => {
                recipientsData.push(
                    this.fb.group({
                            name: new FormControl(recipient.name, Validators.required),
                            email: new FormControl(recipient.email, Validators.required)
                        })
                )
            });
        }
        return recipientsData;
    }

    onSubmit({ value, valid }: { value: any, valid: boolean }) {
        if (!valid)
            return;

        this.formDataService.setEmailData(value.emailForm);
        this.formDataService.setRecipientsData(value.recipientForm.recipients);
        console.log(value, valid);
    }


}
