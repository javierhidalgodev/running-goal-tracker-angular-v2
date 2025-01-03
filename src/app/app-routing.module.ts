import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { privateGuard, publicGuard } from './auth.guard';
import PrivateLayoutComponent from '@core/layout/private-layout/private-layout.component';
import { PublicLayoutComponent } from '@core/layout/public-layout/public-layout.component';

const routes: Routes = [
  {
    canActivate: [publicGuard],
    path: 'auth',
    loadChildren: () => import('@core/auth/auth.module').then(m => m.default), // Sin exportación por defecto
  },
  {
    path: 'home',
    component: PublicLayoutComponent
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

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  bindToComponentInputs: true
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
