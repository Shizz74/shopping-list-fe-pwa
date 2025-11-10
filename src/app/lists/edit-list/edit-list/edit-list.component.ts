import { Component, OnInit } from '@angular/core';
import { Product } from 'src/core/interface/product';
import { ProductService } from 'src/core/_service/product.service';
import { ListsService } from 'src/core/_service/lists.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent implements OnInit {
  products: Product[];
  searchTerm: string;
  addModalOpen: boolean = false;
  listId: any;
  listOfProductsToBuy: Product[] = [];
  listOfProductsBought: Product[] = [];
  listOfProducts: Product[] = [];
  productsToDisplay: Product[] = [];

  constructor(
    private productService: ProductService,
    private listsService: ListsService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id');
    this.getAllData();
  }

  getAllData() {
    this.spinner.show('main');
    this.listsService.getSpecList(this.listId).subscribe((res) => {
      this.listOfProducts = res.products;
      this.updateListOfProductsToBuy(res.products);
      this.sortList(this.listOfProductsToBuy);
      this.sortList(this.listOfProductsBought);
      this.spinner.hide('main');
    });
    this.getListOfProducts();
  }

  openProductsModalFn() {
    this.addModalOpen = !this.addModalOpen;

    if (this.addModalOpen) {
      // Itemy znikaja po wybraniu ich na liscie produktow ale powrocie, a nie zapisaniu
      this.filterProductsList();
    } else {
      this.sortList(this.listOfProducts);
    }
  }

  saveList() {
    this.spinner.show('main');
    this.listsService
      .addProductToList(this.listId, this.listOfProducts)
      .subscribe((res) => {
        this.spinner.hide('main');
        console.log(res);
      });
    if (this.addModalOpen) {
      this.openProductsModalFn();
    } else {
    }
    this.updateListOfProductsToBuy(this.listOfProducts);
  }

  getListOfProducts() {
    this.spinner.show('add-spinner');
    if (!this.products) {
      this.productService.getAllProducts().subscribe((res) => {
        this.products = res;
        this.sortList(this.products);
        this.spinner.hide('add-spinner');
      });
    }
  }

  addToList(product: Product) {
    if (this.addModalOpen) {
      this.productsToDisplay[
        this.productsToDisplay.findIndex((e) => e._id === product._id)
      ].amountToBuy += product.amount;
    } else {
      this.listOfProducts[
        this.listOfProducts.findIndex((e) => e._id === product._id)
      ].amountToBuy += product.amount;
    }

    if (!this.listOfProducts.some((e) => e._id === product._id)) {
      this.listOfProducts.push(product);
    }
  }

  filterProductsList() {
    this.productsToDisplay = this.products.filter(
      (p) => !this.listOfProducts.find((e) => e._id === p._id)
    );
  }

  updateListOfProductsToBuy(products: Product[]) {
    this.listOfProductsToBuy = products.filter((p) => p.active === true);
    this.listOfProductsBought = products.filter((p) => p.active === false);
  }

  removeFromList(product: Product) {
    if (product.amountToBuy <= 0) return;

    if (this.addModalOpen) {
      this.productsToDisplay[
        this.productsToDisplay.findIndex((e) => e._id === product._id)
      ].amountToBuy -= product.amount;
    } else {
      this.listOfProducts[
        this.listOfProducts.findIndex((e) => e._id === product._id)
      ].amountToBuy -= product.amount;
    }

    if (product.amountToBuy < 1) {
      this.listOfProducts.splice(
        this.listOfProducts.findIndex((e) => e._id === product._id),
        1
      );
    }
  }

  alreadyBought(product: Product) {
    if (product.active === true) {
      this.listOfProducts[
        this.listOfProducts.findIndex((e) => e._id === product._id)
      ].active = false;
      this.listOfProductsToBuy.splice(
        this.listOfProductsToBuy.findIndex((e) => e._id === product._id),
        1
      );
      this.listOfProductsBought.push(product);
      this.sortList(this.listOfProductsBought);
    } else {
      this.listOfProducts[
        this.listOfProducts.findIndex((e) => e._id === product._id)
      ].active = true;
      this.listOfProductsBought.splice(
        this.listOfProductsBought.findIndex((e) => e._id === product._id),
        1
      );
      this.listOfProductsToBuy.push(product);
      this.sortList(this.listOfProductsToBuy);
    }
  }

  sortList(products) {
    products.sort((a, b) => {
      if (a.categoryId.name === b.categoryId.name) {
        return a.name < b.name ? -1 : 1;
      } else {
        return a.categoryId.name < b.categoryId.name ? -1 : 1;
      }
    });
  }
}
