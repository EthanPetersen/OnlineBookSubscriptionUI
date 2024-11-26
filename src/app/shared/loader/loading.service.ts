import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
   isLoadingSpinner: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
}
