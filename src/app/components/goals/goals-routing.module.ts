import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';

const routes: Routes = [
  {
    path: '',
    component: GoalListComponent,
  },
  {
    path: 'new-goal',
    component: GoalFormComponent
  },
  {
    path: ':idTask',
    component: GoalDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
