import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, query, Timestamp, where } from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export interface Goal {
  id: string,
  title: string,
  description: string,
  startDate: Timestamp,
  endDate: Timestamp,
  km: number,
  registrationDate: Timestamp,
  complete: boolean
}
export type GoalCreate = Omit<Goal, 'id'>
export type GoalForm = Omit<GoalCreate, 'registrationDate' | 'complete'>

export interface Activity {
  id: string,
  goalId: string,
  date: Timestamp,
  km: number,
  registrationDate: Timestamp
}
export type ActivityCreate = Omit<Activity, 'id'>
export type ActivityForm = Omit<ActivityCreate, 'goalId' | 'registrationDate'>

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private _goalCollection = collection(this._fireStore, 'goals')
  private _activityCollection = collection(this._fireStore, 'activities')

  isLoading = signal<boolean>(true)

  
  constructor(
    private _fireStore: Firestore,
    private _authService: AuthService
  ) { }

  createGoal(goal: GoalCreate) {
    return addDoc(this._goalCollection, goal)
  }

  getGoalById(goalId: string) {
    const docRef = doc(this._goalCollection, goalId)
    return getDoc(docRef)
  }

  /**
   * Esta propiedad devuelve un Signal (a partir de un Observable) con los Goals o un array vacío
   * Además, tiene una operación intermedia que modifica otro Signal
   * que nos sirve para saber si se están cargando los objetivos, y
   * en consecuencia renderizar un loader en los componentes
   * que necesiten esta data.
   */
  getGoals = toSignal(
    (collectionData(this._goalCollection, { idField: 'id' }) as Observable<Goal[]>).pipe(
      tap(() => {
        this.isLoading.set(false)
      }
      ),
      catchError(error => {
        this.isLoading.set(false)
        return throwError(() => error)
      })
    ),
    { initialValue: [] }
  )
  // getGoals() {
  //   return toSignal(collectionData(this._goalCollection) as Observable<Goal[] | { initialValue: [] }>)
  // }

  createActivityToGoal(activity: ActivityCreate) {
    return addDoc(this._activityCollection, activity)
  }

  getActivities(goalId: string) {
    const activitiesQuery = query(this._activityCollection, where('goalId', '==', goalId))

    return toSignal(
      (collectionData(activitiesQuery, { idField: 'id' }) as Observable<Activity[]>), {
      initialValue: []
    })
  }
}
