import { Component, Input, OnInit }   from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SignDocument } from '../../../../model/sign/sign-document';
import { PrepareFormDataService }     from '../data/prepareFormData.service';

@Component ({
    selector:     'prepare-email-form',
    templateUrl: './email-form.component.html'
})

export class PrepareEmailFormComponent implements OnInit {

    @Input('group')
    public emailForm: FormGroup;

    title = 'Please tell us about yourself.';
    emailSubject: string;
    emailContent: string;
    form: any;
    
    constructor(private formDataService: PrepareFormDataService) {
    }

    ngOnInit() {
        this.emailSubject = this.formDataService.getEmailSubject();
        this.emailContent = this.formDataService.getEmailContent();
        console.log('Personal feature loaded!');
    }

    save(form: any) {
        if (!form.valid) 
            return;
        
        this.formDataService.setEmailSubject(this.emailSubject);
        this.formDataService.setEmailContent(this.emailContent);
    }
}
