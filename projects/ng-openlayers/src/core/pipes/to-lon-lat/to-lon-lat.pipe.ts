import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { ProjectionLike, toLonLat } from 'ol/proj';

@Pipe({
  name: 'toLonLat'
})
export class ToLonLatPipe implements PipeTransform {

  transform(value: Coordinate, opt_projection?: ProjectionLike): Coordinate {
    return toLonLat(value, opt_projection);
  }

}
