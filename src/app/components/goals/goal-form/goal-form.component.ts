import { Component, signal } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormFieldName, invalidDate, invalidDateValidator, isLonger, isRequired, isShorter, minValidator } from '@utils/validators';
import { AuthService } from 'app/services/auth.service';
import { GoalCreate, GoalForm, GoalService } from 'app/services/goal.service';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss',
  providers: [GoalService]
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
  loadingSignal = signal(false)

  constructor(
    private _fb: FormBuilder,
    private _goalService: GoalService,
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

  async submitGoalForm() {
    // console.log(this.goalForm.value)

    if(this.goalForm.valid) {
      this.loadingSignal.set(true)

      const formValue: GoalForm = {
        ...this.goalForm.value,
        startDate: Timestamp.fromDate(new Date(this.goalForm.get('startDate')!.value)),
        endDate: Timestamp.fromDate(new Date(this.goalForm.get('endDate')!.value))
      }


      try {
        const newGoalCreate: GoalCreate = {
          ...formValue,
          registrationDate: Timestamp.now(),
          complete: false
        }

        const res = await this._goalService.createGoal(newGoalCreate)
        // console.log(res)
        // this._router.navigate(['/goals'])
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingSignal.set(false)
      }
    }
  }
}
