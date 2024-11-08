import { Component, input } from '@angular/core';
import { Goal } from '@shared/models/goal.model';

@Component({
  selector: 'app-goal-resume',
  templateUrl: './goal-resume.component.html',
  styleUrl: './goal-resume.component.scss'
})
export class GoalResumeComponent {
  goal = input.required<Goal>()
}
