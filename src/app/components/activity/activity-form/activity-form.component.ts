import {
  Component,
  effect,
  ElementRef,
  input,
  signal,
  ViewChild,
} from '@angular/core';
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
} from '@utils/validators';
import { ToasterService } from '@services/toaster.service';
import { GoalService } from '@services/goal.service';
import { Goal } from '@models/goal.model';
import { ActivityCreate, ActivityForm } from '@models/activity.model';
import { ToasterMessages, ToasterStyles } from 'app/constants/toaster.constants';

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

  idTask = input.required<string>();

  isLoading = signal<boolean>(true);
  goal = signal<Goal | null>(null);
  savingSignal = signal(false);

  constructor(
    private _fb: FormBuilder,
    private _goalService: GoalService,
    private _router: Router,
    private _toasterService: ToasterService
  ) {
    effect(() => {
      const goalId = this.idTask();

      if (goalId) {
        this.fecthGoal(goalId);
      }
    });
  }

  async fecthGoal(goalId: string) {
    try {
      const docSnapshot = await this._goalService.getGoalById(goalId);

      if (!docSnapshot.exists()) {
        this.isLoading.set(false);
        return;
      }

      this.goal.set(docSnapshot.data() as Goal);
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
    }
  }

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
      const min = new Date(inputAtt.attributes.getNamedItem('min')!.value);
      const max = new Date(inputAtt.attributes.getNamedItem('max')!.value);
      const runDate = new Date(runDateControl.value);

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
        runDate: Timestamp.fromDate(
          new Date(this.activityForm.get('runDate')!.value)
        )
      }

      try {
        const newActivityCreate: ActivityCreate = {
          ...formValue,
          registrationDate: Timestamp.now(),
          goalId: this.idTask(),
        };

        const updatedGoal: Goal = {
          ...this.goal()!,
          complete: (newActivityCreate.km + this.goal()!.total) > this.goal()!.km,
          total: this.goal()!.total + newActivityCreate.km,
          id: this.idTask()
        }
        
        await this._goalService.createActivityToGoal(newActivityCreate, updatedGoal)

        this._toasterService.showNotification(
          ToasterMessages.ACTIVITY_ADDED,
          ToasterStyles.SUCCESS
        );
        this._router.navigate(['/goals', this.idTask()]);
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
