import { Component, ViewChild } from '@angular/core';
import { ToasterComponent } from '@components/toaster/toaster.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(ToasterComponent) toaster!: ToasterComponent

  showToaster() {
    this.toaster.showNotification('El mensajito')
  }
}
