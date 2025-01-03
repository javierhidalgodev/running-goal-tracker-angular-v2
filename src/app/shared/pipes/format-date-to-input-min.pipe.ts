import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import dayjs from 'dayjs/esm';

@Pipe({
  name: 'formatDateToInputMin'
})
export class FormatDateToInputMinPipe implements PipeTransform {

  transform(date: Timestamp,): string {
    const toDate = dayjs(date.toMillis(), { utc: true })
    return `${toDate.year()}-${(toDate.month() + 1).toString().padStart(2, '0')}-${toDate.date().toString().padStart(2, '0')}`;
  }

}
