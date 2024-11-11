import { Component, effect, inject, input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSmallScreen = input.required<boolean>()
  isMenuOpen = true;
  private _authService = inject(AuthService)
  private _router = inject(Router)
  private _renderer2 = inject(Renderer2)

  constructor() {
    effect(() => {
      if (this.isSmallScreen() && this.isMenuOpen) {
        this.isMenuOpen = false;
      } else {
        this.isMenuOpen = true;
        this._renderer2.removeClass(document.body, 'overflow-y-hidden');
      }
    });
  }

  switchMenuStatus() {
    if (this.isSmallScreen()) {
      this.isMenuOpen = !this.isMenuOpen;

      if (this.isMenuOpen) {
        this._renderer2.addClass(document.body, 'overflow-y-hidden');
      } else {
        this._renderer2.removeClass(document.body, 'overflow-y-hidden');
      }
    }
  }

  handleClick(isMain = false) {
    return this.isSmallScreen() && isMain
      ? (
        this.isMenuOpen && this.switchMenuStatus()
      )
      : this.switchMenuStatus()
  }

  async logout() {
    const _res = await this._authService.logout();
    this._router.navigate(['/auth/sign-in']);
  }

  get currentUser() {
    return this._authService.getCurrentUser()?.email
  }
}
