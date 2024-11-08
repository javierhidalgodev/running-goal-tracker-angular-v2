import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { privateGuard, publicGuard } from './auth.guard';
import PrivateLayoutComponent from '@core/layout/private-layout/private-layout.component';

const routes: Routes = [
  {
    canActivate: [publicGuard],
    path: 'auth',
    loadChildren: () => import('@core/auth/auth.module').then(m => m.default), // Sin exportación por defecto
  },
  {
    canActivate: [privateGuard],
    path: '',
    component: PrivateLayoutComponent,
    loadChildren: () => import('@features/goals/goals.module').then(m => m.default),
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
