import { Component, effect, input } from '@angular/core';
import { Goal } from 'app/services/goal.service';

@Component({
  selector: 'app-goal-table',
  templateUrl: './goal-table.component.html',
  styleUrl: './goal-table.component.scss'
})
export class GoalTableComponent {
  goals = input.required<Goal[]>()

  constructor() {
    effect(() => {
      console.log(this.goals())
    })
  }
}
