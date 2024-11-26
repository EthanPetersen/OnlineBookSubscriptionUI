import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SubscriptionModel } from '../models/subscription-model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  controller='Subscription';

  private httpClient = inject(HttpClient);

  constructor() { }

  async getAllSubsriptionsLinkedToUser(){
    return await lastValueFrom(this.httpClient.get<SubscriptionModel[]>(`${this.controller}/GetAllSubscriptionsLinkedToUser`));
  }

  async subscribeToBook(bookId:number){
    return await lastValueFrom(this.httpClient.put<SubscriptionModel>(`${this.controller}/${bookId}/SubcribeToBook`,{}))
  }

  async UnsubscribeToBook(bookId:number){
    return await lastValueFrom(this.httpClient.put<SubscriptionModel>(`${this.controller}/${bookId}/UnsubcribeToBook`,{}))
  }

}
