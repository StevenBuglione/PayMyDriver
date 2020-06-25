import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, Subscription, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() {}

  onFirstComponentButtonClick() {
    this.invokeFirstComponentFunction.emit();
  }
}
