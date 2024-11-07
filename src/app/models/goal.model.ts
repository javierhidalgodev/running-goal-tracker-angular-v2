import { Timestamp } from "@angular/fire/firestore";

export interface Goal {
    id: string;
    title: string;
    description: string;
    startDate: Timestamp;
    endDate: Timestamp;
    km: number;
    registrationDate: Timestamp;
    complete: boolean;
    userId: string;
    total: number;
  }
  export type GoalCreate = Omit<Goal, 'id'>;
  export type GoalForm = Omit<GoalCreate, 'registrationDate' | 'complete'>;