import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, inject, Injectable, Renderer2 } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  breakPointObserver = inject(BreakpointObserver)

  screenWidth = toSignal(this.breakPointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]))

  smallScreen = computed(() => this.screenWidth()?.matches)
}
