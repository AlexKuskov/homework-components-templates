import { Component, OnInit } from '@angular/core';
import products from '../../constants/products';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss']
})
export class ProductsMainComponent implements OnInit {

  public products: Product[] = products;
  public filteredProducts: Product[] = products;
  public combinedProducts: Product[] = products;
  private favorites: Product[] = [];

  private value: string;
  private isDescendant: boolean = true;

  ngOnInit() {
    this.setListOrder(this.isDescendant);
  }

  search(inputEl: HTMLInputElement) {
    this.value = inputEl.value;

    this.filterProductList();
    this.combineProductLists();
  }

  updateProductList(favorites: Product[]) {
    this.favorites = favorites;

    this.filterProductList();
    this.setListOrder(this.isDescendant);
    this.combineProductLists();
  }

  filterProductList() {
    this.filteredProducts = this.products.filter(product => {
      let isMatch = true;

      if (this.value) isMatch = !!product.Title.toLowerCase().match(this.value.toLowerCase());

      return isMatch && !this.favorites.includes(product);
    });
  }

  combineProductLists() {
    this.combinedProducts = [];
    this.combinedProducts.push(...this.favorites, ...this.filteredProducts);
  }

  setListOrder(isDescendant: boolean) {
    this.isDescendant = isDescendant;

    this.filteredProducts = this.filteredProducts.sort((firstProduct: Product, secondProduct: Product) => {
      return isDescendant ?
        secondProduct.Rating - firstProduct.Rating :
        firstProduct.Rating - secondProduct.Rating;
    });

    this.combineProductLists();
  }

}
