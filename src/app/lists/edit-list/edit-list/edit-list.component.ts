import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { Category } from 'src/core/interface/category';
import { Product } from 'src/core/interface/product';
import { CategoryService } from 'src/core/_service/category.service';
import { ProductService } from 'src/core/_service/product.service';
import { ListsService } from 'src/core/_service/lists.service';
import { NavigationEnd, Router } from '@angular/router';

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
  addModalOpen: boolean = false;
  addedProduct: Product;
  listId: string;
  listOfProductsToBuy: Product[] = [];

  constructor(
    private productService: ProductService,
    private listsService: ListsService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.listId = event.url.split('/')[2];
      }
    })

    this.listsService.getSpecList('64136fb2c7a128fa741a85e4').subscribe(res => {
      this.listOfProductsToBuy = res.products;
      console.log(this.listOfProductsToBuy);
    })

  }

  openProductsModalFn() {
    this.addModalOpen = !this.addModalOpen;
 
    if(this.addModalOpen) {
      this.getListOfProducts();
    }
  }

  // openAddModal(product: Product) {
  //   this.addModalOpen = true;
  //   this.addedProduct = product;
  // }

  // closeAddModal() {
  //   this.addModalOpen = false;
  // }

  // addProductToList() {
  //   this.listsService.addProductToList(this.listId, this.addedProduct)
  //   .subscribe(
  //     res => {}
  //   )
  // }

  saveList() {
    this.listsService.addProductToList('64136fb2c7a128fa741a85e4', this.listOfProductsToBuy).subscribe(res => {console.log(res)});
    this.openProductsModalFn();
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

  addToList(product: Product) {
    this.products[this.products.findIndex(e => e._id === product._id)].amountToBuy += product.amount;
    
    if(!this.listOfProductsToBuy.some(e => e._id === product._id)) {
      this.listOfProductsToBuy.push(product);
    }    
  }

  removeFromList(product: Product) {
    if(product.amountToBuy < 0) return;

    this.products[this.products.findIndex(e => e._id === product._id)].amountToBuy -= product.amount;

    if(product.amountToBuy < 1) {
      this.listOfProductsToBuy.splice(this.listOfProductsToBuy.findIndex(e => e._id === product._id), 1);
    }

    console.log(this.listOfProductsToBuy);
  }


  sortList(products) {
    products.sort((a,b) => {
        if (a.categoryId.name === b.categoryId.name){
          return a.name < b.name ? -1 : 1
        } else {
          return a.categoryId.name < b.categoryId.name ? -1 : 1
        }
    });
  }

}
