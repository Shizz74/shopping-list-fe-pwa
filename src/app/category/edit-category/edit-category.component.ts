import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from 'src/core/_service/category.service';
import { Category } from 'src/core/interface/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  id: string | any;
  category: Category | any;
  error = false;
  message = '';
  alert = false;

  editCategory = new FormGroup({
    name: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catService: CategoryService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.catService.getSpecCat(this.id).subscribe(
      res => {
        this.editCategory.patchValue(res);
    })

  }

  onSubmit() {
    this.catService.editCategory(this.id, this.editCategory.value)
    .subscribe(
      res => {
        this.error = false;
        this.message = "Zapisane!"
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
          this.editCategory.reset();
          this.router.navigate(['/kategorie'])
        },3000)
      },
      error => {
        this.error = true;
        this.message = 'Ups, coś poszło nie tak. Spróbuj ponownie później.'

        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        },
          3000)
      }
    )
  }

}
