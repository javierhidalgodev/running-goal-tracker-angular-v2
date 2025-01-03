import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalListComponent } from './pages/goal-list/goal-list.component';
import { GoalFormComponent } from './components/goal-form/goal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoalTableComponent } from './components/goal-table/goal-table.component';
import { GoalDetailsComponent } from './pages/goal-details/goal-details.component';
import ActivityModule from '@features/activity/activity.module';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CdkMenuModule } from '@angular/cdk/menu'
import PrivateLayoutComponent from '@core/layout/private-layout/private-layout.component';
import { NewGoalComponent } from './pages/new-goal/new-goal.component';
import { GoalTitleComponent } from './components/goal-resume/goal-title/goal-title.component';
import { GoalDescriptionComponent } from './components/goal-resume/goal-description/goal-description.component';
import { GoalDatesRangeComponent } from './components/goal-resume/goal-dates-range/goal-dates-range.component';
import { GoalKmCoveredComponent } from './components/goal-resume/goal-km-covered/goal-km-covered.component';
import { GoalResumeComponent } from './components/goal-resume/goal-resume.component';
import { GoalService } from '@core/services/goal.service';

const declarations = [
  GoalListComponent,
  GoalDetailsComponent,
  NewGoalComponent,
  GoalFormComponent,
  GoalResumeComponent,
  GoalTitleComponent,
  GoalDescriptionComponent,
  GoalDatesRangeComponent,
  GoalKmCoveredComponent,
  GoalTableComponent,
  DashboardComponent,
  PrivateLayoutComponent
]

const imports = [
  CommonModule,
  GoalsRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
  ActivityModule,
  CdkMenuModule
]

@NgModule({
  declarations,
  imports,
  providers: [GoalService]
})
export default class GoalsModule { }
