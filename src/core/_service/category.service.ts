import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { env } from '../../environments/environment'

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
}

