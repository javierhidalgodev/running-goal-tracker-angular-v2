import { NgModule } from '@angular/core';
import { RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { privateGuard, publicGuard } from './auth.guard';
import PrivateLayoutComponent from '@components/layout/private-layout/private-layout.component';

const routes: Routes = [
  {
    canActivate: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.default), // Sin exportación por defecto
  },
  {
    canActivate: [privateGuard()],
    path: 'goals',
    component: PrivateLayoutComponent,
    loadChildren: () => import('./components/goals/goals.module'),
  },
  {
    path: '**',
    redirectTo: 'goals'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true
      // features: [withComponentInputBinding()]
    })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
