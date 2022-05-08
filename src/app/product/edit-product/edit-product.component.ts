import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from 'src/core/_service/product.service';
import { Product } from 'src/core/interface/product';
import { Category } from 'src/core/interface/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/core/_service/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  id: string | any;
  product: Product | any;
  allCategory: Category[] | any = [];
  error = false;
  message = '';
  alert = false;

  editProduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.productService.getSpecProduct(this.id).subscribe(
      res => {
        this.editProduct.patchValue(res);
    })

    
    this.catService.getAllCategories().subscribe(
      res => {
        this.allCategory = res;
        this.editProduct.patchValue(res);
    })

  }

  onSubmit() {
    this.productService.editProduct(this.id, this.editProduct.value)
    .subscribe(
      res => {
        this.error = false;
        this.message = "Zapisane!"
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
          this.editProduct.reset();
          this.router.navigate(['/produkty'])
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
