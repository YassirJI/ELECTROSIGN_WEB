import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

import { SharedModule} from "../shared/shared.module";
import { PrepareModule} from "./prepare/prepare.module";
import { SigningModule } from "./signing/signing.module";


import { PackageListComponent } from './package/package-list.component';
import { PackageFilterPipe } from '../../services/electrosign/package-filter.pipe';
import { SignService } from '../../services/electrosign/sign.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PrepareModule,
    SigningModule,
    RouterModule.forChild([
      { path: 'packages', component: PackageListComponent },
      { path: '', redirectTo: 'packages', pathMatch: 'full' },
      { path: '**', redirectTo: 'packages', pathMatch: 'full' }
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
