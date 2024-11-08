import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { ToasterMessages, ToasterStyles } from '@shared/constants/toaster.constants';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _overlayRef: OverlayRef | null = null

  constructor(
    private _overlay: Overlay
  ) { }

  private _createOverlay (): OverlayRef {
    return this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay
        .position()
        .global()
        .top('20px')
        .right('20px')
    })
  }

  showNotification(message: ToasterMessages, style: ToasterStyles): void {
    if(!this._overlayRef) {
      this._overlayRef = this._createOverlay()
    }
    
    const notificationPortal = new ComponentPortal(NotificationComponent)
    const notificationRef: ComponentRef<NotificationComponent> = this._overlayRef.attach(notificationPortal)

    notificationRef.instance.message = message
    notificationRef.instance.style = style

    setTimeout(() => this._hideNotification(), 3000)
  }

  private _hideNotification(): void {
    if(this._overlayRef) {
      this._overlayRef.detach()
      this._overlayRef = null
    }
  }
}
