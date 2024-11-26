import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginModel } from '../models/login-model';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  controller='Authentication';

  private httpClient = inject(HttpClient);

  constructor() { }

  async login(profile:LoginModel){
    return await lastValueFrom(this.httpClient.post(`${this.controller}/Login`,profile));
  }

  async getUserLoggedInDetails(){
    return await lastValueFrom(this.httpClient.get<UserModel>(`${this.controller}/GetUserDetails`));
  }


}
