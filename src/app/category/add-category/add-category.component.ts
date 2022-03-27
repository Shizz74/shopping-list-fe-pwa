import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/core/_service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  error = false;
  message = '';
  alert = false;

  addCategory = new FormGroup({
    name: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });
  

  constructor(
    private catService: CategoryService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.catService.saveCategory(this.addCategory.value)
    .subscribe(
      res => {
        this.error = false;
        this.message = "Zapisane!"
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        },3000)
        this.addCategory.reset();
      },
      error => {
        this.error = true;
        if (error.error === 'category_exist') this.message = 'Kategoria z taką nazwą już istnieje'
      
        if ( error.error === 'color_exist') this.message = 'Kategoria z takim kolorem już istnieje'

        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        },
          3000)
      }
    )
  }

}
