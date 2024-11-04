import { Component, effect, input, signal } from '@angular/core';
import { Activity, GoalService } from '@services/goal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {
  goaldId = input.required<string>()
  activities = signal<Activity[]>([])
  private _activitiesSubscription$: Subscription = new Subscription()

  constructor (
    private _goalService: GoalService
  ) { }

  ngOnInit(): void {
    this._activitiesSubscription$ = this._goalService.getActivities(this.goaldId()).subscribe({
      next: activities => {
        this.activities.set(activities)
      }
    })
  }

  ngOnDestroy(): void {
    this._activitiesSubscription$.unsubscribe()
  }
}
