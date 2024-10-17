import { Component, signal } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { invalidDateValidator, FormFieldName, isRequired, minValidator, invalidDate } from '@utils/validators';
import { GoalService } from 'app/services/goal.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss'
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

  constructor(
    private _fb: FormBuilder,
    private _goalService: GoalService,
    private _router: Router,
  ) {
    // console.log('goal-form prepared')
  }

  isRequired(field: FormFieldName) {
    return isRequired(field, this.activityForm)
  }

  minNumberViolation() {
    return minValidator(this.activityForm)
  }

  invalidDate(field: 'startDate' | 'endDate') {
    return invalidDate(field, this.activityForm)
  }

  async submitActivityForm() {
    console.log(this.activityForm.value)

  //   if(this.activityForm.valid) {
  //     this.loadingSignal.set(true)

  //     const formValue: activityForm = {
  //       ...this.activityForm.value,
  //       startDate: Timestamp.fromDate(new Date(this.activityForm.get('startDate')!.value)),
  //       endDate: Timestamp.fromDate(new Date(this.activityForm.get('endDate')!.value))
  //     }


  //     try {
  //       const newGoalCreate: GoalCreate = {
  //         ...formValue,
  //         registrationDate: Timestamp.now(),
  //         complete: false
  //       }

  //       const res = await this._goalService.createGoal(newGoalCreate)
  //       // console.log(res)
  //       // this._router.navigate(['/goals'])
  //     } catch (error) {
  //       console.error(error)
  //     } finally {
  //       this.loadingSignal.set(false)
  //     }
  //   }
  }
}
