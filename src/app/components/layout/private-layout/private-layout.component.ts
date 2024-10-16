import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-private-layout',
  template: `
  <header class="h-[50px] p-3 flex items-center bg-neutral-900">
    <nav class="w-full flex items-center gap-4">
      <a routerLink="/goals">GOAL LIST</a>
      <!-- <a routerLink="new-goal">NEW GOAL</a> -->
      <button class="w-fit py-2 px-6 mr-0 ml-auto text-sm font-semibold bg-green-600 hover:bg-green-700 rounded-md" (click)="logout()">Logout</button>
    </nav>
  </header>
  <router-outlet />
`,
  styleUrl: './private-layout.component.scss',
})
export default class PrivateLayoutComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  async logout() {
    const res = await this._authService.logout()
    this._router.navigate(['/auth/sign-in'])
  }
}
