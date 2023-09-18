import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { List } from '../interface/list'
import { env } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllLists(): Observable<List[]> {
    return this.http.get<List[]>(env.apiUrl + '/lists');
  }

  saveList(body: List){
    return this.http.post(`${env.apiUrl}/list`, body);
  }

  deleteList(_id: string){
    return this.http.delete(`${env.apiUrl}/list/${_id}`)
  }

  getSpecList(_id: string) {
    return this.http.get<List>(`${env.apiUrl}/list/${_id}`)
  }

  editList(_id: string, body: List){
    return this.http.put(`${env.apiUrl}/list/update/${_id}`, body);
  }

  addProductToList(_id: string, body: Product[]){
    return this.http.put(`${env.apiUrl}/list/add-product/${_id}`, body);
  }
}
