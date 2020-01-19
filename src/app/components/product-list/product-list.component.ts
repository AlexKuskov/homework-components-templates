import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  @Input() products: Product[];
  @Output() updateFavorites = new EventEmitter<Product[]>();

  private favorites: Product[] = [];

  addFavoriteProduct(product: Product) {
    this.favorites.push(product);
    this.updateFavorites.emit(this.favorites);
  }

  removeFavoriteProduct(product: Product) {
    this.favorites.splice(this.favorites.indexOf(product), 1);
    this.updateFavorites.emit(this.favorites);
  }

  isFavorite(product: Product) {
    return !this.favorites.includes(product);
  }

}
