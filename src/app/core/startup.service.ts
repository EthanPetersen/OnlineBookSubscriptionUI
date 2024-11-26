import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  private cookieService = inject(CookieService);
  private coreService = inject(CoreService);

  constructor() { }

  async checkIfUserAlreadyLoggedIn(){
    var token = this.cookieService.get("EPBookSubscription")

    if(token){
      await this.coreService.loadAuthenticatedUserData()
    }
  }
}
