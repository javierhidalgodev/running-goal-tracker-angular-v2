import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  breakPointObserver = inject(BreakpointObserver)

  screenWidth = toSignal(this.breakPointObserver.observe([Breakpoints.XSmall]))
}
