import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, input, signal } from '@angular/core';
import { ResponsiveService } from '@core/services/responsive.service';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  private _overlayRef: OverlayRef | null = null
  text = input.required<string>()
  isSmallScreen = this._responsiveService.isSmallScreen

  constructor(
    private _overlay: Overlay,
    private _overlayPositionStrategy: OverlayPositionBuilder,
    private _elementRef: ElementRef,
    private _responsiveService: ResponsiveService
  ) { }

  ngOnInit(): void {

  }

  @HostListener('mouseenter')
  show() {
    // Primero crea la referencia si esta no existe
    if (!this._overlayRef) {
      this._overlayRef = this._createOverlay()
    }

    // Ahora comprueba que el tamaño de pantalla sea el adecuado, para poder renderizar el contenido o no.
    if(!this.isSmallScreen()) {
      const tooltipPortal = new ComponentPortal(TooltipComponent)
      const tooltipRef: ComponentRef<TooltipComponent> = this._overlayRef.attach(tooltipPortal)
  
      tooltipRef.instance.text = this.text
    }

    // Si metemos ambas condiciones en el mismo if, a la hora hacer el attach no sabe si la referencia existe o es null, ya que depende de dos factores.
    // Si depende solo de la comprobación de la existencia de la referencia, estará seguro que siempre existe esa referencia, ya que de no existir la creará, y de existir la usará.
  }

  @HostListener('mouseleave')
  @HostListener('click')
  hide() {
    if (this._overlayRef) {
      this._overlayRef.detach()
    }
  }

  private _createOverlay(): OverlayRef {
    const positionStrategy = this._overlayPositionStrategy
      .flexibleConnectedTo(
        this._elementRef
      ).withPositions([{
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      }])

    return this._overlay.create({
      hasBackdrop: false,
      positionStrategy
    })
  }  
}

