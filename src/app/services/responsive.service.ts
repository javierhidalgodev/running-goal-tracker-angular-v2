import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, ElementRef, inject, Injectable, Renderer2, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  breakPointObserver = inject(BreakpointObserver)

  constructor(
    private renderer2: Renderer2
  ) { }

  screenWidth = toSignal(this.breakPointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
    tap(() => this.renderer2.addClass(document.body, 'overflow-x-hidden'))
  ))

  smallScreen = computed(() => this.screenWidth()?.matches)
}
