import { Component, input } from '@angular/core';
import { Activity } from '@models/activity.model';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {
  activities = input.required<Activity[]>()
}
