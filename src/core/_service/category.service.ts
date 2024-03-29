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

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(env.apiUrl + '/category');
  }

  saveCategory(category: Category){
      return this.http.post(`${env.apiUrl}/category`, category);
  }

  deleteCategory(_id: string){
    return this.http.delete(`${env.apiUrl}/category/${_id}`)
  }

  getSpecCat(_id: string) {
    return this.http.get(`${env.apiUrl}/category/${_id}`)
  }

  editCategory(_id: string, body: Category){
    return this.http.put(`${env.apiUrl}/category/update/${_id}`, body);
  }
}

