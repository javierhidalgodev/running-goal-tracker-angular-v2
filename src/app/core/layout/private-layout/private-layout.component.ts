import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ResponsiveService } from '@services/responsive.service';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss',
})
export default class PrivateLayoutComponent {
  isSmallScreen = this._responsiveService.isSmallScreen;

  constructor(
    private _authService: AuthService,
    private _responsiveService: ResponsiveService,
  ) { }

  get currentUser() {
    return this._authService.getCurrentUser()?.email;
  }
}
