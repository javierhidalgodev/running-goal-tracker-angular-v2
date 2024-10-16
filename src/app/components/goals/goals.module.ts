import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalListComponent } from './goal-list/goal-list.component';


@NgModule({
  declarations: [
    GoalListComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule
  ]
})
export default class GoalsModule { }
