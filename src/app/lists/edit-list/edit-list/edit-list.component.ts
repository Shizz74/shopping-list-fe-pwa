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
    this.categoryService.getAllCategories().subscribe(
      res => {
        this.category = res
        console.log(this.category)
      }
    )
    this.getListOfProducts();
    // this.newSort();

  }

  openProductsModalFn() {
    this.openProductsModal = !this.openProductsModal;

    if(this.openProductsModal) {
      this.getListOfProducts();
      this.sortList(this.products);
    }
  }


  getListOfProducts() {
    if(!this.products) {
      this.productService.getAllProducts()
      .subscribe(
        res => {
          this.products = res;
        }, err => {
          console.log(err);
        }, () => {
          this.newSort();
        }
      )
    }
  }

  sortList(products) {
    products.sort((a,b) => {
        return a.name < b.name ? -1 : 1
    });
  }

  newSort() {
    this.category.forEach(e => {
      this.products.sort((a,b) => {
        return a.name < b.name ? -1 : 1
      });
      this.newProducts = this.products.filter(item => item.categoryId.name === e.name)
      // this.newProducts = this.products.filter(item => item.categoryId.name === e.name)
      // this.newProducts2.push(this.newProducts);
      merge(this.newProducts, this.newProducts2).subscribe();
      console.log(this.newProducts);
    })
    
  }

}
