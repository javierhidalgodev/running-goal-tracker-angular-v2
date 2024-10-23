import { Component, effect, Injector, input, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Activity, Goal, GoalService } from 'app/services/goal.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrl: './goal-details.component.scss',
  providers: [GoalService],
})
export class GoalDetailsComponent {
  idTask = input<string>('')
  goal = signal<Goal | null>(null)
  activities = signal<Activity[]>([])
  isLoading = this._goalService.isLoading
  
  constructor(
    private _router: Router,
    private _goalService: GoalService,
  ) {
    effect(() => {
      if (this.idTask()) {
        this.getGoal()
        this.getActivities()
      }
    })
  }

  async getGoal() {
    const goalSnapshot = await this._goalService.getGoalById(this.idTask())

    if (!goalSnapshot.exists()) {
      this.isLoading.set(false)
      return;
    }

    this.goal.set(goalSnapshot.data() as Goal)
  }

  getActivities() {
    this._goalService.getActivities(this.idTask()).subscribe({
      next: activities => {
        this.activities.set(activities)
      },
      error: error => {
        console.log(error)
      },
      complete: () => {
        console.log('Complete')
      }
    }
    )
  }

  goalTotal() {
    return this.activities().reduce((prev, curr) => prev + curr.km, 0)
  }

  async deleteGoal() {
    const confirmDelete = confirm('Are you sure?')

    confirmDelete
      && await this._goalService.deleteGoal(this.idTask())
      this._router.navigate(['/goals'])
  }

  navigateToActivityForm() {
    this._router.navigate(['/goals', this.idTask(), 'new-activity'])
  }
}
