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
    category: new FormControl('', [Validators.required]),
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
    console.log(this.addProduct.value);
    // this.productService.saveProduct(this.addProduct.value)
    // .subscribe(
    //   res => {
    //     this.error = false;
    //     this.message = "Zapisane!"
    //     this.alert = true;
    //     setTimeout(() => {
    //       this.alert = false;
    //     },3000)
    //     this.addProduct.reset();
    //   },
    //   error => {
    //     this.error = true;
    //     if (error.error === 'category_exist') this.message = 'Kategoria z taką nazwą już istnieje'
      
    //     if ( error.error === 'color_exist') this.message = 'Kategoria z takim kolorem już istnieje'

    //     this.alert = true;
    //     setTimeout(() => {
    //       this.alert = false;
    //     },
    //       3000)
    //   }
    // )
  }

}
