import { Injectable, signal } from '@angular/core';
import { Auth, authState, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { UserDataLogin } from 'app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading = signal<boolean>(false)

  constructor(
    private _auth: Auth
  ) {
    // * 1. La sesión expira con la pestaña o la ventana del navegador
    // ? También se puede configurar para que persista en memoria o en LOCAL
    // this._auth.setPersistence(browserSessionPersistence)

    // * 2. Controlamos el cambio en la autenticación, de tal manera que cuando se refresque el token comportamiento por defecto)
    // * se comprobará que existe un usuario, y gracias a su tiempo de expiración, obtendremos un rango de tiempo que, sobrepasado
    // * lance el cierre de sesión.
    onAuthStateChanged(this._auth, () => {
      const user = this.getCurrentUser()

      if(user) {
        user.getIdTokenResult()
          .then(idTokenResult => {
            const tokenExpirationTime = idTokenResult.expirationTime
            const timeUntilExpiration = new Date(tokenExpirationTime).getTime() - new Date().getTime()

            setTimeout(() => {
              signOut(this._auth)
            }, timeUntilExpiration)
          })
      }
    })
  }

  get authState$(): Observable<any> {
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
}
