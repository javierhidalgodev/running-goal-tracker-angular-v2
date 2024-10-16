import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.default)
  },
  {
    path: 'goals',
    loadChildren: () => import('./components/goals/goals.module')
  },
  {
    path: '**',
    redirectTo: 'goals'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
