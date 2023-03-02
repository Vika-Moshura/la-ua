import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductResponse } from '../../interfaces/product/product.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductResponse> {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  constructor(private productService: ProductService) { }
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductResponse> {
  //  return this.productService.getOne(Number(route.paramMap.get('id')))
  // }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProductResponse | Observable<IProductResponse> | Promise<IProductResponse> {
    const PRODUCT_ID = route.paramMap.get('id');
    return this.productService.getOneFirebase(PRODUCT_ID as string).pipe(
      map((data) => {
        return data as IProductResponse;
      })
    )
  }
}
