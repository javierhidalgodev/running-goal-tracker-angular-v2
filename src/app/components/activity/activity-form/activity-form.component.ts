import { Component, effect, ElementRef, input, Renderer2, signal, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { invalidDateValidator, FormFieldName, isRequired, minValidator, invalidDate, dateRangeValidator } from '@utils/validators';
import { ActivityCreate, ActivityForm, Goal, GoalService } from 'app/services/goal.service';
import { ToasterService } from 'app/services/toaster.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss',
  providers: [GoalService]
})
export class ActivityFormComponent {
  @ViewChild('runDate') runDateRef!: ElementRef

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
    private _renderer2: Renderer2,
    private _fb: FormBuilder,
    private _goalService: GoalService,
    private _router: Router,
    private _toasterService: ToasterService
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

  dateRangeViolation(field: 'startDate' | 'endDate' | 'runDate') {
    return dateRangeValidator(field, this.activityForm)
  }

  updateDateValidation() {
    const runDateControl = this.activityForm.get('runDate')

    if(runDateControl) {
      const inputAtt: HTMLInputElement = this.runDateRef.nativeElement
      const min = new Date(inputAtt.attributes.getNamedItem('min')!.value)
      const max = new Date(inputAtt.attributes.getNamedItem('max')!.value)
      const runDate = new Date(runDateControl.value)

      // console.log(runDate < min, runDate > max)

      if(runDate < min || runDate > max) {
        console.log('error amigo')
        runDateControl.setErrors({ 'dateRangeViolation': true })
      }
    }
  }

  async submitActivityForm() {
    // console.log(this.activityForm.value)

    if (this.activityForm.valid) {
      this.savingSignal.set(true)

      const formValue: ActivityForm = {
        ...this.activityForm.value,
        runDate: Timestamp.fromDate(new Date(this.activityForm.get('runDate')!.value))
      }

      try {
        const newActivityCreate: ActivityCreate = {
          ...formValue,
          registrationDate: Timestamp.now(),
          goalId: this.idTask()
        }

        const res = await this._goalService.createActivityToGoal(newActivityCreate)
        // console.log(res)
        this.updateGoal()

        this._toasterService.showNotification('Goal added succesfully!', 'success')
        this._router.navigate(['/goals', this.idTask()])
        } catch (error) {
        this._toasterService.showNotification('Something went wrong!', 'error')
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

        if (total >= this.goal()!.km) {
          try {
            this._goalService.updateGoal(this.idTask())
          } catch (error) {
            console.log(error)
          }
        }
      })
    ).subscribe()
  }

  navigate() {
    this._router.navigate([])
  }
}
