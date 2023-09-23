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
  listOfProductsBought: Product[] = [];
  listOfProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private listsService: ListsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id');

    this.listsService.getSpecList(this.listId).subscribe(res => {
      this.listOfProducts = res.products;
      this.listOfProductsToBuy = res.products.filter(p => p.active === true);
      this.listOfProductsBought = res.products.filter(p => p.active === false);
      this.sortList(this.listOfProductsToBuy);
      this.sortList(this.listOfProductsBought);
    })
    this.getListOfProducts();
  }

  openProductsModalFn() {
    this.addModalOpen = !this.addModalOpen;

    if(this.addModalOpen) {
      this.products.forEach((e, i) => {
        if(this.listOfProducts.some((product) => product._id === e._id)) {
          this.products.splice(i, 1);
        }
      });
    } else {
      this.sortList(this.listOfProducts);
    }
  }

  saveList() {
    this.listsService.addProductToList(this.listId, this.listOfProducts).subscribe(res => {console.log(res)});
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
      this.listOfProducts[this.listOfProducts.findIndex(e => e._id === product._id)].amountToBuy += product.amount;
    }
    
    if(!this.listOfProducts.some(e => e._id === product._id)) {
      this.listOfProducts.push(product);
    }    

  }

  removeFromList(product: Product) {
    if(product.amountToBuy < 0) return;

    if(this.addModalOpen) {
      this.products[this.products.findIndex(e => e._id === product._id)].amountToBuy -= product.amount;
    } else {
      this.listOfProducts[this.listOfProducts.findIndex(e => e._id === product._id)].amountToBuy -= product.amount;
    }    

    if(product.amountToBuy < 1) {
      this.listOfProducts.splice(this.listOfProducts.findIndex(e => e._id === product._id), 1);
    }
  }

  alreadyBought(product: Product) {
    if(product.active === true) {
      this.listOfProducts[this.listOfProducts.findIndex(e => e._id === product._id)].active = false;
      this.listOfProductsToBuy.splice(this.listOfProductsToBuy.findIndex(e => e._id === product._id), 1);
      this.listOfProductsBought.push(product);
      this.sortList(this.listOfProductsBought);
    } else{
      this.listOfProducts[this.listOfProducts.findIndex(e => e._id === product._id)].active = true;
      this.listOfProductsBought.splice(this.listOfProductsBought.findIndex(e => e._id === product._id), 1);
      this.listOfProductsToBuy.push(product);
      this.sortList(this.listOfProductsToBuy);
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
