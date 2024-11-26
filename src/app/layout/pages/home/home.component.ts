import { Component, inject } from '@angular/core';
import { AllBooksComponent } from "../../../components/all-books/all-books.component";
import { MaterialModule } from '../../../modules/material.module';
import { BookModel } from '../../../models/book-model';
import { CoreService } from '../../../core/core.service';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AllBooksComponent,MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    public coreService = inject(CoreService);
    private bookService = inject(BookService);

    async ngOnInit(){
      this.coreService.listOfBooks = await this.bookService.getAllBooks();
    }
}
