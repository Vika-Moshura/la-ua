import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminNewsComponent,
    AdminOrderComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})

export class AdminModule { }
