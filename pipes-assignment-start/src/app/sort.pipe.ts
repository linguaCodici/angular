import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, prop: string): any {
    return value.sort((a, b) => {
      if (a[prop] > b[prop]) {
        return 1;
      } else {
        return -1;
      }
    });
  }

}
