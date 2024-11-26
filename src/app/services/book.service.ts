import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BookModel } from '../models/book-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  controller='Book';

  private httpClient = inject(HttpClient);

  constructor() { }

  async getAllBooks(){
    return await lastValueFrom(this.httpClient.get<BookModel[]>( `${this.controller}/GetAllBooks`));
  }
}
