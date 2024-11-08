import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  constructor (
    private _breakPointObserver: BreakpointObserver
  ) { }

  // screenSize = this._breakPointObserver.isMatched(Breakpoints.XSmall)
  screenSize = toSignal(this._breakPointObserver.observe(Breakpoints.XSmall))

  isSmallScreen = computed(() => this.screenSize()?.matches ?? false)
}
