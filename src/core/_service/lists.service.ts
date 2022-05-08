import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { List } from '../interface/list'
import { env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAllLists() {
    return this.http.get(env.apiUrl + '/lists');
  }

  saveList(body: List){
    return this.http.post(`${env.apiUrl}/list`, body);
  }

  deleteList(_id: string){
    return this.http.delete(`${env.apiUrl}/list/${_id}`)
  }

  getSpecList(_id: string) {
    return this.http.get(`${env.apiUrl}/list/${_id}`)
  }

  editList(_id: string, body: List){
    return this.http.put(`${env.apiUrl}/list/update/${_id}`, body);
  }
}
