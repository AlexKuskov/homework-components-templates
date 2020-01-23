import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import products from '../../constants/products';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Output() updateFavorites = new EventEmitter<Product[]>();

  private products: Product[] = products;
  public filteredProducts: Product[] = products;
  public favorites: Product[] = [];

  private searchValue: string;
  public isDescendant: boolean = true;

  ngOnInit() {
    this.orderList();
  }

  public orderList() {
    this.filteredProducts = this.filteredProducts.sort((firstProduct: Product, secondProduct: Product) => {
      return this.isDescendant ?
        secondProduct.Rating - firstProduct.Rating :
        firstProduct.Rating - secondProduct.Rating;
    });
  }

  public search(searchValue: string) {
    this.searchValue = searchValue;
    this.filterProductList();
  }

  public updateFavoritesAndProducts(favorites: Product[]) {
    this.favorites = favorites;

    this.filterProductList();
    this.orderList();
  }

  private filterProductList() {
    this.filteredProducts = this.products.filter(product => {
      const isFavorite = this.favorites.includes(product);

      if (this.searchValue) {
        return product.Title.toLowerCase().match(this.searchValue.toLowerCase()) && !isFavorite;
      }

      return !isFavorite;
    });
  }
}
