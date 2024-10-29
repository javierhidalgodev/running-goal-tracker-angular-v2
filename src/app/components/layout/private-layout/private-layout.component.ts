import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ResponsiveService } from 'app/services/responsive.service';

@Component({
  selector: 'app-private-layout',
  template: `
    <header [ngClass]="[smallScreen() ? 'fixed w-full' : 'relative', 'h-[50px] p-3 flex items-center bg-neutral-900']">
      <nav class="w-full flex items-center gap-4">
        <button [ngClass]="[smallScreen() ? '' : 'hidden']" (click)="switchMenuStatus()">
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

        <a
          routerLink="/home"
          class="text-xl font-extrabold italic [text-shadow:_0px_0px_rgb(46_46_46_/_0)] hover:[text-shadow:_-2px_2px_rgb(22_163_74_/_0.5)] hover:scale-[1.02] transition"
          >RUNNING GOALS TRACKER</a
        >|
          <div [ngClass]="[smallScreen() ? 'mobile-styles' : 'flex-row gap-4 [&>a:hover]:text-green-600', menuOpen() ? 'flex' : 'hidden', 'flex [&>a]:font-medium [&>a]:italic']">
            <a routerLink="goals" (click)="switchMenuStatus()">GOAL LIST</a>
            <a routerLink="/new-goal" (click)="switchMenuStatus()">NEW GOAL</a>
          </div>
        <p class="max-sm:hidden mr-0 ml-auto bg-blue-600 p-2 py-1 text-xs rounded-full">
          {{ currentUser }}
        </p>
        <button
          class="w-fit py-2 px-6 mr-0  text-sm font-semibold bg-green-600 hover:bg-green-700 rounded-md"
          (click)="logout()"
        >
          Logout
        </button>
      </nav>
    </header>
    <section class="max-w-[1200px] w-full mx-auto p-10">
      <router-outlet />
    </section>
  `,
  styleUrl: './private-layout.component.scss',
})
export default class PrivateLayoutComponent {
  smallScreen = computed(() => this._responsiveService.smallScreen())
  menuOpen = signal<boolean>(false)

  constructor(
    private _authService: AuthService,
    private _responsiveService: ResponsiveService,
    private _router: Router
  ) { }

  get currentUser() {
    return this._authService.getCurrentUser()?.email;
  }

  switchMenuStatus() {
    this.menuOpen.set(!this.menuOpen())
  }

  async logout() {
    const res = await this._authService.logout();
    this._router.navigate(['/auth/sign-in']);
  }
}
