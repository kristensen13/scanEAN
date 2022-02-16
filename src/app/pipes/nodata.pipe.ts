import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nodata',
})
export class NodataPipe implements PipeTransform {
  transform(data: any, replaceText: string = 'N/A'): any {
    if (data !== []) {
      return data;
    }
    if (data === []) {
      return replaceText;
    }
  }
}
