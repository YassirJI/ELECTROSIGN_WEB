import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

import { SharedModule} from "../shared/shared.module";
import { PrepareModule} from "./prepare/prepare.module";


import { PackageListComponent } from './package/package-list.component';
import { PackageFilterPipe } from '../../services/electrosign/package-filter.pipe';
import { SignService } from '../../services/electrosign/sign.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PrepareModule,
    RouterModule.forChild([
      { path: 'documents', component: PackageListComponent },
      { path: '', redirectTo: 'documents', pathMatch: 'full' },
      { path: '**', redirectTo: 'documents', pathMatch: 'full' }
    ])
  ],
  declarations: [
    PackageListComponent,
    PackageFilterPipe
  ],
  providers: [
    SignService
  ]
})
export class SignModule {}
