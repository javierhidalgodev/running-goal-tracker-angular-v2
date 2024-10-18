import { NgModule } from '@angular/core';
import { RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { ActivityFormComponent } from './activity-form/activity-form.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
