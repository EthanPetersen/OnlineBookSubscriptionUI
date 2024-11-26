import { Component, inject } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
    isLoading=false;

  private loadingService = inject(LoadingService)

  constructor() { }

  ngOnInit(): void {
      //This is subcribing to the service event emitter
    this.loadingService.isLoadingSpinner.subscribe(x=>{
        this.isLoading = x
    })
  }
}
