import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user: User | null = null;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // Suscríbete al Observable authState para obtener el usuario autenticado
    this._authService.authState$.subscribe((authUser) => {
      this.user = authUser as User | null; // Asigna el usuario autenticado (o null si no existe)
    });
  }

  goTo(fragment: string): void {
    this._router.navigateByUrl('/home#' + fragment)
  }
}
