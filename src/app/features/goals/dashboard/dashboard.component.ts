import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { GoalService } from '@services/goal.service';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [GoalService]
})
export class DashboardComponent {
  private _user: User | null = this._authService.getCurrentUser()
  goals = this._goalService.getGoals
  isLoading = this._goalService.isLoading
  totalKM = 0

  constructor (
    private _authService: AuthService,
    private _goalService: GoalService
  ) { }

  get userEmail() {
    return this._user?.email
  }
}
