import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { RouterModule}        from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { SharedModule} from "../../shared/shared.module";
import { DocumentSigningComponent } from './document-signing.component';

import { PreparePackageFormDataService }    from '../../../services/electrosign/preparePackageFormData.service'

@NgModule({
    imports:      [ BrowserModule, 
                    FormsModule,
                    ReactiveFormsModule,
                    SharedModule,
                    RouterModule.forChild([
                     { path: 'signing', component: DocumentSigningComponent }
                      ]) 
                  ],
    providers:    [
                    { provide: PreparePackageFormDataService, useClass: PreparePackageFormDataService }
                   ],
    declarations: [ 
                    DocumentSigningComponent ]
})

export class SigningModule {}
