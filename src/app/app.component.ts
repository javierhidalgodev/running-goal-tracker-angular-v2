/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
// import { fromEvent, map, merge, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // networkStatus: boolean = false
  // networkStatus$: Subscription = Subscription.EMPTY 

  // ngOnInit(): void {
  //   console.log(navigator.onLine)
  //   this.checkNetworkStatus()
  // }

  // ngOnDestroy(): void {
  //   this.networkStatus$.unsubscribe()
  // }

  // checkNetworkStatus() {
  //   this.networkStatus = navigator.onLine
  //   this.networkStatus$ = merge(
  //     of(null),
  //     fromEvent(window, 'online'),
  //     fromEvent(window, 'offline')
  //   ).pipe(map(() => navigator.onLine))
  //   .subscribe(status => {
  //     console.log('status', status)
  //     this.networkStatus = status
  //   })
  // }

}
