import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoalTableComponent } from './goal-table/goal-table.component';
import { TimestampToDatePipe } from 'app/pipes/timestamp-to-date.pipe';
import { GoalDetailsComponent } from './goal-details/goal-details.component';


@NgModule({
  declarations: [
    GoalListComponent,
    GoalFormComponent,
    GoalTableComponent,
    TimestampToDatePipe,
    GoalDetailsComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export default class GoalsModule { }
