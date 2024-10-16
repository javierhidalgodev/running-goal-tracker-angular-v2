import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GoalListComponent,
    GoalFormComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export default class GoalsModule { }
