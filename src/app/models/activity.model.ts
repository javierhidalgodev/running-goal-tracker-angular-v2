import { Timestamp } from "@angular/fire/firestore";

export interface Activity {
    id: string;
    goalId: string;
    runDate: Timestamp;
    km: number;
    registrationDate: Timestamp;
  }
  export type ActivityCreate = Omit<Activity, 'id'>;
  export type ActivityForm = Omit<ActivityCreate, 'goalId' | 'registrationDate'>;