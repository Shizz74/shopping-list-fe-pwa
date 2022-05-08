import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/core/_service/category.service';
import { ProductService } from 'src/core/_service/product.service';
import { Category } from '../../../core/interface/category'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  error = false;
  message = '';
  alert = false;
  allCategory: Category[] | any = [];

  addProduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    unit: new FormControl('sztuk', [Validators.required])
  });
  

  constructor(
    private catService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(
      res => {
      this.allCategory = res;
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
        setTimeout(() => {
          this.alert = false;
        },3000)
        this.addProduct.reset();
      },
      error => {
        this.error = true;
        if (error.error === 'product_exist') this.message = 'Produkt z taką nazwą już istnieje'

        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        },
          3000)
      }
    )
  }

}
