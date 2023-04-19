import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { Category } from 'src/core/interface/category';
import { Product } from 'src/core/interface/product';
import { CategoryService } from 'src/core/_service/category.service';
import { ProductService } from 'src/core/_service/product.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  openProductsModal = false;
  newProducts: Product[] = [];
  newProducts2: Product[] = [];
  products: Product[];
  searchTerm: string;
  category: Category[];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

   }

  openProductsModalFn() {
    this.openProductsModal = !this.openProductsModal;
 
    if(this.openProductsModal) {
      this.getListOfProducts();
    }
  }


  getListOfProducts() {
    if(!this.products) {
      this.productService.getAllProducts()
      .subscribe(
        res => {
          this.products = res;
          this.sortList(this.products);
        }
      )
    }
  }

  sortList(products) {
    products.sort((a,b) => {
        if (a.categoryId.name === b.categoryId.name){
          console.log('1')
          return a.name < b.name ? -1 : 1
        } else {
          console.log('2')
          return a.categoryId.name < b.categoryId.name ? -1 : 1
        }
    });
  }

}
