import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListsService } from 'src/core/_service/lists.service';
import { ProductService } from 'src/core/_service/product.service';

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
                { provide: ListsService, useValue: { getSpecList: () => of({ products: [] }) } },
                { provide: ProductService, useValue: { getAllProducts: () => of([]) } },
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
