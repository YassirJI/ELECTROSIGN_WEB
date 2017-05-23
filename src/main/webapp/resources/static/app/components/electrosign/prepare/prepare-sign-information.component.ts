import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PreparePackageFormDataService } from '../../../services/electrosign/preparePackageFormData.service';

import { Package } from '../../../model/electrosign/package';

@Component({
    selector: 'prepare-sign',
    templateUrl: './prepare-sign-information.component.html'
})
export class PrepareSignInformationComponent implements OnInit {

    private packageForm: FormGroup;
    
    constructor(private fb: FormBuilder, private formDataService: PreparePackageFormDataService) { }

    ngOnInit() {
        
        this.packageForm = this.fb.group({
            emailForm: new FormGroup({
                emailSubject: new FormControl(this.formDataService.getPackage().emailSubject, Validators.required),
                emailContent: new FormControl(this.formDataService.getPackage().emailContent, Validators.required)
            })
            , recipientForm: this.fb.group({
                 recipients: this.fb.array(this.initRecipientsForm())
              })
        });
    }


    initRecipientsForm() {
        var recipientsData:any[] = [];
        if(!this.formDataService.getPackage().recipients || this.formDataService.getPackage().recipients.signers.length == 0) {
             recipientsData.push(
                this.fb.group({
                          name: new FormControl('', Validators.required),
                          email: new FormControl('', Validators.required)
                      })
            )
        } else {
            this.formDataService.getPackage().recipients.signers.forEach(recipient => {
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
