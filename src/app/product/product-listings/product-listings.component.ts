import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../../products';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss'],
})
export class ProductListComponent {
  products: any;

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.products = products;
  }
}
