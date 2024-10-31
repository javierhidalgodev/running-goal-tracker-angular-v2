import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[incrementCount]'
})
export class IncrementCountDirective {
  @Input() targetValue: number = 0
  @Input() duration: number = 1000

  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    if(this.targetValue && this.duration) {
      
    }
  }

  private _animationCount(target: number, duration: number) {
    const start = 0
    const startTime = performance.now()

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentValue = Math.floor(start + progress * (target - start))

      this.el.nativeElement.innerText = currentValue

      if(progress < 1) {
        requestAnimationFrame(step)
      }
    }
  }
}
