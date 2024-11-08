import { Component, input } from '@angular/core';
import { Goal } from '@models/goal.model';

@Component({
  selector: 'app-goal-table',
  templateUrl: './goal-table.component.html',
  styleUrl: './goal-table.component.scss'
})
export class GoalTableComponent {
  goals = input.required<Goal[]>()
}
