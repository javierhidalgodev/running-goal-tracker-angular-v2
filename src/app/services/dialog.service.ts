import { Dialog } from '@angular/cdk/dialog'
import { Injectable } from '@angular/core';
import { DialogComponent } from '@components/dialog/dialog.component';
import { first, firstValueFrom, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private _dialog: Dialog) { }

  async openDialog() {
    // Crea una referencia
    const dialogRef = this._dialog.open<boolean>(DialogComponent, {
      width: 'fit',
    })

    // Crea un observable que será usado para devolver solo el primer valor, y gestionar automáticamente la desuscripción.
    const source$ = dialogRef.closed
    return firstValueFrom(source$)
   
    // return new Promise((resolve) => {
    //   dialogRef.closed.subscribe(result => {
    //     resolve(result)
    //   })
    // })
  }
}
