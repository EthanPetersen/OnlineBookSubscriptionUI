import { Component, inject } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { MaterialModule } from '../../modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { LoginRegisterComponent } from '../../components/login-register/login-register.component';
import { BookModel } from '../../models/book-model';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SharedModule,MaterialModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  public coreService = inject(CoreService);

  constructor(private dialog: MatDialog){}

  ngOnInit() {}

  openLoginRegisterDialog(){
    this.dialog.open(LoginRegisterComponent,{
      minHeight:"50vh",
      minWidth:"40vw"
    })
  }

}
