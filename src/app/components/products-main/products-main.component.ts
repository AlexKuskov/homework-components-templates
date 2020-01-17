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
  private combinedProducts: Product[] = products;
  private favorites: Product[] = [];

  private value: string;
  private isDescendant: boolean = true;

  constructor() { }

  ngOnInit() {
    this.setListDescendant(this.isDescendant);
  }

  search(inputEl: HTMLInputElement) {
    this.value = inputEl.value;
    this.filteredProducts = this.products.filter(product => {
      return product.Title.toLowerCase().match(this.value.toLowerCase()) && !this.favorites.includes(product);
    });

    this.combineProductLists();
  }

  updateFavoritesList(favorites: Product[]) {
    this.favorites = favorites;

    if (this.value) {
      this.filteredProducts = this.products.filter(product => {
        return product.Title.toLowerCase().match(this.value.toLowerCase()) && !this.favorites.includes(product);
      });
    } else {
      this.filteredProducts = this.products.filter(product => {
        return !this.favorites.includes(product);
      });
    }
    this.setListDescendant(this.isDescendant);

    this.combineProductLists();
  }

  combineProductLists() {
    this.combinedProducts = [];
    this.combinedProducts.push(...this.favorites, ...this.filteredProducts);
  }

  setListDescendant(isDescendant: boolean) {
    this.isDescendant = isDescendant;
    this.filteredProducts = this.filteredProducts.sort((firstProduct: Product, secondProduct: Product) => {
      return isDescendant ?
        secondProduct.Rating - firstProduct.Rating :
        firstProduct.Rating - secondProduct.Rating;
    });

    this.combineProductLists();
  }

}
