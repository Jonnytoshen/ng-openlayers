import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate, format } from 'ol/coordinate';

@Pipe({
  name: 'coordinateToStringXY',
  pure: true
})
export class CoordinateToStringXYPipe implements PipeTransform {

  transform(value: Coordinate, opt_fractionDigits?: number): string {
    return format(value, `{x}º, {y}º`, opt_fractionDigits);
  }

}
