import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SigninComponent
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
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
