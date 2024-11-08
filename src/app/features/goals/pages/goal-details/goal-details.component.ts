import { Component, effect, input, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '@models/activity.model';
import { Goal } from '@models/goal.model';
import { AuthService } from '@services/auth.service';
import { DialogService } from '@services/dialog.service';
import { GoalService } from '@services/goal.service';
import { ToasterService } from '@services/toaster.service';
import { ToasterMessages, ToasterStyles } from '@shared/constants/toaster.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrl: './goal-details.component.scss',
  providers: [GoalService],
})
export class GoalDetailsComponent implements OnDestroy {
  idTask = input<string>('')
  goal: Goal | null = null
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
  
      this.goal = goalSnapshot.data() as Goal
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
    this._activitiesSubscription$.unsubscribe()
    if (confirmRes) {
      try {
        await this._goalService.deleteGoal(this.idTask())
        this._toasterService.showNotification(
          ToasterMessages.GOAL_DELETED,
          ToasterStyles.INFO
        )

        this._router.navigate(['/goals'])
      } catch (_error) {
        this._toasterService.showNotification(
          ToasterMessages.SOMETHING_WENT_WRONG,
          ToasterStyles.ERROR
        )
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
