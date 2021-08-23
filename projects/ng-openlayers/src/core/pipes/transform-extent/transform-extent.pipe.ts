import { Pipe, PipeTransform } from '@angular/core';
import { Extent } from 'ol/extent';
import { ProjectionLike, transformExtent } from 'ol/proj';

@Pipe({
  name: 'transformExtent',
  pure: true
})
export class TransformExtentPipe implements PipeTransform {

  transform(extent: Extent, ...args: unknown[]): Extent {
    const source: ProjectionLike = args[0] !== undefined ? args[0] as ProjectionLike : 'EPSG:4326';
    const destination: ProjectionLike = args[1] !== undefined ? args[1] as ProjectionLike : 'EPSG:3857';
    const stops: number = args[2] as number;
    return transformExtent(extent, source, destination, stops);
  }

}
