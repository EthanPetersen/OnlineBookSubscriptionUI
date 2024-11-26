import { Component, inject, Inject } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { FormControl, FormGroup } from '@angular/forms';
import { BookModel } from '../../models/book-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { SubscriptionService } from '../../services/subscription.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-subscribe-unsubscribe-book',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './subscribe-unsubscribe-book.component.html',
  styleUrl: './subscribe-unsubscribe-book.component.scss'
})
export class SubscribeUnsubscribeBookComponent {

  bookFormCtrl:FormGroup;
  alreadySubscribedToBook:boolean =false;

  private coreService = inject(CoreService);
  private subscriptionService = inject(SubscriptionService);
  private messageService = inject(MessageService);


  constructor(@Inject(MAT_DIALOG_DATA) public data: BookModel,public dialogRef: MatDialogRef<SubscribeUnsubscribeBookComponent>){
    this.loadForm(data);
  }

  loadForm(book:BookModel){
    this.alreadySubscribedToBook = this.coreService.checkIfAlreadySubscribedToBook(book.bookId);

    console.log("Check if already subscribed to book",this.alreadySubscribedToBook)
    this.bookFormCtrl = new FormGroup({
      bookName: new FormControl(book.name),
      description: new FormControl(book.text),
      createdDate: new FormControl(book.createdDate),
      purchasePrice: new FormControl(book.purchasePrice),
    })
  }

  async save(){
    if(this.alreadySubscribedToBook){
      await this.unsubscribeToBook();
    }else{
      await this.subscribeToBook();
    }
  }

  async subscribeToBook(){
    let subscriptionResult = await this.subscriptionService.subscribeToBook(this.data.bookId);
    console.log("Subscribe result",subscriptionResult)
    this.coreService.upsertSubscriptionList(subscriptionResult);
    this.dialogRef.close();
    this.messageService.add({severity:'success',summary:`Subscribed`,detail:`Successfully subscribed to book: ${this.data.name}`});
  }

  async unsubscribeToBook(){
     let unsubscriptionResult = await this.subscriptionService.UnsubscribeToBook(this.data.bookId);
     console.log("Unsubscribe result",unsubscriptionResult)
     this.coreService.upsertSubscriptionList(unsubscriptionResult);
     this.dialogRef.close();
    this.messageService.add({severity:'success',summary:`Unsubscribed`,detail:`Successfully unsubscribed to book: ${this.data.name}`});
  }

}
