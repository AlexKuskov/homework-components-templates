import { Component, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import products from '../../constants/products';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss']
})
export class ProductsMainComponent {

  @ViewChild(ProductListComponent, { static: false })
  productListComponent: ProductListComponent;

  public search(searchValue: string) {
    this.productListComponent.search(searchValue);
  }

  public setListOrder(isDescendant: boolean) {
    this.productListComponent.isDescendant = isDescendant;
    this.productListComponent.orderList();
  }

}
