import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { privateGuard, publicGuard } from './auth.guard';
import PrivateLayoutComponent from '@components/layout/private-layout/private-layout.component';

const routes: Routes = [
  {
    canActivate: [publicGuard],
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.default), // Sin exportación por defecto
  },
  {
    canActivate: [privateGuard],
    path: '',
    component: PrivateLayoutComponent,
    loadChildren: () => import('./components/goals/goals.module').then(m => m.default),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true
    })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
