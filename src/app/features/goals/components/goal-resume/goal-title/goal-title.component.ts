import { Component, input } from '@angular/core';
import { Goal } from '@shared/models/goal.model';

@Component({
  selector: 'app-goal-title',
  templateUrl: './goal-title.component.html',
  styleUrl: './goal-title.component.scss'
})
export class GoalTitleComponent {
  goal = input.required<Goal>()
}
