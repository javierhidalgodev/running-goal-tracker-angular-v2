import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoalTableComponent } from './goal-table/goal-table.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import ActivityModule from '@components/activity/activity.module';
import { SharedModule } from '@components/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CdkMenu, CdkMenuTrigger, CdkMenuItem, CdkMenuModule } from '@angular/cdk/menu'
import PrivateLayoutComponent from '@components/layout/private-layout/private-layout.component';


@NgModule({
  declarations: [
    GoalListComponent,
    GoalFormComponent,
    GoalTableComponent,
    GoalDetailsComponent,
    HomeComponent,
    PrivateLayoutComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ActivityModule,
    SharedModule,
    CdkMenuModule
  ],
})
export default class GoalsModule { }
