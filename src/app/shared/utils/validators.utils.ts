import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"
import { isValidDate } from 'rxjs/internal/util/isDate'

export type FormFieldName = 'email' | 'password' | 'title' | 'description' | 'startDate' | 'endDate' | 'km' | 'runDate'

export const isRequired = (field: FormFieldName, form: FormGroup) => {
	const control = form.get(field)
	return control && control.touched && control.hasError('required')
}

export const hasEmailError = (form: FormGroup) => {
	const control = form.get('email')
	return control && control.touched && control.hasError('email')
}

export const isShorter = (field: FormFieldName, form: FormGroup) => {
	const control = form.get(field)

	return control && control.touched && control.hasError('minlength')
}

export const isLonger = (field: FormFieldName, form: FormGroup) => {
	const control = form.get(field)

	return control && control.touched && control.hasError('maxlength')
}

export const minValidator = (form: FormGroup) => {
	const control = form.get('km')

	return control && control.touched && !control.pristine && control.hasError('min')
}

export const invalidDate = (field: 'startDate' | 'endDate' | 'runDate', form: FormGroup) => {
	const control = form.get(field)
	
	return control && control.touched && !control.pristine && control.hasError('invalidDate')
}

export const dateRangeValidator = (field: 'startDate' | 'endDate' | 'runDate', form: FormGroup) => {
	const control = form.get(field)

	return control && control.touched && control.hasError('dateRangeViolation')
}

export const invalidDateValidator = (): ValidatorFn => {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = new Date(control.value)
		
		return !isValidDate(value) ? { invalidDate: true } : null
	}
}
