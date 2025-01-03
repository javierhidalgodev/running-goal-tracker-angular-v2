import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimestampToDatePipe } from '@pipes/timestamp-to-date.pipe';
import { FormatDateToInputMinPipe } from '@pipes/format-date-to-input-min.pipe';
import { FilterGoalsPipe } from '@pipes/filter-goals.pipe';
import { ReducePipe } from '@pipes/reduce.pipe';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { ToasterComponent } from '@shared/components/toaster/toaster.component';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { RouterModule } from '@angular/router';

const declarationsExports = [
  HeaderComponent,
  FooterComponent,
  NotificationComponent,
  ToasterComponent,
  DialogComponent,
  TooltipComponent,
  TimestampToDatePipe,
  FormatDateToInputMinPipe,
  FilterGoalsPipe,
  ReducePipe,
  TooltipDirective
]

@NgModule({
  declarations: declarationsExports,
  imports: [CommonModule, RouterModule],
  exports: declarationsExports
})
export class SharedModule { }
