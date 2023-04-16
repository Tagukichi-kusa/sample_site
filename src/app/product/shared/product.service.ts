import { Injectable } from '@angular/core';
import { products } from 'src/app/products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//＠Injectableは、サービスであることを定義している
@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  // getリクエストを送る関数①
  getProducts(): Observable<any> {
    //return products
    return this.http.get('/api/v1/products');
  }

  // getリクエストを送る関数②
  getProductById(productId: string): Observable<any> {
    // return products[productId];
    return this.http.get('/api/v1/products/' + productId);
  }
}
