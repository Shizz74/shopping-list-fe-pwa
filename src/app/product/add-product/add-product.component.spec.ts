import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CategoryService } from 'src/core/_service/category.service';
import { ProductService } from 'src/core/_service/product.service';

import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
    let component: AddProductComponent;
    let fixture: ComponentFixture<AddProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddProductComponent],
            providers: [
                provideRouter([]),
                { provide: CategoryService, useValue: { getAllCategories: () => of([]) } },
                { provide: ProductService, useValue: { saveProduct: () => of({}) } },
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
