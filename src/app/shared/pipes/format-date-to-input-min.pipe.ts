import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'formatDateToInputMin'
})
export class FormatDateToInputMinPipe implements PipeTransform {

  transform(date: Timestamp,): unknown {
    const toDate = date.toDate()
    return `${toDate.getFullYear()}-${(toDate.getMonth() + 1).toString().padStart(2, '0')}-${toDate.getDate().toString().padStart(2, '0')}`;
  }

}
