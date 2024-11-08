import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from '@pipes/timestamp-to-date.pipe';
import { FormatDateToInputMinPipe } from '@pipes/format-date-to-input-min.pipe';
import { FilterGoalsPipe } from '@pipes/filter-goals.pipe';
import { ReducePipe } from '@pipes/reduce.pipe';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { ToasterComponent } from '@shared/components/toaster/toaster.component';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

const declarationsExports = [NotificationComponent, ToasterComponent, DialogComponent, TimestampToDatePipe, FormatDateToInputMinPipe, FilterGoalsPipe, ReducePipe]

const exports = []

@NgModule({
  declarations: declarationsExports,
  imports: [CommonModule],
  exports: declarationsExports
})
export class SharedModule { }
