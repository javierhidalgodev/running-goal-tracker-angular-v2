import { Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  invalidDateValidator,
  FormFieldName,
  isRequired,
  minValidator,
  invalidDate,
  dateRangeValidator,
} from '@shared/utils/validators.utils';
import { ToasterService } from '@services/toaster.service';
import { GoalService } from '@services/goal.service';
import { Goal } from '@models/goal.model';
import { ActivityCreate, ActivityForm } from '@models/activity.model';
import {
  ToasterMessages,
  ToasterStyles,
} from '@shared/constants/toaster.constants';
import { timestampFromDate } from '@shared/utils/transformations.utils';
import { isGoalComplete } from '@shared/utils/calculations.utils';
import dayjs from 'dayjs/esm'

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.scss',
  providers: [GoalService],
})
export class ActivityFormComponent {
  @ViewChild('runDate') runDateRef!: ElementRef;

  activityForm: FormGroup = this._fb.group({
    runDate: [
      '',
      Validators.compose([Validators.required, invalidDateValidator()]),
    ],
    km: ['', Validators.compose([Validators.required, Validators.min(1)])],
  });

  goal = input.required<Goal>();
  savingSignal = signal(false);

  constructor(
    private _fb: FormBuilder,
    private _goalService: GoalService,
    private _router: Router,
    private _toasterService: ToasterService
  ) { }

  // TODO: Mover validaciones fuera
  isRequired(field: FormFieldName) {
    return isRequired(field, this.activityForm);
  }

  minNumberViolation() {
    return minValidator(this.activityForm);
  }

  invalidDate(field: 'startDate' | 'endDate' | 'runDate') {
    return invalidDate(field, this.activityForm);
  }

  dateRangeViolation(field: 'startDate' | 'endDate' | 'runDate') {
    return dateRangeValidator(field, this.activityForm);
  }

  updateDateValidation() {
    const runDateControl = this.activityForm.get('runDate');

    if (runDateControl) {
      const inputAtt: HTMLInputElement = this.runDateRef.nativeElement;
      const min = dayjs(inputAtt.attributes.getNamedItem('min')!.value);
      const max = dayjs(inputAtt.attributes.getNamedItem('max')!.value);
      const runDate = dayjs(runDateControl.value);

      if (runDate < min || runDate > max) {
        runDateControl.setErrors({ dateRangeViolation: true });
      }
    }
  }

  async submitActivityForm() {
    if (this.activityForm.valid) {
      this.savingSignal.set(true);

      const formValue: ActivityForm = {
        ...this.activityForm.value,
        runDate: timestampFromDate(this.activityForm.get('runDate')!.value)
      };

      try {
        const newActivityCreate: ActivityCreate = {
          ...formValue,
          registrationDate: Timestamp.now(),
          goalId: this.goal().id,
        };

        const updatedGoal: Goal = {
          ...this.goal()!,
          complete: isGoalComplete(newActivityCreate.km, this.goal()),
          total: this.goal()!.total + newActivityCreate.km,
          id: this.goal().id,
        };

        await this._goalService.createActivityToGoal(
          newActivityCreate,
          updatedGoal
        );

        this._toasterService.showNotification(
          ToasterMessages.ACTIVITY_ADDED,
          ToasterStyles.SUCCESS
        );
        this._router.navigate(['/goals', this.goal().id]);
      } catch (error) {
        this._toasterService.showNotification(
          ToasterMessages.SOMETHING_WENT_WRONG,
          ToasterStyles.ERROR
        );
        console.error(error);
      } finally {
        this.savingSignal.set(false);
      }
    }
  }

  navigate() {
    this._router.navigate([]);
  }
}
