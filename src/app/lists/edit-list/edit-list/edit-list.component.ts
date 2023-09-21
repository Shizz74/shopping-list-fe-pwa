import { Component, OnInit } from '@angular/core';
import { Category } from 'src/core/interface/category';
import { Product } from 'src/core/interface/product';
import { ProductService } from 'src/core/_service/product.service';
import { ListsService } from 'src/core/_service/lists.service';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  products: Product[];
  searchTerm: string;
  addModalOpen: boolean = false;
  listId: any;
  listOfProductsToBuy: Product[] = [];

  constructor(
    private productService: ProductService,
    private listsService: ListsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id');

    this.listsService.getSpecList(this.listId).subscribe(res => {
      this.listOfProductsToBuy = res.products;
      this.sortList(this.listOfProductsToBuy);
    })
    this.getListOfProducts();
  }

  openProductsModalFn() {
    this.addModalOpen = !this.addModalOpen;

    if(this.addModalOpen) {
      this.products.forEach((e, i) => {
        if(this.listOfProductsToBuy.some((product) => product._id === e._id)) {
          this.products.splice(i, 1);
        }
      });
    } else {
      this.sortList(this.listOfProductsToBuy);
    }
  }

  saveList() {
    this.listsService.addProductToList(this.listId, this.listOfProductsToBuy).subscribe(res => {console.log(res)});
    if(this.addModalOpen) {
      this.openProductsModalFn();
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

  addToList(product: Product) {
    if(this.addModalOpen) {
      this.products[this.products.findIndex(e => e._id === product._id)].amountToBuy += product.amount;
    } else {
      this.listOfProductsToBuy[this.listOfProductsToBuy.findIndex(e => e._id === product._id)].amountToBuy += product.amount;
    }
    
    if(!this.listOfProductsToBuy.some(e => e._id === product._id)) {
      this.listOfProductsToBuy.push(product);
    }    

  }

  removeFromList(product: Product) {
    if(product.amountToBuy < 0) return;

    if(this.addModalOpen) {
      this.products[this.products.findIndex(e => e._id === product._id)].amountToBuy -= product.amount;
    } else {
      this.listOfProductsToBuy[this.listOfProductsToBuy.findIndex(e => e._id === product._id)].amountToBuy -= product.amount;
    }    

    if(product.amountToBuy < 1) {
      this.listOfProductsToBuy.splice(this.listOfProductsToBuy.findIndex(e => e._id === product._id), 1);
    }
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
