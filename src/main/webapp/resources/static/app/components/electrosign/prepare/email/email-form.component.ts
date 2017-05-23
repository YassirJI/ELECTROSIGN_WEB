import { Component, Input, OnInit }   from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Package } from '../../../../model/electrosign/package';
import { PreparePackageFormDataService }     from '../../../../services/electrosign/preparePackageFormData.service';

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
