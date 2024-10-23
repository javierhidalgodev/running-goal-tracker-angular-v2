import { Component, effect, input, signal } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { invalidDateValidator, FormFieldName, isRequired, minValidator, invalidDate } from '@utils/validators';
import { ActivityCreate, ActivityForm, Goal, GoalService } from 'app/services/goal.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss',
  providers: [GoalService]
})
export class ActivityFormComponent {
  activityForm: FormGroup = this._fb.group({
    runDate: ['', Validators.compose([
      Validators.required,
      invalidDateValidator()
    ])],
    km: ['', Validators.compose([
      Validators.required,
      Validators.min(1)
    ])]
  })

  idTask = input.required<string>()

  isLoading = signal<boolean>(true)
  goal = signal<Goal | null>(null)
  savingSignal = signal(false)

  constructor(
    private _fb: FormBuilder,
    private _goalService: GoalService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    effect(() => {
      const goalId = this.idTask()

      if (goalId) {
        this.fecthGoal(goalId)
      }
    })
  }

  async fecthGoal(goalId: string) {
    const docSnapshot = await this._goalService.getGoalById(goalId)

    if (!docSnapshot.exists()) {
      this.isLoading.set(false)
      return;
    }

    this.goal.set(docSnapshot.data() as Goal)
    this.isLoading.set(false)
  }

  isRequired(field: FormFieldName) {
    return isRequired(field, this.activityForm)
  }

  minNumberViolation() {
    return minValidator(this.activityForm)
  }

  invalidDate(field: 'startDate' | 'endDate' | 'runDate') {
    return invalidDate(field, this.activityForm)
  }

  async submitActivityForm() {
    // console.log(this.activityForm.value)

    if (this.activityForm.valid) {
      this.savingSignal.set(true)

      const formValue: ActivityForm = {
        ...this.activityForm.value,
        runDate: Timestamp.fromDate(new Date(this.activityForm.get('runDate')!.value))
      }

      console.log(formValue)
      try {
        const newActivityCreate: ActivityCreate = {
          ...formValue,
          registrationDate: Timestamp.now(),
          goalId: this.idTask()
        }

        const res = await this._goalService.createActivityToGoal(newActivityCreate)
        // console.log(res)
        this.updateGoal()

        this._router.navigate(['/goals', this.idTask()])
      } catch (error) {
        console.error(error)
      } finally {
        this.savingSignal.set(false)
      }
    }
  }

  updateGoal() {
    this._goalService.getActivities(this.idTask()).pipe(
      map(activities => {
        const total = activities.reduce((acc, curr) => acc + curr.km, 0)

        if (total > this.goal()!.km) {
          try {
            this._goalService.updateGoal(this.idTask())
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('NO completado')
        }
      })
    ).subscribe()


  }

  navigate() {
    this._router.navigate([history.back])
  }
}
