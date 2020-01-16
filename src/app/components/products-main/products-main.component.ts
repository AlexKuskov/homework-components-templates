import { Component, OnInit } from '@angular/core';
import products from '../../constants/products';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss']
})
export class ProductsMainComponent implements OnInit {

  public products = products;

  public filteredProducts = products;

  constructor() { }

  ngOnInit() {
  }

  search(inputEl) {
    const value = inputEl.value;
    this.filteredProducts = this.products.filter(product => product.Title.toLowerCase().match(value.toLowerCase()));
  }

  setListDescendant(isDescendant: boolean) {
    this.filteredProducts = this.products.sort((firstProduct: Product, secondProduct: Product) => {
      return isDescendant ?
        secondProduct.Rating - firstProduct.Rating:
        firstProduct.Rating - secondProduct.Rating;
    });
  }

}
