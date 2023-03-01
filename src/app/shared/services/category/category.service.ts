import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category/category.interface';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/categories` };
  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'categories')
  }

  // getAll(): Observable<ICategoryResponse[]> {
  //   return this.http.get<ICategoryResponse[]>(this.api.categories);
  // };

  // create(category: ICategoryRequest): Observable<ICategoryResponse> {
  //   return this.http.post<ICategoryResponse>(this.api.categories, category);
  // };

  // update(category: ICategoryRequest, id: number): Observable<ICategoryResponse> {
  //   return this.http.patch<ICategoryResponse>(`${this.api.categories}/${id}`, category);
  // };

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.categories}/${id}`);
  // };
  // _______________________________________________________________

  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }
  getOneFirebase(id:string) {
    const categoryDocReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocReference, {idField: 'id'})
  }

  createFirebase(category: ICategoryRequest):Promise<DocumentReference<DocumentData>> {
    return addDoc(this.categoryCollection, category);
  }

  updateFirebase(category: ICategoryRequest, id: string){
    const categoryDocReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocReference, {...category});
  }

  deleteFirebase(id: string){
    const categoryDocReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocReference);
  }
}
