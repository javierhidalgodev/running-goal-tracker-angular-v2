import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hasEmailError, isRequired } from '@shared/utils/validators.utils';
import { AuthService } from '@services/auth.service';
import { ToasterService } from '@services/toaster.service';
import { FirebaseError } from '@angular/fire/app';
import { ToasterMessages, ToasterStyles } from '@shared/constants/toaster.constants';
const TitleSVG = '../../../../../public/g5'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  isLoading = this._authService.isLoading
  titleLogo = TitleSVG

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

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toasterService: ToasterService
  ) { }

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.signInForm)
  }

  hasEmailError() {
    return hasEmailError(this.signInForm)
  }

  async submit() {
    if (this.signInForm.invalid) return

    this.isLoading.set(true)
    const { email, password } = this.signInForm.value

    if (!email || !password) {
      this.isLoading.set(false)
      return
    }

    try {
      await this._authService.singIn({ email, password })
      this._router.navigate(['dashboard'])
    } catch (error) {
      this.handlerError(error as FirebaseError)
    } finally {
      this.isLoading.set(false)
    }
  }

  handlerError(error: FirebaseError) {
    console.log(error.code)

    switch (error.code) {
      case 'auth/network-request-failed':
        this._toasterService.showNotification(
          ToasterMessages.NETWORK_ERROR,
          ToasterStyles.ERROR
        )
        break;
      case 'auth/invalid-credential':
        this._toasterService.showNotification(
          ToasterMessages.INVALID_CREDENTIALS,
          ToasterStyles.ERROR
        )
        break;
      default:
        this._toasterService.showNotification(
          ToasterMessages.SOMETHING_WENT_WRONG,
          ToasterStyles.ERROR
        )
        break;
    }
  }
}
