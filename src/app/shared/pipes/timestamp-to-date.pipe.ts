import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import dayjs from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc'
import tz from 'dayjs/esm/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(timestampInput: Timestamp): string {
    // console.log(dayjs(timestampInput.toDate(), { utc: true }))
    return dayjs(timestampInput.toDate(), { utc: true }).format('DD-MM-YYYY')
  }

}
