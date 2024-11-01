import { Pipe, PipeTransform } from '@angular/core';
import { Goal } from 'app/services/goal.service';

@Pipe({
  name: 'reduce'
})
export class ReducePipe implements PipeTransform {

  transform(goals: Goal[], fieldToReduce: keyof Goal): string | number {
    return goals.reduce((acc, curr) => acc + (curr[fieldToReduce] as number) , 0).toFixed(2);
  }
}
