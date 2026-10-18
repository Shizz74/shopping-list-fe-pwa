import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListsService } from 'src/core/_service/lists.service';
import { ProductService } from 'src/core/_service/product.service';
import { Product } from 'src/core/interface/product';

import { EditListComponent } from './edit-list.component';

describe('EditListComponent', () => {
  let component: EditListComponent;
  let fixture: ComponentFixture<EditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'list-id' } } },
        },
        {
          provide: ListsService,
          useValue: {
            getSpecList: () => of({ products: [] }),
            addProductToList: () => of(null),
          },
        },
        { provide: ProductService, useValue: { getAllProducts: () => of([]) } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps a catalog product available until the draft is saved', () => {
    const product = createProduct('product-1');
    component.products.set([product]);

    component.addToList(product);
    component.addToList(product);

    expect(component.listOfProducts()).toHaveLength(1);
    expect(component.listOfProducts()[0]).not.toBe(product);
    expect(component.listOfProducts()[0].amountToBuy).toBe(2);
    expect(component.productsToDisplay()).toHaveLength(1);
    expect(component.productsToDisplay()[0].amountToBuy).toBe(2);
    expect(product.amountToBuy).toBe(0);

    component.addModalOpen = true;
    component.saveList();

    expect(component.productsToDisplay()).toEqual([]);
  });

  it('removes a product from the selected list when its quantity reaches zero', () => {
    const product = createProduct('product-1', 1);
    const otherProduct = createProduct('product-2', 2);
    component.listOfProducts.set([product, otherProduct]);

    component.removeFromList(product);

    expect(component.listOfProducts()).toEqual([otherProduct]);
    expect(component.listOfProductsToBuy()).toEqual([otherProduct]);
    expect(component.productsToDisplay()).toEqual([]);
  });

  it('allows re-adding a saved product repeatedly after removing it from the draft', () => {
    const product = createProduct('product-1', 1);
    component.products.set([product]);
    component.listOfProducts.set([product]);
    component.savedProductIds.set(new Set([product._id]));

    component.removeFromList(product);
    expect(component.productsToDisplay()).toHaveLength(1);

    const availableProduct = component.productsToDisplay()[0];
    component.addToList(availableProduct);
    expect(component.productsToDisplay()[0].amountToBuy).toBe(1);

    component.addToList(availableProduct);
    expect(component.productsToDisplay()[0].amountToBuy).toBe(2);

    component.addModalOpen = true;
    component.saveList();
    expect(component.productsToDisplay()).toEqual([]);
  });

  it('derives bought and to-buy products from the selected list', () => {
    const productToBuy = createProduct('product-1', 1);
    const boughtProduct = { ...createProduct('product-2', 2), active: false };
    component.listOfProducts.set([productToBuy, boughtProduct]);

    expect(component.listOfProductsToBuy()).toEqual([productToBuy]);
    expect(component.listOfProductsBought()).toEqual([boughtProduct]);

    component.alreadyBought(productToBuy);

    expect(component.listOfProductsToBuy()).toEqual([]);
    expect(component.listOfProductsBought()).toEqual([
      { ...productToBuy, active: false },
      boughtProduct,
    ]);
  });
});

function createProduct(id: string, amountToBuy = 0): Product {
  return {
    _id: id,
    name: id,
    unit: 'pcs',
    amount: 1,
    amountToBuy,
    active: true,
    categoryId: {
      _id: 'category-1',
      name: 'Category',
      color: '#000000',
      date: new Date(),
    },
  };
}
