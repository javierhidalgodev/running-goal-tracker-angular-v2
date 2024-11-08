import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityTableComponent } from './activity-table/activity-table.component';
import { SharedModule } from '@shared/shared.module';
import { NewActivityComponent } from './pages/new-activity/new-activity.component';
import { GoalService } from '@core/services/goal.service';


@NgModule({
  declarations: [
    ActivityFormComponent,
    ActivityTableComponent,
    NewActivityComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    GoalService
  ],
  exports: [
    ActivityTableComponent
  ]
})
export default class ActivityModule { }
