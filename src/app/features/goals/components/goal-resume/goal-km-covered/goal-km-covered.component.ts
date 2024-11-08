import { Component, input } from '@angular/core';
import { Goal } from '@shared/models/goal.model';

@Component({
  selector: 'app-goal-km-covered',
  templateUrl: './goal-km-covered.component.html',
  styleUrl: './goal-km-covered.component.scss'
})
export class GoalKmCoveredComponent {
  goal = input.required<Goal>()
}
