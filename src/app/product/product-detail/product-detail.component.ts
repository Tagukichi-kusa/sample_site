import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../../products';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      // ① this.product = products[+params.get('productId')!];と同じだがサービス層経由にしている
      // ② this.product = this.productService.getProductById(params.get('productId')!
      const productObservable = this.productService.getProductById(
        params.get('productId')!
      );
      productObservable.subscribe(
        (data: any) => {
          this.product = data;
        },
        (err: any) => {}
      );
    });
  }
}
