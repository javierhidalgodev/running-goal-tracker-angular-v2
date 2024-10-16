import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import AuthRoutingModule from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import PrivateLayoutComponent from '@components/layout/private-layout/private-layout.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    PrivateLayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export default class AuthModule { }
