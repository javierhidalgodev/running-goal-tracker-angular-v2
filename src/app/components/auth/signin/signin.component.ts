import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hasEmailError, isRequired } from '@utils/validators';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  signInForm: FormGroup = this._fb.group({
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
    private _router: Router
  ) { }

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.signInForm)
  }

  hasEmailError() {
    return hasEmailError(this.signInForm)
  }

  async submit() {
    if(this.signInForm.invalid) return
    
    const { email, password } = this.signInForm.value
    if (!email || !password) return
    
    try {
      await this._authService.singIn({ email, password })
      this._router.navigate(['goals'])
    } catch (error) {
      console.error('Something went wrong during login process')
    }
  }
}
