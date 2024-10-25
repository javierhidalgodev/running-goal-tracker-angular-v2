import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-private-layout',
  template: `
  <header class="h-[50px] p-3 flex items-center bg-neutral-900">
    <nav class="relative w-full flex items-center gap-4">

      <button [cdkMenuTriggerFor]="menu">Click me</button>

      <a routerLink="/home" class="text-xl font-extrabold italic [text-shadow:_0px_0px_rgb(46_46_46_/_0)] hover:[text-shadow:_-2px_2px_rgb(22_163_74_/_0.5)] hover:scale-[1.02] transition">RUNNING GOALS TRACKER</a>|
      <ng-template #menu>
        <div cdkMenu class="droppable absolute -bottom-24 [&>*]:py-3 [&>*]:px-4 bg-red-900 flex flex-col items-center rounded-md">
          <a cdkMenuItem routerLink="goals" class="font-medium italic hover:text-green-600">GOAL LIST</a>
          <a cdkMenuItem routerLink="/new-goal" class="font-medium italic hover:text-green-600">NEW GOAL</a>
        </div>
      </ng-template>
      <p class="mr-0 ml-auto bg-blue-600 p-2 py-1 text-xs rounded-full">{{ currentUser }}</p>
      <button class="w-fit py-2 px-6 mr-0  text-sm font-semibold bg-green-600 hover:bg-green-700 rounded-md" (click)="logout()">Logout</button>
    </nav>
  </header>
  <section class="max-w-[1200px] w-full mx-auto p-10">
    <router-outlet />
  </section>
`,
  styleUrl: './private-layout.component.scss',
})
export default class PrivateLayoutComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  get currentUser() {
    return this._authService.getCurrentUser()?.email
  }

  async logout() {
    const res = await this._authService.logout()
    this._router.navigate(['/auth/sign-in'])
  }
}
