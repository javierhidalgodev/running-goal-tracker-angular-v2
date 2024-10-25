import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from 'app/pipes/timestamp-to-date.pipe';
import { FormatDateToInputMinPipe } from 'app/pipes/format-date-to-input-min.pipe';
import { FilterGoalsPipe } from 'app/pipes/filter-goals.pipe';



@NgModule({
  declarations: [TimestampToDatePipe, FormatDateToInputMinPipe, FilterGoalsPipe],
  imports: [
    CommonModule
  ],
  exports: [
    TimestampToDatePipe,
    FormatDateToInputMinPipe,
    FilterGoalsPipe
  ]
})
export class SharedModule { }
