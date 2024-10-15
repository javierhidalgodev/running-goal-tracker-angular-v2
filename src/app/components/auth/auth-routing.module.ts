import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SigninComponent
  },
//   {
//     path: 'sign-up',
//     loadComponent: () => import('./signin/signin.component'),
//   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class AuthRoutingModule {
    constructor() {
        console.log('Module loaded!')
    }
}
