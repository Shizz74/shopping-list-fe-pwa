import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/core/_service/category.service';

import { Category } from 'src/core/interface/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Category | any;

  constructor(
    private catService : CategoryService
  ) { }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(res => {
      this.categories = res;
      console.log(this.categories);
    })
  }

}
