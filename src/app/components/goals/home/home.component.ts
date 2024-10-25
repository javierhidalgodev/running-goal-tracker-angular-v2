import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'app/services/auth.service';
import { GoalService } from 'app/services/goal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [GoalService]
})
export class HomeComponent {
  private _user: User | null = this._authService.getCurrentUser()
  goals = this._goalService.getGoals
  isLoading = this._goalService.isLoading

  constructor (
    private _authService: AuthService,
    private _goalService: GoalService
  ) { }

  get userEmail() {
    return this._user?.email
  }
}
