import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
  name : 'temp'
})
export class TempreaturePipe implements PipeTransform {
  transform(val: number): number {
    return Math.round((val - 32) * 5.0 / 9.0);
  }
}
