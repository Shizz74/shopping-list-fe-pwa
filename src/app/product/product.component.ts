import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

import { ProductService } from 'src/core/_service/product.service';
import { Product } from '../../core/interface/product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] | any;
  sortDirection = true;
  closeResult = '';
  productIdToRemove = '';
  productNameToRemove = '';
  deleteModal = false;
  searchTerm: string;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
      }
      )
    }

  sortList(products, sortDirection) {
    products.sort((a,b) => {
      if (sortDirection === true) {
        return a.name < b.name ? -1 : 1
      } else {
        return a.name < b.name ? 1 : -1
      }
    });
    this.sortDirection = !this.sortDirection;
    return products;
  }
    
  deleteProduct() {
    this.productService.deleteProduct(this.productIdToRemove).subscribe(
      res => {
        this.productService.getAllProducts().subscribe(res => {
          this.products = res;
          this.deleteModal = !this.deleteModal;
        })
      },
      error => {
        console.log("bład");
      }
    )
  }

  goToProductView(_id: string) {
    this.router.navigate(['/produkt-edycja', _id])
  }

  openDeleteModal(_id: string) {
    this.productIdToRemove = _id;
    this.productNameToRemove = this.products.find(list => list._id === _id).name;
    this.deleteModal = !this.deleteModal;
  }
}
