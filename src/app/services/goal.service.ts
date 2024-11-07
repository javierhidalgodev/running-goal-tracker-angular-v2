import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

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

export interface Activity {
  id: string;
  goalId: string;
  runDate: Timestamp;
  km: number;
  registrationDate: Timestamp;
}
export type ActivityCreate = Omit<Activity, 'id'>;
export type ActivityForm = Omit<ActivityCreate, 'goalId' | 'registrationDate'>;

@Injectable()
export class GoalService {
  private _goalCollection = collection(this._fireStore, 'goals');
  private _activityCollection = collection(this._fireStore, 'activities');

  isLoading = signal<boolean>(true);

  constructor(
    private _fireStore: Firestore,
    private _authService: AuthService
  ) {}

  createGoal(goal: GoalCreate) {
    return addDoc(this._goalCollection, {
      ...goal,
      userId: this._authService.getCurrentUser()?.uid,
    });
  }

  async deleteGoal(goalId: string) {
    await this._deleteActivitiesFromGoal(goalId);

    const docRef = doc(this._goalCollection, goalId);
    return deleteDoc(docRef);
  }

  private async _deleteActivitiesFromGoal(goalId: string) {
    try {
      const q = query(this._activityCollection, where('goalId', '==', goalId));
      const activitiesSnapshot = await getDocs(q);

      const deletePromises = activitiesSnapshot.docs.map((docSnap) => {
        const docRef = docSnap.ref;
        return deleteDoc(docRef);
      });

      await Promise.all(deletePromises);
    } catch (error) {
      console.log(error);
    }
  }

  getGoalById(goalId: string) {
    const docRef = doc(this._goalCollection, goalId);
    return getDoc(docRef);
  }

  /**
   * Esta propiedad devuelve un Signal (a partir de un Observable) con los Goals o un array vacío
   * Además, tiene una operación intermedia que modifica otro Signal
   * que nos sirve para saber si se están cargando los objetivos, y
   * en consecuencia renderizar un loader en los componentes
   * que necesiten esta data.
   */
  getGoals = toSignal(
    (
      collectionData(
        query(
          this._goalCollection,
          orderBy('registrationDate', 'desc'),
          where('userId', '==', this._authService.getCurrentUser()?.uid)
        ),
        { idField: 'id' }
      ) as Observable<Goal[]>
    ).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.isLoading.set(false);
        return throwError(() => error);
      })
    ),
    { initialValue: [] }
  );

  /**
   * Se trata de un método que ejecuta una transacción de dos operaciones: guardar la actividad y actualizar el objetivo con sus valores recalculados. Ambas operaciones serán existosas solo si ambas se cumplen.
   * 
   * @param activity Objeto de la actividad para añadir
   * @param updatedGoal Objeto del goal recalculado para actualizarlo siempre que la acción de añadir la actividad sea correcta
   */
  async createActivityToGoal(activity: ActivityCreate, updatedGoal: Goal) {
    const docRefGoal = doc(this._goalCollection, updatedGoal.id);
    const docRefActivity = doc(this._activityCollection)

    const batch = writeBatch(this._fireStore)

    batch.set(docRefActivity, activity)
    batch.update(docRefGoal, { ...updatedGoal })

    await batch.commit()

    // try {
    //   await this.updateGoal(updatedGoal)
    // } catch (error) {
    //   console.log(error)
    // }
    // return addDoc(this._activityCollection, activity);
  }

  // updateGoal(updatedGoal: Goal): Promise<void> {
  //   const docRef = doc(this._goalCollection, updatedGoal.id);
  //   return updateDoc(docRef, { total: updatedGoal.total, complete: updatedGoal.complete });
  // }

  getActivities(goalId: string): Observable<Activity[]> {
    const activitiesQuery = query(
      this._activityCollection,
      orderBy('runDate', 'desc'),
      where('goalId', '==', goalId)
    );

    return collectionData(activitiesQuery, { idField: 'id' }) as Observable<
      Activity[]
    >;
  }
}
