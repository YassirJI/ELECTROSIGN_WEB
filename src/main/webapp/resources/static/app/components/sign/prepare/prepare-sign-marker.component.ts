import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SignDocument } from '../../../model/sign/sign-document';

@Component({
    selector: 'prepare-sign',
    templateUrl: './prepare-sign-marker.component.html'
})
export class PrepareSignMarkerComponent implements OnInit {
   
   markDocumentForm: FormGroup;
    
   constructor(private fb: FormBuilder) {}
    
   ngOnInit(): void {
   }

       onSubmit({ value, valid }: { value: SignDocument, valid: boolean }) {

        console.log(value, valid);
    }
}
