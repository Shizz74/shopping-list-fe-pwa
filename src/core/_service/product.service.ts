import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../interface/product'
import { env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(env.apiUrl + '/products');
  }

  saveProduct(body: Product){
    return this.http.post(`${env.apiUrl}/product`, body);
  }

  deleteProduct(_id: string){
    return this.http.delete(`${env.apiUrl}/product/${_id}`)
  }

  getSpecProduct(_id: string) {
    return this.http.get(`${env.apiUrl}/product/${_id}`)
  }

  editProduct(_id: string, body: Product){
    return this.http.put(`${env.apiUrl}/product/update/${_id}`, body);
  }
}
