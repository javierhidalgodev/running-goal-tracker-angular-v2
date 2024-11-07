import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from '@pipes/timestamp-to-date.pipe';
import { FormatDateToInputMinPipe } from '@pipes/format-date-to-input-min.pipe';
import { FilterGoalsPipe } from '@pipes/filter-goals.pipe';
import { ReducePipe } from '@pipes/reduce.pipe';

@NgModule({
  declarations: [
    TimestampToDatePipe,
    FormatDateToInputMinPipe,
    FilterGoalsPipe,
    ReducePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimestampToDatePipe,
    FormatDateToInputMinPipe,
    FilterGoalsPipe,
    ReducePipe,
  ]
})
export class SharedModule { }
