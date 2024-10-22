import { Component, effect, input, signal } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { invalidDateValidator, FormFieldName, isRequired, minValidator, invalidDate } from '@utils/validators';
import { ActivityCreate, ActivityForm, GoalService } from 'app/services/goal.service';

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

  loadingSignal = signal(false)
  idTask = input.required<string>()

  constructor(
    private _fb: FormBuilder,
    private _goalService: GoalService,
    private _router: Router,
  ) {
    effect(() => {
      console.log(this.idTask())
    })
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

    if(this.activityForm.valid) {
      this.loadingSignal.set(true)

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
        this._router.navigate(['/goals', this.idTask()])
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingSignal.set(false)
      }
    }
  }
}
