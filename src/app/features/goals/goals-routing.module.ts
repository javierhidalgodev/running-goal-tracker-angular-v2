import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalListComponent } from './pages/goal-list/goal-list.component';
import { GoalDetailsComponent } from './pages/goal-details/goal-details.component';
import { privateGuard } from 'app/auth.guard';
import { NewGoalComponent } from './pages/new-goal/new-goal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'goals',
    component: GoalListComponent,
  },
  {
    path: 'new-goal',
    component: NewGoalComponent
  },
  {
    path: 'goals/:idTask',
    component: GoalDetailsComponent
  },
  {
    canActivate: [privateGuard],
    path: 'goals/:goalIdParam/new-activity',
    loadChildren: () => import('../activity/activity.module'),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
