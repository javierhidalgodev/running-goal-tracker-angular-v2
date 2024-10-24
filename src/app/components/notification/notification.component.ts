import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  // message = input.required<string>()
  @Input() message = ''
  @Input() style: '' | 'success' | 'error' | 'info' = ''
}
