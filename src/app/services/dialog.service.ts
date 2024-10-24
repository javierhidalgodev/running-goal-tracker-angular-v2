import { Dialog } from '@angular/cdk/dialog'
import { Injectable } from '@angular/core';
import { DialogComponent } from '@components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private _dialog: Dialog) { }

  openDialog() {
    // Crea una referencia
    const dialogRef = this._dialog.open<string>(DialogComponent, {
      width: 'fit',
    })

    return new Promise((resolve) => {
      dialogRef.closed.subscribe(result => {
        resolve(result)
      })
    }) 
  }
}
