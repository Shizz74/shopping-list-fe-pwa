import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductService } from 'src/core/_service/product.service';
import { Product } from 'src/core/interface/product';
import { Category } from 'src/core/interface/category';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { CategoryService } from 'src/core/_service/category.service';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, MatRadioModule],
})
export class EditProductComponent implements OnInit {

  id: string | any;
  product: Product | any;
  allCategory: Category[] | any = [];
  error = false;
  message = '';
  alert = false;

  editProduct = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    categoryId: new UntypedFormControl('', [Validators.required]),
    unit: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catService: CategoryService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.productService.getSpecProduct(this.id).subscribe(
      res => {
        this.editProduct.patchValue(res);
        this.cdr.markForCheck();
    })

    
    this.catService.getAllCategories().subscribe(
      res => {
        this.allCategory = res;
        this.editProduct.patchValue(res);
        this.cdr.markForCheck();
    })

  }

  onSubmit() {
    this.productService.editProduct(this.id, this.editProduct.value)
    .subscribe(
      res => {
        this.error = false;
        this.message = "Zapisane!"
        this.alert = true;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.alert = false;
          this.editProduct.reset();
          this.cdr.markForCheck();
          this.router.navigate(['/produkty'])
        },3000)
      },
      error => {
        this.error = true;
        this.message = 'Ups, coś poszło nie tak. Spróbuj ponownie później.'

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
