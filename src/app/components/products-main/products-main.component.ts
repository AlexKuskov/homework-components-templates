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
  private favorites: Product[] = []; // products[0], products[1]

  private searchValue: string;
  private isDescendant: boolean = true;

  ngOnInit() {
    this.setListOrder(this.isDescendant);
  }

  search(searchValue: string) {
    this.searchValue = searchValue;

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
      const isFavorite = this.favorites.includes(product);

      if (this.searchValue) {
        return product.Title.toLowerCase().match(this.searchValue.toLowerCase()) && !isFavorite;
      }

      return !isFavorite;
    });
  }

  combineProductLists() {
    this.combinedProducts = [...this.favorites, ...this.filteredProducts];
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
