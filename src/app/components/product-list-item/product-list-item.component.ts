import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {

  @Input() products: Product[];
  @Input() favorites: Product[] = [];
  @Output() updateFavorites = new EventEmitter<Product[]>();

  private addFavoriteProduct(product: Product) {
    this.favorites.push(product);
    this.updateFavorites.emit(this.favorites);
  }

  private removeFavoriteProduct(product: Product) {
    this.favorites.splice(this.favorites.indexOf(product), 1);
    this.updateFavorites.emit(this.favorites);
  }

  private isFavorite(product: Product) {
    return this.favorites.includes(product);
  }

}
