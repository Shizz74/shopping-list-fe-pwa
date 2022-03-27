import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Category } from '../interface/category';
import { env } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories() {
    return this.http.get(env.apiUrl + '/category');
  }

  saveCategory(category: Category){
      return this.http.post(`${env.apiUrl}/category`, category);
  }

  deleteCategory(_id: string){
    return this.http.delete(`${env.apiUrl}/category/${_id}`)
  }
}

