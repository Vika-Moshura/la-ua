import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscount, IDiscountRequest, IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { collection, DocumentData, DocumentReference } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private url = environment.BACKEND_URL;
  private api = { discounts: `${this.url}/discounts` };
  private discountCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore,
  ) {
    this.discountCollection = collection(this.afs, 'discounts');
  }

  // getAll(): Observable<IDiscountResponse[]> {
  //   return this.http.get<IDiscountResponse[]>(this.api.discounts);
  // };

  // getOne(id: number): Observable<IDiscountResponse> {
  //   return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`);
  // };

  // create(discount: IDiscountRequest): Observable<IDiscountResponse> {
  //   return this.http.post<IDiscountResponse>(this.api.discounts, discount);
  // };

  // update(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
  //   return this.http.patch<IDiscountResponse>(`${this.api.discounts}/${id}`, discount);
  // };

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.discounts}/${id}`);
  // };

  // ________________________________________________________________________

  getAllFirebase() {
    return collectionData(this.discountCollection, { idField: 'id' });
  };

  getOneFirebase(id: string) {
    const discountDocReference = doc(this.afs, `discounts/${id}`);
    return docData(discountDocReference, { idField: 'id' })
  }


  createFirebase(discount: IDiscountRequest): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.discountCollection, discount);
  }

  updateFirebase(discount: IDiscountResponse, id: string) {
    const discountDocReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(discountDocReference, { ...discount });
  }

  deleteFirebase(id: string) {
    const discountDocReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(discountDocReference);
  }

}
