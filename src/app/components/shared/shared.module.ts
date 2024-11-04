import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from '@pipes/timestamp-to-date.pipe';
import { FormatDateToInputMinPipe } from '@pipes/format-date-to-input-min.pipe';
import { FilterGoalsPipe } from '@pipes/filter-goals.pipe';
import { IncrementCountDirective } from '@directives/increment-count.directive';
import { ReducePipe } from '@pipes/reduce.pipe';



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
