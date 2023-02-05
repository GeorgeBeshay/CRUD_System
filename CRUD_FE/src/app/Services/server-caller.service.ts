import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ServerCallerService {
  private port = 8081;
  private url = `http://localhost:${this.port}/server/`;
  constructor(private http: HttpClient) {}
  // Function requests to load the products stored in the DB.
  async load() {
    return await firstValueFrom(
      this.http.post<Product[]>(this.url + 'load', null)
    );
  }
  // Function requests to create a product and store it in the DB.
  async create(product: Product) {
    return await firstValueFrom(
      this.http.post<boolean>(this.url + 'create', product)
    );
  }
  // Function requests to update a product and store it in the DB.
  async update(product: Product) {
    return await firstValueFrom(
      this.http.post<boolean>(this.url + 'update', product)
    );
  }
  // Function requests to delete a product and remove it from the DB.
  async delete(product: Product) {
    return await firstValueFrom(
      this.http.post<boolean>(this.url + 'delete', product)
    );
  }
  // Function requests to check for updates.
  async emptyDB() {
    return await firstValueFrom(this.http.post(this.url + 'empty', null));
  }
  // Function requests to check for updates.
  async checkForUpdates() {
    return await firstValueFrom(
      this.http.post<boolean>(this.url + 'checkForUpdates', null)
    );
  }
  // Function requests to search among products based on a specific condition
  async search(condition: any, str: any) {
    return await firstValueFrom(
      this.http.post<Product[]>(this.url + `search/${condition}/${str}`, null)
    );
  }
}
