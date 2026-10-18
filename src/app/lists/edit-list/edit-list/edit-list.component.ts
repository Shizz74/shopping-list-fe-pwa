import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SearchfilterPipe } from '../../../shared/pipe/searchfilter.pipe';
import { UnitShortPipe } from '../../../shared/pipe/unit-short.pipe';
import { TableHeaderComponent } from '../../../shared/table-header/table-header.component';
import { Product } from 'src/core/interface/product';
import { ProductService } from 'src/core/_service/product.service';
import { ListsService } from 'src/core/_service/lists.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    SearchfilterPipe,
    UnitShortPipe,
    TableHeaderComponent,
  ],
})
export class EditListComponent implements OnInit {
  products = signal<Product[] | null>(null);
  listOfProducts = signal<Product[]>([]);
  savedProductIds = signal<Set<string> | null>(null);
  listOfProductsToBuy = computed(() =>
    this.sortProducts(
      this.listOfProducts().filter((product) => product.active === true),
    ),
  );
  listOfProductsBought = computed(() =>
    this.sortProducts(
      this.listOfProducts().filter((product) => product.active === false),
    ),
  );
  productsToDisplay = computed(() => {
    const draftProducts = this.listOfProducts();
    const selectedProductIds = new Set(
      draftProducts.map((product) => product._id),
    );
    const savedProductIds = this.savedProductIds();
    if (!savedProductIds) return [];

    return this.sortProducts(
      (this.products() ?? [])
        .filter(
          (product) =>
            !savedProductIds.has(product._id) ||
            !selectedProductIds.has(product._id),
        )
        .map((product) => {
          const draftProduct = draftProducts.find(
            (item) => item._id === product._id,
          );
          return draftProduct
            ? { ...product, amountToBuy: draftProduct.amountToBuy }
            : product;
        }),
    );
  });
  searchTerm: string;
  addModalOpen: boolean = false;
  listId: any;

  constructor(
    private productService: ProductService,
    private listsService: ListsService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id');
    this.getAllData();
  }

  getAllData() {
    this.spinner.show('main');
    this.listsService.getSpecList(this.listId).subscribe((res) => {
      this.listOfProducts.set(
        this.sortProducts(
          res.products.filter((product) => product.amountToBuy > 0),
        ),
      );
      this.savedProductIds.set(
        new Set(
          res.products
            .filter((product) => product.amountToBuy > 0)
            .map((product) => product._id),
        ),
      );
      this.spinner.hide('main');
    });
    this.getListOfProducts();
  }

  openProductsModalFn() {
    this.addModalOpen = !this.addModalOpen;
  }

  saveList() {
    this.spinner.show('main');
    const productsToSave = this.listOfProducts();
    this.listsService
      .addProductToList(this.listId, productsToSave)
      .subscribe((res) => {
        this.savedProductIds.set(
          new Set(productsToSave.map((product) => product._id)),
        );
        this.spinner.hide('main');
        console.log(res);
      });
    if (this.addModalOpen) {
      this.openProductsModalFn();
    }
  }

  getListOfProducts() {
    this.spinner.show('add-spinner');
    if (!this.products()) {
      this.productService.getAllProducts().subscribe((res) => {
        this.products.set(this.sortProducts(res));
        this.spinner.hide('add-spinner');
      });
    }
  }

  addToList(product: Product) {
    this.listOfProducts.update((products) => {
      const existingProduct = products.find((item) => item._id === product._id);
      if (existingProduct) {
        return products.map((item) =>
          item._id === product._id
            ? { ...item, amountToBuy: item.amountToBuy + product.amount }
            : item,
        );
      }

      return this.sortProducts([
        ...products,
        { ...product, amountToBuy: product.amount, active: true },
      ]);
    });
  }

  removeFromList(product: Product) {
    this.listOfProducts.update((products) => {
      const existingProduct = products.find((item) => item._id === product._id);
      if (!existingProduct) return products;

      const remainingAmount = existingProduct.amountToBuy - product.amount;
      if (remainingAmount <= 0) {
        this.savedProductIds.update((productIds) => {
          if (!productIds) return productIds;
          const updatedProductIds = new Set(productIds);
          updatedProductIds.delete(product._id);
          return updatedProductIds;
        });
        return products.filter((item) => item._id !== product._id);
      }

      return products.map((item) =>
        item._id === product._id
          ? { ...item, amountToBuy: remainingAmount }
          : item,
      );
    });
  }

  alreadyBought(product: Product) {
    this.listOfProducts.update((products) =>
      products.map((item) =>
        item._id === product._id ? { ...item, active: !item.active } : item,
      ),
    );
  }

  private sortProducts(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
      if (a.categoryId.name === b.categoryId.name) {
        return a.name < b.name ? -1 : 1;
      } else {
        return a.categoryId.name < b.categoryId.name ? -1 : 1;
      }
    });
  }
}
