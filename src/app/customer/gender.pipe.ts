import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    // TODO: handle diferent values for this pipe
    return (value === 'w') ? 'Women' : 'Men';
  }

}
