import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { UserDataLogin } from 'app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _auth: Auth
  ) { }

  get authState$(): Observable<any> {
    return authState(this._auth)
  }

  singIn(user: UserDataLogin) {
    return signInWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    )
  }

  signUp(user: UserDataLogin) {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    )
  }

  logout() {
    return signOut(this._auth)
  }
}
