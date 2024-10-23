import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ComponentRef } from '@angular/core';
import { NotificationComponent } from '@components/notification/notification.component';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
  private _overlayRef!: OverlayRef

  constructor (
    private _overlay: Overlay
  ) { }

  ngOnInit (): void {
    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay
        .position()
        .global()
        .top('20px')
        .right('20px')
    })
  }

  showNotification(message: string): void {
    const notificationPortal = new ComponentPortal(NotificationComponent)
    const notificationRef: ComponentRef<NotificationComponent> = this._overlayRef.attach(notificationPortal)

    notificationRef.instance.message = message

    setTimeout(() => this._overlayRef.detach(), 3000)
  }
}
