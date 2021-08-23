import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { fromLonLat, ProjectionLike } from 'ol/proj';

@Pipe({
  name: 'fromLonLat',
  pure: true
})
export class FromLonLatPipe implements PipeTransform {

  transform(coordinate: Coordinate, opt_projection?: ProjectionLike): Coordinate {
    return fromLonLat(coordinate, opt_projection);
  }

}
