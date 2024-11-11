import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { isRequired, hasEmailError } from '@shared/utils/validators.utils';
import { AuthService } from '@services/auth.service';
import { ToasterService } from '@services/toaster.service';
import { ToasterMessages, ToasterStyles } from '@shared/constants/toaster.constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm: FormGroup = this._fb.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.email
    ])],
    password: ['', Validators.compose([
      Validators.required,
      // Validators.pattern(/a-zA-Z0-9/)
    ])]
  })

  constructor (
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toasterService: ToasterService
  ) { }

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.signUpForm)
  }

  hasEmailError() {
    return hasEmailError(this.signUpForm)
  }

  async signup() {
    if(this.signUpForm.invalid) return
    
    const { email, password } = this.signUpForm.value
    if (!email || !password) return
    
    try {
      await this._authService.signUp({ email, password })
      this._toasterService.showNotification(
        ToasterMessages.ACCOUNT_CREATED,
        ToasterStyles.SUCCESS
      )
      this._router.navigate(['auth/sign-in'])
    } catch (error) {
      this._toasterService.showNotification(
        ToasterMessages.EMAIL_IN_USE,
        ToasterStyles.ERROR
      )
      console.error(error)
    }
  }
}