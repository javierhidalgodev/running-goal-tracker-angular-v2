import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  get networkStatus(): boolean {
    return navigator.onLine
  }
}
