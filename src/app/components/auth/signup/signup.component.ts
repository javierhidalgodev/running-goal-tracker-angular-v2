import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { isRequired, hasEmailError } from '@utils/validators';
import { AuthService } from 'app/services/auth.service';
import { ToasterService } from 'app/services/toaster.service';

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
      this._toasterService.showNotification('Account created successfully', 'success')
      this._router.navigate(['auth/sign-in'])
    } catch (error) {
      this._toasterService.showNotification('This email address is already in use', 'error')
      console.error('Something went wrong during create an account process')
    }
  }
}