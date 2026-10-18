import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/core/_service/category.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class AddCategoryComponent implements OnInit {

  error = false;
  message = '';
  alert = false;

  addCategory = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    color: new UntypedFormControl('', [Validators.required]),
  });
  

  constructor(
    private catService: CategoryService,
    private cdr: ChangeDetectorRef,
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
        this.cdr.markForCheck();
        setTimeout(() => {
          this.alert = false;
          this.cdr.markForCheck();
        },3000)
        this.addCategory.reset();
      },
      error => {
        this.error = true;
        if (error.error === 'category_exist') this.message = 'Kategoria z taką nazwą już istnieje'
      
        if ( error.error === 'color_exist') this.message = 'Kategoria z takim kolorem już istnieje'

        this.alert = true;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.alert = false;
          this.cdr.markForCheck();
        },
          3000)
      }
    )
  }

}
