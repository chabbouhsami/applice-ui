import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public subject$ = new Subject<object>();
  public event = this.subject$.asObservable();

  public publish(data: any): void {
    this.subject$.next(data);
  }

  public clear(): void {
    this.subject$ = new Subject<object>();
  }
}
