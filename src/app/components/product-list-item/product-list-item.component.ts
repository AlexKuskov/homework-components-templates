import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent {

  @Input() isFavorite: boolean = false;
  @Input() product: Product;

  @Output() removeFavoriteProduct = new EventEmitter<Product>();
  @Output() addFavoriteProduct = new EventEmitter<Product>();


  public addFavorite(product: Product) {
    this.addFavoriteProduct.emit(product);
  }

  public removeFavorite(product: Product) {
    this.removeFavoriteProduct.emit(product);
  }

}
