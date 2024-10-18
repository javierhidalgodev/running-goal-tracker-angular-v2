import { Component, effect, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Activity, Goal, GoalService } from 'app/services/goal.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrl: './goal-details.component.scss'
})
export class GoalDetailsComponent {
  idTask = input.required<string>()
  goal: Goal | null = null
  activities: Activity[] = []

  constructor(
    private _goalService: GoalService
  ) {
    effect(() => {
      console.log(this.idTask())

      const goalId = this.idTask()

      if (goalId) {
        this.getGoal(goalId)
        this.getActivities(goalId)
      }
    })
  }

  async getGoal(goalId: string) {
    const goalSnapshot = await this._goalService.getGoalById(goalId)

    if (!goalSnapshot.exists()) return;

    this.goal = goalSnapshot.data() as Goal
  }

  getActivities(goalId: string) {
    this._goalService.getActivities(goalId).subscribe(value => this.activities = value)
  }

  goalTotal() {
    return this.activities.reduce((prev, curr) => prev + curr.km, 0)
  }
}
