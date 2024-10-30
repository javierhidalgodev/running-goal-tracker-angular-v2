import { Component, computed, effect, Renderer2, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ResponsiveService } from 'app/services/responsive.service';

@Component({
  selector: 'app-private-layout',
  template: `
    <header
      [ngClass]="[
        smallScreen() ? 'absolute z-50' : 'relative',
        'w-full h-auto p-3 flex items-center bg-neutral-900'
      ]"
    >
      <nav class="w-full flex items-center gap-4">
        <button
          [ngClass]="[smallScreen() ? '' : 'hidden']"
          (click)="switchMenuStatus()"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <a routerLink="/home" class="text-xl font-extrabold italic hover:text-green-600"
          >RUNNING GOALS TRACKER</a
        >
        <div
          [ngClass]="[
            smallScreen()
              ? 'mobile-styles'
              : 'flex-row grow items-center gap-4 [&>a:hover]:text-green-600',
            isMenuOpen ? 'flex' : 'hidden',
            'flex [&>a]:font-medium [&>a]:italic'
          ]"
        >
          <!-- <span [ngClass]="smallScreen() ? 'hidden' : ''">|</span> -->
          <a routerLink="goals" (click)="switchMenuStatus()">GOAL LIST</a>
          <a routerLink="/new-goal" (click)="switchMenuStatus()">NEW GOAL</a>
          <!-- <p
          class="max-sm:hidden mr-0 ml-auto bg-blue-600 p-2 py-1 text-xs rounded-full"
        >
          {{ currentUser }}
        </p> -->
          <button
            [ngClass]="[
              smallScreen()
                ? 'uppercase italic font-bold text-green-400 hover:text-white'
                : 'ml-auto mr-0 py-1.5 px-4 bg-green-600 hover:bg-green-700 text-sm rounded-md',
              'w-fit'
            ]"
            (click)="logout()"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
    <section [ngClass]="[smallScreen() ? 'mt-10' : 'mt-0', 'max-w-[1200px] w-full mx-auto p-10']">
      <router-outlet />
    </section>
    <footer>
      <p class="p-2 text-center">Made by javierhidalgodev with <span class="text-red-600">❤</span> 2024</p>
    </footer>
  `,
  styleUrl: './private-layout.component.scss',
})
export default class PrivateLayoutComponent {
  smallScreen = this._responsiveService.smallScreen;
  isMenuOpen: boolean = true;

  constructor(
    private _authService: AuthService,
    private _responsiveService: ResponsiveService,
    private _router: Router,
    private _renderer2: Renderer2
  ) {
    effect(() => {
      if (this.smallScreen() && this.isMenuOpen) {
        this.isMenuOpen = false;
      } else {
        this.isMenuOpen = true;
        this._renderer2.removeClass(document.body, 'overflow-y-hidden');
      }
    });
  }

  get currentUser() {
    return this._authService.getCurrentUser()?.email;
  }

  switchMenuStatus() {
    if (this.smallScreen()) {
      this.isMenuOpen = !this.isMenuOpen;

      if (this.isMenuOpen) {
        this._renderer2.addClass(document.body, 'overflow-y-hidden');
      } else {
        this._renderer2.removeClass(document.body, 'overflow-y-hidden');
      }
    }
  }

  async logout() {
    const res = await this._authService.logout();
    this._router.navigate(['/auth/sign-in']);
  }
}
