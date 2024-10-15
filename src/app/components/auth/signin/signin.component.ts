import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.sass'
})
export class SigninComponent {
  signInForm: FormGroup = this._fb.group({
    
  })

  constructor (
    private _fb: FormBuilder
  ) { }
}
