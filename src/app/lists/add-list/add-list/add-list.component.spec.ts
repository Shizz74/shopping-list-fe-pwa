import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ListsService } from 'src/core/_service/lists.service';

import { AddListComponent } from './add-list.component';

describe('AddListComponent', () => {
    let component: AddListComponent;
    let fixture: ComponentFixture<AddListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddListComponent],
            providers: [
                DatePipe,
                provideRouter([]),
                { provide: ListsService, useValue: { saveList: () => of({}) } },
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
