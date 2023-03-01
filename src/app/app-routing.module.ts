import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { NewsComponent } from './pages/news/news.component';
import { OffertaComponent } from './pages/offerta/offerta.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount',
    loadChildren: () => import('./pages/discount/discount.module').then(m => m.DiscountModule)
  },
  { path: 'product/:category', component: ProductComponent },
  {
    path: 'product/:category/:id', component: ProductInfoComponent,
    resolve: {
      productInfo: ProductInfoResolver
    }
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  { path: 'news', component: NewsComponent },
  { path: 'offerta', component: OffertaComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  { path: 'cabinet',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
          preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
