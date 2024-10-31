import { TestBed } from '@angular/core/testing'
import { GoalService } from './goal.service'
import { FirestoreModule } from '@angular/fire/firestore'
import { AuthService } from './auth.service'

describe('Goal Service', () => {
	let service: GoalService

	beforeEach(() => {
		// Inyección de dependencias necesarias para el funcionamiento correcto del servicio
		TestBed.configureTestingModule({
			imports: [FirestoreModule],
			providers: [AuthService, GoalService]
		})
		service = TestBed.inject(GoalService)
	})

	it('Loading is true initially', () => {
		expect(service).toBeTruthy()
	})
})