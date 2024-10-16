import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldName, invalidDate, invalidDateValidator, isLonger, isRequired, isShorter, minValidator } from '@utils/validators';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent {
  goalForm: FormGroup = this._fb.group({
    title: ['', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])],
    description: ['', Validators.compose([
      Validators.maxLength(50),
    ])],
    startDate: ['', Validators.compose([
      Validators.required,
      invalidDateValidator()
    ])],
    endDate: ['', Validators.compose([
      Validators.required,
      invalidDateValidator()
    ])],
    km: ['', Validators.compose([
      Validators.required,
      Validators.min(1)
    ])]
  })

  constructor(
    private _fb: FormBuilder
  ) {
    // console.log('goal-form prepared')
  }

  isRequired(field: FormFieldName) {
    return isRequired(field, this.goalForm)
  }

  isShorter(field: FormFieldName) {
    return isShorter(field, this.goalForm)
  }

  isLonger(field: FormFieldName) {
    return isLonger(field, this.goalForm)
  }

  minNumberViolation() {
    return minValidator(this.goalForm)
  }

  invalidDate(field: 'startDate' | 'endDate') {
    return invalidDate(field, this.goalForm)
  }

  submitGoalForm() {
    console.log(this.goalForm.value)
  }
}
