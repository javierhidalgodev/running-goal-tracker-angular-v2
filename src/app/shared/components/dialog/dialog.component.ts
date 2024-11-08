import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(
    public dialogRef: DialogRef<boolean>
  ) { }

  confirm() {
    this.dialogRef.close(true)
  }
  cancel() {
    this.dialogRef.close(false)
  }
}
