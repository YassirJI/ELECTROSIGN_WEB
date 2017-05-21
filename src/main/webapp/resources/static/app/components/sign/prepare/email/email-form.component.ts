import { Component, Input, OnInit }   from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SignDocument } from '../../../../model/sign/sign-document';
import { PrepareFormDataService }     from '../data/prepareFormData.service';

@Component ({
    selector:     'prepare-email-form',
    templateUrl: './email-form.component.html'
})

export class PrepareEmailFormComponent implements OnInit {

    @Input('group')
    public emailForm: FormGroup;  

    ngOnInit() {
        
    }
}
