import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchfilterPipe } from '../shared/pipe/searchfilter.pipe';

import { ProductService } from 'src/core/_service/product.service';
import { Product } from '../../core/interface/product'

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, SearchfilterPipe],
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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
        this.cdr.markForCheck();
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
          this.cdr.markForCheck();
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
