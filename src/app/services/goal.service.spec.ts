import { Firestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class MockAngularFirestore {
  collection(collectionPath: string) {
    return {
      valueChanges: () => of([{ id: '1', name: 'Test Data' }]), // Devuelve datos simulados
      doc: (id: string) => ({
        valueChanges: () => of({ id, name: 'Doc Data' }),
        set: (data: any) => Promise.resolve(data),
        update: (data: any) => Promise.resolve(data),
        delete: () => Promise.resolve(),
      }),
    };
  }
}

xdescribe('GoalService', () => {
  let authService: AuthService;
  let auth: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        Auth,
        {provide: AngularFirestore, class: MockAngularFirestore}
      ],
    });

    authService = TestBed.inject(AuthService);
    auth = TestBed.inject(Auth);
  });

  xit('should', () => {
    expect(authService).toBeTruthy();
  });
});
