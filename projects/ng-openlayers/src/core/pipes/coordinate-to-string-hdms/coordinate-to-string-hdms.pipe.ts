import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { modulo } from 'ol/math';
import { padNumber } from 'ol/string';


/**
 * @param {string} hemispheres Hemispheres.
 * @param {number} degrees Degrees.
 * @param {number} [opt_fractionDigits] The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} string.
 */
 export function degreesToStringHDMS(
   hemispheres: 'NS'|'EW',
   degrees: number,
   options?: {
     template?: string,
     fractionDigits?: number
   }): string {
  const normalizedDegrees = modulo(degrees + 180, 360) - 180;
  const x = Math.abs(3600 * normalizedDegrees);
  const template: string = options && typeof options.template === 'string'
    ? options.template
    : '{H} {D}\u00b0{M}\u2032{S}\u2033';
  const dflPrecision = options && typeof options.fractionDigits === 'number' ? options.fractionDigits : 0;
  const precision = Math.pow(10, dflPrecision);

  let deg = Math.floor(x / 3600);
  let min = Math.floor((x - deg * 3600) / 60);
  let sec = x - deg * 3600 - min * 60;
  sec = Math.ceil(sec * precision) / precision;

  if (sec >= 60) {
    sec = 0;
    min += 1;
  }

  if (min >= 60) {
    min = 0;
    deg += 1;
  }

  return template
    .replace('{H}', normalizedDegrees == 0 ? '' : ' ' + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0))
    .replace('{D}', `${deg}`)
    .replace('{M}', padNumber(min, 2))
    .replace('{S}', padNumber(sec, 2, dflPrecision));
}

@Pipe({
  name: 'coordinateToStringHdms'
})
export class CoordinateToStringHdmsPipe implements PipeTransform {

  transform(value: Coordinate, opt_fractionDigits?: number): string {
    return [
      degreesToStringHDMS('EW', value[0], { fractionDigits: opt_fractionDigits }),
      degreesToStringHDMS('NS', value[1], { fractionDigits: opt_fractionDigits })
    ]
    .join(', ');
  }

}
