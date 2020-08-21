import { Injectable } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  constructor(public storage: LocalStorageService) {}

  public saveData(name: string, object: any): void {
    this.storage.set(name, JSON.stringify(object));
  }

  public getData(name: string): string {
    return this.storage.get(name);
  }

  public clearData(): void {
    this.storage.clear('all');
  }
}
