import { Component, effect, input, signal } from '@angular/core';
import { GoalService } from '@core/services/goal.service';
import { Goal } from '@shared/models/goal.model';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrl: './new-activity.component.scss'
})
export class NewActivityComponent {
  goalIdParam = input.required<string>();
  isLoading = signal<boolean>(true);
  goal = signal<Goal | null>(null);
  // savingSignal = signal(false);

  constructor(
    private _goalService: GoalService,
  ) {
    effect(() => {
      const goalId = this.goalIdParam();
      if (goalId) {
        this.fecthGoal(goalId);
      }
    });
  }

  async fecthGoal(goalId: string) {
    try {
      const docSnapshot = await this._goalService.getGoalById(goalId);

      if (!docSnapshot.exists()) {
        // this.isLoading.set(false);
        return;
      }

      this.goal.set(docSnapshot.data() as Goal);
      // this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      // this.isLoading.set(false);
    } finally {
      this.isLoading.set(false);
    }
  }
}
