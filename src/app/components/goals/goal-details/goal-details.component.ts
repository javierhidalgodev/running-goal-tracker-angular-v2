import { Component, effect, input, signal } from '@angular/core';
import { Activity, Goal, GoalService } from 'app/services/goal.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrl: './goal-details.component.scss'
})
export class GoalDetailsComponent {
  idTask = input.required<string>()
  goal: Goal | null = null
  activities = signal<Activity[]>([])

  constructor(
    private _goalService: GoalService
  ) {
    effect(() => {
      console.log(this.idTask())

      const goalId = this.idTask()

      if(goalId) {
        this.getGoal(goalId).then(() =>
          this.loadActivities(goalId)
        )
      }
    })
  }

  async getGoal(goalId: string) {
    const goalSnapshot = await this._goalService.getGoalById(goalId)

    if(!goalSnapshot.exists()) return;

    this.goal = goalSnapshot.data() as Goal
  }

  loadActivities(goalId: string) {
    const activities = this._goalService.getActivities(goalId)()
    this.activities.set(activities)
  }
}
