import { Component, effect, Injector, input, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { DialogService } from '@services/dialog.service';
import { Activity, Goal, GoalService } from '@services/goal.service';
import { ToasterService } from '@services/toaster.service';
import { Subscription } from 'rxjs';

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
  private _activitiesSubscription$: Subscription = new Subscription()
  isLoading = this._goalService.isLoading

  constructor(
    private _router: Router,
    private _goalService: GoalService,
    private _toasterService: ToasterService,
    private _dialogService: DialogService,
    private _auth: AuthService
  ) {
    effect(() => {
      if (this.idTask()) {
        this.getGoal()
        this.getActivities()
      }
    })
  }

  async getGoal() {
    try {
      const goalSnapshot = await this._goalService.getGoalById(this.idTask())
  
      if (!goalSnapshot.exists()) {
        this.isLoading.set(false)
        return;
      }
  
      console.log(goalSnapshot.data()['userId'] === this._auth.getCurrentUser()?.uid)
      this.goal.set(goalSnapshot.data() as Goal)
    } catch (error) {
      console.error(error)
    }
  }

  getActivities() {
    this._activitiesSubscription$ = this._goalService.getActivities(this.idTask()).subscribe({
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
    const confirmRes = await this._dialogService.openDialog()
    if (confirmRes) {
      try {
        this._activitiesSubscription$.unsubscribe()

        await this._goalService.deleteGoal(this.idTask())
        this._toasterService.showNotification('Goal deleted!', 'info')
        this._router.navigate(['/goals'])
      } catch (error) {
        this._toasterService.showNotification('Something went wrong!', 'error')
      }
    }
  }

  navigateToActivityForm() {
    this._router.navigate(['/goals', this.idTask(), 'new-activity'])
  }

  ngOnDestroy(): void {
    this._activitiesSubscription$.unsubscribe()
  }
}
