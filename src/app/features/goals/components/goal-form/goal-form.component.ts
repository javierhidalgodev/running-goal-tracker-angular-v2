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
import {
  ToasterMessages,
  ToasterStyles,
} from '@shared/constants/toaster.constants';
import { GoalCreate, GoalForm } from '@models/goal.model';
import { timestampFromDate } from '@shared/utils/transformations.utils';
import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';
import tz from 'dayjs/esm/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(tz);

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
  ) {}

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
    // console.log(dayjs.tz.guess());
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
            dayjs(endDateControl.value, 'millisecond') <
            dayjs(date, 'millisecond')
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
            dayjs(startDateControl.value, 'millisecond') >
            dayjs(date, 'millisecond')
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
        startDate: timestampFromDate(dayjs(this.goalForm.get('startDate')!.value, {format: 'YYYY-MM-DD', utc: true}).toISOString()),
        endDate: timestampFromDate(dayjs(this.goalForm.get('endDate')!.value, {format: 'YYYY-MM-DD', utc: true}).toISOString()),
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
