import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolver } from './product-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', pathMatch: 'full', component: ProductListComponent },
      {
        path: 'products/:id',
        resolve: { product: ProductResolver },
        component: ProductDetailComponent
      },
      {
        path: 'products/:id/edit',
        resolve: { product: ProductResolver },
        component: ProductEditComponent
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent
  ]
})
export class ProductModule {}
