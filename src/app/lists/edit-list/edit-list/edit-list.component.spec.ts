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
          useValue: { getSpecList: () => of({ products: [] }) },
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

  it('removes a zero-quantity product from the selected and to-buy lists', () => {
    const product = { _id: 'product-1', amount: 1, amountToBuy: 1 } as Product;
    const otherProduct = {
      _id: 'product-2',
      amount: 1,
      amountToBuy: 2,
    } as Product;
    component.listOfProducts = [otherProduct, product];
    component.listOfProductsToBuy = [product, otherProduct];
    component.productsToDisplay = [product];
    component.addModalOpen = true;

    component.removeFromList(product);

    expect(component.listOfProducts).toEqual([otherProduct]);
    expect(component.listOfProductsToBuy).toEqual([otherProduct]);
    expect(component.productsToDisplay).toEqual([product]);
    expect(product.amountToBuy).toBe(0);
  });

  it('cleans up a product that is already at zero quantity', () => {
    const product = { _id: 'product-1', amount: 1, amountToBuy: 0 } as Product;
    component.listOfProducts = [product];
    component.listOfProductsToBuy = [product];

    component.removeFromList(product);

    expect(component.listOfProducts).toEqual([]);
    expect(component.listOfProductsToBuy).toEqual([]);
  });
});
