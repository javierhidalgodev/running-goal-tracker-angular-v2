import {
  Component,
  ElementRef,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  dateRangeValidator,
  FormFieldName,
  invalidDate,
  invalidDateValidator,
  isLonger,
  isRequired,
  isShorter,
  minValidator,
} from '@shared/utils/validators.utils';
import { GoalService } from '@services/goal.service';
import { ToasterService } from '@services/toaster.service';
import { ToasterMessages, ToasterStyles } from '@shared/constants/toaster.constants';
import { GoalCreate, GoalForm } from '@models/goal.model';
import { timestampFromDate } from '@shared/utils/transformations.utils';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss',
  providers: [GoalService],
})
export class GoalFormComponent {
  @ViewChild('startDate') startDateElement!: ElementRef;
  @ViewChild('endDate') endDateElement!: ElementRef;

  goalForm: FormGroup = this._fb.group({
    title: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    ],
    description: ['', Validators.compose([Validators.maxLength(50)])],
    startDate: [
      '',
      Validators.compose([Validators.required, invalidDateValidator()]),
    ],
    endDate: [
      '',
      Validators.compose([Validators.required, invalidDateValidator()]),
    ],
    km: ['', Validators.compose([Validators.required, Validators.min(1)])],
  });
  loadingSignal = signal(false);

  constructor(
    private _renderer2: Renderer2,
    private _fb: FormBuilder,
    private _goalService: GoalService,
    private _toasterService: ToasterService,
    private _router: Router
  ) { }

  isRequired(field: FormFieldName) {
    return isRequired(field, this.goalForm);
  }

  isShorter(field: FormFieldName) {
    return isShorter(field, this.goalForm);
  }

  isLonger(field: FormFieldName) {
    return isLonger(field, this.goalForm);
  }

  minNumberViolation() {
    return minValidator(this.goalForm);
  }

  invalidDate(field: 'startDate' | 'endDate') {
    return invalidDate(field, this.goalForm);
  }

  dateRangeViolation(field: 'startDate' | 'endDate') {
    return dateRangeValidator(field, this.goalForm);
  }

  updateDateRange(field: 'startDate' | 'endDate') {
    const control = this.goalForm.get(field);

    if (control) {
      const date = control.value;

      if (field === 'startDate') {
        this._renderer2.setAttribute(
          this.endDateElement.nativeElement,
          'min',
          date
        );

        const endDateControl = this.goalForm.get('endDate');

        if (endDateControl) {
          if (
            new Date(endDateControl.value).getTime() < new Date(date).getTime()
          ) {
            control.setErrors({ dateRangeViolation: true });
          } else {
            endDateControl.setErrors(null);
          }
        }
      } else {
        this._renderer2.setAttribute(
          this.startDateElement.nativeElement,
          'max',
          date
        );

        const startDateControl = this.goalForm.get('startDate');

        if (startDateControl) {
          if (
            new Date(startDateControl.value).getTime() >
            new Date(date).getTime()
          ) {
            control.setErrors({ dateRangeViolation: true });
          } else {
            startDateControl.setErrors(null);
          }
        }
      }
    }
  }

  async submitGoalForm() {
    if (this.goalForm.valid) {
      this.loadingSignal.set(true);

      const formValue: GoalForm = {
        ...this.goalForm.value,
        startDate: timestampFromDate(this.goalForm.get('startDate')!.value),
        endDate: timestampFromDate(this.goalForm.get('endDate')!.value)
      };

      try {
        const newGoalCreate: GoalCreate = {
          ...formValue,
          registrationDate: Timestamp.now(),
          complete: false,
          total: 0,
        };

        await this._goalService.createGoal(newGoalCreate);
        this._toasterService.showNotification(
          ToasterMessages.GOAL_ADDED,
          ToasterStyles.SUCCESS
        );
        this._router.navigate(['/goals']);
      } catch (error) {
        this._toasterService.showNotification(
          ToasterMessages.SOMETHING_WENT_WRONG,
          ToasterStyles.ERROR
        );
        console.error(error);
      } finally {
        this.loadingSignal.set(false);
      }
    }
  }
}
