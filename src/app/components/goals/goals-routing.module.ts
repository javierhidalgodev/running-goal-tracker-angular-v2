import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalListComponent } from './goal-list/goal-list.component';

const routes: Routes = [
  {
    path: '',
    component: GoalListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
