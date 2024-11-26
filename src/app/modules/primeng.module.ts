import { NgModule } from "@angular/core";
import { ToastModule } from 'primeng/toast';
import {MessageService} from 'primeng/api';

@NgModule({
  imports:[],
  exports:[ToastModule],
  providers: [MessageService],
})
export class PrimengModule{}
