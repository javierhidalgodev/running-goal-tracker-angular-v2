import { Component, input } from '@angular/core';
import { Goal } from '@shared/models/goal.model';

@Component({
  selector: 'app-goal-description',
  templateUrl: './goal-description.component.html',
  styleUrl: './goal-description.component.scss'
})
export class GoalDescriptionComponent {
  goal = input.required<Goal>()
}
