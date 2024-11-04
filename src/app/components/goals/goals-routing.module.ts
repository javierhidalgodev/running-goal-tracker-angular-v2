import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import { privateGuard } from 'app/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'goals',
    component: GoalListComponent,
  },
  {
    path: 'new-goal',
    component: GoalFormComponent
  },
  {
    path: 'goals/:idTask',
    component: GoalDetailsComponent
  },
  {
    canActivate: [privateGuard],
    path: 'goals/:idTask/new-activity',
    loadChildren: () => import('../activity/activity.module'),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
