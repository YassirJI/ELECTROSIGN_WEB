import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'recipient-adder',
  templateUrl: './recipient-adder.component.html'
})
export class RecipientAdderComponent {

    @Input('group')
    public recipientForm: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {

    }

    initRecipient() {
        return this._fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required]
        });
    }

    addRecipient() {
        const control = <FormArray>this.recipientForm.controls['recipients'];
        control.push(this.initRecipient());
    }

    removeRecipient(i: number) {
        const control = <FormArray>this.recipientForm.controls['recipients'];
        control.removeAt(i);
    }
}
