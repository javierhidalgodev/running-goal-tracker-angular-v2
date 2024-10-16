import { Component } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent {
  goalForm: FormGroup = this._fb.group({
    title: ['', Validators.compose([
      Validators.required
    ])],
    description: ['', Validators.compose([
      Validators.required
    ])],
    startDate: ['', Validators.compose([
      Validators.required
    ])],
    endDate: ['', Validators.compose([
      Validators.required
    ])],
    km: ['', Validators.compose([
      Validators.required
    ])]
  })

  constructor (
    private _fb: FormBuilder
  ) {
    // console.log('goal-form prepared')
  }

  submitGoalForm() {
    console.log(this.goalForm.value)
  }
}
