import { Component, Input, OnInit } from '@angular/core';
import products from '../../constants/products';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private products: Product[] = products;
  public filteredProducts: Product[] = products;
  public favorites: Product[] = [];

  private searchValue: string;
  private _listOrder: boolean = true;

  ngOnInit() {
    this.orderList();
  }

  private orderList() {
    this.filteredProducts = this.filteredProducts.sort((firstProduct: Product, secondProduct: Product) => {
      return this._listOrder ?
        secondProduct.Rating - firstProduct.Rating :
        firstProduct.Rating - secondProduct.Rating;
    });
  }

  public search(searchValue: string) {
    this.searchValue = searchValue;
    this.filterProductList();
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

  public addFavoriteAndRefreshList(favoriteProduct: Product) {
    this.favorites.push(favoriteProduct);

    this.refreshProductList();
  }

  public removeFavoriteAndRefreshList(favoriteProduct: Product) {
    this.favorites.splice(this.favorites.indexOf(favoriteProduct), 1);

    this.refreshProductList();
  }

  private refreshProductList() {
    this.filterProductList();
    this.orderList();
  }

  @Input()
  set listOrder(isProductListDescendant: boolean) {
    this._listOrder = isProductListDescendant;
    this.orderList();
  }

}
