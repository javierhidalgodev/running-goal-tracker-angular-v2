import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from 'app/pipes/timestamp-to-date.pipe';
import { FormatDateToInputMinPipe } from 'app/pipes/format-date-to-input-min.pipe';



@NgModule({
  declarations: [TimestampToDatePipe, FormatDateToInputMinPipe],
  imports: [
    CommonModule
  ],
  exports: [
    TimestampToDatePipe,
    FormatDateToInputMinPipe
  ]
})
export class SharedModule { }
