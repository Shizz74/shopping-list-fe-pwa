import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/core/interface/product';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Products: Product[], searchValue: string): Product[] {
    if(!Products || !searchValue) {
      return Products;
    }
    return Products.filter( product => product.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
