import { Component, input } from '@angular/core';
import { Goal } from '@models/goal.model';

@Component({
  selector: 'app-goal-table',
  templateUrl: './goal-table.component.html',
  styleUrl: './goal-table.component.scss',
})
export class GoalTableComponent {
  goals = input.required<Goal[]>();
  sortedGoals: Goal[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortedBy: 'name' | 'start' | 'end' | 'km' | 'status' | null = null

  ngOnChanges() {
    this.sortedGoals = [...this.goals()];
  }

  changeSortDirection() {
    if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = 'asc';
    }
  }

  sortByName() {
    this.changeSortDirection()
    this.sortedBy = 'name'
    
    this.sortedGoals = [...this.goals()].sort((a, b) => {
      return this.sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
      });
    }
    
  sortByStartDate() {
    this.changeSortDirection()
    this.sortedBy = 'start'

    this.sortedGoals = [...this.goals()].sort((a, b) => {
      return this.sortDirection === 'asc'
        ? a.startDate.toMillis() - b.startDate.toMillis()
        : b.startDate.toMillis() - a.startDate.toMillis()
      });
  }

  sortByEndDate() {
    this.changeSortDirection()
    this.sortedBy = 'end'

    this.sortedGoals = [...this.goals()].sort((a, b) => {
      return this.sortDirection === 'asc'
        ? a.endDate.toMillis() - b.endDate.toMillis()
        : b.endDate.toMillis() - a.endDate.toMillis()
      });
  }

  sortByTotalKMs() {
    this.changeSortDirection()
    this.sortedBy = 'km'

    this.sortedGoals = [...this.goals()].sort((a, b) => {
      return this.sortDirection === 'asc'
        ? a.km - b.km
        : b.km - a.km
      });
  }

  sortByStatus() {
    this.changeSortDirection()
    this.sortedBy = 'status'

    this.sortedGoals = [...this.goals()].sort((a, b) => {
      if (a.complete === b.complete) return 0
      
      return this.sortDirection === 'asc'
        ? a.complete ? -1 : 1 
        : a.complete ? 1 : -1 
      });
  }
}
