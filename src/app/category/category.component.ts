import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { CommonModule } from '@angular/common';

import { CategoryService } from 'src/core/_service/category.service';
import { Category } from 'src/core/interface/category';
@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
})
export class CategoryComponent implements OnInit {

  category: Category[];
  sortDirection = true;
  closeResult = '';
  categoryIdToRemove = '';
  categoryNameToRemove: string;
  deleteModal = false;
  searchTerm: string;
  

  constructor(
    private catService : CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(res => {
      this.category = res;
      this.cdr.markForCheck();
    })
  }

  sortList(cat, sortDirection) {
    cat.sort((a,b) => {
      if (sortDirection === true) {
        return a.name < b.name ? -1 : 1
      } else {
        return a.name < b.name ? 1 : -1
      }
    });
    this.sortDirection = !this.sortDirection;
    return cat;
  }

  deleteCategory() {
    this.catService.deleteCategory(this.categoryIdToRemove).subscribe(
      res => {
        this.catService.getAllCategories().subscribe(res => {
          this.category = res;
          this.deleteModal = !this.deleteModal;
          this.cdr.markForCheck();
        })
      },
      error => {
      console.log("bład");
      }
    )
  }

  goToCategoryView(_id: string) {
    this.router.navigate(['/kategoria-edycja', _id])
  }

  openDeleteModal(_id: string, name: string) {
    this.categoryIdToRemove = _id;
    this.categoryNameToRemove = name;
    this.deleteModal = !this.deleteModal;
  }
}
