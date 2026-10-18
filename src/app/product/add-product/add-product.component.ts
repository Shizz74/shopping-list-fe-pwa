import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { CategoryService } from 'src/core/_service/category.service';
import { ProductService } from 'src/core/_service/product.service';
import { Category } from '../../../core/interface/category'

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, MatRadioModule],
})
export class AddProductComponent implements OnInit {

  error = false;
  message = '';
  alert = false;
  allCategory: Category[] | any = [];

  addProduct = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    categoryId: new UntypedFormControl('', [Validators.required]),
    unit: new UntypedFormControl('sztuk', [Validators.required])
  });
  

  constructor(
    private catService: CategoryService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(
      res => {
      this.allCategory = res;
      this.cdr.markForCheck();
    })
  }

  onSubmit() {
    this.productService.saveProduct(this.addProduct.value)
    .subscribe(
      res => {
        console.log(this.addProduct.value);
        this.error = false;
        this.message = "Zapisane!"
        this.alert = true;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.alert = false;
          this.cdr.markForCheck();
        },3000)
        this.addProduct.reset();
      },
      error => {
        this.error = true;
        if (error.error === 'product_exist') this.message = 'Produkt z taką nazwą już istnieje'

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
