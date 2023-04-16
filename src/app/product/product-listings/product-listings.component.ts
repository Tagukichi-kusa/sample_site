import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { products } from '../../products';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss'],
})
export class ProductListComponent {
  products: any;

  constructor(private productService: ProductService) {}
  //constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    //this.products = productsと同じだがサービス層経由にしている↓
    // this.products = this.productService.getProducts(); //Service層から商品情報を取得する
    const productsObservable = this.productService.getProducts(); //ObservableでService層から商品情報を取得する

    productsObservable.subscribe(
      (data: any) => {
        this.products = data;
      },
      (err: any) => {
        console.error('次のエラーが発生しています: ' + err);
      },
      () => {
        console.log('Observableが完了しました！');
      }
    );

    //サンプルのサブスクライブ
    // const observable = new Observable((subscriber) => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.complete();
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.complete();
    //   }, 1000);
    // });

    // console.log('just before subscribe');
    // observable.subscribe({
    //   next(data) {
    //     console.log('次のデータが出力されました ' + data);
    //   },
    //   error(err) {
    //     console.error('次のエラーが発生しています: ' + err);
    //   },
    //   complete() {
    //     console.log('Observable完了です');
    //   },
    // });
    // console.log('subscribeから抜けます');
  }
}
