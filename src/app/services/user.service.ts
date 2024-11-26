import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  controller='User';

  private httpClient = inject(HttpClient);

  constructor() { }

  async registerUser(profile:UserModel){
    return await lastValueFrom(this.httpClient.post<UserModel>(`${this.controller}/RegisterUser`,profile));
  }
}
