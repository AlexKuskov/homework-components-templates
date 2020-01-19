import { Component, OnInit } from '@angular/core';
import products from '../../constants/products';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss']
})
export class ProductsMainComponent implements OnInit {

  private products: Product[] = products;
  private filteredProducts: Product[] = products;
  private favorites: Product[] = [];

  private searchValue: string;
  private isDescendant: boolean = true;

  ngOnInit() {
    this.setListOrder(this.isDescendant);
  }

  private search(searchValue: string) {
    this.searchValue = searchValue;

    this.filterProductList();
  }

  private updateFavoritesList(favorites: Product[]) {
    this.favorites = favorites;

    this.filterProductList();
    this.setListOrder(this.isDescendant);
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

  private setListOrder(isDescendant: boolean) {
    this.isDescendant = isDescendant;

    this.filteredProducts = this.filteredProducts.sort((firstProduct: Product, secondProduct: Product) => {
      return isDescendant ?
        secondProduct.Rating - firstProduct.Rating :
        firstProduct.Rating - secondProduct.Rating;
    });
  }

}
