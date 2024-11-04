import { Auth } from "@angular/fire/auth"
import { AuthService } from "./auth.service"
import { inject } from "@angular/core"
import { TestBed } from "@angular/core/testing"

describe('AuthService', () => {
    let authService: AuthService
    let auth: Auth

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Auth]
        })

        authService = TestBed.inject(AuthService)
        auth = TestBed.inject(Auth)
    })

    it('should', () => {

    })
})