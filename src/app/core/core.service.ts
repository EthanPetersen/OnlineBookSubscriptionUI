import { inject, Injectable } from '@angular/core';
import { BookModel } from '../models/book-model';
import { UserModel } from '../models/user-model';
import { SubscriptionModel } from '../models/subscription-model';
import { AuthenticationService } from '../services/authentication.service';
import { SubscriptionService } from '../services/subscription.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private authService = inject(AuthenticationService);
  private subscriptionService = inject(SubscriptionService);

  authenticatedUser:UserModel|null = null;
  listOfBooks:BookModel[]=[];
  listOfSubscriptionsActiveUser:SubscriptionModel[]=[];

  constructor() { }

  //Load all active/authenticate user data
  async loadAuthenticatedUserData(){
   this.authenticatedUser =  await this.authService.getUserLoggedInDetails();
   this.listOfSubscriptionsActiveUser = [];
   this.listOfSubscriptionsActiveUser = await this.subscriptionService.getAllSubsriptionsLinkedToUser();
  }

  //This will be triggered once a user subscribes/unsubscribes to a book
  upsertSubscriptionList(subscription:SubscriptionModel){
      const i = this.listOfSubscriptionsActiveUser.findIndex(b => b.subscriptionId == subscription.subscriptionId);
      if (i > -1) this.listOfSubscriptionsActiveUser[i] = subscription;
      else this.listOfSubscriptionsActiveUser.push(subscription);
  }

  checkIfAlreadySubscribedToBook(bookId:number){
    return this.listOfSubscriptionsActiveUser?.filter(b=>b.bookId == bookId && b.active)?.length > 0

  }
}
