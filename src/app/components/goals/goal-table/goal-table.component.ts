import { Component, effect, input } from '@angular/core';
import { Goal, GoalService } from 'app/services/goal.service';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-goal-table',
  templateUrl: './goal-table.component.html',
  styleUrl: './goal-table.component.scss'
})
export class GoalTableComponent {
  goals = input.required<Goal[]>()

  constructor(
    private _goalService: GoalService
  ) {
    effect(() => {
      console.log(this.goals())
    })
  }
}
