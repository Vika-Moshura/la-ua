import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { collection, DocumentData } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.productCollection = collection(this.afs, 'products');
  }
  // getAll(): Observable<IProductResponse[]> {
  //   return this.http.get<IProductResponse[]>(this.api.products);
  // };

  // getAllByCategory(name: string): Observable<IProductResponse[]> {
  //   return this.http.get<IProductResponse[]>(`${this.api.products}?category.path=${name}`);
  // }

  // getOne(id: number): Observable<IProductResponse> {
  //   return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  // };
  // create(product: IProductRequest): Observable<IProductResponse> {
  //   return this.http.post<IProductResponse>(this.api.products, product);
  // };

  // update(product: IProductRequest, id: number): Observable<IProductResponse> {
  //   return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product);
  // };

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.products}/${id}`);
  // };
  // ______________________________________________________________________

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' })
  }

  async getAllByCategoryFirebase(name: string) {
    const arr: DocumentData[] = [];
    const q = query(collection(this.afs, "products"), where("category.path", "==", name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    return arr;
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const productDocReference = doc(this.afs, `products/${id}`);
    return docData(productDocReference, { idField: 'id' })
  }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product)
  }

  updateFirebase(product: IProductRequest, id: string) {
    const categoryDocReference = doc(this.afs, `products/${id}`);
    return updateDoc(categoryDocReference, { ...product });
  }

  deleteFirebase(id: string) {
    const produtcDocReference = doc(this.afs, `products/${id}`);
    return deleteDoc(produtcDocReference);
  }
}
