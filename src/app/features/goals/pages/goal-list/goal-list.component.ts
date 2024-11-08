import { Component } from '@angular/core';
import { GoalService } from '@services/goal.service';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.scss',
})
export class GoalListComponent {
  goals = this._goalService.getGoals
  isLoading = this._goalService.isLoading

  constructor(
    private _goalService: GoalService
  ) { }
}
