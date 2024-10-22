import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from 'app/pipes/timestamp-to-date.pipe';



@NgModule({
  declarations: [TimestampToDatePipe],
  imports: [
    CommonModule
  ],
  exports: [
    TimestampToDatePipe
  ]
})
export class SharedModule { }
