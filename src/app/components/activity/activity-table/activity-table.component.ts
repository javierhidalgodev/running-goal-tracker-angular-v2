import { Component, effect, input, signal } from '@angular/core';
import { Activity, GoalService } from 'app/services/goal.service';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {
  goaldId = input.required<string>()
  activities = signal<Activity[]>([])

  constructor (
    private _goalService: GoalService
  ) { }

  ngOnInit(): void {
    this._goalService.getActivities(this.goaldId()).subscribe({
      next: activities => {
        this.activities.set(activities)
      }
    })
  }
}
