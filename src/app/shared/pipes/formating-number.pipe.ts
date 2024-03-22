import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatingNumber'
})
export class FormatingNumber implements PipeTransform {

  transform(value: number | string, numberdecimal?: number): string {
    return new Intl.NumberFormat('vi', {
      minimumFractionDigits: 0,
      maximumFractionDigits: numberdecimal ? numberdecimal : 1
    }).format(Number(value));
  }
}