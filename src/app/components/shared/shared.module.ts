import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from 'app/pipes/timestamp-to-date.pipe';
import { FormatDateToInputMinPipe } from 'app/pipes/format-date-to-input-min.pipe';
import { FilterGoalsPipe } from 'app/pipes/filter-goals.pipe';
import { IncrementCountDirective } from 'app/directives/increment-count.directive';
import { ReducePipe } from 'app/pipes/reduce.pipe';



@NgModule({
  declarations: [
    TimestampToDatePipe,
    FormatDateToInputMinPipe,
    FilterGoalsPipe,
    ReducePipe,
    IncrementCountDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimestampToDatePipe,
    FormatDateToInputMinPipe,
    FilterGoalsPipe,
    ReducePipe,
    IncrementCountDirective
  ]
})
export class SharedModule { }
