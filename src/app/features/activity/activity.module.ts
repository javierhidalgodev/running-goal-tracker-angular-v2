import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityTableComponent } from './activity-table/activity-table.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ActivityFormComponent,
    ActivityTableComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ActivityTableComponent
  ]
})
export default class ActivityModule { }
