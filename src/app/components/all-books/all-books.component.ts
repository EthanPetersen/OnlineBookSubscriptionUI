import { Component, inject, Input, Pipe, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BookModel } from '../../models/book-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from '../../modules/shared.module';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SubscribeUnsubscribeBookComponent } from '../subscribe-unsubscribe-book/subscribe-unsubscribe-book.component';
import { CoreService } from '../../core/core.service';
import { LoginRegisterComponent } from '../login-register/login-register.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [MaterialModule,DatePipe,CurrencyPipe],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.scss'
})
export class AllBooksComponent {
  displayedColumns: string[] = ['name','text','purchasePrice','createdDate','edit'];
  dataSource: MatTableDataSource<BookModel>;

  searchValue="";
  @Input() set listOfBooks(books: BookModel[]){
      this.loadTableData(books);
  };
  @Input() showFilter: boolean = false;
  @Input() pagination: number[] = [8,10,25,100];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private coreService = inject(CoreService);
  private messageService = inject(MessageService);

  constructor( private dialog: MatDialog) { }

  loadTableData(books:BookModel[]){
    this.dataSource = new MatTableDataSource();
    this.dataSource = new MatTableDataSource(books);
    this.ngAfterViewInit();
  }


  //This is used for the search any value in the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  //Before being able to subscribe to a book, check if user logged in. If not display error and show login screen
  subscribeToBook(book:BookModel){
    if(this.coreService.authenticatedUser == null){
      this.messageService.add({severity:'error',summary:`Sign In`,detail:`Sign in required`});

      this.dialog.open(LoginRegisterComponent,{
        minHeight:"50vh",
        minWidth:"40vw"
      })

    }else{
      this.dialog.open(SubscribeUnsubscribeBookComponent,{
        minHeight:'40vh',
        minWidth:'40vw',
        data:book
    })
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
