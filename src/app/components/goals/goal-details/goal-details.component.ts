import { Component, effect, input } from '@angular/core';
import { Goal, GoalService } from 'app/services/goal.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrl: './goal-details.component.scss'
})
export class GoalDetailsComponent {
  idTask = input.required<string>()
  goal: Goal | null = null

  constructor(
    private _goalService: GoalService
  ) {
    effect(() => {
      console.log(this.idTask())

      const goalId = this.idTask()

      if(goalId) {
        this.getGoal(goalId)
      }
    })
  }

  async getGoal(goalId: string) {
    const goalSnapshot = await this._goalService.getGoalById(goalId)

    if(!goalSnapshot.exists()) return;

    this.goal = goalSnapshot.data() as Goal
  }
}
