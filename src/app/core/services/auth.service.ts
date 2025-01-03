import { Injectable, signal } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { UserDataLogin } from '@models/user.model';
import { Observable } from 'rxjs';
import dayjs from 'dayjs/esm'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading = signal<boolean>(false)

  constructor(
    private _auth: Auth
  ) {
    this.authStateChanged()
  }

  get authState$(): Observable<unknown> {
    return authState(this._auth)
  }

  getCurrentUser() {
    return this._auth.currentUser
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

  authStateChanged() {
    // * 1. La sesión expira con la pestaña o la ventana del navegador
    // ? También se puede configurar para que persista en memoria o en LOCAL
    // this._auth.setPersistence(browserSessionPersistence)

    // * 2. Controlamos el cambio en la autenticación, de tal manera que cuando se refresque el token comportamiento por defecto)
    // * se comprobará que existe un usuario, y gracias a su tiempo de expiración, obtendremos un rango de tiempo que, sobrepasado
    // * lance el cierre de sesión.
    onAuthStateChanged(this._auth, () => {
      const user = this.getCurrentUser()

      if (user) {
        user.getIdTokenResult()
          .then(idTokenResult => {
            const tokenExpirationTime = idTokenResult.expirationTime
            const timeUntilExpiration = dayjs(tokenExpirationTime).diff(dayjs(), 'millisecond')
            // console.log(timeUntilExpiration)
            // const timeUntilExpiration = new Date(tokenExpirationTime).getTime() - new Date().getTime()

            setTimeout(() => {
              signOut(this._auth)
            }, timeUntilExpiration)
          })
      }
    })
  }
}
