import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActivityFormComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export default class ActivityModule { }
