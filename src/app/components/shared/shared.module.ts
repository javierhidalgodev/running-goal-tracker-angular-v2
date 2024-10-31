import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from 'app/pipes/timestamp-to-date.pipe';
import { FormatDateToInputMinPipe } from 'app/pipes/format-date-to-input-min.pipe';
import { FilterGoalsPipe } from 'app/pipes/filter-goals.pipe';
import { IncrementCountDirective } from 'app/directives/increment-count.directive';



@NgModule({
  declarations: [
    TimestampToDatePipe,
    FormatDateToInputMinPipe,
    FilterGoalsPipe,
    IncrementCountDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimestampToDatePipe,
    FormatDateToInputMinPipe,
    FilterGoalsPipe,
    IncrementCountDirective
  ]
})
export class SharedModule { }
