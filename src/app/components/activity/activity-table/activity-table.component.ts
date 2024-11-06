import { Component, effect, input, signal } from '@angular/core';
import { Activity, GoalService } from '@services/goal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {
  activities = input.required<Activity[]>()
}
