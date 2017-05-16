import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

import { SharedModule} from "../shared/shared.module";
import { PrepareModule} from "./prepare/prepare.module";


import { SignDocumentsListComponent } from './documents/sign-document-list.component';
import { DocumentFilterPipe } from '../../services/sign/document-filter.pipe';
import { SignService } from '../../services/sign/sign.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PrepareModule,
    RouterModule.forChild([
      { path: 'documents', component: SignDocumentsListComponent },
      { path: '', redirectTo: 'documents', pathMatch: 'full' },
      { path: '**', redirectTo: 'documents', pathMatch: 'full' }
    ])
  ],
  declarations: [
    SignDocumentsListComponent,
    DocumentFilterPipe
  ],
  providers: [
    SignService
  ]
})
export class SignModule {}
