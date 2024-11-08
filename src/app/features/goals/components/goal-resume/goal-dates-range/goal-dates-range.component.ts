import { Component, input } from '@angular/core';
import { Goal } from '@shared/models/goal.model';

@Component({
  selector: 'app-goal-dates-range',
  templateUrl: './goal-dates-range.component.html',
  styleUrl: './goal-dates-range.component.scss'
})
export class GoalDatesRangeComponent {
  goal = input.required<Goal>()
}
