import { Component, effect, Injector, input, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Activity, Goal, GoalService } from 'app/services/goal.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrl: './goal-details.component.scss',
  providers: [GoalService],
})
export class GoalDetailsComponent implements OnInit {
  idTask = input<string>('')
  // goal: Goal | null = null
  goal = signal<Goal | null>(null)
  activities = signal<Activity[]>([])
  isLoading = this._goalService.isLoading

  ngOnInit(): void {
    this._goalService.getGoalById(this.idTask())

    this.getActivities(this.idTask())
  }
  
  constructor(
    private _router: Router,
    private _goalService: GoalService,
    private _injector: Injector
  ) {
    console.log(this.idTask())
    effect(() => {
      console.log(this.idTask())
      const goalId = this.idTask()
      console.log(this.idTask())

      if (goalId) {
        this._goalService.getGoal(goalId).subscribe({
          next: val => {
            if(val !== undefined) this.goal.set(val)
          },
          error: error => {
            console.log(error)
          },
          complete: () => {
            console.log('Goal attempt complete')
          }
        })
      }
    })
  }

  // async getGoal(goalId: string) {
  //   const goalSnapshot = await this._goalService.getGoalById(goalId)

  //   if (!goalSnapshot.exists()) {
  //     this.isLoading.set(false)
  //     return;
  //   }

  //   this.goal = goalSnapshot.data() as Goal
  // }

  getActivities(goalId: string) {
    this._goalService.getActivities(goalId).subscribe(value => this.activities.set(value))
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
}
