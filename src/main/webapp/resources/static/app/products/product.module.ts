import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { ProductListComponent } from './product-list.component.js';
import { ProductDetailComponent } from './product-detail.component.js';
import { ProductDetailGuard } from './product-guard.service.js';

import { ProductFilterPipe } from './product-filter.pipe.js';
import { ProductService } from './product.service.js';

import { SharedModule } from '../shared/shared.module.js';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id',
        canActivate: [ ProductDetailGuard],
        component: ProductDetailComponent
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService,
    ProductDetailGuard
  ]
})
export class ProductModule {}
