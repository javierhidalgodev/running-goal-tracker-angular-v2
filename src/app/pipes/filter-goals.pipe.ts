import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGoals'
})
export class FilterGoalsPipe<T extends object> implements PipeTransform {

  transform(array: T[], filter: keyof T, result: boolean): Array<T> {
    return array.filter((item: T) => item[filter] === result);
  }

}
