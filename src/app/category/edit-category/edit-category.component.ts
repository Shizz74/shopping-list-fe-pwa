import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CategoryService } from 'src/core/_service/category.service';
import { Category } from 'src/core/interface/category';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class EditCategoryComponent implements OnInit {
  id: string | any;
  category: Category | any;
  error = false;
  message = '';
  alert = false;

  editCategory = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    color: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catService: CategoryService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.catService.getSpecCat(this.id).subscribe((res) => {
      this.editCategory.patchValue(res);
      this.cdr.markForCheck();
    });
  }

  onSubmit() {
    this.catService.editCategory(this.id, this.editCategory.value).subscribe(
      (res) => {
        this.error = false;
        this.message = 'Zapisane!';
        this.alert = true;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.alert = false;
          this.editCategory.reset();
          this.cdr.markForCheck();
          this.router.navigate(['/kategorie']);
        }, 3000);
      },
      (error) => {
        this.error = true;
        this.message = 'Ups, coś poszło nie tak. Spróbuj ponownie później.';

        this.alert = true;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.alert = false;
          this.cdr.markForCheck();
        }, 3000);
      },
    );
  }
}
